import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import type { MenuItem, NavbarProps } from "./Navbar.type";
import { NAVBAR_CONSTANTS } from "../../../constants/navbar.constant";
import Button from "../Button";
import Input from "../Input";

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className = "",
      onSearch,
      cartItemCount = NAVBAR_CONSTANTS.DEFAULT_CART_COUNT,
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("MEN");
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const megaMenuTimeoutRef = useRef<number | null>(null);

    // close profile dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          profileDropdownRef.current &&
          !profileDropdownRef.current.contains(event.target as Node)
        ) {
          setIsProfileDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close things on Escape
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === NAVBAR_CONSTANTS.KEYS.ESCAPE) {
          setIsMobileMenuOpen(false);
          setIsProfileDropdownOpen(false);
          setSearchFocused(false);
          setHoveredNavItem(null);
          searchRef.current?.blur();
        }
      };
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === NAVBAR_CONSTANTS.KEYS.ENTER && searchQuery.trim()) {
        onSearch?.(searchQuery.trim());
        setSearchFocused(false);
      }
    };

    // const handleSearchSuggestionClick = (term: string) => {
    //   setSearchQuery(term);
    //   setSearchFocused(false);
    //   onSearch?.(term);
    // };

    const handleMobileMenuClose = () => {
      setIsMobileMenuOpen(false);
    };

    const handleNavClick = (label: string) => {
      setActiveNav(activeNav === label ? "" : label);
    };

    // Mega menu hover
    const handleNavItemMouseEnter = (itemLabel: string) => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
        megaMenuTimeoutRef.current = null;
      }
      setHoveredNavItem(itemLabel);
    };
    const handleNavItemMouseLeave = () => {
      megaMenuTimeoutRef.current = setTimeout(() => {
        setHoveredNavItem(null);
      }, 150);
    };
    const handleMegaMenuMouseEnter = () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
        megaMenuTimeoutRef.current = null;
      }
    };
    const handleMegaMenuMouseLeave = () => {
      setHoveredNavItem(null);
    };

    const renderMenuItem = (item: MenuItem, key: string) => {
      const IconComponent = item.icon;
      return (
        <a
          key={key}
          href={item.href}
          className="flex items-center px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-600"
        >
          <IconComponent className="w-4 h-4 mr-3" />
          {item.label}
        </a>
      );
    };

    const renderQuickLink = (item: MenuItem, key: string) => {
      const IconComponent = item.icon;
      return (
        <a
          key={key}
          href={item.href}
          className="flex items-center text-sm text-gray-600 hover:text-gray-600"
        >
          <IconComponent className="w-4 h-4 mr-3" />
          {item.label}
        </a>
      );
    };

    return (
      <>
        <header
          ref={ref}
          className={`sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 ${className}`}
        >
          <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center h-16 lg:h-[70px]">
              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 mr-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </Button>

              {/* Logo */}
              <div className="flex-shrink-0 mr-4 lg:mr-8">
                <a href="#" className="flex items-center">
                  <div className="bg-black w-10 h-8 inline-flex items-center justify-center rounded">
                    <span className="text-white font-bold text-lg">AP</span>
                  </div>
                </a>
              </div>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 mr-6">
                {NAVBAR_CONSTANTS.NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleNavItemMouseEnter(item.label)}
                    onMouseLeave={handleNavItemMouseLeave}
                  >
                    <Button
                      onClick={() => setActiveNav(item.label)}
                      className={`text-sm font-bold uppercase tracking-wide px-2 py-4 rounded ${
                        hoveredNavItem === item.label
                          ? "text-gray-600 border-b-4 border-gray-600"
                          : "text-gray-700 hover:text-gray-600"
                      }`}
                    >
                      {item.label}
                    </Button>

                    {/* Mega Menu */}
                    {hoveredNavItem === item.label && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50"
                        onMouseEnter={handleMegaMenuMouseEnter}
                        onMouseLeave={handleMegaMenuMouseLeave}
                      >
                        <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-6 w-80 min-w-[320px]">
                          <div className="grid grid-cols-1 gap-2">
                            {item.categories.map((category, idx) => (
                              <a
                                key={idx}
                                href="#"
                                className="block text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-md border-l-4 border-transparent hover:border-gray-300"
                              >
                                {category}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Search */}
              <div className="flex-1 max-w-xl mx-2 lg:mx-4 relative hidden sm:block">
                <div
                  className={`relative transition-all duration-300 ${
                    searchFocused ? "transform scale-105" : ""
                  }`}
                >
                  <Input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(
                        () => setSearchFocused(false),
                        NAVBAR_CONSTANTS.SEARCH_BLUR_DELAY
                      )
                    }
                    onKeyPress={handleSearch}
                    placeholder={NAVBAR_CONSTANTS.PLACEHOLDERS.SEARCH}
                    prefixElement={<Search className="w-4 h-4 text-gray-400" />}
                  />
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-1 sm:space-x-3 ml-auto">
                {/* Profile */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="text-xs hidden sm:block">Profile</span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute z-10 right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-6 pb-4 border-b border-gray-100">
                        <h6 className="font-bold text-gray-900 mb-1">
                          {NAVBAR_CONSTANTS.PROFILE_DROPDOWN.WELCOME_TITLE}
                        </h6>
                        <p className="text-xs text-gray-500 mb-3">
                          {NAVBAR_CONSTANTS.PROFILE_DROPDOWN.WELCOME_SUBTITLE}
                        </p>
                        <Button
                          variant="primary"
                          children={
                            NAVBAR_CONSTANTS.PROFILE_DROPDOWN.LOGIN_BUTTON_TEXT
                          }
                          className="py-2.5 rounded w-full font-semibold transition-colors  duration-200 "
                        />
                      </div>

                      <div className="py-2">
                        {NAVBAR_CONSTANTS.PROFILE_DROPDOWN.MENU_ITEMS.map(
                          (item, idx) => renderMenuItem(item, `menu-${idx}`)
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-2 mt-2">
                        {NAVBAR_CONSTANTS.PROFILE_DROPDOWN.FOOTER_ITEMS.map(
                          (item, idx) => renderMenuItem(item, `footer-${idx}`)
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg">
                  <Heart className="w-5 h-5 text-gray-700" />
                  <span className="text-xs hidden sm:block">Wishlist</span>
                </button>

                {/* Bag */}
                <button className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg relative">
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs hidden sm:block">Bag</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Search - below navbar */}
          <div className="block sm:hidden px-4 py-2 bg-gradient-to-b from-gray-100 to-white">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() =>
                setTimeout(
                  () => setSearchFocused(false),
                  NAVBAR_CONSTANTS.SEARCH_BLUR_DELAY
                )
              }
              onKeyPress={handleSearch}
              placeholder={NAVBAR_CONSTANTS.PLACEHOLDERS.SEARCH}
              prefixElement={<Search className="w-4 h-4 text-gray-400" />}
              className="w-full rounded-full"
            />
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden bg-white transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-[80vh] border-t border-gray-200"
                : "max-h-0"
            }`}
          >
            <div className="px-4 py-6">
              {/* Categories */}
              <div className="space-y-4 mb-6">
                {NAVBAR_CONSTANTS.NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <button
                      onClick={() => handleNavClick(item.label)}
                      className="flex items-center justify-between w-full py-2 text-left"
                    >
                      <span
                        className={`font-bold text-sm ${
                          activeNav === item.label
                            ? "text-gray-800"
                            : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeNav === item.label
                            ? "rotate-180 text-gray-600"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    <div
                      className={`mt-2 space-y-2 transition-all overflow-hidden ${
                        activeNav === item.label
                          ? "max-h-48 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.categories.map((category, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block py-2 pl-4 text-sm text-gray-600 hover:bg-gray-50 rounded"
                          onClick={handleMobileMenuClose}
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-bold text-sm mb-3">
                  {NAVBAR_CONSTANTS.PLACEHOLDERS.QUICK_LINKS_TITLE}
                </h3>
                <div className="space-y-3">
                  {NAVBAR_CONSTANTS.MOBILE_QUICK_LINKS.map((item, idx) =>
                    renderQuickLink(item, `quick-${idx}`)
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            onClick={handleMobileMenuClose}
          />
        )}
      </>
    );
  }
);

Navbar.displayName = "Navbar";
export default Navbar;
