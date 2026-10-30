# 2BHK Interiors: City-Wise SEO Content Plan

**Site:** https://2bhkinteriors.com
**Business:** Residential-only interior design studio based in Mumbai. Services: 2D space planning, 3D visualization, mood boards. Execution is handled through partner contractors. Remote design is available outside Mumbai.
**Goal:** Rank city by city for "interior designer in {city}" and the related BHK, service and cost searches. Start with Mumbai and its localities, then move to other Indian metros through remote design.
**Plan prepared:** October 2026

---

## 0. Read this first: technical blockers

Fix these before writing city pages. Pages published without them cannot rank.

| # | Problem found in the codebase | Why it blocks city ranking | Fix |
|---|---|---|---|
| 1 | **No real URLs.** `App.jsx` switches pages with `useState('home')`. `/about`, `/services` and `/portfolio` are listed in `sitemap.xml`, but those paths don't exist as routes. | Google indexes URLs. Without a URL per page, there can't be a page for `/interior-designer-mumbai/powai`. | Add `react-router-dom` with real routes, and set up a host rewrite so deep links don't 404. |
| 2 | **Client-side rendering only.** `index.html` has an empty `<div id="root">`. | Google renders JavaScript, but slowly and not always. City pages need content in the HTML at load time. | Prerender every route at build time (`vite-react-ssg` or `vite-plugin-prerender`), or move to Next.js or Astro. With 100+ location pages planned, **migrating to Next.js (static export) or Astro is the better long-term choice.** |
| 3 | **One `<title>` and meta description for the whole site.** | Each city or locality page needs its own title, description, canonical and OG tags. | Use `react-helmet-async` (or the Next/Astro metadata APIs) per route. |
| 4 | **Placeholder contact details:** `+91 98200 12345`, `instagram.com` with no handle. | Local SEO depends on the business name, address and phone (NAP) matching everywhere. | Put the real phone number, a full street address in Mumbai, and the real Instagram URL in the footer, the CTA, schema and the Google Business Profile. |
| 5 | **No structured data.** | The local pack and rich results use `LocalBusiness` / `FAQPage` schema. | Add JSON-LD (templates in section 7). |
| 6 | **Home title has no location or service keyword:** "Timeless Architecture & Luxury Spaces". | The home page is the strongest page for "interior designer Mumbai". | New title: `Interior Designer in Mumbai \| 2BHK & Apartment Interiors \| 2BHK Interiors` |
| 7 | **The consultation form doesn't ask for the city.** | You can't tell which city pages bring in leads. | Add a required **City / Locality** dropdown to `ConsultationModal.jsx` and send it to analytics as an event parameter. |
| 8 | Old brand names left in the code (`BehindRenova.jsx`, "RENOVA" in git history). | Low risk. Make sure "Renova" never appears in rendered text or alt text. | Search the code and clean it up. |

---

## 1. Strategy overview

### 1.1 The "2BHK" advantage
The brand name matches a very common Indian search pattern exactly: "2BHK interior design", "2BHK flat interior", "2BHK interior cost". Every city should get a **BHK-specific page** (1BHK, 2BHK, 3BHK). Few competitors target these city by city, and the brand name strengthens relevance.

### 1.2 Three-tier city model

| Tier | Cities | How you serve them | What you can realistically rank for |
|---|---|---|---|
| **Tier 1: Home market** | Mumbai plus MMR (Thane, Navi Mumbai, Mira-Bhayandar, Kalyan-Dombivli, Vasai-Virar) | Full service: on-site measurement, design, partner execution | **Local pack + organic** for "interior designer in {locality}", "2BHK interior design Mumbai", cost guides |
| **Tier 2: Remote plus partner execution** | Pune → Bengaluru → Hyderabad → Gurugram → Noida → Ahmedabad → Chennai | Remote design (consultation, mood board, 2D, 3D), with execution by local partners or the client's own contractor | **Organic only** (no local pack without an address) for "online interior design {city}", "3D interior design {city}", "2BHK interior design {city}", "interior design ideas {city} flat" |
| **Tier 3: NRI / overseas** | NRIs in Dubai, the UK, US, Singapore buying in Mumbai or Pune | Fully remote with video walkthroughs | "interior design for NRI Mumbai flat", "remote interior designer India for NRI" |

