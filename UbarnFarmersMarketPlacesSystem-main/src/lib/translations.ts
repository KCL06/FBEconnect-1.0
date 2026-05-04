export type Language = 'en' | 'sw';

export const translations = {
  en: {
    // Navigation & Layout
    dashboard: "Dashboard",
    marketplace: "Marketplace",
    farm_records: "Farm Records",
    products: "Products",
    orders: "Orders",
    consultations: "Consultations",
    messages: "Messages",
    reviews: "Reviews",
    settings: "Settings",
    log_out: "Log Out",
    
    // Header
    search_placeholder: "Search...",
    notifications: "Notifications",
    profile: "Profile",

    // Landing Page
    hero_title: "Connect, Grow, and Thrive with FBEconnect",
    hero_subtitle: "The ultimate marketplace connecting farmers, buyers, and experts across Africa.",
    get_started: "Get Started",
    learn_more: "Learn More",
    features: "Features",
    how_it_works: "How it Works",
    testimonials: "Testimonials",

    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    add_new: "Add New",
    status: "Status",
    price: "Price",
  },
  sw: {
    // Navigation & Layout
    dashboard: "Dashibodi",
    marketplace: "Soko",
    farm_records: "Rekodi za Shamba",
    products: "Bidhaa",
    orders: "Oda",
    consultations: "Ushauri",
    messages: "Ujumbe",
    reviews: "Maoni",
    settings: "Mipangilio",
    log_out: "Ondoka",
    
    // Header
    search_placeholder: "Tafuta...",
    notifications: "Arifa",
    profile: "Wasifu",

    // Landing Page
    hero_title: "Ungana, Kua, na Ufanikiwe na FBEconnect",
    hero_subtitle: "Soko kuu linalounganisha wakulima, wanunuzi, na wataalam kote Afrika.",
    get_started: "Anza Sasa",
    learn_more: "Jifunze Zaidi",
    features: "Vipengele",
    how_it_works: "Jinsi Inavyofanya Kazi",
    testimonials: "Shuhuda",

    // Common
    save: "Hifadhi",
    cancel: "Ghairi",
    delete: "Futa",
    edit: "Hariri",
    view: "Tazama",
    add_new: "Ongeza Mpya",
    status: "Hali",
    price: "Bei",
  }
};

export type TranslationKey = keyof typeof translations.en;
