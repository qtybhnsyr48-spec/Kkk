import { Link, useParams } from "react-router-dom";
import { Heart, MapPin, Eye, Calendar, User, Tag, Share2, MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Store } from "lucide-react";
import { conditionLabels, formatIQD, getProduct } from "../data/marketplace";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const p = getProduct(id ?? "");
  const { isFav, add, remove } = useFavorites();
  const [copied, setCopied] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  if (!p) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Store className="mx-auto text-navy/20" size={64} />
        <h1 className="mt-4 text-2xl font-black">الإعلان غير موجود</h1>
        <Link to="/market" className="mt-4 inline-block text-terracotta font-bold">رجوع للسوق</Link>
      </div>
    );
  }

  const fav = isFav(p.id);
  const allImages = [p.image, ...(p.images || [])].filter(Boolean);
  const currentImage = allImages[imgIndex] || p.image;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-navy/5 shadow-lg">
            <img src={currentImage} alt={p.title} className="h-96 w-full object-cover" />
            {allImages.length > 1 && (
              <>
                <button onClick={() => setImgIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg transition hover:scale-110">
                  <ChevronRight size={20} />
                </button>
                <button onClick={() => setImgIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-lg transition hover:scale-110">
                  <ChevronLeft size={20} />
                </button>
              </>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 transition ${i === imgIndex ? "ring-gold" : "ring-transparent"}`}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-block rounded-full bg-[#1a1208] px-3.5 py-1.5 text-[11px] font-bold text-gold-soft">
                {conditionLabels[p.condition]}
              </span>
              <h1 className="mt-3 text-2xl font-black leading-snug md:text-3xl">{p.title}</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { fav ? remove(p.id) : add(p); }}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition hover:scale-105 ${
                  fav ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-sand text-navy ring-1 ring-navy/10"
                }`}>
                <Heart size={18} className={fav ? "fill-white" : ""} />
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sand text-navy ring-1 ring-navy/10 transition hover:scale-105">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-terracotta">{formatIQD(p.price)}</div>
            {p.negotiable && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">قابل للتفاوض</span>
            )}
          </div>

          <p className="leading-8 text-navy/70 text-[15px]">{p.description}</p>

          <div className="grid gap-2 rounded-3xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="flex items-center gap-2.5 text-sm text-navy/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-terracotta"><MapPin size={16} /></div>
              <span>{p.city} · {p.area}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-navy/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-terracotta"><Calendar size={16} /></div>
              <span>{p.postedAt}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-navy/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-terracotta"><Eye size={16} /></div>
              <span>{p.views} مشاهدة</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-navy/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-terracotta"><User size={16} /></div>
              <span>الناشر: <span className="font-bold text-navy/80">{p.seller}</span></span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium text-navy/60">
                  <Tag size={10} className="inline ml-1" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-[1.02]">
              <MessageCircle size={20} /> تواصل مع البائع
            </button>
            <Link to="/market" className="inline-flex items-center justify-center rounded-2xl bg-sand px-6 py-4 font-bold text-navy ring-1 ring-navy/10 transition hover:bg-navy/5">
              <ArrowLeft size={18} /> السوق
            </Link>
          </div>

          {copied && (
            <div className="rounded-full bg-[#1a1208] px-5 py-2.5 text-center text-sm font-bold text-gold-soft shadow-lg">
              تم نسخ رابط الإعلان
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
