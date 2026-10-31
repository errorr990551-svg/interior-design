// Rooms from the studio's portfolio deck (public/pptt.pdf). Every image is a 3D visualisation
// extracted from that deck, and every description only states what can be seen in the renders.
const img = (file, w, h, alt) => ({ src: `/images/portfolio/${file}`, width: w, height: h, alt });

export const PORTFOLIO_ROOMS = [
  {
    id: 'sage-bedroom',
    title: 'Sage and oak bedroom',
    room: 'Bedroom',
    summary:
      'A calm bedroom built on two colours: soft sage and light oak. The bed sits on a low oak platform that wraps into a curved bedside shelf, and a full wall of wardrobes repeats the same split, sage shutters above and oak below, so the storage reads as part of the room rather than a block against one wall.',
    notes: [
      'Floor-to-ceiling wardrobe with long vertical pulls, two-tone sage and oak',
      'Arched mirror set into a botanical-wallpaper niche, with a floating dresser shelf',
      'Pendant light beside the bed instead of a table lamp, freeing up the bedside',
      'Fluted wall panel and sculpted round wall accents behind the bed',
    ],
    images: [
      img('p01-1.jpg', 960, 540, 'Bedroom with low oak platform bed, sage green wall and arched mirror niche'),
      img('p01-2.jpg', 859, 616, 'Side view of the sage bedroom showing the curved bedside shelf and pendant light'),
      img('p02-1.jpg', 815, 673, 'Sage bedroom with full-height two-tone wardrobe along one wall'),
      img('p02-2.jpg', 1028, 612, 'Two-tone wardrobe with sage upper shutters, oak lower shutters and long vertical handles'),
    ],
  },
  {
    id: 'walnut-cove-bedroom',
    title: 'Walnut cove bedroom',
    room: 'Master bedroom',
    summary:
      'A warmer, more classic master bedroom. A dark walnut-toned cove frames the ceiling around the fan, and the same dark wood returns in slim vertical trims, the door and a dressing unit, tying the room together against light marble-look wall panels.',
    notes: [
      'Ceiling cove in dark wood around a wooden ceiling fan',
      'Cane-back bed with an upholstered bench at its foot',
      'Dressing table with a round mirror and stool, tucked beside the door',
      'Marble-look feature panels edged with thin dark wood strips',
    ],
    images: [
      img('p03-1.jpg', 853, 651, 'Master bedroom with cane headboard bed, bench and dark wood ceiling cove'),
      img('p03-2.jpg', 881, 639, 'Bed wall with marble-look panels and dark wood vertical trims'),
      img('p04-2.jpg', 1030, 689, 'Opposite wall with dark wood door and compact dressing table with round mirror'),
    ],
  },
  {
    id: 'study-window-seat',
    title: 'Study room with window seat',
    room: 'Study / kids’ room',
    summary:
      'A shared study planned around the window. A cushioned window seat with storage below runs under the glazing, a twin desk gives two people their own workspace, and the wardrobe shutters carry a blue leaf print that echoes the wallpaper strips beside the windows.',
    notes: [
      'Window seat with drawers and open storage underneath',
      'Twin study desk with two chairs and a side storage unit',
      'Wardrobe with printed shutters matching the wallpaper beside the window',
      'White beam detail across the ceiling',
    ],
    images: [
      img('p05-1.jpg', 1002, 635, 'Study room with printed wardrobe shutters and a cushioned window seat'),
      img('p05-2.jpg', 914, 648, 'Twin study desk with two chairs and wall panel behind'),
      img('p06-1.jpg', 1008, 648, 'Window seat with blue cushion and storage below, next to the printed wardrobe'),
      img('p06-2.jpg', 701, 648, 'View along the study room from the desk towards the window seat'),
    ],
  },
  {
    id: 'beam-ceiling-living',
    title: 'Living room with timber beam ceiling',
    room: 'Living room',
    summary:
      'A long, light living room given character overhead: a grid of dark timber-look beams runs the length of the ceiling. Below it everything stays pale, with a low L-shaped sofa, a built-in seat along the windows and an arched niche framing the TV unit.',
    notes: [
      'Coffered grid of dark beams across the whole ceiling',
      'Built-in window seat with storage, running the width of the room',
      'Arched recess behind a low, wall-hung TV unit',
      'Padded wall panel and sculpted wall relief behind the sofa',
    ],
    images: [
      img('p07-1.jpg', 1094, 630, 'Living room with low L-shaped sofa under a dark coffered beam ceiling'),
      img('p07-2.jpg', 932, 540, 'TV wall with arched niche, low TV unit and window seat with sheer curtains'),
      img('p08-1.jpg', 915, 540, 'View down the length of the living room showing the beam ceiling and window seat'),
    ],
  },
  {
    id: 'grey-panel-suite',
    title: 'Bedroom suite with lounge corner',
    room: 'Master bedroom',
    summary:
      'A larger bedroom treated as a suite. Grey moulded wall panels and a tall stone-look panel give the bed wall weight, while the other end becomes a lounge with two armchairs, a rug and a wall-mounted TV over a long low unit.',
    notes: [
      'Moulded grey wall panelling behind a light wood bed',
      'Tall grey stone-look panel as a vertical accent',
      'Seating corner with two armchairs and a side table',
      'Long low TV unit with a slatted wood feature strip beside it',
    ],
    images: [
      img('p09-1.jpg', 1152, 648, 'Bedroom with grey moulded wall panels, light wood bed and lounge chair'),
      img('p09-2.jpg', 960, 540, 'Lounge end of the bedroom with armchairs, rug and wall-mounted TV'),
      img('p10-1.jpg', 1152, 648, 'Bed with grey panelled wall and stone-look tall panel beside the TV unit'),
      img('p10-2.jpg', 1152, 648, 'Bedroom view towards the slatted wood strip and TV unit'),
    ],
  },
  {
    id: 'dining-room',
    title: 'Dining room with mirror wall',
    room: 'Dining room',
    summary:
      'A formal dining room built around a long table. The longest wall carries a panel of mirrors cut into rounded arches, flanked by black wall lights, which bounces light around the room. A gallery of black-and-white frames, a long tufted bench and a wood sideboard complete it.',
    notes: [
      'Long dining table with upholstered curved-back chairs',
      'Feature wall of arch-cut mirror panels with wall sconces',
      'Gallery wall of black-and-white framed prints',
      'Wood sideboard and a long tufted bench along the wall',
    ],
    images: [
      img('p11-1.jpg', 960, 540, 'Dining room with long table, arched mirror panels and sideboard'),
      img('p11-2.jpg', 1152, 648, 'Dining room with long tufted bench, wall lights and patterned floor'),
      img('p12-1.jpg', 960, 540, 'Close view of the dining table set in front of the arch-cut mirror wall'),
      img('p12-2.jpg', 1152, 648, 'Dining room with gallery wall of black and white frames'),
    ],
  },
  {
    id: 'bedroom-with-study',
    title: 'Bedroom with work-from-home desk',
    room: 'Bedroom',
    summary:
      'A bedroom that also works as an office. A black fluted headboard wall anchors the bed, and a slim wall-mounted desk with floating shelves above runs along the side wall, so the workspace takes no floor area.',
    notes: [
      'Black fluted wall panel behind the bed with matching side tables',
      'Wall-mounted desk with floating shelves and a task lamp',
      'TV unit on the opposite wall, plus a low wood console',
      'Textured wallpaper and botanical prints for a lighter side wall',
    ],
    images: [
      img('p13-1.jpg', 1152, 648, 'Bedroom with black fluted headboard wall and a wall-mounted study desk'),
      img('p13-2.jpg', 1152, 648, 'Wall-mounted desk with floating shelves and the TV wall of the bedroom'),
      img('p14-1.jpg', 1152, 648, 'Bed and TV unit with dark slatted panel and wood door'),
    ],
  },
  {
    id: 'herringbone-living',
    title: 'Living room with herringbone feature',
    room: 'Living room',
    summary:
      'A modern living room mixing textures. A tall herringbone wood panel and a concrete-grey wall frame the TV, while white sofas, two oval coffee tables and a cluster of round mirrors keep the seating side bright.',
    notes: [
      'Herringbone wood panel beside a concrete-finish grey wall',
      'White sectional sofa with a curved accent chair',
      'Wall decor of overlapping round mirrors and a large framed map',
      'Vertical blinds on the full-height windows',
    ],
    images: [
      img('p15-1.jpg', 1152, 648, 'Living room with herringbone wood panel, grey wall and white sectional sofa'),
      img('p15-2.jpg', 1344, 756, 'Seating area with curved white sofa, oval coffee tables and round mirror wall decor'),
      img('p16-1.jpg', 1152, 648, 'View across the living room towards the herringbone feature and TV'),
      img('p16-2.jpg', 960, 540, 'Living room with black door, accent chair and padded wall panel'),
      img('p17-2.jpg', 1152, 648, 'Corner sofa under a framed map with vertical blinds on the windows'),
    ],
  },
];
