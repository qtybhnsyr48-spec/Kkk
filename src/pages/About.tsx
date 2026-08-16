export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">عننا</h2>
      
      <div className="bg-white rounded-lg shadow p-8 space-y-6">
        <section>
          <h3 className="text-2xl font-bold mb-3">من نحن؟</h3>
          <p className="text-gray-700 leading-relaxed">
            بالة و امزون العراق هي منصة إلكترونية موثوقة تهدف إلى تسهيل عملية البيع والشراء في العراق. نحن نوفر تجربة تسوق آمنة وسهلة للعملاء الكرام.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-3">رؤيتنا</h3>
          <p className="text-gray-700 leading-relaxed">
            أن نكون المنصة الأولى والموثوقة للتجارة الإلكترونية في العراق، حيث يمكن للجميع بيع وشراء المنتجات بسهولة وأمان.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-3">قيمنا</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>الأمانة والشفافية</li>
            <li>جودة الخدمة</li>
            <li>رضا العملاء</li>
            <li>الابتكار المستمر</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-3">تواصل معنا</h3>
          <div className="space-y-2 text-gray-700">
            <p>البريد الإلكتروني: info@marketplace-iraq.com</p>
            <p>الهاتف: +964 7700 000 000</p>
            <p>العنوان: بغداد، العراق</p>
          </div>
        </section>
      </div>
    </div>
  );
}
