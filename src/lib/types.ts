export type Role = "artisan" | "buyer" | "admin";
export type ProfileStatus = "incomplete" | "pending" | "verified";

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
  status: ProfileStatus;
  phone?: string | null;
  state?: string | null;
  district?: string | null;
  location?: string | null;
  craft_category?: string | null;
  business_name?: string | null;
  business_category?: string | null;
  about?: string | null;
  avatar_url?: string | null;
  completion_percent?: number | null;
}

export interface Product {
  id: string;
  name: string | null;
  category: string | null;
  material?: string | null;
  craft_type?: string | null;
  region?: string | null;
  description?: string | null;
  description_hi?: string | null;
  price: number | null;
  currency?: string | null;
  status: "draft" | "review" | "published" | "archived";
  image_url: string | null;
  artisan?: { id: string; name: string | null; location?: string | null; verified?: boolean } | null;
  wishlisted?: boolean;
  ai_confidence?: number | null;
}

export interface BuyerRequest {
  id: string;
  category: string;
  description: string;
  quantity: number;
  budget_per_unit: number;
  location: string;
  deadline: string | null;
  status: "open" | "matching" | "matched" | "closed";
  created_at?: string;
  matches_count?: number;
}

export interface Match {
  id: string;
  artisan_name: string;
  craft: string | null;
  location: string | null;
  estimated_price: number | null;
  match_score: number;
  reason: string | null;
}

export interface Opportunity {
  id: string;
  category: string;
  demand: "LOW" | "MEDIUM" | "HIGH";
  demand_score: number;
  potential_buyers: number;
  suggested_quantity: number;
  price_min: number;
  price_max: number;
  reason?: string | null;
}
