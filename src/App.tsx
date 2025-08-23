import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import MainLayout from "./Components/MainLayout";
import ProductDetailsPage from "./pages/ProductDetailPage";
import LuxuryWishlist from "./Components/ui/Wishlist/Wishlist";
import LuxuryShoppingBag from "./Components/ui/ShoppingBag/LuxuryShoppingBag";
import Dashboard from "./Components/ui/Admin/Admin";
import AdminLayout from "./Components/AdminLayout";
// import AuthPage from "./pages/AuthPage";
// import OrderDetails from "./Components/ui/order/OrderDetails/OrderDetail";
// import ShoppingCart from "./Components/ui/ShoppingCart/ShoppingCart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<LuxuryWishlist />} />
          <Route path="/cart" element={<LuxuryShoppingBag />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* later you can add more admin routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
