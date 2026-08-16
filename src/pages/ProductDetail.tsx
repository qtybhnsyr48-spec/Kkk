import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();

  // Sample product data
  const product = {
    id: id || "1",
    title: "منتج عالي الجودة",
    price: 150000,
    image: "https://via.placeholder.com/600x400",
    description: "وصف تفصيلي للمنتج",
    specs: ["المواصفة 1", "المواصفة 2", "المواصفة 3"]
  };

  return (
    <div>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} />
        العودة
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full rounded-lg shadow" />
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-4xl font-bold text-blue-600 mb-6">{product.price.toLocaleString()} IQD</p>
          
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">المواصفات</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.specs.map((spec, i) => (
                <li key={i} className="text-gray-700">{spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-bold">
              أضف للسلة
            </button>
            <button 
              onClick={() => {
                if (isFavorited(product.id)) {
                  removeFavorite(product.id);
                } else {
                  addFavorite(product);
                }
              }}
              className={`py-3 px-6 rounded-lg transition text-lg font-bold ${
                isFavorited(product.id)
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart size={24} fill={isFavorited(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
