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
  fees: {
    application: string;
    admin: string;
  };
}

export const APARTMENTS_DATA: ApartmentUnit[] = [
  {
    id: "d1",
    name: "D1",
    type: "General",
    bedrooms: 4,
    bathrooms: 2,
    beds: "4 Bed",
    baths: "2 Baths",
    sqft: "1,108",
    price: 795.00,
    priceFormatted: "795.00",
    status: "Available",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bae_D1-Gen.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b92_D1-1.avif",
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
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  },
  {
    id: "d1-premium",
    name: "D1 Premium",
    type: "Premium",
    bedrooms: 4,
    bathrooms: 2,
    beds: "4 Bed",
    baths: "2 Baths",
    sqft: "1,108",
    price: 730.00,
    priceFormatted: "730.00",
    status: "Available",
    coverImage: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bb0_D1-Hero.avif",
    gallery: [
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba2_D1-1.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba0_D1-2.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba1_D1-3.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193ba3_D1-4.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b9f_D1-5.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bbb_D1-6.avif",
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193bba_D1-7.avif"
    ],
    desc: "An elevated 4-bedroom sanctuary featuring upgraded designer finishes, panoramic view vistas, and private suite layouts that redefine luxury living.",
    aboutText: "An elevated 4-bedroom sanctuary featuring upgraded designer finishes, panoramic view vistas, and private suite layouts that redefine luxury living.",
    storyTitle: "Bespoke finishes and panoramic views",
    storyDesc: "D1 Premium elevates residential living with imported vitrified tile flooring, designer sanitary fixtures, and generous double-glazed windows. Enjoy expansive living areas, an Italian-inspired modular kitchen, and serene private balconies overlooking Siliguri's greenery.",
    amenities: {
      kitchen: ["Italian-finish modular units", "Quartz worktops", "Double stainless sink", "Piped gas provision", "Separate utility"],
      livingRoom: ["Double-aspect grand hall", "Recessed LED lighting", "Polished vitrified floors", "Panoramic deck"],
      bedroom: ["Master suite balcony", "En-suite bathroom", "Hardwood-style tiling", "Walk-in closet space"]
    },
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  },
  {
    id: "d2",
    name: "D2",
    type: "General",
    bedrooms: 4,
    bathrooms: 4,
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,372",
    price: 760.00,
    priceFormatted: "760.00",
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
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  },
  {
    id: "d2-premium",
    name: "D2 Premium",
    type: "Premium",
    bedrooms: 4,
    bathrooms: 4,
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,372",
    price: 820.00,
    priceFormatted: "820.00",
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
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  },
  {
    id: "c1",
    name: "C1",
    type: "General",
    bedrooms: 3,
    bathrooms: 3,
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,107",
    price: 815.00,
    priceFormatted: "815.00",
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
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  },
  {
    id: "c1-premium",
    name: "C1 Premium",
    type: "Premium",
    bedrooms: 3,
    bathrooms: 3,
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,107",
    price: 865.00,
    priceFormatted: "865.00",
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
    fees: {
      application: "₹50.00",
      admin: "₹150.00"
    }
  }
];

export const LOCATION_HERO_SLIDES = [
  {
    id: "usc",
    name: "University of South Carolina",
    description: "A major research institution recognized for its expansive academic campus, cultural landmarks, and architectural legacy in the heart of Columbia.",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6a3026da06299c7daba7_Slide%201.avif",
    thumb: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6a3026da06299c7daba7_Slide%201.avif",
    commute: {
      walk: "14 min walk",
      bike: "5 min bike",
      drive: "5 min drive"
    }
  },
  {
    id: "arena",
    name: "Colonial Life Arena",
    description: "Columbia's premier entertainment venue hosting concerts, basketball games, live events, and major performances throughout the year.",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6ce946f82f1fc4ef6f6e_untitled_Topaz%20Image%20Upscale_2026-07-17_17-56-39%20(1).avif",
    thumb: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6ce946f82f1fc4ef6f6e_untitled_Topaz%20Image%20Upscale_2026-07-17_17-56-39%20(1).avif",
    commute: {
      walk: "12 min walk",
      bike: "4 min bike",
      drive: "4 min drive"
    }
  },
  {
    id: "museum",
    name: "South Carolina State Museum",
    description: "A large multidisciplinary museum featuring South Carolina history, art, science, technology, and immersive planetarium experiences.",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6f0663982887dfcb990d_SCSM%20Museum.avif",
    thumb: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6f0663982887dfcb990d_SCSM%20Museum.avif",
    commute: {
      walk: "16 min walk",
      bike: "6 min bike",
      drive: "5 min drive"
    }
  }
];

export const LOCATION_PLACES = [
  {
    id: "soda-city",
    category: "Groceries",
    name: "Soda City Market",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8a_1%20(1).avif",
    lat: 34.0028,
    lng: -81.0348,
    distance: "1.2 miles",
    note: "Saturday morning artisan & food market on Main St."
  },
  {
    id: "orangetheory",
    category: "Workouts",
    name: "Orangetheory Fitness",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8b_2%20(1).avif",
    lat: 33.9984,
    lng: -81.0265,
    distance: "0.9 miles",
    note: "High-intensity interval group workouts nearby."
  },
  {
    id: "usc-campus",
    category: "Campus",
    name: "University of South Carolina",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8c_3%20(1).avif",
    lat: 33.9961,
    lng: -81.0274,
    distance: "0.6 miles",
    note: "Main historic Horseshoe and academic center."
  },
  {
    id: "colonial-arena",
    category: "Events",
    name: "Colonial Life Arena",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8d_4%20(1).avif",
    lat: 33.9936,
    lng: -81.0345,
    distance: "0.7 miles",
    note: "Gamecock basketball, concerts, and live tours."
  },
  {
    id: "dipratos",
    category: "Coffee & Bites",
    name: "DiPrato's",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8e_5%20(1).avif",
    lat: 33.9912,
    lng: -81.0189,
    distance: "1.1 miles",
    note: "Famous pimento cheese, sandwiches & espresso."
  },
  {
    id: "sc-museum",
    category: "Culture",
    name: "South Carolina State Museum",
    image: "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8f_6.avif",
    lat: 33.9972,
    lng: -81.0478,
    distance: "1.4 miles",
    note: "Art, planetarium, history, and science galleries."
  }
];

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
