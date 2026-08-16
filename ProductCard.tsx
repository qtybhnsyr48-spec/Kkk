import { Link } from "react-router-dom";
import { Heart, MapPin, Eye, Tag } from "lucide-react";
import type { Product } from "../types";
import { formatIQD, conditionLabels } from "../data/marketplace";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ product }: { product: Product }) {
  const { isFav, add, remove } = useFavorites();
  const fav = isFav(product.id);

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-navy/[0.06] transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold/20">
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fav ? remove(product.id) : add(product);
          }}
          className={`absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition hover:scale-110 ${
            fav ? "bg-red-600 text-white" : "bg-white/90 text-navy hover:bg-white"
          }`}
        >
          <Heart size={17} className={fav ? "fill-white" : ""} />
        </button>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#1a1208]/80 px-3 py-1 text-[11px] font-bold text-gold-soft backdrop-blur-sm ring-1 ring-white/10">
          {conditionLabels[product.condition]}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-[15px] font-extrabold leading-6 text-navy">
            {product.title}
          </h3>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="text-lg font-black text-terracotta">{formatIQD(product.price)}</div>
          {product.negotiable && (
            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">قابل للتفاوض</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-navy/50">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} className="text-terracotta/60" /> {product.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye size={12} className="text-terracotta/60" /> {product.views}
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag size={12} className="text-terracotta/60" /> {product.category}
          </span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="mt-4 block rounded-2xl bg-[#1a1208] py-3 text-center text-sm font-bold text-gold-soft transition hover:bg-[#2a2218]"
        >
          التفاصيل
        </Link>
      </div>
    </div>
  );
}