> **Honest framing rule:** Never claim an office, team or "local studio" in a city where you don't have one. Tier 2 pages say "online / remote interior design for {city} homes". This keeps you clear of Google's doorway-page and misrepresentation rules, and it converts better because it sets the right expectation.

### 1.3 Site architecture (hub and spoke per city)

```
/                                         Home (Mumbai-focused)
/services                                 Services hub
  /services/2d-floor-plan-design
  /services/3d-interior-visualization
  /services/mood-board-interior-design
/portfolio                                Portfolio hub
  /portfolio/{project-slug}               Case studies, each tagged with city + locality

/interior-designer-mumbai                 ← CITY HUB (Tier 1)
  /interior-designer-mumbai/powai         ← LOCALITY pages
  /interior-designer-mumbai/andheri-west
  /interior-designer-mumbai/...
  /interior-designer-mumbai/2bhk-interior-design   ← SERVICE × CITY pages
  /interior-designer-mumbai/1bhk-interior-design
  /interior-designer-mumbai/3bhk-interior-design
  /interior-designer-mumbai/3d-interior-design
  /interior-designer-mumbai/modular-kitchen-design
  /interior-designer-mumbai/buildings/{building-slug} ← BUILDING / PROJECT pages

/interior-designer-thane                  ← MMR cities get their own hubs (strong standalone searches)
/interior-designer-navi-mumbai

/online-interior-design-pune              ← CITY HUB (Tier 2, remote)
  /online-interior-design-pune/2bhk-interior-design
  /online-interior-design-pune/3d-interior-design
/online-interior-design-bangalore
/online-interior-design-hyderabad
/online-interior-design-gurgaon
/online-interior-design-noida

/nri-interior-design                      ← Tier 3

/blog/{slug}                              Supporting articles that link up to city pages
/locations                                Index of every city and locality (internal linking + crawl path)
```

**Internal linking rules**
- Every locality page links **up** to its city hub and **across** to 3–4 nearby localities.
- Every city hub links **down** to all its localities and service × city pages.
- Every blog post links to **one** city or service page with descriptive anchor text, e.g. "2BHK interior design in Thane".
- Footer: replace the 4 static locations with links to the city hubs, plus a "/locations" link.
- Every portfolio case study links to the locality page where the project is.

---

## 2. Keyword framework per city

Search volumes change, so check each city in Google Keyword Planner, Ahrefs or Semrush (location set to that city) before writing. **Priority** below is based on buyer intent and how winnable the term is.

### 2.1 Keyword template (repeat for each city or locality)

| Cluster | Keyword patterns | Intent | Target page | Priority |
|---|---|---|---|---|
| Core | interior designer in {city}, interior designers in {city}, best interior designer in {city}, home interior designer {city} | Hire | City hub | ★★★ |
| Locality | interior designer in {locality}, interior designer near {locality}, flat interior {locality} | Hire (local) | Locality page | ★★★ |
| BHK | 2BHK interior design {city}, 2BHK flat interior {city}, 1BHK interior design {city}, 3BHK interior design {city} | Hire | Service × city | ★★★ |
| Cost | 2BHK interior cost in {city}, interior design cost per sq ft {city}, 1BHK interior budget {city} | Research → hire | Blog cost guide → service × city | ★★★ |
| Service | 3D interior design {city}, interior 3D rendering {city}, 2D floor plan design {city}, online interior design {city}, interior mood board | Hire | Service × city | ★★ |
| Room | modular kitchen design {city}, bedroom interior design {city}, living room interior {city}, wardrobe design {city} | Hire / ideas | Service × city or blog | ★★ |
| Building | {building/project name} interior, {project} 2BHK interior design, {project} flat interior | Hire (very high intent, new owners) | Building page | ★★★ (low competition) |
| Ideas | small 2BHK interior ideas {city}, 650 sq ft 2BHK design, vastu 2BHK layout | Research | Blog | ★ (traffic + links) |

### 2.2 Mumbai keyword map (Tier 1, write first)

