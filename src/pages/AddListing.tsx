import { useState } from "react";

export default function AddListing() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "electronics"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product added:", formData);
    alert("تم إضافة المنتج بنجاح!");
    setFormData({ title: "", price: "", description: "", category: "electronics" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">إضافة منتج جديد</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">اسم المنتج</label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">السعر (IQD)</label>
          <input 
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">الفئة</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          >
            <option value="electronics">إلكترونيات</option>
            <option value="accessories">ملحقات</option>
            <option value="other">أخرى</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold mb-2">الوصف</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600 h-32"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-bold"
        >
          إضافة المنتج
        </button>
      </form>
    </div>
  );
}
