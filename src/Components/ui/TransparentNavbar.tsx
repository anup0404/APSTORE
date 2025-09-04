// components/navbar/TransparentNavbar.tsx
import { Menu, Search, X } from "lucide-react";
import { forwardRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVBAR_CONSTANTS } from "../../constants/navbar.constant";
import { LOGO_NAME } from "../../constants/global.constant";

interface TransparentNavbarProps {
  isScrolled: boolean;
  isVisible?: boolean;
}

const TransparentNavbar = forwardRef<HTMLElement, TransparentNavbarProps>(
  ({ isScrolled, isVisible = true }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
    const [cartCount] = useState(NAVBAR_CONSTANTS.DEFAULT_CART_COUNT);
    const location = useLocation();

    // 🔑 Fake auth state (replace with real logic)
    const [isLoggedIn] = useState(false);

    // 📌 Check if current route should have transparent navbar
    const isHomePage = location.pathname === "/";

    // 🔄 Close mobile menu on route change
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // 📌 Decide if navbar should use "dark" theme
    // For non-home pages, always use dark theme
    const forceDark = !isHomePage || isScrolled || isMobileMenuOpen;

    return (
      <header
        ref={ref}
        className={`fixed top-0 left-0 right-0 transition-all duration-500
    ${
      !isHomePage
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 z-50"
        : isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 z-50"
        : isMobileMenuOpen
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 lg:bg-transparent lg:shadow-none lg:border-none z-50"
        : "bg-transparent z-[60] pointer-events-none"
    }
    ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
        style={{ willChange: "transform" }}
      >
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pointer-events-auto">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Left Section: Mobile Menu + Logo */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors mr-2 sm:mr-4"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={`w-6 h-6 ${
                      forceDark ? "text-gray-800" : "text-white"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-6 h-6 ${
                      forceDark ? "text-gray-800" : "text-white"
                    }`}
                  />
                )}
              </button>

              {/* Logo */}
              <Link
                to="/"
                className={`text-xl sm:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-300
                  ${forceDark ? "text-gray-900" : "text-white"}`}
              >
                {LOGO_NAME}
              </Link>
            </div>

            {/* Center Section: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {NAVBAR_CONSTANTS.NAV_ITEMS.map((item) => {
                const hasCategories = Array.isArray(item.categories);

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() =>
                      hasCategories && setHoveredNavItem(item.label)
                    }
                    onMouseLeave={() =>
                      hasCategories && setHoveredNavItem(null)
                    }
                  >
                    <Link
                      to={item.to || "#"}
                      className={`text-xs xl:text-sm font-light tracking-wider uppercase transition-all duration-300 px-1 py-2
                        ${
                          forceDark
                            ? "text-gray-800 hover:text-black"
                            : "text-white/90 hover:text-white"
                        }
                        ${
                          hoveredNavItem === item.label
                            ? "border-b border-current"
                            : ""
                        }`}
                    >
                      {item.label}
                    </Link>

                    {/* Mega Menu */}
                    {hasCategories && hoveredNavItem === item.label && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                        <div className="bg-gray-900/95 backdrop-blur-md shadow-2xl rounded-lg border border-gray-700/30 p-6 w-64">
                          <div className="space-y-1">
                            {item.categories?.map((cat, idx) => (
                              <Link
                                key={idx}
                                to={cat.to || "#"}
                                className="block text-white/90 hover:text-white hover:bg-gray-800/50 px-3 py-2 text-sm font-light transition-all duration-200 rounded tracking-wide"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Section: Search + Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 
                      ${forceDark ? "text-gray-500" : "text-white/70"} 
                      pointer-events-none z-10`}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={NAVBAR_CONSTANTS.PLACEHOLDERS.SEARCH}
                    className={`w-48 lg:w-56 xl:w-64 pl-8 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 text-sm rounded-full transition-all duration-300
                      ${
                        forceDark
                          ? "bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-300"
                          : "bg-white/10 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/20"
                      }
                      outline-none`}
                  />
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                {NAVBAR_CONSTANTS.RIGHT_ICONS.map(
                  ({ name, icon: Icon, hover, hasBadge, to }) => {
                    if (name === "Profile") {
                      return (
                        <div key={name} className="relative group">
                          <Link to={isLoggedIn ? "/profile" : "/login"}>
                            <Icon
                              className={`w-5 h-5 transition-colors
                                ${
                                  forceDark
                                    ? `text-gray-700 ${hover.scrolled}`
                                    : `text-white/90 ${hover.default}`
                                }`}
                            />
                          </Link>
                          <span
                            className={`hidden lg:block text-xs mt-1 transition-colors
                              ${
                                forceDark
                                  ? "text-gray-700 group-hover:text-black"
                                  : "text-white/90 group-hover:text-white"
                              }`}
                          >
                            {isLoggedIn ? "Profile" : "Login"}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={name}
                        to={to || "#"}
                        className="relative group"
                      >
                        <div className="relative">
                          <Icon
                            className={`w-5 h-5 transition-colors
                              ${
                                forceDark
                                  ? `text-gray-700 ${hover.scrolled}`
                                  : `text-white/90 ${hover.default}`
                              }`}
                          />
                          {hasBadge && cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                              {cartCount}
                            </span>
                          )}
                        </div>
                        <span
                          className={`hidden lg:block text-xs mt-1 transition-colors
                            ${
                              forceDark
                                ? "text-gray-700 group-hover:text-black"
                                : "text-white/90 group-hover:text-white"
                            }`}
                        >
                          {name}
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              {NAVBAR_CONSTANTS.NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to || "#"}
                  className="block font-light tracking-wider uppercase text-sm sm:text-base text-gray-800 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder={NAVBAR_CONSTANTS.PLACEHOLDERS.SEARCH}
                    className="w-full pl-9 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
);

TransparentNavbar.displayName = "TransparentNavbar";
export default TransparentNavbar;