| Target page | Primary keyword | Secondary keywords |
|---|---|---|
| Home `/` | interior designer Mumbai | residential interior designer Mumbai, home interior design Mumbai |
| `/interior-designer-mumbai` | interior designer in Mumbai | best interior designers in Mumbai, apartment interior designer Mumbai, flat interior design Mumbai |
| `/interior-designer-mumbai/2bhk-interior-design` | 2BHK interior design Mumbai | 2BHK flat interior Mumbai, 2BHK interior design ideas Mumbai, 2BHK interior package Mumbai |
| `/interior-designer-mumbai/1bhk-interior-design` | 1BHK interior design Mumbai | small flat interior Mumbai, 1BHK space saving design |
| `/interior-designer-mumbai/3bhk-interior-design` | 3BHK interior design Mumbai | luxury apartment interior Mumbai |
| `/interior-designer-mumbai/3d-interior-design` | 3D interior design Mumbai | 3D interior rendering Mumbai, interior visualization Mumbai |
| `/interior-designer-mumbai/modular-kitchen-design` | modular kitchen design Mumbai | small kitchen design Mumbai flat |
| `/blog/2bhk-interior-cost-mumbai` | 2BHK interior cost in Mumbai | interior design cost per sq ft Mumbai, 2BHK interior budget Mumbai |

---

## 3. City and locality roll-out list

### 3.1 Mumbai localities (Tier 1)

**Wave 1** matches the localities already shown on the site (`WhereWeWorkSection.jsx`, `Footer.jsx`):

| # | Page | Localities covered | Unique angle (what makes the page different) |
|---|---|---|---|
| 1 | South Mumbai | Colaba, Cuffe Parade, Malabar Hill, Breach Candy, Marine Drive | Older buildings with high ceilings and larger carpet areas; restoring heritage and art-deco details; sea-facing luxury towers |
| 2 | Worli & Lower Parel | Worli, Lower Parel, Prabhadevi | New luxury high-rises, handover-to-move-in fit-outs, sea-view living rooms, smart-home wiring in 2D planning |
| 3 | Bandra & Khar | Bandra W/E, Khar, Santacruz | Redevelopment flats, compact premium apartments, older bungalows, style-led (boho, contemporary) |
| 4 | Juhu & Vile Parle | Juhu, Vile Parle W/E | Bungalows and older societies, redeveloped buildings, joint-family layouts |
| 5 | Powai | Hiranandani Gardens, Powai lake area | Larger 2/3BHKs, IT professionals and expat tenants, rental-ready interiors |
| 6 | Thane (own hub, see 3.2) | Ghodbunder Road, Majiwada, Kolshet, Hiranandani Estate | High volume of new possessions in townships: handover checklists, first-home budgets |

**Wave 2**

| # | Page | Unique angle |
|---|---|---|
| 7 | Andheri West (Lokhandwala, Versova, Four Bungalows) | Compact 1/2BHKs, media professionals, multi-use rooms |
| 8 | Andheri East (Chakala, Marol, JB Nagar) | Working professionals, rentals, quick turnaround |
| 9 | Goregaon & Malad | New tower possessions, 2BHKs for young families |
| 10 | Kandivali & Borivali | Family homes, redevelopment, Vastu-led layouts |
| 11 | Chembur | Redevelopment, larger older flats being modernised |
| 12 | Ghatkopar & Vikhroli | New towers on the Eastern Express Highway, families |
| 13 | Mulund & Bhandup | First-time buyers, budget-smart 2BHKs |
| 14 | Wadala & Sion | New high-rises, compact luxury |
| 15 | Dadar & Matunga | Older flats, heritage character, pooja-room design |

### 3.2 MMR city hubs (Tier 1, separate hubs because they have their own search volume)

| Hub | Locality pages under it |
|---|---|
| `/interior-designer-thane` | Ghodbunder Road, Majiwada/Balkum, Hiranandani Estate, Kolshet, Thane West station area |
| `/interior-designer-navi-mumbai` | Vashi, Kharghar, Nerul, Seawoods, Ulwe, Panvel, Airoli |
| `/interior-designer-mira-road` | Mira Road, Bhayandar |
| `/interior-designer-kalyan-dombivli` | Kalyan, Dombivli (budget 1/2BHK focus) |
| `/interior-designer-vasai-virar` | Vasai, Virar (budget focus) |

### 3.3 Tier 2 remote cities (launch order)

