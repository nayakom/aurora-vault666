export interface AffiliateLink {
  platform: string;
  url: string;
  rating: number;
  reviews: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  usage: string;
  specifications: Record<string, string>;
  price: number;
  imageUrl: string;
  images: string[];
  affiliates: {
    amazon?: AffiliateLink;
    flipkart?: AffiliateLink;
    meesho?: AffiliateLink;
    myntra?: AffiliateLink;
  };
  rating: number;
  labels?: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Obsidian Chronograph",
    description: "A masterfully crafted timepiece featuring a deep black dial with subtle gold hands. Precision meets mystery.",
    usage: "Designed for the modern elite. Wear this chronograph during high-stakes boardroom meetings or exclusive evening galas to subtly project authority and impeccable taste. The scratch-resistant sapphire crystal ensures it remains pristine through all of life's endeavors.",
    specifications: {
      "Material": "Aerospace-grade Titanium",
      "Movement": "Automatic Swiss Movement",
      "Water Resistance": "100m (10 ATM)",
      "Crystal": "Anti-reflective Sapphire",
      "Weight": "142g"
    },
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508656936384-59e602497645?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.9,
    affiliates: {
      amazon: { platform: "Amazon", url: "#", rating: 4.8, reviews: 1250 },
      flipkart: { platform: "Flipkart", url: "#", rating: 4.7, reviews: 890 },
      myntra: { platform: "Myntra", url: "#", rating: 4.9, reviews: 450 }
    }
  },
  {
    id: "p2",
    name: "Aura Noise-Cancelling Headphones",
    description: "Immerse yourself in pure silence. Matte black finish with adaptive ambient isolation.",
    usage: "Perfect for deep work sessions, long-haul flights, or completely detaching from the chaotic world. The adaptive isolation listens to your environment and neutralizes frequencies that disrupt your peace.",
    specifications: {
      "Battery Life": "40 Hours",
      "Connectivity": "Bluetooth 5.3 / Wired 3.5mm",
      "Driver Size": "40mm Custom Tuned",
      "Noise Cancellation": "Active (Up to 35dB reduction)"
    },
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.8,
    affiliates: {
      amazon: { platform: "Amazon", url: "#", rating: 4.7, reviews: 3200 },
      flipkart: { platform: "Flipkart", url: "#", rating: 4.6, reviews: 1500 },
      meesho: { platform: "Meesho", url: "#", rating: 4.2, reviews: 800 }
    }
  },
  {
    id: "p3",
    name: "The Executive Leather Wallet",
    description: "Minimalist, RFID-blocking wallet crafted from premium full-grain leather.",
    usage: "Carry your essential cards and currency with elegance. The built-in RFID blocking technology ensures your financial data remains secure from digital pickpockets while maintaining a slim profile in your pocket.",
    specifications: {
      "Material": "Full-grain Italian Leather",
      "Capacity": "Up to 8 cards + Cash clip",
      "Security": "Military-grade RFID blocking",
      "Dimensions": "4.1\" x 2.8\" x 0.4\""
    },
    price: 85,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.7,
    affiliates: {
      amazon: { platform: "Amazon", url: "#", rating: 4.8, reviews: 950 },
      myntra: { platform: "Myntra", url: "#", rating: 4.7, reviews: 300 }
    }
  },
  {
    id: "p4",
    name: "Midnight Aviator Glasses",
    description: "See the world differently. Polarized lenses with a lightweight titanium alloy frame.",
    usage: "Engineered to cut through blinding glare. Whether you are driving at dawn or lounging at a private resort, these lenses provide absolute clarity and UV400 protection.",
    specifications: {
      "Frame": "Matte Black Titanium Alloy",
      "Lenses": "Polarized Polycarbonate",
      "UV Protection": "100% UV400",
      "Weight": "24g"
    },
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.9,
    affiliates: {
      amazon: { platform: "Amazon", url: "#", rating: 4.9, reviews: 2100 },
      flipkart: { platform: "Flipkart", url: "#", rating: 4.8, reviews: 1100 },
      myntra: { platform: "Myntra", url: "#", rating: 4.9, reviews: 600 },
      meesho: { platform: "Meesho", url: "#", rating: 4.5, reviews: 450 }
    }
  }
];
