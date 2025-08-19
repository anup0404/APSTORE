import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
import Home from "./pages/HomePage";
import ProductDetails from "./Components/ui/ProductDetail/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/login" element={<AuthPage />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
