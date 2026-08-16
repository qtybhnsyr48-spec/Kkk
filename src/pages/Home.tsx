import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();

  const products = [
    {
      id: "1",
      title: "هاتف ذكي",
      price: 150000,
      image: "https://via.placeholder.com/300x200?text=هاتف+ذكي",
      description: "هاتف ذكي حديث بمواصفات عالية"
    },
    {
      id: "2",
      title: "حاسوب محمول",
      price: 500000,
      image: "https://via.placeholder.com/300x200?text=حاسوب+محمول",
      description: "حاسوب محمول قوي وخفيف الوزن"
    },
    {
      id: "3",
      title: "كاميرا احترافية",
      price: 350000,
      image: "https://via.placeholder.com/300x200?text=كاميرا",
      description: "كاميرا احترافية عالية الجودة"
    }
  ];

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8 text-center">مرحباً بك في سوق العراق</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{product.price.toLocaleString()} IQD</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  عرض التفاصيل
                </button>
                <button 
                  onClick={() => {
                    if (isFavorited(product.id)) {
                      removeFavorite(product.id);
                    } else {
                      addFavorite(product);
                    }
                  }}
                  className={`py-2 px-4 rounded transition ${
                    isFavorited(product.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Heart size={20} fill={isFavorited(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
