import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, PlusCircle, TrendingUp, Sparkles, ShoppingBag, Star, Camera, Megaphone } from "lucide-react";
import { categories, getFeatured, getAllProducts } from "../data/marketplace";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Home() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const featured = getFeatured();
  const allCount = getAllProducts().length;

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden bg-[#1a1208] text-sand">
        <img src="/images/hero-market.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/80 to-[#1a1208]/50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold-soft backdrop-blur-sm">
              <Sparkles size={13} /> أول سوق إلكتروني عراقي للجديد والمستعمل
            </div>
            <h1 className="text-5xl font-black leading-[1.15] md:text-7xl">
              <span className="text-gold-soft">بالة</span>
              <span className="mx-2 text-navy/50 font-light">و</span>
              <span className="text-gold">امزون</span>
              <span className="block text-2xl font-bold mt-3 text-sand/70 md:text-3xl">العراق</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-sand/80 md:text-lg">
              بَعْ شي ما تريده، واشترِ اللي تحتاجه. سيارات، عقارات، إلكترونيات، أثاث، ملابس، ألعاب —
              كل شي جديد ومستعمل من كل مدن العراق.
            </p>
            <form
              className="mt-7 flex overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-2xl shadow-gold/10 backdrop-blur"
              onSubmit={(e) => { e.preventDefault(); nav(`/market?q=${encodeURIComponent(q)}`); }}
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن سيارة، هاتف، أثاث، شقة..."
                className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-navy outline-none placeholder:text-navy/30 text-sm md:text-base"
              />
              <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-navy transition hover:scale-105">
                <Search size={18} /> بحث
              </button>
            </form>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/market" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">
                تصفّح السوق <ArrowLeft size={16} />
              </Link>
              <Link to="/add" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 font-bold text-gold-soft transition hover:bg-gold/10">
                <Camera size={16} /> أضف إعلانك
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden md:block">
            <div className="overflow-hidden rounded-[2.5rem] border border-gold/20 shadow-2xl shadow-black/40">
              <img src="/images/hero-market.jpg" alt="سوق العراق" className="h-[420px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-[#1a1208]/90 px-5 py-3 text-sm font-bold text-gold-soft ring-1 ring-gold/20 backdrop-blur">
              <span className="flex items-center gap-1.5"><Star size={14} className="fill-gold text-gold" /> {allCount} إعلان</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Big Add Listing CTA Section */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-[#1a1208] p-8 text-sand md:p-10 ring-1 ring-gold/20 shadow-xl">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-right md:justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl font-black text-gold-soft md:text-3xl">عندك شي تبيعه؟</h2>
              <p className="mt-3 leading-8 text-sand/70">
                انشر إعلانك مجاناً في بالة و امزون العراق. صور من معرض هاتفك، تفاصيل المنتج، ورقم هاتفك —
                وإعلانك يوصل لآلاف المشترين.
              </p>
            </div>
            <Link to="/add" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-bold text-navy shadow-xl shadow-gold/20 transition hover:scale-105">
              <PlusCircle size={22} /> أنشر إعلانك الآن
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: PlusCircle, t: "إعلان مجاني", d: "أضف إعلانك بدون أي رسوم" },
            { icon: TrendingUp, t: "آلاف المشاهدات", d: "إعلانك يوصل لكل العراق" },
            { icon: ShoppingBag, t: "بحث ذكي", d: "فلترة حسب المدينة والسعر والقسم" },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy/5 shadow-sm transition hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a1208] text-gold">
                <x.icon size={22} />
              </div>
              <div>
                <div className="font-extrabold">{x.t}</div>
                <div className="mt-0.5 text-sm text-navy/50">{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 text-xl font-black text-navy/80">تصفّح بالأقسام</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.filter((c) => c.id !== "all").map((c) => (
            <Link
              key={c.id}
              to={`/market?cat=${c.id}`}
              className="group flex flex-col items-center gap-2 rounded-3xl bg-white p-4 ring-1 ring-navy/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-gold/30"
            >
              <span className="text-3xl transition group-hover:scale-110">{c.icon}</span>
              <span className="text-sm font-bold text-navy/80">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured or Empty State */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black md:text-3xl text-navy">إعلانات مميزة</h2>
            <p className="text-sm text-navy/50">أحدث العروض في بالة و امزون العراق</p>
          </div>
          <Link to="/market" className="text-sm font-bold text-terracotta transition hover:underline">عرض الكل</Link>
        </div>

        {featured.length === 0 ? (
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
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="overflow-hidden rounded-[2rem] bg-[#1a1208] text-sand md:grid md:grid-cols-2">
          <img src="/images/hero-market.jpg" alt="سوق العراق" className="h-64 w-full object-cover md:h-full" />
          <div className="p-8 md:p-12">
            <h2 className="font-amiri text-3xl font-bold text-gold-soft md:text-4xl leading-relaxed">
              من سومر للعراق… سوقكم الإلكتروني
            </h2>
            <p className="mt-4 leading-8 text-sand/70">
              سيارات، عقارات، إلكترونيات، أثاث، ملابس، ألعاب، كتب وخدمات — كل شي تقدر
              تبيعه وتشتريه من خلال بالة و امزون العراق. إعلانات مجانية وتواصل مباشر بين البائع والمشتري.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/add" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">
                <PlusCircle size={16} /> أضف إعلانك مجاناً
              </Link>
              <Link to="/market" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-2.5 text-sm font-bold text-gold-soft transition hover:bg-gold/10">
                تصفّح السوق
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
