import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, FilterX, Megaphone, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, cities, conditionLabels, getAllProducts } from "../data/marketplace";
import type { ProductCategory } from "../types";
import ProductCard from "../components/ProductCard";

export default function Marketplace() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<ProductCategory>((params.get("cat") as ProductCategory) ?? "all");
  const [city, setCity] = useState("كل المدن");
  const [cond, setCond] = useState<"all" | "new" | "used">("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<"newest" | "price-low" | "price-high">("newest");

  const products = getAllProducts();

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.title + p.description + p.tags.join(" ") + p.city + p.area).toLowerCase();
      const matchQ = !q || hay.includes(q.trim().toLowerCase());
      const matchCat = cat === "all" || p.category === cat;
      const matchCity = city === "كل المدن" || p.city === city;
      const matchCond =
        cond === "all" ? true : cond === "new" ? p.condition === "new" : p.condition !== "new";
      const matchMin = !minPrice || p.price >= Number(minPrice) * 1000;
      const matchMax = !maxPrice || p.price <= Number(maxPrice) * 1000;
      return matchQ && matchCat && matchCity && matchCond && matchMin && matchMax;
    });
    out = [...out].sort((a, b) => {
      if (sort === "newest") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      if (sort === "price-low") return a.price - b.price;
      return b.price - a.price;
    });
    return out;
  }, [products, q, cat, city, cond, minPrice, maxPrice, sort]);

  const reset = () => {
    setQ(""); setCat("all"); setCity("كل المدن"); setCond("all"); setMinPrice(""); setMaxPrice("");
    setParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black">سوق بالة و امزون</h1>
        <p className="text-navy/50">{products.length} إعلان</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-navy/10 shadow-sm">
          <Search size={18} className="text-navy/30" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setParams(e.target.value ? { q: e.target.value } : {}); }}
            placeholder="ابحث عن سيارة، هاتف، أثاث..."
            className="w-full bg-transparent outline-none text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-navy/10 outline-none shadow-sm">
            {cities.map((c) => (<option key={c}>{c}</option>))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-navy/10 outline-none shadow-sm">
            <option value="newest">الأحدث</option>
            <option value="price-low">الأرخص</option>
            <option value="price-high">الأغلى</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition shadow-sm ${
              cat === c.id ? "bg-[#1a1208] text-gold-soft shadow-md" : "bg-white text-navy ring-1 ring-navy/10 hover:bg-sand"
            }`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {(["all", "new", "used"] as const).map((c) => (
          <button key={c} onClick={() => setCond(c)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-bold transition shadow-sm ${
              cond === c ? "bg-terracotta text-white" : "bg-white text-navy ring-1 ring-navy/10 hover:bg-sand"
            }`}>
            {c === "all" ? "الكل" : c === "new" ? "جديد" : "مستعمل"}
          </button>
        ))}
        <div className="flex items-center gap-2">
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="من (ألف)"
            className="w-24 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-navy/10 outline-none shadow-sm" />
          <span className="text-navy/30">-</span>
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="إلى (ألف)"
            className="w-24 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-navy/10 outline-none shadow-sm" />
        </div>
        <button onClick={reset} className="flex items-center gap-1 rounded-full bg-sand px-3 py-1.5 text-sm font-bold text-navy/60 hover:text-navy transition">
          <FilterX size={14} /> إعادة
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-14 text-center ring-1 ring-navy/5 shadow-sm">
          <Megaphone className="text-navy/20" size={64} />
          <div>
            <h3 className="text-xl font-black text-navy">السوق فاضي حالياً</h3>
            <p className="mt-2 text-navy/50 max-w-md mx-auto">
              أنت أول واحد! انشر إعلانك الآن وخلّي السوق يمتلئ بالمنتجات. إعلان مجاني 100%.
            </p>
          </div>
          <Link to="/add" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">
            <PlusCircle size={18} /> أنشر أول إعلان
          </Link>
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-3xl bg-white p-14 text-center text-navy/50 ring-1 ring-navy/5 shadow-sm">
          <Search className="mx-auto mb-3 text-navy/20" size={48} />
          <p className="font-bold">ماكو نتائج بهالبحث</p>
          <p className="text-sm mt-1">جرّب تغيير المعايير أو إعادة البحث</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
