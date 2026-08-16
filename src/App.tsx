import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import AddListing from "./pages/AddListing";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

export default function App() {
  return (
    <FavoritesProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="market" element={<Marketplace />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="add" element={<AddListing />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </FavoritesProvider>
  );
}
