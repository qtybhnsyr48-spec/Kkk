import type { Product, ProductCategory } from "../types";

export const categories: { id: ProductCategory; label: string; icon: string }[] = [
  { id: "all", label: "الكل", icon: "🛒" },
  { id: "cars", label: "سيارات", icon: "🚗" },
  { id: "real-estate", label: "عقارات", icon: "🏠" },
  { id: "electronics", label: "إلكترونيات", icon: "💻" },
  { id: "phones", label: "هواتف", icon: "📱" },
  { id: "furniture", label: "أثاث", icon: "🛋️" },
  { id: "appliances", label: "أجهزة منزلية", icon: "❄️" },
  { id: "clothes", label: "ملابس", icon: "👕" },
  { id: "games", label: "ألعاب", icon: "🎮" },
  { id: "books", label: "كتب", icon: "📚" },
  { id: "services", label: "خدمات", icon: "🔧" },
  { id: "wanted", label: "مطلوب", icon: "📢" },
];

export const cities = ["كل المدن", "بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء", "السليمانية", "ذي قار"];

export const conditionLabels: Record<string, string> = {
  new: "جديد",
  "used-like-new": "مستعمل كالجديد",
  "used-good": "مستعمل جيد",
  "used-fair": "مستعمل بحالة مقبولة",
};

export const defaultProducts: Product[] = [];

const USER_PRODUCTS_KEY = "bala-user-products";

export function getUserProducts(): Product[] {
  try {
    const raw = localStorage.getItem(USER_PRODUCTS_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export function saveUserProduct(product: Product) {
  const existing = getUserProducts();
  existing.unshift(product);
  localStorage.setItem(USER_PRODUCTS_KEY, JSON.stringify(existing));
}

export function getAllProducts(): Product[] {
  return [...getUserProducts(), ...defaultProducts];
}

export function formatIQD(n: number): string {
  return new Intl.NumberFormat("ar-IQ").format(n) + " د.ع";
}

export function getProduct(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getFeatured(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}