| Order | City hub | Why this order | Localities to name in the content (no separate pages until you have projects there) |
|---|---|---|---|
| 1 | Pune | Closest to Mumbai, so occasional site visits are possible. Many Mumbai buyers also buy in Pune. | Hinjewadi, Baner, Wakad, Kharadi, Hadapsar, Wagholi |
| 2 | Bengaluru | Large market of IT buyers who are comfortable with online services | Whitefield, Sarjapur Road, Electronic City, HSR Layout, Hebbal |
| 3 | Hyderabad | Gated-community boom; buyers open to remote design | Gachibowli, Kondapur, Kokapet, Kompally |
| 4 | Gurugram | High budgets, new towers | Golf Course Extension Road, Dwarka Expressway, Sohna Road |
| 5 | Noida | Many new possessions | Sector 150, Noida Extension, Sector 137 |
| 6 | Ahmedabad, Chennai | Expand once Tier 2 pages start ranking | — |

**Rule for Tier 2:** Publish a city hub plus a **2BHK page** plus a **3D design page** first. Add locality pages for a city only after you have **at least one real project** there to show.

### 3.4 Building / project pages (highest intent, lowest competition)

People who just got the keys search for their **building name** + "interior". Build pages for:
1. Buildings where you have **completed or ongoing projects** (best option: real photos).
2. Large new-possession projects in Thane, Powai, Goregaon and Navi Mumbai where floor plans are public. Analyse the actual layout.

**Page outline:** "{Project name} 2BHK Interior Design: Layout Ideas & Cost"
- The project's typical 2BHK / 3BHK carpet areas (from public RERA or builder brochures)
- Your 2D furniture layout on top of the actual floor plan (2D planning is a core service, so this shows it off)
- 3 layout problems specific to this plan and how to solve them (e.g. a small kitchen, a dead corridor, an awkward balcony)
- A mood board in 2 styles
- Budget range
- CTA: "Own a flat in {Project}? Get a free layout review."

Target: **4 building pages per month** from Month 3 onward.

---

## 4. Page templates

### 4.1 City hub template (1,800–2,500 words)

**Example: `/interior-designer-mumbai`**

- **Title (≤60 chars):** `Interior Designer in Mumbai | 2BHK & 3BHK Homes | 2BHK Interiors`
- **Meta description (≤155):** `Residential interior designer in Mumbai. 2D layouts, 3D renders and mood boards for 1, 2 & 3BHK flats. See your home before it's built. Book a consultation.`
- **H1:** Interior Designer in Mumbai for Apartments & Homes

| Section (H2) | Content | Words |
|---|---|---|
| Intro | Who you are, residential only, "see it before you build it" promise, Mumbai since {year} | 150 |
| Interior design services in Mumbai | 3 service cards → service × city pages | 250 |
| Homes we design in Mumbai | Typical Mumbai carpet areas (450–1,200 sq ft), compact layouts, redevelopment flats, new possessions | 250 |
| Areas we serve in Mumbai | Grid of locality links (Wave 1 + 2) + MMR hubs | 150 |
| Recent Mumbai projects | 3–6 case-study cards with locality, BHK, sq ft, photo | 200 |
| Interior design cost in Mumbai | Table by 1/2/3BHK: design fee + typical execution range **from your real quotes** + link to the cost guide | 250 |
| Designing for Mumbai living | Monsoon humidity (BWP ply, laminates over veneer in wet zones, anti-fungal paint), space-saving joinery, housing-society renovation rules (NOC, working hours, debris), Vastu requests | 350 |
| Our process (on-site in Mumbai) | Consultation → site measure → mood board → 2D → 3D → partner execution, with timelines (1–2 weeks per room, 4–8 weeks full home, per the site FAQ) | 200 |
| What Mumbai clients say | 3 testimonials **naming the locality** | 150 |
| FAQs: interior design in Mumbai | 6–8 Q&As (below) with FAQPage schema | 400 |
| CTA + NAP | Book a consultation, Mumbai address, phone, map embed | 50 |

**Mumbai FAQ set:**
1. How much does a 2BHK interior cost in Mumbai?
2. How long does a 2BHK interior project take in Mumbai?
3. Do I need society permission (NOC) for interior work in Mumbai?
4. Which materials work best for Mumbai's humid climate?
5. Do you handle execution, or only design? (Use the existing answer: execution-ready files plus partner contractors.)
6. Which areas of Mumbai do you serve?
7. Can you design a Vastu-compliant layout?
8. Do you design rental flats?

### 4.2 Locality page template (900–1,400 words)

**Example: `/interior-designer-mumbai/powai`**

