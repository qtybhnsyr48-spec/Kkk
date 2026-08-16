export type ProductCategory =
  | "all"
  | "cars"
  | "real-estate"
  | "electronics"
  | "phones"
  | "furniture"
  | "appliances"
  | "clothes"
  | "games"
  | "books"
  | "services"
  | "wanted";

export type Condition = "new" | "used-like-new" | "used-good" | "used-fair";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  negotiable?: boolean;
  condition: Condition;
  category: ProductCategory;
  city: string;
  area: string;
  image: string;
  images?: string[];
  featured?: boolean;
  seller: string;
  phone?: string;
  postedAt: string;
  views: number;
  tags: string[];
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}
