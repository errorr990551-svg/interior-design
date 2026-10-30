"""One-off generator for data/cities.csv (kept for transparency/reproducibility).

Inputs (downloaded during setup, see data/README.md):
  - Census of India 2011, Table A-4 "Towns and Urban Agglomerations classified by
    population size class" (CLASS_I.xlsx) -> official 2011 populations
  - Wikipedia "List of cities in India by population" -> city list + coordinates
    (its population column was cross-checked against the Census file: 96/100 exact
    matches; the 4 mismatches were replaced with the Census municipal figure)
  - livspace.com/in/interior-designer-near-me -> Livspace city pages (each URL
    checked for HTTP 200 without redirect)
Usage: python3 build_cities.py top100.json status.txt > ../../data/cities.csv
"""
import csv, json, math, re, sys

CENSUS_URL = "https://censusindia.gov.in/nada/index.php/catalog/42876/download/46544/CLASS_I.xlsx"
COORDS_URL = "https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population"
REGION = {
    "Maharashtra": "west", "Gujarat": "west", "Goa": "west",
    "Delhi": "north", "Haryana": "north", "Punjab": "north", "Chandigarh": "north",
    "Uttar Pradesh": "north", "Uttarakhand": "north", "Rajasthan": "north",
    "Jammu and Kashmir": "north", "Himachal Pradesh": "north",
    "Madhya Pradesh": "central", "Chhattisgarh": "central",
    "Karnataka": "south", "Tamil Nadu": "south", "Kerala": "south",
    "Telangana": "south", "Andhra Pradesh": "south",
    "West Bengal": "east", "Bihar": "east", "Jharkhand": "east", "Odisha": "east",
    "Assam": "east",
}
RENAME = {"Gurgaon": "Gurugram"}

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and")).strip("-")

def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a["lat"], a["lon"], b["lat"], b["lon"]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))

top = json.load(open(sys.argv[1]))
status = dict(l.split() for l in open(sys.argv[2]) if l.strip())
rows = []
for rank, c in enumerate(top, 1):
    s = c["livspace_slug"]
    served = "unknown" if s and status.get(s) != "200" else ("yes" if s else "no")
    name = RENAME.get(c["city"], c["city"])
    rows.append(dict(
        rank=rank, city=name, slug=slug(name), state=c["state"], state_slug=slug(c["state"]),
        region=REGION[c["state"]], latitude=float(c["lat"]), longitude=float(c["lon"]),
        population=c["pop"], population_source_url=CENSUS_URL, census_name=c["census_name"],
        coordinates_source_url=COORDS_URL, livspace_served=served,
        livspace_city_url=f"https://www.livspace.com/in/interiors/{s}" if s else "",
        status="queued", publish_date="", lat=float(c["lat"]), lon=float(c["lon"]),
    ))

# Geographic batching: walk a nearest-neighbour route through the cities (starting
# from the largest one, same-state hops preferred), then cut the route into
# consecutive groups of 5 so each day's cities sit close together. Served first.
order = []
for group in (["yes"], ["unknown", "no"]):
    pool = sorted((r for r in rows if r["livspace_served"] in group), key=lambda r: r["rank"])
    route = [pool.pop(0)] if pool else []
    while pool:
        cur = route[-1]
        nxt = min(pool, key=lambda r: km(cur, r) * (1 if r["state"] == cur["state"] else 1.5))
        pool.remove(nxt)
        route.append(nxt)
    order += [route[i:i + 5] for i in range(0, len(route), 5)]
for b, batch in enumerate(order, 1):
    for i, r in enumerate(batch, 1):
        r["queue_batch"], r["queue_order"] = b, i

cols = ["queue_batch", "queue_order", "rank", "city", "slug", "state", "state_slug", "region",
        "latitude", "longitude", "population", "population_source_url", "census_name",
        "coordinates_source_url", "livspace_served", "livspace_city_url", "status", "publish_date"]
w = csv.DictWriter(sys.stdout, fieldnames=cols, extrasaction="ignore", lineterminator="\n")
w.writeheader()
for batch in order:
    for r in batch:
        w.writerow(r)