- **Title:** `Interior Designer in Powai | 2BHK & 3BHK Flats | 2BHK Interiors`
- **Meta:** `Interior design for Powai apartments, from Hiranandani towers to lake-view homes. 2D layouts, 3D renders & mood boards. Book a free consultation.`
- **H1:** Interior Designer in Powai

| Section | Content | Words |
|---|---|---|
| Intro | Powai housing stock: Hiranandani Gardens high-rises, larger 2/3BHKs, tenant and owner mix | 150 |
| Homes we design in Powai | Typical layouts and sizes; common problems (e.g. long corridors, deep balconies) | 250 |
| Powai project spotlight | 1 real case study: before/after, 2D plan, 3D render, final photo | 250 |
| Services for Powai homes | 3 services, short, linking to the Mumbai service × city pages | 150 |
| Indicative budget for Powai flats | Small table, linking to the Mumbai cost guide | 100 |
| Nearby areas we serve | Links: Andheri East, Vikhroli, Ghatkopar, Chandivali | 50 |
| FAQs (3–4, Powai-specific) | "Do you design rental flats in Powai for expat tenants?" | 250 |
| CTA | Free layout review for Powai homes | 50 |

> **Uniqueness rule:** At least **60% of every locality page must be unique**: local housing types, a local project, local FAQs, local photos. Don't swap the locality name into a shared template. That is a doorway page and gets filtered.

### 4.3 Service × city template (1,200–1,800 words)

**Example: `/interior-designer-mumbai/2bhk-interior-design`**

- **Title:** `2BHK Interior Design in Mumbai | Layouts, 3D & Cost | 2BHK Interiors`
- **H1:** 2BHK Interior Design in Mumbai
- Sections: typical Mumbai 2BHK sizes (550–850 sq ft carpet) → 3 layout types you see most often, with 2D plans → room-by-room ideas (living, kitchen, master, kids/guest, balcony) → storage strategy → 3 styles with mood boards → cost breakdown → timeline → 2BHK projects gallery (filtered to Mumbai) → FAQs → CTA.

### 4.4 Tier 2 remote city hub (1,500–2,000 words)

**Example: `/online-interior-design-pune`**

- **Title:** `Online Interior Design for Pune Homes | 2D, 3D & Mood Boards`
- **H1:** Online Interior Design for Pune Apartments
- Sections: how remote design works (video consultation → you share the floor plan and photos → mood board → 2D → 3D → an execution-ready file pack your Pune contractor can build from) → what you get (deliverables list) → Pune housing context (IT-corridor gated societies, 2BHK sizes) → pricing for remote design → "Can you recommend contractors in Pune?" → projects for Pune clients (once available) → FAQs → CTA.
- **Secondary targets:** interior designer in Pune, 3D interior design Pune, 2BHK interior design Pune.

### 4.5 Case study template (supports every city page)

`/portfolio/{slug}`, e.g. `/portfolio/2bhk-powai-hiranandani-minimal`
- H1: "{Style} 2BHK in {Locality}, {City}"
- Facts box: city, locality, BHK, carpet area, duration, services used, budget band
- Brief → the problem → 2D plan → mood board → 3D render → final photos (side-by-side with the render to show "what you approve is what you get") → client quote
- Links to the locality page and the service × city page

The current portfolio has 3 projects (Linden House, Urban Dwelling, Casa Serene) with no location. **Add the city and locality to each one now** and give each its own case-study URL.

---

## 5. Supporting blog content (clusters that feed city pages)

Each post links to one money page. Publish **2 posts a week** at the start.

### Cluster A: Cost guides (highest traffic, best for links)
| Post | Links to |
|---|---|
| 2BHK Interior Design Cost in Mumbai (2026 Guide) | Mumbai 2BHK page |
| 1BHK Interior Cost in Mumbai: Realistic Budgets | Mumbai 1BHK page |
| 3BHK Interior Cost in Mumbai | Mumbai 3BHK page |
| Interior Design Cost per Sq Ft in Thane / Navi Mumbai | Thane / Navi Mumbai hubs |
| 2BHK Interior Cost in Pune / Bengaluru / Hyderabad | Tier 2 hubs |
| How Much Does 3D Interior Visualization Cost in India? | 3D service page |
| Interior Designer Fees in Mumbai: Per Sq Ft vs Lump Sum vs Percentage | Mumbai hub |

