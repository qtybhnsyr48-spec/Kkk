import { useState, FormEvent, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { categories, cities, conditionLabels, saveUserProduct } from "../data/marketplace";
import { X, CheckCircle2, ImagePlus, Upload, Phone, User, Tag, MapPin, DollarSign, FileText } from "lucide-react";
import type { Product } from "../types";

export default function AddListing() {
  const [done, setDone] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    negotiable: false,
    condition: "used-good" as "new" | "used-like-new" | "used-good" | "used-fair",
    category: "electronics" as string,
    city: "بغداد",
    area: "",
    seller: "",
    phone: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsUploading(true);
    const promises = Array.from(files).map((file) =>
      new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => { if (ev.target?.result) resolve(ev.target.result as string); };
        reader.readAsDataURL(file);
      })
    );
    Promise.all(promises).then((results) => {
      setUploadedImages((prev) => [...prev, ...results]);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.seller) return;

    const product: Product = {
      id: "user-" + Date.now(),
      title: form.title,
      description: form.description,
      price: Number(form.price),
      negotiable: form.negotiable,
      condition: form.condition,
      category: form.category as any,
      city: form.city,
      area: form.area || form.city,
      image: uploadedImages[0] || "/images/hero-market.jpg",
      images: uploadedImages.length > 1 ? uploadedImages : undefined,
      featured: false,
      seller: form.seller,
      phone: form.phone || undefined,
      postedAt: new Date().toISOString().split("T")[0],
      views: 0,
      tags: [form.category, form.condition, form.city].filter(Boolean),
    };

    saveUserProduct(product);
    setDone(true);
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto text-emerald-600" size={72} />
        <h1 className="mt-5 text-3xl font-black">تم نشر إعلانك!</h1>
        <p className="mt-2 text-navy/60">إعلانك صار متاح في السوق. تقدر تضيف إعلان ثاني.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/market" className="rounded-full bg-gold px-6 py-3 font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">تصفّح السوق</Link>
          <Link to="/add" className="rounded-full bg-[#1a1208] px-6 py-3 font-bold text-gold-soft transition hover:bg-[#2a2218]">إعلان جديد</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-black">أضف إعلانك</h1>
      <p className="mt-1 text-navy/50">إعلان مجاني 100% — انشر منتجك مع صورك من المعرض</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-navy/5 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold">
            <ImagePlus size={18} className="text-terracotta" /> صور المنتج
          </h2>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

          {uploadedImages.length === 0 ? (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy/15 bg-sand p-10 text-center transition hover:border-gold/40 hover:bg-gold/5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a1208] text-gold">
                <Upload size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-navy/80">اضغط هنا لاختيار صور من المعرض</p>
                <p className="mt-1 text-xs text-navy/40">JPEG, PNG — حتى 5 صور</p>
              </div>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-navy/10">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow">
                      <X size={13} />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1.5 right-1.5 rounded-full bg-[#1a1208] px-2 py-0.5 text-[10px] font-bold text-gold-soft">الرئيسية</span>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-navy/15 bg-sand transition hover:border-gold/40">
                  <Upload size={20} className="text-navy/40" />
                  <span className="text-[10px] text-navy/50">إضافة</span>
                </button>
              </div>
            </div>
          )}
          {isUploading && <p className="text-center text-sm text-navy/60">جاري تحميل الصور...</p>}
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-navy/5 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold">
            <Tag size={18} className="text-terracotta" /> معلومات المنتج
          </h2>
          <div className="grid gap-4">
            <label className="text-sm font-semibold">
              <span className="flex items-center gap-1.5 mb-1.5"><Tag size={14} className="text-terracotta/60" /> عنوان الإعلان</span>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="مثال: كيا سيراتو 2015 أبيض"
                className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
            </label>
            <label className="text-sm font-semibold">
              <span className="flex items-center gap-1.5 mb-1.5"><FileText size={14} className="text-terracotta/60" /> الوصف التفصيلي</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4} placeholder="صف حالة المنتج، المواصفات، سبب البيع..."
                className="w-full resize-none rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                <span className="flex items-center gap-1.5 mb-1.5"><DollarSign size={14} className="text-terracotta/60" /> السعر (د.ع)</span>
                <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="500000"
                  className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold pt-7">
                <input type="checkbox" checked={form.negotiable} onChange={(e) => setForm({ ...form, negotiable: e.target.checked })}
                  className="h-5 w-5 rounded accent-gold" />
                السعر قابل للتفاوض
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                <span className="mb-1.5 block">الحالة</span>
                <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as typeof form.condition })}
                  className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10">
                  {Object.entries(conditionLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                <span className="mb-1.5 block">القسم</span>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10">
                  {categories.filter((c) => c.id !== "all").map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-navy/5 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold">
            <MapPin size={18} className="text-terracotta" /> الموقع والتواصل
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              <span className="mb-1.5 block">المدينة</span>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10">
                {cities.filter((c) => c !== "كل المدن").map((c) => (<option key={c}>{c}</option>))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              <span className="mb-1.5 block">المنطقة / الحي</span>
              <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="الكرادة، المنصور..."
                className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
            </label>
            <label className="text-sm font-semibold">
              <span className="flex items-center gap-1.5 mb-1.5"><User size={14} className="text-terracotta/60" /> اسم الناشر</span>
              <input required value={form.seller} onChange={(e) => setForm({ ...form, seller: e.target.value })}
                placeholder="اسمك أو اسم المحل"
                className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
            </label>
            <label className="text-sm font-semibold">
              <span className="flex items-center gap-1.5 mb-1.5"><Phone size={14} className="text-terracotta/60" /> رقم الهاتف (اختياري)</span>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="07xx xxx xxxx"
                className="w-full rounded-2xl bg-sand px-4 py-3.5 outline-none ring-1 ring-navy/10 focus:ring-gold transition" />
            </label>
          </div>
          <p className="mt-3 text-xs text-navy/40">رقم الهاتف يظهر فقط للمشترين المهتمين.</p>
        </div>

        <button type="submit"
          className="w-full rounded-2xl bg-gold py-4 text-lg font-black text-navy shadow-lg shadow-gold/20 transition hover:scale-[1.02]">
          نشر الإعلان المجاني
        </button>
      </form>
    </div>
  );
}
