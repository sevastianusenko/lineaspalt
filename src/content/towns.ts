import legacy from "./legacy-cities.json";
import type { Faq } from "./services";

export type Town = {
  slug: string;
  path: string;
  name: string;
  area: string;
  corridor: string;
  tier: "core" | "extended";
  photo: string;
  intro: string[];
  about: string[];
  props: [string, string][];
  nearby: string[];
  extraFaq?: Faq;
};

type L = { intro: string[]; props: [string, string][]; about: string[]; nearby: string[] };
const lg = legacy as unknown as Record<string, L>;

export const towns: Town[] = [
  // ---------- Existing WordPress pages, URLs preserved ----------
  {
    slug: "new-holland",
    path: "/asphalt-new-holland-pa/",
    name: "New Holland",
    area: "Earl Township",
    corridor: "Route 23",
    tier: "core",
    photo: "loading-dock-lot-asphalt",
    ...lg["new-holland"],
    about: [
      lg["new-holland"].about[0],
      lg["new-holland"].about[1],
      "We come to New Holland and Earl Township regularly. Call us and we will walk the property with you, tell you what it needs, and put the price in writing before any work starts.",
    ],
    extraFaq: {
      q: "Do you handle large industrial lot repairs in New Holland?",
      a: "Yes. We work on industrial and manufacturing lots with pothole patching, surface repair, sealcoating and striping. We can work early mornings or weekends so an active property does not have to stop for a day.",
    },
  },
  {
    slug: "quarryville",
    path: "/asphalt-quarryville-pa/",
    name: "Quarryville",
    area: "Providence Township",
    corridor: "Route 222",
    tier: "core",
    photo: "driveway-sealcoat-long-ranch",
    ...lg["quarryville"],
    about: [
      lg["quarryville"].about[0],
      lg["quarryville"].about[1],
      "Quarryville is a longer drive from some contractors, and properties down here can wait years between visits. We make the trip, look at the surface, and give you a written plan with prices.",
    ],
  },
  {
    slug: "denver",
    path: "/asphalt-denver-pa/",
    name: "Denver",
    area: "West Cocalico Township",
    corridor: "Route 272",
    tier: "core",
    photo: "driveway-sealcoat-long-evergreens",
    ...lg["denver"],
    about: [
      lg["denver"].about[0],
      lg["denver"].about[1],
      "We come up to Denver and West Cocalico Township regularly. If you are waiting on a callback from someone else, call us. We will walk the property and give you a written quote.",
    ],
  },
  {
    slug: "mount-joy",
    path: "/sealcoating-striping-and-repair-in-mount-joy-pa/",
    name: "Mount Joy",
    area: "Rapho Township",
    corridor: "Route 230",
    tier: "core",
    photo: "driveway-sealcoat-wide-apron",
    ...lg["mount-joy"],
    about: [
      lg["mount-joy"].about[0],
      lg["mount-joy"].about[1],
      "We work in Mount Joy for homeowners, HOAs and businesses. Call us, we come out, we tell you what the surface needs, and we put a price in writing.",
    ],
    extraFaq: {
      q: "How do I know if I need a patch or a full repave?",
      a: "If potholes are isolated and the rest of the surface is solid, patching is almost always the right move. If more than about a third of the surface is damaged or the cracking is widespread, replacement deserves a look. We give you an honest read on the visit.",
    },
  },
  {
    slug: "leola",
    path: "/sealcoating-striping-and-repair-in-leola-pa/",
    name: "Leola",
    area: "Upper Leacock Township",
    corridor: "Route 23",
    tier: "core",
    photo: "driveway-sealcoat-small-home",
    ...lg["leola"],
    about: [
      lg["leola"].about[0],
      lg["leola"].about[1],
      "Whether it is a homeowner on a side street or a property manager with several lots, we handle both. Estimates are free and the price is in writing before we start.",
    ],
  },
  {
    slug: "gap",
    path: "/asphalt-sealcoating-striping-repair-in-gap-pa/",
    name: "Gap",
    area: "Salisbury Township",
    corridor: "Route 30",
    tier: "core",
    photo: "driveway-sealcoat-caution-tape",
    ...lg["gap"],
    about: [
      lg["gap"].about[0],
      lg["gap"].about[1],
      "We come to Gap and the surrounding townships regularly. Call us, we will look at the property, and you get a straight quote in writing.",
    ],
  },
  {
    slug: "strasburg",
    path: "/asphalt-strasburg-pa/",
    name: "Strasburg",
    area: "Strasburg Borough",
    corridor: "Route 741",
    tier: "core",
    photo: "driveway-sealcoat-curved-apron",
    intro: [
      "Strasburg is home base for us, and we know its streets well. The borough has historic homes, small shops, and a steady flow of visitors drawn to the railroad and the surrounding countryside. That mix means a lot of different asphalt: tight residential driveways, small commercial lots, church lots, and tourist businesses where a worn, faded lot is the first thing a visitor sees.",
      "We take care of sealcoating, crack filling, pothole repair and line striping in Strasburg and the surrounding townships. If a lot needs everything, we plan the work in order so it is done once and done right.",
      "Call or send a message and we will schedule a free on-site estimate, usually within a few days.",
    ],
    about: [
      "Strasburg sits in the southeast part of Lancaster County, along Route 741 and near Route 896. It is one of the most visited small towns in the county, and a lot of the commercial properties around it depend on first impressions.",
      "That means lots that look good and are clearly marked matter more here than in many places. We are happy to stripe and seal on early mornings and off hours so businesses do not lose a day.",
      "Homeowners in Strasburg and the surrounding townships can expect the same attention as commercial customers. Winters in this part of the county are hard on driveways, and a few hours of work before the first freeze saves repairs in spring.",
    ],
    props: [
      ["Homeowners", "Residential driveways in Strasburg Borough and the surrounding townships. Sealing, patching and edge repair."],
      ["Tourism and retail", "Lots that welcome visitors need clear markings, ADA compliance and a clean surface."],
      ["Churches and schools", "Congregation and school lots with stalls, fire lanes and accessible markings that meet code."],
      ["Farms and rural properties", "Driveways and access roads on farms and rural properties in the area."],
      ["HOAs and rentals", "Shared driveways, community lots and rental properties. We work with property managers."],
      ["Small commercial", "Offices, shops and contractors with small lots that need regular care."],
    ],
    nearby: ["Ronks", "Paradise", "Gap", "Willow Street", "Quarryville", "Bird-in-Hand", "Lancaster"],
  },

  // ---------- New town pages ----------
  {
    slug: "lancaster",
    path: "/service-areas/lancaster-pa/",
    name: "Lancaster",
    area: "Lancaster City and Manheim Township",
    corridor: "Route 30",
    tier: "core",
    photo: "retail-lot-restriped-blue-ada",
    intro: [
      "Lancaster is the commercial center of the county, and its asphalt reflects that. Office parks, shopping centers, medical buildings, churches, and a mix of downtown and suburban properties all need regular maintenance and clear markings. City lots tend to be smaller and tighter than the big box lots out on the highways, and a precise layout matters.",
      "We handle sealcoating, crack filling, pothole repair and line striping across Lancaster City and the surrounding townships, including Manheim Township, East Hempfield and Lancaster Township. We work evenings and weekends so that your business is not disrupted.",
      "Call or send a message and we will schedule a free on-site estimate.",
    ],
    about: [
      "Lancaster is the county seat, and its roads carry heavy traffic all week. Parking lots on busy corridors wear out their lines and their sealer faster than a quiet residential lot, so commercial properties often need a yearly plan.",
      "In the city itself, many lots are small, irregular and share space with neighbors. Careful layout matters because every stall counts, and ADA stalls have to fit the space available.",
      "Whether you manage a single building or several sites around Lancaster, we can help you put a maintenance plan in place, in the right order, so each step protects the next.",
    ],
    props: [
      ["Office and medical", "Professional buildings need accessible stalls, clear wayfinding and a clean look."],
      ["Retail and restaurants", "High-traffic lots that need crisp lines, fire lanes and night or weekend scheduling."],
      ["Churches and schools", "Large lots with weekly crowds, accessible stalls and drop-off lanes."],
      ["Apartments and HOAs", "Numbered stalls, visitor parking, fire lanes and sealcoating for multi-unit properties."],
      ["Homeowners", "Residential driveways in the city and suburbs, from small rowhouse lots to long suburban drives."],
      ["Industrial and flex space", "Dock aprons, truck courts and warehouse floors that need durable marking."],
    ],
    nearby: ["Manheim Township", "East Petersburg", "Willow Street", "Millersville", "Leola", "Lititz", "Landisville", "Mountville"],
  },
  {
    slug: "lititz",
    path: "/service-areas/lititz-pa/",
    name: "Lititz",
    area: "Warwick Township",
    corridor: "Route 501",
    tier: "core",
    photo: "church-lot-white-stalls-drain",
    intro: [
      "Lititz is a borough with a well-kept historic center and plenty of busy commercial property around it, especially along Route 501. Homes here are well maintained, and so are the businesses. A cracked or faded lot stands out.",
      "We seal, fill, patch and stripe in Lititz and Warwick Township. For commercial properties we schedule evenings or weekends. For homeowners, we usually finish in a single day.",
      "Free estimates are available, and we usually come out within a few days of your call.",
    ],
    about: [
      "Lititz has a lot of small businesses, restaurants and professional offices with compact lots. For those, a neat re-stripe and clean ADA stalls make a big difference in how the property looks.",
      "The surrounding area is also made up of residential neighborhoods with driveways that benefit from sealcoating and crack filling every few years, and a few larger commercial and industrial properties along the main roads.",
      "We recommend filling cracks in fall and sealcoating in warmer months, then re-striping after the sealer has cured.",
    ],
    props: [
      ["Main Street and downtown", "Small commercial lots and parking areas with tight layouts."],
      ["Route 501 businesses", "Retail, service and office lots along the main corridor."],
      ["Homeowners", "Residential driveways in the borough and surrounding neighborhoods."],
      ["Churches and schools", "Lots with weekly crowds and accessible stall requirements."],
      ["HOAs and communities", "Shared drives and community lots that need coordinated maintenance."],
      ["Industrial and flex", "Warehouses and light industrial lots around the borough."],
    ],
    nearby: ["Manheim", "Ephrata", "East Petersburg", "Rothsville", "Brownstown", "Lancaster", "Akron"],
  },
  {
    slug: "ephrata",
    path: "/service-areas/ephrata-pa/",
    name: "Ephrata",
    area: "Ephrata Township and Borough",
    corridor: "Route 322",
    tier: "core",
    photo: "restriped-lot-shadow-white-lines",
    intro: [
      "Ephrata is one of the busier commercial towns in the northern half of the county, with retail along Route 322 and Route 272, a lively main street, many churches, and a mix of manufacturing and distribution properties.",
      "We work in Ephrata Borough, Ephrata Township and the surrounding area. We handle sealcoating, crack filling, pothole repair and line striping for both homeowners and businesses.",
      "Call or send a message and we will schedule a free estimate.",
    ],
    about: [
      "Because Ephrata is a regional shopping and service hub, parking lots here see steady traffic. Lines wear faster, ADA stalls need to stay legible, and sealer takes a beating from tires and snow removal.",
      "In the residential neighborhoods, the story is simpler. Driveways that go three or four years between seals tend to show wear, and crack filling in fall prevents most spring repairs.",
      "Ephrata has many large church and school lots. We can restripe them during weekdays when they are empty, or evenings and weekends when it suits the congregation.",
    ],
    props: [
      ["Retail and restaurants", "Lots along Routes 322 and 272 with high traffic and heavy line wear."],
      ["Churches and schools", "Large lots that need clear layouts, ADA stalls and fire lanes."],
      ["Industrial and distribution", "Truck courts, dock aprons and warehouse floors."],
      ["Homeowners", "Residential driveways in town and out in the township."],
      ["Medical and office", "Professional lots with accessible stalls and clear wayfinding."],
      ["Apartments and HOAs", "Multi-unit properties that need numbered stalls and regular maintenance."],
    ],
    nearby: ["Akron", "Lititz", "Denver", "Brownstown", "Reinholds", "Stevens", "Adamstown", "New Holland"],
  },
  {
    slug: "manheim",
    path: "/service-areas/manheim-pa/",
    name: "Manheim",
    area: "Manheim Borough and Penn Township",
    corridor: "Route 72",
    tier: "core",
    photo: "church-lot-ada-hatched-stalls",
    intro: [
      "Manheim sits at the crossing of several well-traveled roads in northern Lancaster County, and a good deal of the commercial and industrial property around it is large. There are big lots, truck courts and dock aprons, as well as the usual mix of shops, churches and homes.",
      "We work in Manheim and Penn Township with sealcoating, crack filling, pothole repair and striping. For big lots we work in phases so operations can continue.",
      "Free on-site estimates are available, and we can usually come out within a few days.",
    ],
    about: [
      "Industrial and distribution properties in the area put a different kind of wear on pavement. Heavy trucks turn tight and sit still in the same spots, which is where patches and cracks tend to start.",
      "For those properties, we recommend a yearly crack fill, spot repair of any soft spots, and sealcoating every two to three years if the surface is in good shape.",
      "Residential driveways in the borough and the surrounding townships follow the usual pattern: crack fill in fall, sealcoat in warm weather, and re-check each spring.",
    ],
    props: [
      ["Industrial and distribution", "Truck courts, dock aprons and large lots with heavy daily traffic."],
      ["Retail and services", "Shops and restaurants along the main roads."],
      ["Churches and schools", "Lots that need clear layouts and accessible stalls."],
      ["Homeowners", "Driveways in the borough and township."],
      ["HOAs and communities", "Shared drives and community lots."],
      ["Farms and rural", "Farm drives and access roads."],
    ],
    nearby: ["Lititz", "Elizabethtown", "Mount Joy", "Rothsville", "East Petersburg", "Lancaster", "Penryn"],
  },
  {
    slug: "elizabethtown",
    path: "/service-areas/elizabethtown-pa/",
    name: "Elizabethtown",
    area: "Elizabethtown Borough and Mount Joy Township",
    corridor: "Route 230",
    tier: "core",
    photo: "retail-lot-yellow-stalls-ada-curb",
    intro: [
      "Elizabethtown has a college, a large retirement community, a busy borough center and plenty of commercial property along Route 230 and Route 743. That is a lot of parking, and plenty of accessible stalls to keep legible.",
      "We work in Elizabethtown and the surrounding townships, handling sealcoating, crack filling, pothole repair and striping. We schedule around academic calendars and business hours when we can.",
      "Contact us for a free estimate. We usually respond within a day.",
    ],
    about: [
      "Properties around a college and a retirement community often have more accessible stalls than the average lot, and they are used by people who need clear, well-marked spaces. We take ADA layout seriously and measure before painting.",
      "Commercial lots along the main routes see steady traffic and plowed snow, which wears lines faster. Sealing and re-striping on a regular schedule keeps those lots looking sharp.",
      "Homeowners in the borough and townships can expect the usual advice: fill cracks in fall, seal every three or four years.",
    ],
    props: [
      ["Education and campuses", "Student and visitor lots, accessible stalls, fire lanes and crosswalks."],
      ["Senior living", "Lots that need clear accessible stalls and safe pedestrian crossings."],
      ["Retail and services", "Route 230 and Route 743 businesses."],
      ["Churches", "Large lots with weekly crowds and accessible stalls."],
      ["Homeowners", "Residential driveways around the borough."],
      ["Industrial", "Warehouse and light industrial lots in the area."],
    ],
    nearby: ["Mount Joy", "Marietta", "Manheim", "Rheems", "Elizabethville", "Hershey", "Lancaster"],
  },
  {
    slug: "willow-street",
    path: "/service-areas/willow-street-pa/",
    name: "Willow Street",
    area: "West Lampeter Township",
    corridor: "Route 222",
    tier: "core",
    photo: "driveway-sealcoat-glossy-wet",
    intro: [
      "Willow Street is a residential and commercial community just south of Lancaster, where Route 222 and Route 272 meet. There is a mix of long suburban driveways, shopping plazas, medical offices and churches.",
      "We work in Willow Street and West Lampeter Township with sealcoating, crack filling, pothole repair and line striping. Homeowners get a free estimate and a written price. Businesses get scheduling that fits their hours.",
      "Contact us and we will set up a visit.",
    ],
    about: [
      "Many homes in this area have driveways that are long and wide, with turnarounds and parking pads. Those jobs are where our larger sealcoating tiers apply, and where crack filling pays for itself.",
      "Commercial lots along the main corridors need regular re-striping and ADA checks, and many of them benefit from a yearly maintenance plan.",
      "Southern Lancaster County winters are hard on asphalt, and a few hours of preparation in fall avoids most of the spring repair work.",
    ],
    props: [
      ["Homeowners", "Long suburban driveways and parking pads."],
      ["Shopping plazas", "Retail lots that need striping and sealing."],
      ["Medical and office", "Accessible stalls and clear wayfinding."],
      ["Churches and schools", "Large lots and drop-off lanes."],
      ["HOAs and communities", "Shared lots and drives."],
      ["Small commercial", "Offices and shops with small lots."],
    ],
    nearby: ["Lancaster", "Millersville", "Quarryville", "Strasburg", "Pequea", "Conestoga", "Lampeter"],
  },
  {
    slug: "millersville",
    path: "/service-areas/millersville-pa/",
    name: "Millersville",
    area: "Millersville Borough and Manor Township",
    corridor: "Route 999",
    tier: "core",
    photo: "driveway-sealcoat-small-home",
    intro: [
      "Millersville is a university town with older homes, rental properties and a busy borough center, surrounded by Manor Township neighborhoods and farmland. Its asphalt ranges from short rowhouse driveways to apartment lots and campus-area parking.",
      "We handle sealcoating, crack filling, pothole repair and striping for homeowners, landlords, property managers and businesses in Millersville and Manor Township.",
      "Call us for a free estimate and a written price.",
    ],
    about: [
      "Rental properties and apartment lots need numbered stalls, visitor parking and fire lanes, and they need to be repainted every year or two. We keep a property manager's schedule in mind and can combine several lots in a single visit.",
      "Homeowners in the surrounding neighborhoods generally need the same maintenance: fill cracks in fall, seal every three or four years.",
      "We can work with landlords to schedule work around lease changes or school calendars.",
    ],
    props: [
      ["Landlords and rentals", "Driveways, parking pads and small apartment lots."],
      ["Apartments", "Numbered stalls, visitor parking and fire lanes."],
      ["Homeowners", "Residential driveways in the borough and township."],
      ["Churches", "Lots with weekly crowds and accessible stalls."],
      ["Small commercial", "Shops, offices and restaurants."],
      ["Farms and rural", "Driveways and access roads in Manor Township."],
    ],
    nearby: ["Lancaster", "Willow Street", "Conestoga", "Washington Boro", "Safe Harbor", "Mountville"],
  },
  {
    slug: "akron",
    path: "/service-areas/akron-pa/",
    name: "Akron",
    area: "Akron Borough",
    corridor: "the Ephrata area",
    tier: "core",
    photo: "driveway-sealcoat-garden-edge",
    intro: [
      "Akron is a small borough in northern Lancaster County, close to Ephrata and Lititz. It is mostly residential, with a few commercial and church properties and the farms and light industry that surround it.",
      "We sealcoat, fill cracks, repair potholes and stripe in Akron and the surrounding area. Most homeowner jobs are done in a day.",
      "Call or send a message and we will schedule a free estimate.",
    ],
    about: [
      "A small borough tends to have older driveways that have been through a lot of winters. Those are the ones that benefit most from crack filling in fall and a fresh coat of sealer.",
      "Church and community lots around Akron often serve large crowds on a few days a week. We can paint them on a weekday when the lot is empty, and make sure the ADA stalls are correct.",
      "Small businesses in and around the borough can combine striping with sealcoating in a single visit so the lot is finished in one go.",
    ],
    props: [
      ["Homeowners", "Older driveways that need crack filling and sealing."],
      ["Churches", "Lots with weekly crowds and accessible stalls."],
      ["Small businesses", "Small lots that need clear stalls and a clean surface."],
      ["Farms and rural", "Farm drives and access roads."],
      ["HOAs", "Shared drives and community lots."],
      ["Light industrial", "Small industrial lots and loading areas."],
    ],
    nearby: ["Ephrata", "Lititz", "Brownstown", "Denver", "Reinholds", "Stevens", "Manheim"],
  },
  {
    slug: "columbia",
    path: "/service-areas/columbia-pa/",
    name: "Columbia",
    area: "Columbia Borough",
    corridor: "the Susquehanna riverfront",
    tier: "core",
    photo: "retail-lot-angled-yellow-stripes",
    intro: [
      "Columbia is a river town in the west of Lancaster County, with a historic center, older homes, small businesses and a number of industrial properties. Lots here are often tight, and many are irregular in shape.",
      "We handle sealcoating, crack filling, pothole repair and striping in Columbia and nearby communities. We are used to working in small spaces and around parked cars.",
      "Contact us for a free estimate.",
    ],
    about: [
      "Older boroughs have older pavement. In Columbia, we often see driveways and small lots that have not been sealed in years, and cracks that have been through many winters. Those need repair first, and sealcoating second.",
      "Small commercial lots benefit from careful layout. We measure the space and plan the stalls so you get the most legal parking, including the correct accessible stalls.",
      "Industrial properties along the river corridor and nearby roads need durable repair and clear markings, and we can work around shifts.",
    ],
    props: [
      ["Homeowners", "Older driveways and small lots."],
      ["Small commercial", "Tight lots that need careful layout."],
      ["Churches", "Lots that serve weekly crowds."],
      ["Industrial", "Truck courts and warehouse lots."],
      ["Landlords and rentals", "Small multi-unit lots."],
      ["Municipal", "Borough and community lots."],
    ],
    nearby: ["Marietta", "Mount Joy", "Mountville", "Landisville", "Elizabethtown", "Washington Boro", "Lancaster"],
  },
  {
    slug: "ronks",
    path: "/service-areas/ronks-pa/",
    name: "Ronks",
    area: "Paradise Township",
    corridor: "Route 340",
    tier: "core",
    photo: "driveway-sealcoat-caution-tape",
    intro: [
      "Ronks sits in the middle of the county's best-known farm and tourism area. The surrounding roads carry both local traffic and visitors, and the businesses here range from small shops to large attractions.",
      "We work in Ronks and Paradise Township, sealcoating, filling cracks, repairing potholes and striping lots and driveways for farms, businesses and homeowners.",
      "Call or send a message to set up a free estimate.",
    ],
    about: [
      "Tourist properties need clean, well-marked lots. Lines, fire lanes and ADA stalls need to be clear for visitors who do not know the property, and the surface should look good in photos and reviews.",
      "On farms and rural properties, driveways carry equipment as well as cars. Those drives need solid base repair and often fall into the larger driveway tier for sealcoating.",
      "Homeowners in the area get the same schedule as everywhere else: crack filling before winter and sealcoating every few years.",
    ],
    props: [
      ["Tourism and retail", "Lots for visitors that need clear markings and a clean surface."],
      ["Farms and rural", "Long driveways and access roads that carry equipment."],
      ["Homeowners", "Residential driveways in the area."],
      ["Churches", "Lots with weekly crowds and accessible stalls."],
      ["Small commercial", "Shops, restaurants and offices."],
      ["HOAs", "Shared drives and community lots."],
    ],
    nearby: ["Strasburg", "Bird-in-Hand", "Intercourse", "Paradise", "Gordonville", "Gap", "Leola"],
  },
  {
    slug: "bird-in-hand",
    path: "/service-areas/bird-in-hand-pa/",
    name: "Bird-in-Hand",
    area: "East Lampeter Township",
    corridor: "Route 340",
    tier: "core",
    photo: "driveway-sealcoat-orange-cones",
    intro: [
      "Bird-in-Hand is a small village on Route 340, with shops, restaurants, farm stands and lodging that welcome visitors, surrounded by farms and residential properties.",
      "We work in Bird-in-Hand and East Lampeter Township with sealcoating, crack filling, pothole repair and striping.",
      "Call us and we will set up a free on-site estimate.",
    ],
    about: [
      "A visitor-facing business needs lines that work for people who have never been there before. Clear stalls, marked fire lanes, accessible stalls and clear directional arrows help traffic move safely.",
      "Because the roads here carry steady traffic through the summer and fall, lots can be busy from morning to evening. We can schedule work for early morning or after closing.",
      "Homeowners and farms in the area benefit from yearly crack filling and sealcoating every three to four years.",
    ],
    props: [
      ["Tourism and retail", "Shops, restaurants and lodging with visitor parking."],
      ["Farms and rural", "Driveways and access roads."],
      ["Homeowners", "Residential driveways."],
      ["Churches", "Lots with weekly crowds."],
      ["Small commercial", "Offices and local businesses."],
      ["HOAs", "Shared drives and community lots."],
    ],
    nearby: ["Leola", "Intercourse", "Ronks", "Gordonville", "New Holland", "Smoketown", "Lancaster"],
  },
  {
    slug: "lebanon",
    path: "/service-areas/lebanon-pa/",
    name: "Lebanon",
    area: "Lebanon County",
    corridor: "Route 422",
    tier: "extended",
    photo: "empty-lot-night-white-stalls",
    intro: [
      "Lebanon is just across the county line from Lancaster County, and its commercial corridors, warehouses and shopping centers all rely on clear pavement markings. We travel to Lebanon for striping, sealcoating, crack filling and repair.",
      "For larger commercial and industrial jobs, the drive is worth it for both of us. A multi-day project such as re-striping a plaza or marking a warehouse floor makes good use of the crew's time.",
      "Contact us and we will talk through the work and travel.",
    ],
    about: [
      "Lebanon County has a lot of distribution and light industrial property, where striping, dock markings and truck court repair are common requests. We can mark aisles, fire lanes and loading zones as well as repair and seal the surface.",
      "Because Lebanon is at the edge of our regular service area, we prefer to combine small jobs into a single trip. If you have a smaller driveway job, ask us about scheduling it with others in the area.",
      "Call for a free estimate. For commercial work, we can often price from satellite view and photos.",
    ],
    props: [
      ["Retail and plazas", "Shopping center lots that need striping and ADA stalls."],
      ["Industrial", "Warehouse floors, truck courts and dock aprons."],
      ["Medical and office", "Accessible stalls and clear layouts."],
      ["Churches and schools", "Large lots."],
      ["Property managers", "Multi-site maintenance."],
      ["Homeowners", "Larger driveway jobs, scheduled in groups."],
    ],
    nearby: ["Palmyra", "Annville", "Myerstown", "Mount Joy", "Elizabethtown", "Hershey"],
  },
  {
    slug: "reading",
    path: "/service-areas/reading-pa/",
    name: "Reading",
    area: "Berks County",
    corridor: "Route 422",
    tier: "extended",
    photo: "church-lot-ada-spaces-wide",
    intro: [
      "Reading and the surrounding Berks County communities have plenty of commercial lots, warehouses and shopping centers that need striping and surface repair. We travel for larger commercial and industrial jobs.",
      "A re-stripe of a plaza, a new layout for an expanded lot, or marking a warehouse floor are all jobs that make the trip worthwhile.",
      "Send us the address and a few photos and we will talk through the work and price.",
    ],
    about: [
      "Berks County has a lot of distribution and light industrial property. We do striping for lots and floors, and repair and sealcoating for the pavement around them.",
      "Because Reading is farther from our base, we recommend bundling work. If a property needs crack filling, sealing and striping, it makes sense to do it in one planned visit.",
      "We are happy to quote from photos and satellite view for commercial jobs.",
    ],
    props: [
      ["Retail and plazas", "Shopping center lots."],
      ["Industrial", "Warehouse floors and dock aprons."],
      ["Medical and office", "Accessible stalls and layouts."],
      ["Churches and schools", "Large lots."],
      ["Property managers", "Multi-site maintenance."],
      ["Apartments", "Numbered stalls and fire lanes."],
    ],
    nearby: ["Denver", "Adamstown", "Wyomissing", "Shillington", "Sinking Spring", "Ephrata"],
  },
  {
    slug: "york",
    path: "/service-areas/york-pa/",
    name: "York",
    area: "York County",
    corridor: "Route 30",
    tier: "extended",
    photo: "lot-with-ada-hatching-aerial",
    intro: [
      "York sits just across the Susquehanna from Lancaster County, and its commercial lots, warehouses and shopping centers have the same needs as the ones on our side of the river. We travel to York for striping, sealcoating, crack filling and repair.",
      "Commercial jobs of any size are welcome, and larger projects make the trip an easy call.",
      "Contact us and we will talk through the work and the schedule.",
    ],
    about: [
      "York County has a lot of distribution, light industrial and retail property. We can stripe lots, mark warehouse floors, fill cracks and seal the surface.",
      "We try to combine jobs in the same area to make travel efficient, so if you have several sites we can plan one schedule.",
      "Send us the address and a few photos and we will give you an idea of price and timing.",
    ],
    props: [
      ["Retail and plazas", "Shopping center lots."],
      ["Industrial", "Warehouse floors and truck courts."],
      ["Medical and office", "Accessible stalls and layouts."],
      ["Churches and schools", "Large lots."],
      ["Property managers", "Multi-site maintenance."],
      ["Apartments", "Numbered stalls and fire lanes."],
    ],
    nearby: ["Columbia", "Wrightsville", "Red Lion", "Hellam", "Hanover", "Mount Joy"],
  },
];

