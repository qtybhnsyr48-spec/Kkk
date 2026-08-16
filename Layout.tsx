import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Heart,
  Search,
  PlusCircle,
  MapPin,
  Instagram,
  Facebook,
  Store,
  ArrowUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";

const nav = [
  { to: "/", label: "الرئيسية", icon: Store },
  { to: "/market", label: "السوق", icon: Search },
  { to: "/favorites", label: "المفضلات", icon: Heart },
  { to: "/about", label: "عن الموقع", icon: MapPin },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { count } = useFavorites();
  const loc = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink pattern-waves">
      {/* Top Banner */}
      <div className="relative z-50 bg-gold text-navy">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-bold md:text-sm">
          <span>🎉 إعلانك مجاني 100% — انشر الآن!</span>
          <Link to="/add" className="rounded-full bg-[#1a1208] px-3 py-1 text-gold-soft transition hover:scale-105">
            + أضف إعلان
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-gold/10 bg-[#1a1208]/90 backdrop-blur-xl text-sand shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/30 transition group-hover:ring-gold/60">
              <Store size={22} className="text-gold" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-black tracking-wide text-gold-soft">
                بالة و امزون
              </div>
              <div className="text-[10px] text-sand/50">العراق</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? "bg-gold text-navy shadow-gold/20 shadow-lg"
                      : "text-sand/70 hover:bg-white/10 hover:text-gold-soft"
                  }`
                }
              >
                <n.icon size={15} /> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Add listing button in header - very visible */}
            <Link
              to="/add"
              className="hidden items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105 md:flex"
            >
              <PlusCircle size={16} /> أنشر إعلان
            </Link>
            <Link
              to="/favorites"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-soft transition hover:bg-white/20"
              aria-label="المفضلات"
            >
              <Heart size={18} />
              {count > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white shadow">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="القائمة"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {nav.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }: { isActive: boolean }) =>
                      `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive ? "bg-gold text-navy" : "bg-white/5"
                      }`
                    }
                  >
                    <n.icon size={16} /> {n.label}
                  </NavLink>
                ))}
                <Link
                  to="/add"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-navy"
                >
                  <PlusCircle size={16} /> أضف إعلانك
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main key={loc.pathname} className="flex-1">
        <Outlet />
      </main>

      {/* Floating Action Button */}
      <Link
        to="/add"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-2xl shadow-gold/30 transition hover:scale-110 md:bottom-7 md:left-7 md:h-16 md:w-16"
        aria-label="أضف إعلان"
      >
        <PlusCircle size={28} />
      </Link>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollTop}
            className="fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1208] text-gold shadow-lg md:bottom-7 md:right-7"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="mt-12 bg-[#1a1208] text-sand">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/30">
                  <Store size={24} className="text-gold" />
                </div>
                <div>
                  <div className="text-xl font-black text-gold-soft">بالة و امزون</div>
                  <div className="text-sm text-sand/50">العراق</div>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-7 text-sand/60">
                سوق العراق الإلكتروني. بَعْ واشترِ كل شي: سيارات، عقارات، إلكترونيات،
                أثاث، ملابس، ألعاب، كتب وخدمات. إعلان مجاني، تواصل مباشر.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gold-soft">روابط</h3>
              <ul className="space-y-2 text-sm text-sand/60">
                <li><Link to="/market" className="hover:text-gold-soft transition">تصفّح السوق</Link></li>
                <li><Link to="/add" className="hover:text-gold-soft transition font-bold">أضف إعلانك</Link></li>
                <li><Link to="/favorites" className="hover:text-gold-soft transition">المفضلات</Link></li>
                <li><Link to="/about" className="hover:text-gold-soft transition">عن الموقع</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-gold-soft">تواصل</h3>
              <ul className="space-y-2 text-sm text-sand/60">
                <li className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold/60" /> بغداد · العراق
                </li>
                <li className="mt-3 flex gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                    <Instagram size={16} />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
                    <Facebook size={16} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-sand/30">
          © {new Date().getFullYear()} بالة و امزون العراق. صنع في العراق
        </div>
      </footer>
    </div>
  );
}