### Cluster B: Mumbai living (local relevance signals)
- Monsoon-Proof Interiors: Materials That Survive Mumbai Humidity
- Society NOC & Renovation Rules in Mumbai Housing Societies: A Checklist
- Redevelopment Flat Interiors: What to Do Before You Move Back
- New Flat Possession Checklist for Thane & Navi Mumbai Buyers
- Space-Saving Ideas for Small Mumbai 1BHKs (450 sq ft and under)
- Designing a Mumbai Flat for Rent: Durable, Neutral, High-Yield Interiors

### Cluster C: Layout and BHK guides (uses the 2D-planning strength)
- 2BHK Layout Ideas for 650 sq ft Flats (with floor plans)
- Vastu-Compliant 2BHK Layout: Room-by-Room Guide
- Open Kitchen vs Closed Kitchen in Indian Apartments
- How to Read Your Builder's Floor Plan Before Possession
- 2BHK for a Family of Four: Kids' Room + Work-From-Home Corner

### Cluster D: Process and education (supports service pages, already on-brand)
- What Is a Mood Board in Interior Design? (expand the existing FAQ into a full guide)
- 2D vs 3D Interior Design: Do You Need Both?
- How Online Interior Design Works (for Pune/Bengaluru/NRI clients)
- Design-Only vs Turnkey Interior Firms: Which Is Right for You?

### Cluster E: NRI
- How NRIs Can Design Their Mumbai Flat Without Flying Home
- Managing Interior Work in India from Dubai/UK/US: A Step-by-Step Guide

---

## 6. Six-month calendar

Cadence: **about 3 location/service pages + 2 blog posts per week** once the technical setup is done.

| Phase | Weeks | Deliverables |
|---|---|---|
| **Month 0: Foundation** | 1–2 | Real routing + prerender/SSR; per-page meta; JSON-LD; real NAP; City field in the consultation form; GA4 + Search Console; **Google Business Profile** (category: *Interior designer*; add services and service areas for Mumbai localities); rewrite the home title and meta |
| **Month 1: Mumbai core** | 3–6 | Mumbai hub · 5 Wave 1 locality pages · Mumbai 2BHK page · 3 portfolio case studies with locations · Blogs: 2BHK cost Mumbai, monsoon materials, society NOC, mood board guide · `/locations` index |
| **Month 2: Mumbai depth** | 7–10 | Thane hub + 3 Thane localities · Mumbai 1BHK, 3BHK, 3D design, modular kitchen pages · Wave 2 localities 7–10 · Blogs: 1BHK cost, possession checklist, 650 sq ft layouts, Vastu 2BHK |
| **Month 3: MMR + buildings** | 11–14 | Navi Mumbai hub + 4 localities · Wave 2 localities 11–15 · first 4 building pages · Blogs: redevelopment, rental flats, designer fees |
| **Month 4: Pune + NRI** | 15–18 | Pune hub + Pune 2BHK + Pune 3D · NRI page · Mira Road, Kalyan-Dombivli hubs · 4 building pages · Blogs: Pune cost, online design guide, NRI guide |
| **Month 5: Bengaluru + Hyderabad** | 19–22 | Both hubs + 2BHK + 3D pages for each · Vasai-Virar hub · 4 building pages · Blogs: Bengaluru/Hyderabad cost guides |
| **Month 6: NCR + review** | 23–26 | Gurugram + Noida hubs · **Content review:** update pages ranking 8–20, add FAQs from GSC queries, merge or remove pages with 0 impressions · plan Ahmedabad/Chennai |

**About 85 location/service pages and 45 blog posts in 6 months.**

---

## 7. On-page and schema checklist (every city page)

- [ ] Unique title with {service/keyword} + {city/locality} + brand, ≤60 chars
- [ ] Unique meta description with a CTA, ≤155 chars
- [ ] One H1 with the primary keyword; H2s cover the secondary keywords naturally
- [ ] City/locality in the URL, H1, first 100 words, one H2, and image alt text
- [ ] At least 1 real project photo from that city or locality (compressed WebP, descriptive filename like `2bhk-living-room-powai.webp`)
- [ ] Embedded Google Map (Mumbai pages only)
- [ ] Breadcrumbs: Home › Interior Designer Mumbai › Powai
- [ ] 3–8 page-specific FAQs
- [ ] Links up, across and down per the rules in 1.3
- [ ] Self-referencing canonical; added to `sitemap.xml` (generate it from the route list in `sitemap.ts`, which already exists)

