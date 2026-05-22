export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface RecommendedHotel {
  name: string;
  rate: string;
  cost: string; // e.g. "₹18,000 / night"
  img: string;
}

export interface WeatherDay {
  day: string;
  temp: string;
  cond: string;
  icon: string;
}

export interface BudgetSplit {
  item: string;
  percent: number;
  val: string; // e.g. "₹45,500"
}

export interface MemberReview {
  user: string;
  loc: string;
  desc: string;
  score: number;
}

export interface Destination {
  id: string;
  title: string;
  location: string;
  price: number; // in INR
  rating: number;
  duration: string;
  description: string;
  image: string;
  images: string[];
  highlights: string[];
  category: string;
  locations: Array<{ name: string; lat: number; lng: number }>;
  itinerary: ItineraryDay[];
  hotels: RecommendedHotel[];
  reviews: MemberReview[];
  budget: BudgetSplit[];
  transport: {
    type: string;
    details: string;
    priceText: string;
  };
  weather: WeatherDay[];
  experiences: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    title: "Swiss Alps Grand Tour",
    location: "Zermatt, Switzerland",
    price: 210000,
    rating: 4.9,
    duration: "7 Days / 6 Nights",
    category: "Mountain Luxury",
    description: "Witness the majestic Matterhorn and experience unmatched Swiss peak serenity. This premium expedition combines luxury alpine chalets, the Scenic Glacier Express route, and private downhill sky guides.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["First-Class Glacier Express Rail Pass", "Private Matterhorn Summit Heli-Tour", "VIP Thermal Spa access in Bad Ragaz", "Traditional 5-Star Gourmet Fondue Soirée"],
    locations: [
      { name: "Zermatt Village", lat: 46.0207, lng: 7.7491 },
      { name: "Gornergrat Lookout", lat: 45.9833, lng: 7.7833 },
      { name: "Matterhorn Glacier Paradise", lat: 45.9383, lng: 7.7283 }
    ],
    itinerary: [
      { day: 1, title: "Zermatt Arrival & First-Look", description: "Arrive at the car-free mountain haven of Zermatt on a private electric luxury carriage. Sip sparkling juice as the Matterhorn reveals its evening pink hues." },
      { day: 2, title: "Gornergrat Peak Railway", description: "Board Europe's highest open-air cogwheel railroad for spectacular panoramic vistas covering 29 peaks exceeding 4,000 meters." },
      { day: 3, title: "Private Heli-Skiing & Summit Safari", description: "Take to the Swiss skies in a VIP helicopter for an custom flight path, descending on pristine ski slates guided by Olympic specialists." },
      { day: 4, title: "Thermal Spa day at Bad Ragaz", description: "Relax your muscles in the highly curative thermal mineral bath chambers, followed by premium sound-frequency alignment therapy." },
      { day: 5, title: "Alpine Farewell Under the Stars", description: "A high-altitude candlelight banquet of locally-crafted Raclette, pairing with exquisite vintage sparkling juices." }
    ],
    hotels: [
      { name: "The Matterhorn Peak Chalet", rate: "4.9", cost: "₹38,000 / night", img: "https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=400" },
      { name: "Grand Hotel Zermatterhof", rate: "4.8", cost: "₹45,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Rajesh Malhotra", loc: "New Delhi, IN", desc: "Truly an imperial standard of travel. Watching the sunrise hit the peaks from our private chalet felt absolutely stellar. SmartTour handled everything seamlessly in Rupees!", score: 5 },
      { user: "Sarah Jenkins", loc: "Vancouver, CA", desc: "Perfect execution, exceptionally knowledgeable mountain coordinators. Thermal spas are outstanding.", score: 5 }
    ],
    budget: [
      { item: "VIP First-Class Rail & Heli-safari", percent: 35, val: "₹73,500" },
      { item: "5-Star Chalet & Suite Stay", percent: 45, val: "₹94,500" },
      { item: "Fine Dining & Spa Therapies", percent: 20, val: "₹42,000" }
    ],
    transport: {
      type: "First-Class Alpine Cogwheel & Helicopter Transfer",
      details: "Private electric carriages around Zermatt combined with a VIP flight path over Mount Rosa.",
      priceText: "Included in Package"
    },
    weather: [
      { day: "Today", temp: "11°C", cond: "Clear Peaks", icon: "✨" },
      { day: "Tomorrow", temp: "9°C", cond: "Fresh Powder", icon: "❄️" },
      { day: "Friday", temp: "10°C", cond: "Sunny Glaciers", icon: "☀️" }
    ],
    experiences: ["Heli-Skiing", "Panoramic Train Rides", "High-Altitude Fondue Tasting"]
  },
  {
    id: "2",
    title: "Eco-Oasis & Dune Escape",
    location: "Dubai, UAE",
    price: 145000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "Desert Premium",
    description: "Soar above futuristic smart-cities and camp under the starry Arabian skies in ultimate elegance. Explore eco-friendly biological reserves, luxury yachts, and private helicopter tours.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546412414-e188526159bc?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Private Carbon-Offset SUV dune drive", "Custom sky-ride over Palm Jumeirah", "Astronomy campfire banquet under desert stars", "VIP Louvre Abu Dhabi fastpass journey"],
    locations: [
      { name: "Downtown Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Al Maha Reserve", lat: 24.8169, lng: 55.6267 },
      { name: "Palm Jumeirah Marina", lat: 25.1124, lng: 55.1390 }
    ],
    itinerary: [
      { day: 1, title: "Skynode Arrival & Skyline Check-in", description: "Check into an ultra-luxury skyscraper overlooking the harbor with early smart-door credential setups." },
      { day: 2, title: "Al Maha Reserve Wildlife Drive", description: "Traverse golden dunes in a silent electric safari carriage to watch Arabian Oryx roaming in their natural reserve." },
      { day: 3, title: "The Royal Yacht Sunset voyage", description: "Bespoke harbor tour with premium dining and live acoustic music, floating beneath the skyscrapers." },
      { day: 4, title: "VIP Space-Odyssey Observatory Dinner", description: "Spend a magical night in a luxury desert sanctuary with fine stargazing instruments and master chefs." }
    ],
    hotels: [
      { name: "Al Maha Luxury Desert Resort", rate: "4.9", cost: "₹42,000 / night", img: "https://images.unsplash.com/photo-1546412414-e188526159bc?auto=format&fit=crop&q=80&w=400" },
      { name: "The Bulgari Yacht Mansion", rate: "4.8", cost: "₹55,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Aisha Al-Mansoori", loc: "Abu Dhabi, UAE", desc: "A phenomenal blend of futuristic innovation and ancient serene desert tradition. Exceptional luxury.", score: 5 },
      { user: "Vikram Sen", loc: "Mumbai, IN", desc: "The desert stargazing dinner was brilliant. Top marks to the silent high-end SUV setup.", score: 5 }
    ],
    budget: [
      { item: "Electric Desert Offroader & Yacht Guide", percent: 30, val: "₹43,500" },
      { item: "Al Maha Luxury Pavilion Suites", percent: 50, val: "₹72,500" },
      { item: "Curated Wildlife & Astronomy feasts", percent: 20, val: "₹29,000" }
    ],
    transport: {
      type: "Electric Range Rover & Private Yacht Chauffeur",
      details: "Full VIP private vehicle assigned for your individual city exploration and remote eco-reserve transfers.",
      priceText: "Complimentary"
    },
    weather: [
      { day: "Today", temp: "34°C", cond: "Warm Sky", icon: "☀️" },
      { day: "Tomorrow", temp: "32°C", cond: "Breezy Oasis", icon: "🍃" },
      { day: "Friday", temp: "33°C", cond: "Amber Sunset", icon: "✨" }
    ],
    experiences: ["VIP Dune Dining", "Yacht Cruises", "Eco-Reserve Biosphere Walk"]
  },
  {
    id: "3",
    title: "Parisienne Art & Heritage Voyage",
    location: "Paris, France",
    price: 185000,
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    category: "Historical Romance",
    description: "Step into back-alley architectural secrets, private Louvre viewings, and bespoke gourmet workshops. Discover the ultimate artistic side of Paris with luxury boutique townhouse accommodations.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1499856138030-7db4de705ee6?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Exclusive Museum Access & Curator Tour", "Sailing on a vintage mahogany boat along the Seine", "Private Michelin-star masterclass with executive chef", "Atelier art creation inside historic Montmartre"],
    locations: [
      { name: "Louvre Pyramid", lat: 48.8606, lng: 2.3376 },
      { name: "Montmartre District", lat: 48.8867, lng: 2.3431 },
      { name: "Seine Heritage Pier", lat: 48.8566, lng: 2.3522 }
    ],
    itinerary: [
      { day: 1, title: "VIP Entry and Vintage Parisian Welcome", description: "Sip classic hot cacao at legendary salons before checking into a customized boutique mastersuite." },
      { day: 2, title: "Historical Curator Tour at the Louvre", description: "Bypass typical lines to stand inches away from immortal oil paints accompanied by art historians." },
      { day: 3, title: "Vintage Seine Private Cruise", description: "Sail through illuminated arches and cathedral perspectives on a small hand-crafted wooden riverboat." },
      { day: 4, title: "Organic Gastronomy culinary workshop", description: "Source seasonal berries and herbs from local markets, designing a five-course meal under French chef supervision." }
    ],
    hotels: [
      { name: "La Réserve Paris & Spa", rate: "4.9", cost: "₹35,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "Hôtel Plaza Athénée", rate: "4.8", cost: "₹48,000 / night", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Meera Nair", loc: "Bangalore, IN", desc: "A dream come true. The private Seine riverboat felt deeply exclusive, and we skipped every crowd. Absolutely worth it.", score: 5 },
      { user: "Gabriel Dupont", loc: "Lyon, FR", desc: "Curated with stellar artistic knowledge. A sublime expression of French history.", score: 5 }
    ],
    budget: [
      { item: "Museum Fastpasses & Historical Guides", percent: 25, val: "₹46,250" },
      { item: "Boutique Townhouse accommodations", percent: 50, val: "₹92,500" },
      { item: "Michelin Gastronomy workshops", percent: 25, val: "₹46,250" }
    ],
    transport: {
      type: "Classic Citroen EV Private Driver",
      details: "Glide seamlessly around Parisian boulevards in a retrofitted fully-silent vintage EV vehicle.",
      priceText: "Full Access"
    },
    weather: [
      { day: "Today", temp: "15°C", cond: "Foggy Mornings", icon: "🌫️" },
      { day: "Tomorrow", temp: "17°C", cond: "Golden Sunshine", icon: "🌤️" },
      { day: "Friday", temp: "16°C", cond: "Passing Shimmer", icon: "🌦️" }
    ],
    experiences: ["Private Curator Tours", "Vintage Yacht Cruises", "Perfume Compounding Masterclass"]
  },
  {
    id: "4",
    title: "Maldives Overwater Haven",
    location: "Malé, Maldives",
    price: 240000,
    rating: 4.9,
    duration: "6 Days / 5 Nights",
    category: "Island Serenity",
    description: "Enter an absolute sanctuary of turquoise calm. Stay in a sustainable overwater residence featuring private carbon-neutral lagoons, customized coral plantation runs, and marine-biologist dives.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Overwater Bungalow with glass ocean floors", "Bespoke sea-plane transit directly from airport", "Sunset Dolphin safari on eco-yachts", "Candlelit sea-bed bioluminescent dinner"],
    locations: [
      { name: "Malé Airport", lat: 4.1918, lng: 73.5291 },
      { name: "Baa Atoll Biosphere", lat: 5.1500, lng: 73.0333 }
    ],
    itinerary: [
      { day: 1, title: "Hydroplane flight and Overwater induction", description: "Fly over deep-blue networks of ring atolls. Step directly onto the sun-soaked deck of your overwater villa." },
      { day: 2, title: "Coral Restoration Dive", description: "Plant your own custom coral chunk on a private marine sanctuary, tagged with an offline smart reference." },
      { day: 3, title: "Uninhabited Sandbank Picnic", description: "A private chef prepares tropical fruit setups on a pure white sand island, enclosed only by ocean tides." },
      { day: 4, title: "Bioluminescent Lagoon dinner", description: "Submerge yourself in warm glowing waters as millions of ocean plankton put on a celestial performance." }
    ],
    hotels: [
      { name: "Soneva Jani Maldives", rate: "5.0", cost: "₹72,000 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
      { name: "Gili Lankanfushi Lagoon Resort", rate: "4.9", cost: "₹60,000 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Devika Roy", loc: "Kolkata, IN", desc: "No words can describe the beauty. Coral restoration dives were a deeply satisfying and educational experience.", score: 5 },
      { user: "Aravind Swamy", loc: "Chennai, IN", desc: "The sea-plane journey felt futuristic and offered spectacular bird's-eye views. Complete isolation.", score: 5 }
    ],
    budget: [
      { item: "Airport Sea-plane Premium transfer", percent: 25, val: "₹60,000" },
      { item: "Ocean Bungalow stay with private slides", percent: 55, val: "₹1,32,000" },
      { item: "Sub-surface diving & Reef excursions", percent: 20, val: "₹48,000" }
    ],
    transport: {
      type: "First-Class Twin-Otter Seaplane Transfer",
      details: "A dramatic 40-minute air transit leaving directly from Malé Airport docks, flying low over atolls.",
      priceText: "Included"
    },
    weather: [
      { day: "Today", temp: "29°C", cond: "Tropical Bliss", icon: "🌤️" },
      { day: "Tomorrow", temp: "28°C", cond: "Ocean Zephyr", icon: "🌊" },
      { day: "Friday", temp: "29°C", cond: "Pristine Sun", icon: "☀️" }
    ],
    experiences: ["Plankton Swims", "Coral Farming", "Deserted Island Castaway Feast"]
  },
  {
    id: "5",
    title: "Bali Serenity Retreat",
    location: "Ubud, Bali",
    price: 95000,
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    category: "Mindfulness & Yoga",
    description: "Realign your inner rhythm in the cultural capital of Indonesia. This retreat combines yoga instruction, volcanic temple purifications, and lush rice paddy walks with master organic chefs.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["First-row Sunrise Volcano meditation", "Sacred Tirta Empul Water Cleansing", "Organic masterclass in the middle of rice farms", "Private Balinese herbal massage therapy"],
    locations: [
      { name: "Ubud Sanctuary", lat: -8.5069, lng: 115.2625 },
      { name: "Tirta Empul", lat: -8.4116, lng: 115.2897 },
      { name: "Mount Batur Base", lat: -8.2417, lng: 115.3858 }
    ],
    itinerary: [
      { day: 1, title: "Lush Ubud Checking and welcome", description: "Arrive at a bamboo architectural marvel nested beside a rushing clean mountain river." },
      { day: 2, title: "Sacred Water Purification Ritual", description: "Dress in ceremonial Bali attire and immerse in the crystal-clear thermal holy springs of Tirta Empul." },
      { day: 3, title: "Silent Rice Terraces sunrise walk", description: "Meditate surrounded by cascading emerald hills, learning standard soil-conservation practices." },
      { day: 4, title: "Ayuryedic Spa & Sound Alchemy", description: "A multi-hour ritual involving warm coconut oils and deep healing gong frequencies." }
    ],
    hotels: [
      { name: "Mandapa, a Ritz-Carlton Reserve", rate: "4.9", cost: "₹28,000 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
      { name: "Fivelements Eco Retreat Bali", rate: "4.8", cost: "₹20,500 / night", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Ananya Deshmukh", loc: "Pune, IN", desc: "A beautiful journey of rediscovering slow living. Tirta Empul ceremony was deeply touching.", score: 5 },
      { user: "Steve Miller", loc: "Sydney, AU", desc: "The bamboo villas are incredibly beautiful and breezy. Highly recommended mindfulness experience.", score: 5 }
    ],
    budget: [
      { item: "Yoga & Spiritual Cleansing guides", percent: 20, val: "₹19,000" },
      { item: "Handcrafted Eco-Resort Suites", percent: 55, val: "₹52,250" },
      { item: "Traditional Holistic Cuisine & Spas", percent: 25, val: "₹23,750" }
    ],
    transport: {
      type: "Eco-Friendly Electric Cruiser with Driver",
      details: "Navigate winding forest paths and volcanic lookouts in a silent premium electric cruiser.",
      priceText: "Full Coverage"
    },
    weather: [
      { day: "Today", temp: "27°C", cond: "Tropical Mist", icon: "🌫️" },
      { day: "Tomorrow", temp: "29°C", cond: "Warm Forest Rays", icon: "☀️" },
      { day: "Friday", temp: "28°C", cond: "Warm Rainfall", icon: "🌦️" }
    ],
    experiences: ["Water Temple Cleansing", "Sound Frequency Alignment", "Bamboo Architecture Class"]
  },
  {
    id: "6",
    title: "Tokyo Neon & Heritage Explorer",
    location: "Tokyo, Japan",
    price: 165000,
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    category: "Futuristic Heritage",
    description: "Explore the striking contrast of Tokyo's neon streets and peaceful imperial Shinto gardens. Participate in authentic tea ceremonies, and ride the bullet trains.",
    image: "https://images.unsplash.com/photo-1490806678282-46289ba80e8e?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490806678282-46289ba80e8e?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["VIP Private Tea master session", "Arashiyama Bamboo Shinkansen link", "Interactive futuristic digital museum passes", "Akihabara electronic private tour Guide"],
    locations: [
      { name: "Shinjuku Heart", lat: 35.6895, lng: 139.6917 },
      { name: "Meiji Shrine Garden", lat: 35.6764, lng: 139.6993 },
      { name: "Fuji base vista", lat: 35.3606, lng: 138.7274 }
    ],
    itinerary: [
      { day: 1, title: "Modern Tokyo Arrival & High-rise Sunset", description: "Watch Mount Fuji silhouettes behind neon skyscrapers from a luxury glass lounge." },
      { day: 2, title: "Shinto Shrine & Tea Ritual", description: "Walk through giant wooden torii gates at Meiji Shrine, joining an ancient tea ceremony." },
      { day: 3, title: "Modern digital art installation skip-line", description: "Immerse yourself inside infinite pools of responsive holographic flowers and physical lights." },
      { day: 4, title: "Luxury Fuji foothill escape", description: "Take a super-fast bullet train to clear natural hot springs overlooking Mount Fuji snowcaps." }
    ],
    hotels: [
      { name: "Aman Tokyo", rate: "4.9", cost: "₹45,500 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
      { name: "Hoshinoya Tokyo Ryokan", rate: "4.8", cost: "₹38,000 / night", img: "https://images.unsplash.com/photo-1490806678282-46289ba80e8e?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Kenji Sato", loc: "Kyoto, JP", desc: "A masterful itinerary balancing tomorrow and historic memories perfectly.", score: 5 },
      { user: "Karan Johar", loc: "Delhi, IN", desc: "Amazing contrast of sights. The Ryokan hot spring baths are incredibly restful after high-tech walks.", score: 5 }
    ],
    budget: [
      { item: "Bullet Train Passes & Digital Museums", percent: 30, val: "₹49,500" },
      { item: "High-Rise Skyview Room stays", percent: 45, val: "₹74,250" },
      { item: "Gourmet Kaiseki dining multi-course", percent: 25, val: "₹41,250" }
    ],
    transport: {
      type: "First Class Shinkansen & Tokyo Subway VIP Metro Pass",
      details: "Includes premium green-car tickets for regional bullet train travel and unlimited metro line access.",
      priceText: "Included in Package"
    },
    weather: [
      { day: "Today", temp: "14°C", cond: "Brisk Air", icon: "🌤️" },
      { day: "Tomorrow", temp: "15°C", cond: "Cherry Wind", icon: "🌸" },
      { day: "Friday", temp: "13°C", cond: "Brisk Rainfall", icon: "☔" }
    ],
    experiences: ["Plankton Swims", "Kaiseki Dinings", "VIP Shinkansen"]
  },
  {
    id: "7",
    title: "Singapore Eco-Metropolis Luxury",
    location: "Downtown, Singapore",
    price: 125000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "Futuristic Urbanism",
    description: "Immerse in an eco-futuristic paradise where architecture meets botanical wonders. Enjoy standard VIP fastpasses to cloud forests, evening bio-dome supertree shows, and luxury marina yacht escapes.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565967511849-75a6fd7f9aae?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Glow-in-the-dark Botanical private garden walk", "Sentinel Bay Yacht champagne session", "Supertree Observatory luxury high tea", "VIP Sentosa organic beach club lounge access"],
    locations: [
      { name: "Marina Bay", lat: 1.2878, lng: 103.8666 },
      { name: "Gardens by the Bay", lat: 1.2816, lng: 103.8636 },
      { name: "Sentosa Cove", lat: 1.2494, lng: 103.8303 }
    ],
    itinerary: [
      { day: 1, title: "Jewel Changi welcome & Skyline Suite check-in", description: "Greeted at the waterfall arrival platform, transferring via premium electric vehicles to Marina Bay." },
      { day: 2, title: "Curator Cloud-Forest biosphere access", description: "Walk through high-altitude synthetic rainforest mist, analyzing rare climate floral groups." },
      { day: 3, title: "Sentosa Private Yacht sailing", description: "Float on calm harbor waters as the Singapore outline glows gold, with chef-driven culinary boards." },
      { day: 4, title: "Supertree light performance & rooftop dinner", description: "Sip drinks from high platforms as giant custom biological structures light up to sync with classic orchestral tunes." }
    ],
    hotels: [
      { name: "Marina Bay Sands Sky Residence", rate: "4.9", cost: "₹38,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "The Capella Sentosa Eco Resort", rate: "4.8", cost: "₹35,000 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Neha Gupta", loc: "Delhi, IN", desc: "Mind-blowing architecture. Capella resort is deep inside nature while being minutes away from high-class hubs.", score: 5 },
      { user: "Thomas L.", loc: "London, UK", desc: "Superb execution, clean routes, and botanical gardens are highly educational.", score: 5 }
    ],
    budget: [
      { item: "Garden Biosphere & Sentosa Passes", percent: 25, val: "₹31,250" },
      { item: "Marina View High-Sky Suites", percent: 50, val: "₹62,500" },
      { item: "Skyline Dining & Harbour Yacht", percent: 25, val: "₹31,250" }
    ],
    transport: {
      type: "Electric VIP S-Class Chauffeur",
      details: "Luxury high-performance clean vehicle available anytime with single-app touch commands.",
      priceText: "Included"
    },
    weather: [
      { day: "Today", temp: "30°C", cond: "Humid Sunshine", icon: "☀️" },
      { day: "Tomorrow", temp: "29°C", cond: "Balmy Rainfall", icon: "🌦️" },
      { day: "Friday", temp: "31°C", cond: "Warm Sea Breeze", icon: "🍃" }
    ],
    experiences: ["Supertree Dinings", "Bay Island Cruises", "Climate Dome Walks"]
  },
  {
    id: "8",
    title: "Kashmir Valley Floating Solitude",
    location: "Srinagar, Kashmir",
    price: 65000,
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    category: "Indian Paradise",
    description: "Float upon the calm levels of Dal Lake in a centuries-old fragrant cedar houseboat. Traverse snowy meadows of Gulmarg on scenic gondola rides and discover organic saffron plantation fields of Pampore.",
    image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588598126713-17ece0f6071a?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Premium Floating Houseboat stay on Dal Lake", "VIP Gulmarg Cable Car ride through snowy pines", "Saffron harvesting walk & Kashmiri Kahwa high tea", "Mughal Garden sunset Shikara boat cruise"],
    locations: [
      { name: "Srinagar Dal Lake", lat: 34.0837, lng: 74.7973 },
      { name: "Gulmarg Heights", lat: 34.0484, lng: 74.3805 },
      { name: "Pampore Saffron Orchards", lat: 34.0150, lng: 74.9200 }
    ],
    itinerary: [
      { day: 1, title: " Houseboat induction & Kahwa tea session", description: "Step from a wooden shikara boat into an intricately carved cedar floating suite. Savour fragrant saffron tea." },
      { day: 2, title: "Dal Lake Shikara Morning market", description: "Glide across misty waters at dawn to watch organic vegetable growers trade of water lilies and fresh crops." },
      { day: 3, title: "Gulmarg Gondola snowy voyage", description: "Ascend past pine-covered mountains inside a luxury skyway cabin, descending onto deep powder fields." },
      { day: 4, title: "Pampore saffron village & Mughul gardens", description: "Wander around historic terraced fountains designed by ancient kings, picking saffron strings in local farms." }
    ],
    hotels: [
      { name: "The Khyber Himalayan Resort (Gulmarg)", rate: "4.9", cost: "₹25,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "Sukoon Luxury Houseboat (Dal Lake)", rate: "4.8", cost: "₹18,000 / night", img: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Amit Mehra", loc: "Chandigarh, IN", desc: "Unbelievable serenity. Staying on Dal lake in a cedar wooden suite was exceptionally atmospheric. Service was outstanding.", score: 5 },
      { user: "Shalini Shah", loc: "Ahmedabad, IN", desc: "Gulmarg snow fields are stunning, almost like Switzerland! The resort has great heated pools.", score: 5 }
    ],
    budget: [
      { item: "VIP Gondola & Shikara Lake services", percent: 20, val: "₹13,000" },
      { item: "Cedar Houseboats & Khyber Resorts", percent: 55, val: "₹35,750" },
      { item: "Traditional Wazwan banquets & Kahwa teas", percent: 25, val: "₹16,250" }
    ],
    transport: {
      type: "Bespoke Land Cruiser 4x4 Chauffeur",
      details: "Spacious four-wheel drive suited for hill ascents and snow transitions comfortably.",
      priceText: "Fully covered"
    },
    weather: [
      { day: "Today", temp: "8°C", cond: "Cool Mist", icon: "🌫️" },
      { day: "Tomorrow", temp: "6°C", cond: "Soft Snowfall", icon: "❄️" },
      { day: "Friday", temp: "9°C", cond: "Crisp Sun", icon: "☀️" }
    ],
    experiences: ["Cedar Houseboats", "Snow Gondolas", "Saffron Harvest Walks"]
  },
  {
    id: "9",
    title: "Goan Riviera Coastal Sanctuary",
    location: "Candolim, Goa",
    price: 45000,
    rating: 4.7,
    duration: "4 Days / 3 Nights",
    category: "Beach Escapades",
    description: "Relax inside a beautifully restored Indo-Portuguese mansion along scenic, quiet northern beaches. Charter private sailing yachts, walk around spice farms, and enjoy premium fusion seafood.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Private sunset catamaran cruise on Mandovi", "VIP beach shacks with organic local menus", "Heritage walk across Fontainhas Latin Quarter", "Bespoke holistic beach yoga session"],
    locations: [
      { name: "Mandovi Estuary", lat: 15.5011, lng: 73.8262 },
      { name: "Fontainhas Panaji", lat: 15.4909, lng: 73.8329 },
      { name: "Candolim Beachfront", lat: 15.5164, lng: 73.7632 }
    ],
    itinerary: [
      { day: 1, title: "Heritage villa check-in & Beach sunset", description: "Sip refreshing kokum cooler while checking into your high-ceiling colonial era estate villa." },
      { day: 2, title: "Latin Quarter Walk & Art spaces", description: "Wander through the yellow and blue lanes of Fontainhas Panaji, discovering handmade tile arts." },
      { day: 3, title: "Private sunset catamaran sailing", description: "Sip fine drinks and eat fresh coastal bites as dolphins jump next to your catamaran." },
      { day: 4, title: "Organic Spice Farm sunrise meditation", description: "Discover vanilla, cashew, and black pepper farms, concluding with a warm mudbath ritual." }
    ],
    hotels: [
      { name: "Taj Exotica Resort & Spa Goa", rate: "4.9", cost: "₹18,000 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" },
      { name: "The Leela Goa Luxury Villa", rate: "4.8", cost: "₹22,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Rohan Varma", loc: "Mumbai, IN", desc: "A great luxury side of Goa far away from typical crowds. Catamaran cruise was unforgettable.", score: 5 },
      { user: "Kiara Advani", loc: "Delhi, IN", desc: "Amazing old world architecture. Spas and beach yoga sessions are beautifully done.", score: 5 }
    ],
    budget: [
      { item: "Yacht Charter & Colonial Heritage guides", percent: 30, val: "₹13,500" },
      { item: "Heritage Indo-Portuguese Oceanside stay", percent: 45, val: "₹20,250" },
      { item: "Coastal Organic Fine dining feasts", percent: 25, val: "₹11,250" }
    ],
    transport: {
      type: "Electric Luxury Cabriolet hire",
      details: "Breeze down coconut-fringed lanes in a premium convertible electric vehicle.",
      priceText: "Complimentary"
    },
    weather: [
      { day: "Today", temp: "31°C", cond: "Sea Breeze", icon: "✨" },
      { day: "Tomorrow", temp: "30°C", cond: "Tropical Clouds", icon: "⛅" },
      { day: "Friday", temp: "31°C", cond: "Warm Sunset Rays", icon: "☀️" }
    ],
    experiences: ["Catamaran Trips", "Latin Quarter Art", "Eco-Spice Farm Baths"]
  },
  {
    id: "10",
    title: "Manali Alpine Valley Escape",
    location: "Manali, Himachal Pradesh",
    price: 50000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "High Altitude Thrills",
    description: "Breathe pristine ozone atop glacial peaks and pine forests. Stay inside a warm glass igloo dome or cedar chalet. Explore high-altitude Solang gorges, and take private paragliding flights.",
    image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626318305863-bb23d0297c0b?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Sufi chalet nights under burning logs", "Private Solang paragliding & rafting tickets", "VIP fast-track Atall tunnel snow route caravan", "Bespoke forest apple orchard gourmet picnic"],
    locations: [
      { name: "Solang Valley base", lat: 32.3168, lng: 77.1593 },
      { name: "Atal Tunnel Entrance", lat: 32.3616, lng: 77.1645 },
      { name: "Old Manali", lat: 32.2571, lng: 77.1818 }
    ],
    itinerary: [
      { day: 1, title: "Cedar Chalet welcome & Log-fire evening", description: "Arrive at Old Manali and step inside a heated luxury cabin with beautiful peak views." },
      { day: 2, title: "Solang Private Gliding flight", description: "Fly over snowy river gorges in a double-glider with expert pilots." },
      { day: 3, title: "Atal Tunnel caravan & snow slopes", description: "Drive past the iconic engineering marvel of Atal Tunnel to reach winter wonderlands." },
      { day: 4, title: "Cedar forest apple picking & sunset", description: "Take a scenic walk in apple plantations, enjoy hot tea, local honey, and music." }
    ],
    hotels: [
      { name: "Span Resort & Spa Riverfront", rate: "4.9", cost: "₹18,500 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "The Solang Valley Glass Chalets", rate: "4.8", cost: "₹15,000 / night", img: "https://images.unsplash.com/photo-1626318305863-bb23d0297c0b?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Randeep Hooda", loc: "Chandigarh, IN", desc: "Fantastic mountain log cottages. Span riverfront resort makes you feel like you are in Canada.", score: 5 },
      { user: "Prachi Thakur", loc: "Kalyan, IN", desc: "Private gliding flight was thrilling. The apple picnic had amazing teas.", score: 5 }
    ],
    budget: [
      { item: "Paragliding, Atall Permits & Guides", percent: 25, val: "₹12,500" },
      { item: "Riverfront Chalet & Spa suite stay", percent: 50, val: "₹25,000" },
      { item: "Himalayan organic farm dishes", percent: 25, val: "₹12,500" }
    ],
    transport: {
      type: "Luxury SUV 4x4 Chauffeur",
      details: "Heated cabins, panoramic sun-roofs, and heavy grip wheels for absolute snow safety.",
      priceText: "Complimentary"
    },
    weather: [
      { day: "Today", temp: "10°C", cond: "Crisp peaks", icon: "✨" },
      { day: "Tomorrow", temp: "7°C", cond: "Passing snow", icon: "❄️" },
      { day: "Friday", temp: "9°C", cond: "Sunny valley", icon: "☀️" }
    ],
    experiences: ["Igloo Dome Stay", "Deep-Valley Gliding", "Snow-Peak Expeditions"]
  },
  {
    id: "11",
    title: "Kerala Backwaters & Healing",
    location: "Alleppey, Kerala",
    price: 75000,
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    category: "Tropical Serenity",
    description: "Soak in ultimate physical healing on the quiet canals of Alleppey. Slide along water networks on a traditional giant wood houseboat, and restore your senses with authentic Ayurvedic treatments.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["VIP Private Cedar Air-conditioned Houseboat", "Daily Shirodhara Ayurvedic body-oil therapies", "Sunset canoe tour along micro-canal farms", "Malabar chef-cooked organic coconut feast"],
    locations: [
      { name: "Vembanad Lake", lat: 9.6105, lng: 76.4026 },
      { name: "Alleppey Backwater docks", lat: 9.4981, lng: 76.3388 },
      { name: "Kumarakom Wildlife Reserve", lat: 9.5915, lng: 76.4259 }
    ],
    itinerary: [
      { day: 1, title: " Houseboat induction & Backwater sailing", description: "Step from private channels onto a teak floating home with solar panels, early coconuts in hand." },
      { day: 2, title: "Ayurvedic consultation & Shirodhara", description: "Meet certified doctors in the lakeside pavilion for a customized body massage using fresh forest oils." },
      { day: 3, title: "Scenic canoe micro-canal exploration", description: "Glide under low-lying coconut branches to appreciate ancient water agriculture." },
      { day: 4, title: "Malabar organic culinary lesson & birds tracking", description: "Prepare traditional fish cooked in banana leaves, watching migrating bird species." }
    ],
    hotels: [
      { name: "Kumarakom Lake Resort", rate: "4.9", cost: "₹24,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "Spice Coast Houseboats", rate: "4.8", cost: "₹18,500 / night", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Madhavan Nair", loc: "Ernakulam, IN", desc: "Kumarakom resort has an authentic heritage luxury feeling. The traditional massage solved my long-term stress fully.", score: 5 },
      { user: "Emily Watson", loc: "Boston, US", desc: "So tranquil! Sailing on canals while eating tropical pineapple from trees was majestic.", score: 5 }
    ],
    budget: [
      { item: " houseboats charters & lagoon guides", percent: 25, val: "₹18,750" },
      { item: "Resort Heritage Pool Villa stays", percent: 50, val: "₹37,500" },
      { item: "Ayurvedic massage & herbal banquets", percent: 25, val: "₹18,750" }
    ],
    transport: {
      type: "Silent Solar-Electric Houseboat Charter",
      details: "No loud motor sounds; drift along waterways under eco-friendly silent power.",
      priceText: "All-Inclusive"
    },
    weather: [
      { day: "Today", temp: "29°C", cond: "Warm breeze", icon: "✨" },
      { day: "Tomorrow", temp: "28°C", cond: "Passing shower", icon: "🌧️" },
      { day: "Friday", temp: "30°C", cond: "Clear sunset", icon: "☀️" }
    ],
    experiences: ["Backwater Float", "Shirodhara Therapy", "Organic Wetland Harvesting"]
  },
  {
    id: "12",
    title: "New York Penthouse Elegance",
    location: "Manhattan, USA",
    price: 280000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "Metropolitan Elite",
    description: "Witness the bright lights of Broadway and skyline views from a private high-rise penthouse. Explore private helicopter links, Manhattan yacht guides, and fastpasses to landmark museums.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Manhattan Harbor helicopter sky ride", "Broadway show VIP center-stalls", "Private curator gallery run at MoMA", "Bespoke dinner reservation at Michelin star venues"],
    locations: [
      { name: "Times Square", lat: 40.7580, lng: -73.9855 },
      { name: "Central Park Vista", lat: 40.7829, lng: -73.9654 },
      { name: "MoMA Museum", lat: 40.7614, lng: -73.9776 }
    ],
    itinerary: [
      { day: 1, title: "Penthouse check-in & Skyline views", description: "Arrive via luxury black sedan. Check into your private suite with deep-soaking bathtubs and views of the Empire State building." },
      { day: 2, title: "Private helicopter air loop", description: "Ride a luxury helicopter over Brooklyn Bridge and Central Park treetops, taking breathtaking high-definition photos." },
      { day: 3, title: "MoMA Curator tour & Broadway front-stalls", description: "A private run with modern art restorers, concluding with top theater tickets." },
      { day: 4, title: "Hudson River yacht dinner", description: "Sip classic drinks on a beautiful private boat, drifting around Statue of Liberty torches." }
    ],
    hotels: [
      { name: "The Ritz-Carlton Central Park", rate: "4.9", cost: "₹58,000 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
      { name: "Baccarat Hotel New York", rate: "4.8", cost: "₹70,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Rajiv Sethi", loc: "Delhi, IN", desc: "Incredible Broadway access! Helicopter loop over Manhattan skyscrapers was extremely exciting.", score: 5 },
      { user: "Jessica Parker", loc: "Brooklyn, USA", desc: "Top-notch transport. Highly professional coordinators. The penthouse view is absolutely gorgeous.", score: 5 }
    ],
    budget: [
      { item: "Manhattan Helicopter & Broadway Stalls", percent: 35, val: "₹98,000" },
      { item: "Central Park View Penthouse stays", percent: 45, val: "₹1,26,000" },
      { item: "Michelin Gastronomy dinners", percent: 20, val: "₹56,000" }
    ],
    transport: {
      type: "Black-Car VIP Tesla Sedan service",
      details: "Your personal electric chauffeur with full 24/7 on-call availability across Manhattan.",
      priceText: "Included"
    },
    weather: [
      { day: "Today", temp: "22°C", cond: "Sunny parks", icon: "☀️" },
      { day: "Tomorrow", temp: "20°C", cond: "Overcast skies", icon: "☁️" },
      { day: "Friday", temp: "21°C", cond: "Passing thunder", icon: "⛈️" }
    ],
    experiences: ["VIP Helicopter Ride", "Broadway Front Row", "Private MoMA Curator Tour"]
  },
  {
    id: "13",
    title: "London Royal Heritage Heritage",
    location: "Mayfair, United Kingdom",
    price: 220000,
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    category: "Imperial Grandeur",
    description: "Relish standard luxury Mayfair living and private tours inside Westminster Abbey. Enjoy traditional royal high tea, private vintage car rides, and Thames yacht expeditions.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529655683826-09571830febe?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Westminster Abbey historic private access", "The Ritz Mayfair Royal High Tea booking", "Privately guided castle vault excursions", "Elite Thames vintage yacht cruise"],
    locations: [
      { name: "Mayfair London", lat: 51.5090, lng: -0.1472 },
      { name: "Westminster", lat: 51.4993, lng: -0.1273 },
      { name: "Tower of London", lat: 51.5081, lng: -0.0759 }
    ],
    itinerary: [
      { day: 1, title: "Mayfair Arrival & High society welcome", description: "Pass tall brick mansions, entering your bespoke fireplace suite in the center of historic Mayfair." },
      { day: 2, title: "Westminster Abbey private tour", description: "Step beneath stone vaults under private guidance, walking through royal memories." },
      { day: 3, title: "The Ritz London Tea ritual", description: "Taste fresh pastries, custom tea, and classic scones in the world-famous golden ballroom." },
      { day: 4, title: "Thames Vintage Boat cruise", description: "Drink sparkling juice while passing Tower Bridge on a beautifully restored wood cruiser." }
    ],
    hotels: [
      { name: "The Connaught Mayfair", rate: "4.9", cost: "₹45,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "Claridge's Luxury Hotel", rate: "4.8", cost: "₹49,000 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Devender Singh", loc: "Punjab, IN", desc: "Authentic imperial grandeur. The Ritz high tea is very impressive, loved the classical piano performance.", score: 5 },
      { user: "Siddharth Sen", loc: "Kolkata, IN", desc: "Superb execution. Walking through Westminster without crowds felt majestic.", score: 5 }
    ],
    budget: [
      { item: "Westminster Abbey & Vault entry fees", percent: 25, val: "₹55,000" },
      { item: "Mayfair Fireplace master suites", percent: 50, val: "₹1,10,000" },
      { item: "Ritz High-Tea & Yacht cruises", percent: 25, val: "₹55,000" }
    ],
    transport: {
      type: "Retro electric Black-Cab hire",
      details: "A standard London black taxi fully retrofitted with clean silent electric engines and plush interiors.",
      priceText: "Complimentary"
    },
    weather: [
      { day: "Today", temp: "16°C", cond: "Soft Fog", icon: "🌫️" },
      { day: "Tomorrow", temp: "18°C", cond: "Overcast", icon: "☁️" },
      { day: "Friday", temp: "17°C", cond: "Gentle drizzle", icon: "🌧️" }
    ],
    experiences: ["Mayfair Living", "Royal Tea Sessions", "Vintage River Yachts"]
  },
  {
    id: "14",
    title: "Cappadocia Hot Air Magic",
    location: "Cappadocia, Turkey",
    price: 135000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "Historical Wonder",
    description: "Soar through orange clouds inside a private hot air balloon over fairy-tale rock chimneys. Stay in a beautifully sculpted luxury cave boutique suite with underground mineral spas.",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1527838832700-50592524df73?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Exclusive private Hot Air Balloon sunrise flight", "VIP sculptured Cave Boutique suite stays", "Historical Underground city private run", "Anatolian wine-tasting campfire night"],
    locations: [
      { name: "Göreme Valley", lat: 38.6431, lng: 34.8289 },
      { name: "Derinkuyu Underground", lat: 38.3736, lng: 34.7342 },
      { name: "Uçhisar Peak Lookout", lat: 38.6304, lng: 34.8055 }
    ],
    itinerary: [
      { day: 1, title: "Cave Sanctuary Arrival & Terraced sunset", description: "Arrive at Goreme. Sip Turkish tea on rugs overlooking standard fairy chimneys as skies glow violet." },
      { day: 2, title: "Private Hot Air Balloon flight", description: "Ascend at dawn as hundreds of colorful spheres float next to you, with luxury snack boards on board." },
      { day: 3, title: "Derinkuyu City Private guide", description: "Walk through deep carved tunnels used by ancient cultures to save history, far beneath the soils." },
      { day: 4, title: "Anatolian Organic Feast & Spas", description: "Soak inside heated cave pools, tasting clay-pot baked delicacies prepared by village grandmasters." }
    ],
    hotels: [
      { name: "Museum Hotel Cappadocia", rate: "4.9", cost: "₹30,000 / night", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
      { name: "Kayakapi Premium Caves", rate: "4.8", cost: "₹24,500 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Sunita Kapoor", loc: "Mumbai, IN", desc: "The cave suite was stunning, complete with underground custom heated pools. The hot air flight was an absolute spiritual experience.", score: 5 },
      { user: "Aylin Yildiz", loc: "Istanbul, TR", desc: "Incredible historical guides. Clean transitions, extremely polite hosts.", score: 5 }
    ],
    budget: [
      { item: "Private Hot-Air Balloon & City permits", percent: 35, val: "₹47,250" },
      { item: "Luxury Custom Cave master suites", percent: 45, val: "₹60,750" },
      { item: "Anatolian campfire feasts & Spas", percent: 20, val: "₹27,000" }
    ],
    transport: {
      type: "All-Wheel VIP SUV Transfer",
      details: "Spacious four-wheel drives suited for rocky valley dust trails and cave road navigation.",
      priceText: "Included"
    },
    weather: [
      { day: "Today", temp: "18°C", cond: "Calm Sunrise Winds", icon: "✨" },
      { day: "Tomorrow", temp: "19°C", cond: "Sunny Chimneys", icon: "☀️" },
      { day: "Friday", temp: "17°C", cond: "Brisk Gorges", icon: "🍃" }
    ],
    experiences: ["Hot Air Ballooning", "Cave Spa Pampering", "Underground City Walks"]
  },
  {
    id: "15",
    title: "Phuket Yacht & Island Luxury",
    location: "Phuket, Thailand",
    price: 80000,
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    category: "Coastal Escapes",
    description: "Sail past tall limestone cliffs of Phang Nga Bay on a private luxury motor catamaran. Rest inside beautiful sea-view villas featuring private infinity pools, and enjoy customized spa runs.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Phang Nga Bay Private Yacht charter", "Ocean Cliff-side luxury Infinity-Pool villa", "Authentic Thai Herbal VIP spa massages", "Sunset seafood beach fire barbecues"],
    locations: [
      { name: "Phuket Harbour Sea-port", lat: 7.8804, lng: 98.3922 },
      { name: "Phang Nga Bay", lat: 8.2727, lng: 98.6014 },
      { name: "Surin Cliffsidefront", lat: 7.9734, lng: 98.2789 }
    ],
    itinerary: [
      { day: 1, title: "Ocean Villa check-in & Private infinity dip", description: "Arrive at your Surin cliffside home, sipping chilled organic lemongrass water with panoramas of the Andaman Sea." },
      { day: 2, title: "Phang Nga private yacht sailing", description: "Sail past immortal giant rocky islands, stopping in hidden cave tunnels on small canoes." },
      { day: 3, title: "Thai Herbal SPA healing ritual", description: "A three-hour total body realignment involving steamed aromatic herb bags and deep trigger points manipulation." },
      { day: 4, title: "Sunset beach barbecue & live fire shows", description: "A private sand-side tables setup eating freshly roasted ocean seafood with live custom drum loops." }
    ],
    hotels: [
      { name: "Amanpuri Resort Phuket", rate: "4.9", cost: "₹26,000 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
      { name: "The Shore at Katathani Ocean Villas", rate: "4.8", cost: "₹21,000 / night", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" }
    ],
    reviews: [
      { user: "Kabir Mehta", loc: "Delhi, IN", desc: "The private motor yacht was clean, premium, and offered stellar snorkeling opportunities near the limestone caves.", score: 5 },
      { user: "Nattaporn S.", loc: "Bangkok, TH", desc: "A magnificent ocean stay. Steamed herbal spas cured my neck pain fully. Highly recommended in Rupees!", score: 5 }
    ],
    budget: [
      { item: "Phang Nga Yacht Charter & Cave guides", percent: 35, val: "₹28,000" },
      { item: "Surin Ocean Cliffside Infinity-Villa stays", percent: 45, val: "₹36,000" },
      { item: "Seafood fire barbecues & VIP spas", percent: 20, val: "₹16,000" }
    ],
    transport: {
      type: "Elite Speedboat Yacht & VIP Van service",
      details: "Private motor speedboats for bay hopping, with a luxury Mercedes van for land transfers.",
      priceText: "Fully covered"
    },
    weather: [
      { day: "Today", temp: "30°C", cond: "Tropical Sun", icon: "✨" },
      { day: "Tomorrow", temp: "29°C", cond: "Sea Breeze", icon: "🍃" },
      { day: "Friday", temp: "29°C", cond: "Golden Shore Sunset", icon: "☀️" }
    ],
    experiences: ["Catamaran Trips", "Latin Quarter Art", "Eco-Spice Farm Baths"]
  }
];