export const townByPath = (path: string) => towns.find((t) => t.path === path);
export const townBySlug = (slug: string) => towns.find((t) => t.slug === slug);

export function townFaqs(t: Town): Faq[] {
  const faqs: Faq[] = [
    {
      q: `Do you work in ${t.name}, PA?`,
      a: `Yes. We provide sealcoating, crack filling, pothole repair and line striping in ${t.name} and ${t.area}. Call 717-808-1600 or send the contact form and we will set up a free on-site estimate.`,
    },
    {
      q: `How do I get a sealcoating price in ${t.name}?`,
      a: "It depends on the size and condition of the surface. We look at it, in person or from photos, and give you a free written price before any work starts.",
    },
    {
      q: `Can you repair potholes in ${t.name} in the winter?`,
      a: "Yes. Cold patch can hold a hole together through freeze and thaw, and we come back for a permanent hot mix repair when temperatures allow. We will tell you honestly which one your pavement needs.",
    },
    {
      q: `How often should I sealcoat in ${t.name}?`,
      a: "Every three to four years for most driveways, and every two to three years for busy commercial lots. Fill cracks every fall so water stays out.",
    },
    {
      q: `Do you stripe parking lots for businesses in ${t.name}?`,
      a: "Yes. We do re-striping and new layouts, ADA stalls, fire lanes, arrows and stencils, and we work around your hours with early morning, evening and weekend schedules.",
    },
    {
      q: `How quickly can you come out to ${t.name} for an estimate?`,
      a: "Usually within a few business days. Call or send the form and we respond within one business day to set a time.",
    },
  ];
  if (t.extraFaq) faqs.splice(3, 0, t.extraFaq);
  return faqs;
}
