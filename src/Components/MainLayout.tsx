import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Footer from "./ui/Footer/Footer";
import TransparentNavbar from "./ui/TransparentNavbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  useEffect(() => {
    // 🔧 FIX: Reset scroll state based on current route
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      // 🎯 KEY FIX: Reset to false when returning to home page
      setIsScrolled(false);
    }

    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > heroHeight);
    };

    // 🔧 FIX: Call handleScroll immediately to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin"); // detect admin routes

  return (
    <div className="min-h-screen flex flex-col font-serif">
      {/* Only show TransparentNavbar if not on admin pages */}
      {!isAdmin && (
        <TransparentNavbar isScrolled={isScrolled} isVisible={true} />
      )}

      <main className="flex-1">
        {isHome ? (
          <Outlet context={{ heroRef }} />
        ) : (
          <div className="pt-20">
            <Outlet />
          </div>
        )}
      </main>

      <Footer year={2025} />
    </div>
  );
};

export default MainLayout;
