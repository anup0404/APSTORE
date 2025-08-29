import { User, Heart, ShoppingBag } from "lucide-react";

export const NAVBAR_CONSTANTS = {
  DEFAULT_CART_COUNT: 0,

  NAV_ITEMS: [
    {
      label: "WOMEN",
      to: "/women",
      categories: [
        { name: "Indian & Fusion Wear", to: "/women/indian-fusion" },
        { name: "Western Wear", to: "/women/western" },
        { name: "Footwear", to: "/women/footwear" },
        { name: "Sports & Active Wear", to: "/women/sports" },
      ],
    },
    {
      label: "MEN",
      to: "/men",
      categories: [
        { name: "Topwear", to: "/men/topwear" },
        { name: "Bottomwear", to: "/men/bottomwear" },
        { name: "Footwear", to: "/men/footwear" },
        { name: "Sports & Active Wear", to: "/men/sports" },
      ],
    },
    {
      label: "KIDS",
      to: "/kids",
      categories: [
        { name: "Boys Clothing", to: "/kids/boys" },
        { name: "Girls Clothing", to: "/kids/girls" },
        { name: "Footwear", to: "/kids/footwear" },
        { name: "Toys & Games", to: "/kids/toys" },
      ],
    },
    {
      label: "ADMIN DASHBOARD",
      to: "/admin",
    },
  ],

  PLACEHOLDERS: {
    SEARCH: "Search for products, brands and more...",
  },

  RIGHT_ICONS: [
    {
      name: "Profile",
      icon: User,
      to: "/profile",
      hover: {
        scrolled: "group-hover:text-black",
        default: "group-hover:text-white",
      },
    },
    {
      name: "Wishlist",
      icon: Heart,
      to: "/wishlist",
      hover: {
        scrolled: "group-hover:text-red-500",
        default: "group-hover:text-red-400",
      },
    },
    {
      name: "Bag",
      icon: ShoppingBag,
      to: "/cart",
      hover: {
        scrolled: "group-hover:text-black",
        default: "group-hover:text-white",
      },
      hasBadge: true,
    },
  ],

  PROFILE_ITEMS: {
    LOGGED_OUT: [
      { name: "Login", to: "/login" },
      { name: "Sign Up", to: "/signup" },
    ],
    LOGGED_IN: [
      { name: "My Profile", to: "/profile" },
      { name: "Orders", to: "/orders" },
      { name: "Wishlist", to: "/wishlist" },
      { name: "Logout", to: "/logout" },
    ],
  },
};
