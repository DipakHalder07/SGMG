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
    desc: "A 4-bedroom layout that gives everyone their own space to unwind, recharge, and stay focused while shared areas keep everyday living easy and connected.",
    aboutText: "A 4-bedroom layout that gives everyone their own space to unwind, recharge, and stay focused while shared areas keep everyday living easy and connected.",
    storyTitle: "A balanced living layout",
    storyDesc: "D1 is designed for balanced student living, combining private bedrooms with open shared spaces that make everyday routines feel comfortable and connected. Fully furnished interiors, practical layouts, and modern essentials create a simple move-in experience from day one.",
    amenities: {
      kitchen: ["Dishwasher", "Oven", "Microwave", "Refrigerator", "Range", "Freezer"],
      livingRoom: ["Wall-mounted TV", "Sectional sofa", "Coffee table", "Bar stools"],
      bedroom: ["Full XL-size bed", "Mattress", "Dresser", "Study desk", "Desk chair", "Keyed lock", "Window blinds"]
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
    desc: "An elevated 4-bedroom layout with refined interiors, warm shared spaces, and a more curated atmosphere designed to make student living feel more comfortable and intentional.",
    aboutText: "An elevated 4-bedroom layout with refined interiors, warm shared spaces, and a more curated atmosphere designed to make student living feel more comfortable and intentional.",
    storyTitle: "Refined details and shared comfort",
    storyDesc: "D1 Premium elevates student living with upgraded finishes, custom color palettes, and designer fixtures throughout. Enjoy oversized windows, enhanced kitchen countertops, and quiet private study spaces within your personal suite.",
    amenities: {
      kitchen: ["Stainless steel appliances", "Dishwasher", "Modern oven", "Microwave", "Refrigerator", "Range"],
      livingRoom: ["Smart 55\" 4K TV", "Designer sectional sofa", "Solid oak coffee table", "Bar seating"],
      bedroom: ["Premium mattress", "Full XL bed frame", "Custom dresser", "Workstation desk", "Ergonomic chair", "Keyed lock"]
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
    desc: "A spacious 4-bedroom layout designed for students who enjoy a more social atmosphere, combining open common areas with comfortable private spaces for everyday balance.",
    aboutText: "A spacious 4-bedroom layout designed for students who enjoy a more social atmosphere, combining open common areas with comfortable private spaces for everyday balance.",
    storyTitle: "Private ensuite bathrooms for all",
    storyDesc: "With 4 full bathrooms, D2 guarantees complete autonomy and privacy for each roommate. The expansive central kitchen and open living room allow easy dinners and movie nights without compromising personal retreat space.",
    amenities: {
      kitchen: ["Double sink", "Dishwasher", "Microwave", "Oven & Range", "Full freezer/fridge"],
      livingRoom: ["Living room entertainment setup", "Lounge sectional", "Accent lighting", "Breakfast counter"],
      bedroom: ["Private attached bathroom", "Walk-in closet", "Full XL bed", "Desk & chair", "Electronic lock"]
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
    desc: "A spacious premium 4-bedroom layout that combines open social living with hospitality-inspired interiors, creating a student apartment that feels both connected and elevated.",
    aboutText: "A spacious premium 4-bedroom layout that combines open social living with hospitality-inspired interiors, creating a student apartment that feels both connected and elevated.",
    storyTitle: "The ultimate 4BR college experience",
    storyDesc: "D2 Premium offers unmatched square footage and modern elegance. Four ensuite private baths, quartz countertops, designer pendant lighting, and hardwood-style flooring deliver high-end comfort right near campus.",
    amenities: {
      kitchen: ["Quartz countertops", "Stainless appliances", "Dishwasher", "Disposal", "French-door fridge"],
      livingRoom: ["Curated art & furniture package", "Ultra HD TV", "Plush seating", "Dining island"],
      bedroom: ["Ensuite luxury bath", "Custom lighting", "Plush mattress", "Study desk", "Room darkening blinds"]
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
    desc: "A bright and functional 3-bedroom layout designed around calm student living, blending comfortable shared spaces with private areas that support focus and everyday routines.",
    aboutText: "A bright and functional 3-bedroom layout designed around calm student living, blending comfortable shared spaces with private areas that support focus and everyday routines.",
    storyTitle: "Cozy community with 3 full baths",
    storyDesc: "The C1 floor plan delivers a harmonious 3-bed / 3-bath distribution. Each resident has their personal sanctuary while enjoying an open living room and gourmet kitchen setup for collaborative college living.",
    amenities: {
      kitchen: ["Dishwasher", "Microwave", "Oven", "Refrigerator", "Spacious cabinetry"],
      livingRoom: ["Wall TV mount", "Sectional couch", "Coffee table", "Pendant accents"],
      bedroom: ["Private bath", "Full XL bed", "Mattress", "Desk & ergonomic chair", "Keyed lock"]
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
    desc: "A refined and balanced 3-bedroom layout with brighter interiors, curated details, and comfortable shared spaces designed for a calmer and more elevated student living experience.",
    aboutText: "A refined and balanced 3-bedroom layout with brighter interiors, curated details, and comfortable shared spaces designed for a calmer and more elevated student living experience.",
    storyTitle: "Elevated student luxury in 3BR format",
    storyDesc: "C1 Premium is the pinnacle of boutique student housing. Upgraded fixtures, contemporary lighting, plush designer furnishings, and private full bathrooms for every bedroom create the most tranquil living experience at 21Oaks.",
    amenities: {
      kitchen: ["Premium stainless appliances", "Subway tile backsplash", "Granite/Quartz counters", "Dishwasher"],
      livingRoom: ["Custom sofa & lounge chairs", "Smart 4K screen", "Modern coffee table", "Bar counter"],
      bedroom: ["Private attached bath", "Premium mattress", "Study nook with lamp", "Closet built-ins", "Keyed lock"]
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
    description: "A major public research university known for its vibrant student life, SEC athletics, and nationally recognized academic programs in the heart of Columbia.",
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
    author: "Emily Carter",
    photo: "/assets/authors/author-1.avif",
    quote:
      "“I can't say enough about how great all of the improvements are going. The entire leasing team went above and beyond to ensure a smooth move in and thoroughly explained the entire process. The property is very well kept. Convenient to the stadium perfect for games! A great place to call home at a great value. You won't be disappointed!”",
  },
  {
    author: "Ryan Mitchell",
    photo: "/assets/authors/author-2.avif",
    quote:
      "“I wasn’t sure what to expect at first, but everything turned out way better than I thought. The apartment is clean, well-designed, and actually feels comfortable to live in. The whole move-in process was simple, and the team was always responsive. It’s been a really solid experience so far.”",
  },
  {
    author: "Daniel Brooks",
    photo: "/assets/authors/author-3.avif",
    quote:
      "“Living here has been easy from day one. Everything you need is already set up, and the layout just works. It’s quiet when you need it to be, but still close to everything around campus. Honestly, it just makes daily life simpler, which is exactly what I was looking for.”",
  },
];

export const APARTMENT_FAQS = [
  {
    q: "How do I apply for an apartment?",
    a: "Click “Apply Now,” choose your lease term and floor plan, and complete the online application. If applying with roommates, make sure everyone selects the same floor plan.",
  },
  {
    q: "What does by-the-bed leasing mean?",
    a: "Each resident signs an individual lease and is only responsible for their portion of the rent.",
  },
  {
    q: "What do I need to apply?",
    a: "To guarantee your bed space, you’ll need a signed lease agreement. Leases are generated once your application is complete and your screening has been approved.",
  },
  {
    q: "Do I need a guarantor?",
    a: "Most applicants require a guarantor to meet the income requirement and ensure monthly installment payments can be made. If you do not have a guarantor, you may self-qualify using your own income or apply through a third-party guarantor service. Contact the onsite team for more information.",
  },
  {
    q: "How long does approval take?",
    a: "Typically 24–48 hours, depending on how quickly your guarantor submits their application.",
  },
  {
    q: "Can I apply if I’m not a student?",
    a: "Yes. All applicants who meet the qualifying criteria are welcome.",
  },
  {
    q: "How is rent paid?",
    a: "Rent is divided into 12 equal installments and is due on the 1st of each month. Additional fees, such as pet rent or parking, are billed separately.",
  },
];