**JSON-LD for the Mumbai pages** (fill in real values):
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "additionalType": "https://en.wikipedia.org/wiki/Interior_design",
  "name": "2BHK Interiors",
  "url": "https://2bhkinteriors.com/interior-designer-mumbai",
  "image": "https://2bhkinteriors.com/images/home_hero_bg.jpg",
  "telephone": "+91-XXXXXXXXXX",
  "email": "hello@2bhkinteriors.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "REAL STREET ADDRESS",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "4000XX",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0, "longitude": 0 },
  "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Powai", "Bandra", "Andheri"],
  "sameAs": ["https://instagram.com/2bhkinteriors"],
  "priceRange": "₹₹"
}
```

**Tier 2 (remote) pages:** use `Service` schema with `"provider": {"@id": "...#business"}` and `"areaServed": {"@type": "City", "name": "Pune"}`. **Don't** add a `PostalAddress` for Pune.

Every page with FAQs also gets `FAQPage`; every deep page gets `BreadcrumbList`.

---

## 8. Off-page and local signals (needed to rank city by city)

### Google Business Profile (Mumbai)
- Primary category: **Interior designer**. Secondary: *Interior architect firm* (only if accurate).
- Service area: list the Mumbai localities and MMR cities from section 3.
- Services: 2D floor plan design, 3D visualization, mood boards, 1/2/3BHK interior design.
- **One post a week:** a project photo with the locality in the caption ("Completed: 2BHK in Powai").
- Upload 5–10 geotagged project photos a month.
- **Reviews:** ask every client and suggest they mention their **locality and BHK type**, e.g. "They designed our 2BHK in Thane…". Reply to every review.
- Seed the Q&A section with your real FAQs.

### Citations (same NAP everywhere)
Justdial, Sulekha, Houzz (India), Bing Places, Apple Business Connect, Facebook, LinkedIn company page, Pinterest business (good for interior design traffic), IndiaMART (optional).

### Local links and mentions
- Housing-society newsletters and WhatsApp communities: offer a free "new possession layout review" for a building.
- Real-estate brokers and channel partners in Thane, Powai and Navi Mumbai: referral partnerships plus a link from their site.
- Guest posts on Mumbai real-estate and home blogs (cost guides and the NOC checklist are easy to pitch).
- Submit projects to Indian design publications and directories.
- Instagram/YouTube: Reels of the 3D → real transformation, geotagged, linking to the matching locality page.

---

## 9. Measurement

| What | Tool | Target (6 months) |
|---|---|---|
| Impressions/clicks per city folder (`/interior-designer-mumbai/*`, `/online-interior-design-pune/*`) | Search Console, page filter | Steady month-on-month growth per folder |
| Rankings for the core term in each city and locality | Rank tracker set per city (e.g. Ahrefs, Semrush, SERPRobot) | Mumbai localities: top 10 for "interior designer in {locality}" on 50% of Wave 1 |
| Local pack visibility | GBP Insights + a local grid tool (e.g. Local Falcon) | Top 3 in the local pack within ~2 km of the studio |
| Leads by city | GA4 event `generate_lead` with a `city` parameter (from the new form field) | Measurable leads from at least 3 cities |
| Building pages | GSC queries containing project names | 1+ lead per 5 building pages |

**Monthly review routine:** In GSC, export queries per city folder. For queries ranking 8–20, add an FAQ or H2 on the matching page. For queries that mention a locality with no page yet, add that locality to the next wave.

---

## 10. Quality guardrails

1. **Don't create near-duplicate city pages.** Each one needs local photos, local housing context and local FAQs.
2. **Don't invent anything:** no fake addresses, no GBP listings in cities without an office, no invented reviews or projects.
3. **Use real prices.** Base the cost tables on your own quotes and update them every year (include the year in the title: "2026").
4. **Real photos beat stock.** Use your own renders and site photos with descriptive alt text.
5. **Show expertise and who wrote it.** Author box with the founder's name, credentials and years in practice on every blog post (the About page already has founder content to reuse).
6. **Publish fewer, better pages** rather than more, thinner ones. Hold back a page until it can meet the uniqueness rule.
