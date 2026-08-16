import { Link } from "react-router-dom";
import { PlusCircle, Store, Search, Heart, Camera, DollarSign } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#1a1208] py-20 text-sand">
        <img src="/images/hero-market.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[#1a1208]/70" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/30">
            <Store size={32} className="text-gold" />
          </div>
          <div className="text-sm font-bold text-gold-soft">عن بالة و امزون العراق</div>
          <h1 className="mt-3 font-amiri text-4xl font-bold md:text-5xl leading-tight">
            بالة و امزون العراق
          </h1>
          <p className="mt-5 leading-8 text-sand/70">
            أول منصة عراقية متخصصة في بيع وشراء المنتجات الجديدة والمستعملة. من سومر وبابل
            إلى كل مدن العراق — نربط البائع بالمشتري بشكل مباشر وسريع.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-4 py-14 leading-8 text-navy/75">
        <p className="text-lg">
          بالة و امزون العراق بدأ من فكرة بسيطة: العراقي عنده شي يبي يبيعه، وعنده شي ثاني يبي يشتريه.
          ليش ما يكون فيه مكان واحد يجمع الكل؟ من هنا طلعت بالة و امزون العراق — سوق إلكتروني
          يشمل كل المدن العراقية.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: PlusCircle, t: "إعلان مجاني", d: "أضف إعلانك بدون أي رسوم" },
            { icon: Camera, t: "صور من المعرض", d: "ارفع صور منتجك مباشرة من هاتفك" },
            { icon: Search, t: "بحث ذكي", d: "فلترة حسب المدينة، السعر، والقسم" },
            { icon: Heart, t: "مفضلات", d: "احفظ الإعلانات اللي تعجبك" },
            { icon: DollarSign, t: "تفاوض مباشر", d: "تواصل مع البائع واتفق على السعر" },
            { icon: Store, t: "كل العراق", d: "إعلانات من بغداد، البصرة، الموصل، وأربيل" },
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

        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img src="/images/hero-market.jpg" alt="سوق العراق" className="w-full object-cover" />
        </div>

        <h2 className="text-2xl font-black text-navy">الأقسام المتاحة</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">🚗 سيارات</div>
            <div className="text-sm text-navy/50">سيارات مستعملة وجديدة، دراجات نارية</div>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">🏠 عقارات</div>
            <div className="text-sm text-navy/50">شقق للبيع والإيجار، بيوت، أراضي</div>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">💻 إلكترونيات وهواتف</div>
            <div className="text-sm text-navy/50">لابتوبات، هواتف، كمبيوترات، أجهزة</div>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">🛋️ أثاث وأجهزة منزلية</div>
            <div className="text-sm text-navy/50">كنب، ثلاجات، مكيفات، أدوات بيت</div>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">👕 ملابس وأزياء</div>
            <div className="text-sm text-navy/50">ملابس رجالية ونسائية، إكسسوارات</div>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-navy/5 shadow-sm">
            <div className="font-bold text-lg">🎮 ألعاب وكتب وخدمات</div>
            <div className="text-sm text-navy/50">PS5، Xbox، روايات، نقل، صيانة</div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#1a1208] p-8 text-sand">
          <h3 className="text-xl font-black text-gold-soft">انضم لبالة و امزون العراق اليوم</h3>
          <p className="mt-3 text-sand/60 leading-7">
            إعلانك مجاني ويوصل لآلاف المشاهدين. صورك من معرض هاتفك، تفاصيلك، ورقم هاتفك —
            والباقي علينا.
          </p>
          <Link to="/add" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy shadow-lg shadow-gold/20 transition hover:scale-105">
            <PlusCircle size={16} /> أضف إعلانك مجاناً
          </Link>
        </div>
      </section>
    </div>
  );
}
