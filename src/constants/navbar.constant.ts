import { Gift, Headphones, Heart, MapPin, ShoppingBag } from "lucide-react";

export const NAVBAR_CONSTANTS = {
  DEFAULT_CART_COUNT: 3,
  SEARCH_BLUR_DELAY: 200,
  NAV_ITEMS: [
    {
      label: "MEN",
      categories: ["Topwear", "Bottomwear", "Footwear", "Sports & Active Wear"],
    },
    {
      label: "WOMEN",
      categories: [
        "Indian & Fusion Wear",
        "Western Wear",
        "Footwear",
        "Sports & Active Wear",
      ],
    },
    {
      label: "KIDS",
      categories: [
        "Boys Clothing",
        "Girls Clothing",
        "Footwear",
        "Toys & Games",
      ],
    },
    {
      label: "HOME & LIVING",
      categories: [
        "Bed Linen & Furnishing",
        "Flooring",
        "Bath",
        "Lamps & Lighting",
      ],
    },
    {
      label: "BEAUTY",
      categories: ["Makeup", "Skincare", "Premium Beauty", "Fragrance"],
    },
    { label: "STUDIO", categories: ["What's New", "Designers", "Collections"] },
  ],
  POPULAR_SEARCHES: [
    "Kurtas",
    "T-Shirts",
    "Sarees",
    "Jeans",
    "Dresses",
    "Shoes",
  ],
  BANNER_TEXT: {
    PREFIX: "BIGGEST DEALS ON TOP BRANDS ",
    MAIN: "FLAT 50-80% OFF",
    SUFFIX: " + EXTRA 10% OFF",
  },
  PROFILE_DROPDOWN: {
    WELCOME_TITLE: "Welcome",
    WELCOME_SUBTITLE: "To access account and manage orders",
    LOGIN_BUTTON_TEXT: "LOGIN / SIGNUP",
    MENU_ITEMS: [
      { icon: ShoppingBag, label: "Orders", href: "#" },
      { icon: Heart, label: "Wishlist", href: "#" },
      { icon: Gift, label: "Gift Cards", href: "#" },
      { icon: Headphones, label: "Contact Us", href: "#" },
    ],
    FOOTER_ITEMS: [{ icon: MapPin, label: "Saved Addresses", href: "#" }],
  },
  MOBILE_QUICK_LINKS: [
    { icon: ShoppingBag, label: "My Orders", href: "#" },
    { icon: Heart, label: "My Wishlist", href: "#" },
    { icon: Headphones, label: "Customer Care", href: "#" },
  ],
  PLACEHOLDERS: {
    SEARCH: "Search for products, brands and more",
    POPULAR_SEARCHES_TITLE: "POPULAR SEARCHES",
    QUICK_LINKS_TITLE: "QUICK LINKS",
  },
  KEYS: {
    ESCAPE: "Escape",
    ENTER: "Enter",
  },
} as const;
