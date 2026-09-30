export interface ApartmentUnit {
  id: string;
  name: string;
  type: "General" | "Premium";
  bedrooms: number;
  bathrooms: number;
  beds: string;
  baths: string;
  sqft: string;
  price: number;
  priceFormatted: string;
  status: "Available" | "Waitlist";
  coverImage: string;
  gallery: string[];
  desc: string;
  aboutText: string;
  storyTitle: string;
  storyDesc: string;
  amenities: {
    kitchen: string[];
    livingRoom: string[];
    bedroom: string[];
  };
  pricePerSqft: string;
  charges: { label: string; value: string }[];
}

export const APARTMENTS_DATA: ApartmentUnit[] = [
  {
    id: "d1",
    name: "Cosmos Valley",
    type: "General",
    bedrooms: 3,
    bathrooms: 2,
    beds: "3 Bed",
    baths: "2 Baths",
    sqft: "1,340",
    price: 61.65,
    priceFormatted: "61.65 L",
    status: "Available",
    coverImage: "/assets/cosmos-valley-cover.avif",
    gallery: [
      "/assets/cosmos-valley-cover.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b93_D1-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b90_D1-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b94_D1-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b91_D1-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb5_D1-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb4_D1-7.avif"
    ],
    desc: "A thoughtfully planned 4-bedroom residence offering generous natural light, expansive living spaces, and refined architecture tailored for modern families.",
    aboutText: "A thoughtfully planned 4-bedroom residence offering generous natural light, expansive living spaces, and refined architecture tailored for modern families.",
    storyTitle: "A harmonious layout for modern living",
    storyDesc: "D1 is designed for elevated family living, combining expansive private bedrooms with open shared spaces that make everyday routines feel comfortable and connected. High-specification interiors, cross-ventilation, and modern fittings create a seamless living experience in Siliguri.",
    amenities: {
      kitchen: ["Modular cabinets", "Granite counter", "Stainless sink", "Chimney & Hob space", "Exhaust point", "Utility balcony"],
      livingRoom: ["Expansive lounge", "Dining hall space", "Designer tile floor", "Wide balcony access"],
      bedroom: ["Spacious king suite", "Cross ventilation", "Attached toilet space", "Wardrobe niche", "High-speed optical point"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹4.32 L" },
      { label: "GST (5%, under construction)", value: "₹3.08 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹4,600 / sq ft"
  },
  {
    id: "d1-premium",
    name: "Green View",
    type: "Premium",
    bedrooms: 3,
    bathrooms: 3,
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,340",
    price: 72.40,
    priceFormatted: "72.40 L",
    status: "Available",
    coverImage: "/images/apartments/d1-premium/03_front_exterior_professional_eye_level_architectural_photograph_of_green_view.jpg",
    gallery: [
      "/images/apartments/d1-premium/03_front_exterior_professional_eye_level_architectural_photograph_of_green_view.jpg",
      "/images/apartments/d1-premium/06_living_room_interior_architectural_photograph_of_a_bright_spacious_modern.jpg",
      "/images/apartments/d1-premium/07_master_bedroom_high_end_interior_photograph_of_a_master_bedroom_in_green.jpg",
      "/images/apartments/d1-premium/08_second_bedroom_realistic_family_and_guest_bedroom_in_green_view_residency.jpg",
      "/images/apartments/d1-premium/09_modern_kitchen_architectural_interior_photo_of_a_premium_modular_kitchen.jpg",
      "/images/apartments/d1-premium/10_dining_area_sophisticated_open_plan_dining_space_in_green_view_residency.jpg",
      "/images/apartments/d1-premium/16_children_s_play_area_dedicated_children_s_play_park_within_the_green_view.jpg",
      "/images/apartments/d1-premium/17_clubhouse_community_space_upscale_community_lounge_and_clubhouse_interior_at.jpg",
      "/images/apartments/d1-premium/18_parking_area_clean_well_lit_covered_and_open_residential_parking_bay_at.jpg",
      "/images/apartments/d1-premium/19_blue_hour_exterior_twilight_blue_hour_architectural_photograph_of_green_view.jpg",
      "/images/apartments/d1-premium/20_premium_website_hero_image_spectacular_wide_angle_elevated_hero_photograph.jpg"
    ],
    desc: "An elevated 4-bedroom sanctuary featuring upgraded designer finishes, panoramic view vistas, and private suite layouts that redefine luxury living.",
    aboutText: "An elevated 4-bedroom sanctuary featuring upgraded designer finishes, panoramic view vistas, and private suite layouts that redefine luxury living.",
    storyTitle: "Bespoke finishes and panoramic views",
    storyDesc: "Green View elevates residential living with imported vitrified tile flooring, designer sanitary fixtures, and generous double-glazed windows. Enjoy expansive living areas, an Italian-inspired modular kitchen, and serene private balconies overlooking Siliguri's greenery.",
    amenities: {
      kitchen: ["Italian-finish modular units", "Quartz worktops", "Double stainless sink", "Piped gas provision", "Separate utility"],
      livingRoom: ["Double-aspect grand hall", "Recessed LED lighting", "Polished vitrified floors", "Panoramic deck"],
      bedroom: ["Master suite balcony", "En-suite bathroom", "Hardwood-style tiling", "Walk-in closet space"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹5.07 L" },
      { label: "GST (5%, under construction)", value: "₹3.62 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹5,400 / sq ft"
  },
  {
    id: "d2",
    name: "D2",
    type: "General",
    bedrooms: 4,
    bathrooms: 3,
    beds: "4 Bed",
    baths: "3 Baths",
    sqft: "1,685",
    price: 77.50,
    priceFormatted: "77.50 L",
    status: "Available",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193baf_D2-Gen.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9e_D2-1.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9d_D2-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9b_D2-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9a_D2-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9c_D2-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb9_D2-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb8_D2-7.avif"
    ],
    desc: "A stately 4-bedroom, 4-bath residence featuring grand double-aspect living zones, dedicated dining spaces, and generous private en-suites.",
    aboutText: "A stately 4-bedroom, 4-bath residence featuring grand double-aspect living zones, dedicated dining spaces, and generous private en-suites.",
    storyTitle: "Four private en-suite master retreats",
    storyDesc: "With 4 dedicated en-suite bathrooms, D2 guarantees absolute privacy and comfort for every family member. The expansive central living hall and formal dining room provide the ideal setting for entertaining guests and celebrating life’s milestones.",
    amenities: {
      kitchen: ["Double sink", "Polished granite counter", "Modular storage", "Separate service entry", "Utility balcony"],
      livingRoom: ["Grand drawing room", "Formal dining alcove", "Decorative false ceiling points", "Expansive picture windows"],
      bedroom: ["4 Private en-suite baths", "Dressing areas", "Anti-skid premium tiles", "Branded CP sanitary ware"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹5.42 L" },
      { label: "GST (5%, under construction)", value: "₹3.88 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹4,600 / sq ft"
  },
  {
    id: "d2-premium",
    name: "D2 Premium",
    type: "Premium",
    bedrooms: 4,
    bathrooms: 4,
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,685",
    price: 91.00,
    priceFormatted: "91.00 L",
    status: "Available",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb3_D2-Hero.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba9_D2-1.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bab_D2-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bac_D2-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bad_D2-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193baa_D2-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193bbf_D2-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bbe_D2-7.avif"
    ],
    desc: "The pinnacle of luxury living — an expansive 4-bedroom signature home with custom Italian-inspired fittings, bespoke joinery, and private balconies.",
    aboutText: "The pinnacle of luxury living — an expansive 4-bedroom signature home with custom Italian-inspired fittings, bespoke joinery, and private balconies.",
    storyTitle: "The ultimate signature luxury residence",
    storyDesc: "D2 Premium stands as our flagship 4-bedroom residence in Siliguri. Featuring four private master suites, Italian marble countertops, premium acoustic insulation, and expansive landscaped deck views, it exemplifies architectural distinction.",
    amenities: {
      kitchen: ["Quartz countertops", "Imported soft-close cabinetry", "Breakfast counter", "Dishwasher provision", "Heavy-duty exhaust"],
      livingRoom: ["Custom accent wall detailing", "Designer lighting channels", "Grand terrace deck", "Pendant chandelier fixture"],
      bedroom: ["En-suite luxury bath with glass partition", "Rain showerhead", "Walk-in wardrobe", "Sound-insulated glazing"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹6.37 L" },
      { label: "GST (5%, under construction)", value: "₹4.55 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹5,400 / sq ft"
  },
  {
    id: "c1",
    name: "C1",
    type: "General",
    bedrooms: 2,
    bathrooms: 2,
    beds: "2 Bed",
    baths: "2 Baths",
    sqft: "1,105",
    price: 50.85,
    priceFormatted: "50.85 L",
    status: "Waitlist",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb2_C1-Gen.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b95_C1-1.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b98_C1-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b96_C1-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b97_C1-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b99_C1-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb7_C1-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb6_C1-7.avif"
    ],
    desc: "A luminous 3-bedroom, 3-bath residence engineered for optimal ventilation, featuring a seamless open floor plan and serene personal retreats.",
    aboutText: "A luminous 3-bedroom, 3-bath residence engineered for optimal ventilation, featuring a seamless open floor plan and serene personal retreats.",
    storyTitle: "Balanced elegance with three en-suite bedrooms",
    storyDesc: "The C1 layout delivers an optimal 3-bedroom, 3-bathroom distribution with zero wasted space. Each bedroom serves as a personal sanctuary, while the central living and dining foyer creates a warm, sunlit gathering heart for the family.",
    amenities: {
      kitchen: ["Granite counter", "Stainless sink", "Modular overhead cabinets", "Exhaust chimney conduit"],
      livingRoom: ["Sunlit drawing room", "Dining space", "Ceramic tile flooring", "Balcony sit-out"],
      bedroom: ["3 Private baths", "Spacious room layout", "Ventilated windows", "Concealed copper wiring"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹3.56 L" },
      { label: "GST (5%, under construction)", value: "₹2.54 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹4,600 / sq ft"
  },
  {
    id: "c1-premium",
    name: "C1 Premium",
    type: "Premium",
    bedrooms: 2,
    bathrooms: 2,
    beds: "2 Bed",
    baths: "2 Baths",
    sqft: "1,105",
    price: 59.70,
    priceFormatted: "59.70 L",
    status: "Available",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb1_C1-Hero.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba7_C1-1.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba4_C1-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba6_C1-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba5_C1-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba8_C1-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bbd_C1-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bbc_C1-7.avif"
    ],
    desc: "A prestigious 3-bedroom luxury residence featuring curated designer aesthetics, grand entry foyer, and sweeping city and garden landscape views.",
    aboutText: "A prestigious 3-bedroom luxury residence featuring curated designer aesthetics, grand entry foyer, and sweeping city and garden landscape views.",
    storyTitle: "Curated aesthetics and elevated comfort",
    storyDesc: "C1 Premium is the pinnacle of boutique 3-bedroom living. Premium fittings, contemporary recessed lighting, granite modular kitchen surfaces, and three private en-suite bathrooms create an ambiance of tranquility and understated prestige.",
    amenities: {
      kitchen: ["Premium modular cabinetry", "Designer subway tiles", "Granite/Quartz counters", "Utility area"],
      livingRoom: ["Designer lounge space", "Recessed cove lighting", "Terrace view balcony", "Breakfast counter"],
      bedroom: ["3 Private en-suite baths", "Imported sanitary fittings", "Large UPVC acoustic windows", "Wardrobe niches"]
    },
    charges: [
      { label: "Booking amount", value: "₹2,00,000" },
      { label: "Stamp duty & registration (7%)", value: "₹4.18 L" },
      { label: "GST (5%, under construction)", value: "₹2.98 L" },
      { label: "Covered car parking", value: "₹3,50,000" },
      { label: "Maintenance deposit (12 months)", value: "₹75,000" },
      { label: "Legal & documentation", value: "₹25,000" },
    ],
    pricePerSqft: "₹5,400 / sq ft"
  }
];

/* URLs come from the display name so the address bar always matches the page
   ("Green View" -> /apartments/green-view). Names must therefore stay unique.
   `id` remains the stable internal key and still resolves as a legacy URL. */
export function getUnitSlug(unit: ApartmentUnit): string {
  return unit.name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getUnitPath(unit: ApartmentUnit): string {
  return `/apartments/${getUnitSlug(unit)}`;
}

export function findUnitBySlug(slug: string): ApartmentUnit | undefined {
  const key = slug.toLowerCase();
  return APARTMENTS_DATA.find((unit) => getUnitSlug(unit) === key);
}

export function findUnitById(id: string): ApartmentUnit | undefined {
  const key = id.toLowerCase();
  return APARTMENTS_DATA.find((unit) => unit.id.toLowerCase() === key);
}

/* For lists that keep their own copy of unit data (HomePage): joins on the
   stable id so the URL always comes from the canonical name above. */
export function getUnitPathById(id: string): string {
  const unit = findUnitById(id);
  return unit ? getUnitPath(unit) : `/apartments/${id}`;
}

export const TESTIMONIALS_DATA = [
  {
    author: "Mrs. P. Sherpa",
    photo: "/assets/authors/author-1.avif",
    quote:
      "“The quality of construction and prompt possession handed over by SGMG gave our family absolute confidence. From transparent documentation to the beautifully landscaped amenities, SGMG delivers truly world-class residential standards in North Bengal.”",
  },
  {
    author: "Rajesh Agarwal",
    photo: "/assets/authors/author-2.avif",
    quote:
      "“Investing in an SGMG residence has been our best decision. The architectural planning, ventilation, and premium fittings exceed expectations. The management’s professionalism and commitment to on-time delivery reflect four decades of trust.”",
  },
  {
    author: "Dr. Anirban Mukherjee",
    photo: "/assets/authors/author-3.avif",
    quote:
      "“Living here provides the tranquility and security my family always sought. The peaceful surroundings, modern clubhouse, and rapid connectivity to arterial Siliguri hubs make daily life completely effortless. A true benchmark in luxury living.”",
  },
];

export const APARTMENT_FAQS = [
  {
    q: "How do I schedule a site visit or book a residence?",
    a: "You can schedule a private site visit through our online tour scheduler or connect directly with our sales advisors. Our team will guide you through master plans, model residences, and complete booking formalities.",
  },
  {
    q: "Are SGMG residential projects RERA approved and compliant?",
    a: "Yes, all SGMG developments are fully compliant with West Bengal HIRA / RERA guidelines, with transparent approvals, clear land titles, and verified legal clearances.",
  },
  {
    q: "What financing and home loan assistance is available?",
    a: "SGMG is partnered with leading public and private banks (including SBI, HDFC, ICICI, and Axis Bank) to facilitate competitive interest rates, pre-approved loans, and seamless loan documentation.",
  },
  {
    q: "What is the construction quality and warranty provided by SGMG?",
    a: "With a 40-year legacy of engineering excellence in Siliguri, SGMG utilizes Grade-A structural materials, earthquake-resistant RCC framing, premium waterproofing, and dedicated post-possession maintenance.",
  },
  {
    q: "What are the possession timelines and payment structures?",
    a: "We offer flexible, milestone-linked construction payment plans with strict adherence to scheduled delivery dates. Possession dates are explicitly guaranteed in your agreement.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) purchase properties with SGMG?",
    a: "Yes. We offer end-to-end dedicated NRI concierge assistance, including virtual 3D walkthroughs, digital documentation, NRE/NRO banking facilitation, and property management.",
  },
  {
    q: "What amenities and community features are included?",
    a: "Every project features world-class residential amenities: multi-tier 24/7 security, landscaped central courtyards, swimming pools, high-speed elevators, wellness gymnasiums, and uninterrupted power backup.",
  },
];
