import { Link } from "react-router-dom";
import { Heart, Store } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const { items } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <Heart className="mx-auto text-navy/15" size={72} />
        <h1 className="mt-5 text-3xl font-black">المفضلات فارغة</h1>
        <p className="mt-2 text-navy/50">اضغط على قلب أي إعلان تحبه حتى تحفظه هنا</p>
        <Link to="/market" className="mt-7 inline-block rounded-full bg-gold px-6 py-3 font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">
          تصفّح السوق
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black">المفضلات</h1>
      <p className="text-navy/50">{items.length} إعلان محفوظ</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
