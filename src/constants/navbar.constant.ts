// import { Gift, Headphones, Heart, MapPin, ShoppingBag } from "lucide-react";

import type { VideoData } from "../Components/ui/video/video.type";

// export const NAVBAR_CONSTANTS = {
//   DEFAULT_CART_COUNT: 3,
//   SEARCH_BLUR_DELAY: 200,
//   NAV_ITEMS: [
//     {
//       label: "MEN",
//       categories: ["Topwear", "Bottomwear", "Footwear", "Sports & Active Wear"],
//     },
//     {
//       label: "WOMEN",
//       categories: [
//         "Indian & Fusion Wear",
//         "Western Wear",
//         "Footwear",
//         "Sports & Active Wear",
//       ],
//     },
//     {
//       label: "KIDS",
//       categories: [
//         "Boys Clothing",
//         "Girls Clothing",
//         "Footwear",
//         "Toys & Games",
//       ],
//     },

//     {
//       label: "BEAUTY",
//       categories: ["Makeup", "Skincare", "Premium Beauty", "Fragrance"],
//     },
//     { label: "STUDIO", categories: ["What's New", "Designers", "Collections"] },
//     {
//       label: "ADMIN DASHBOARD",
//     },
//   ],
//   POPULAR_SEARCHES: [
//     "Kurtas",
//     "T-Shirts",
//     "Sarees",
//     "Jeans",
//     "Dresses",
//     "Shoes",
//   ],
//   BANNER_TEXT: {
//     PREFIX: "BIGGEST DEALS ON TOP BRANDS ",
//     MAIN: "FLAT 50-80% OFF",
//     SUFFIX: " + EXTRA 10% OFF",
//   },
//   PROFILE_DROPDOWN: {
//     WELCOME_TITLE: "Welcome",
//     WELCOME_SUBTITLE: "To access account and manage orders",
//     LOGIN_BUTTON_TEXT: "LOGIN / SIGNUP",
//     MENU_ITEMS: [
//       { icon: ShoppingBag, label: "Orders", to: "/order" },
//       { icon: Heart, label: "Wishlist", to: "#" },
//       { icon: Gift, label: "Gift Cards", to: "#" },
//       { icon: Headphones, label: "Contact Us", to: "#" },
//     ],
//     FOOTER_ITEMS: [{ icon: MapPin, label: "Saved Addresses", to: "#" }],
//   },
//   MOBILE_QUICK_LINKS: [
//     { icon: ShoppingBag, label: "My Orders", to: "/order" },
//     { icon: Heart, label: "My Wishlist", to: "#" },
//     { icon: Headphones, label: "Customer Care", to: "#" },
//   ],
//   PLACEHOLDERS: {
//     SEARCH: "Search for products, brands and more",
//     POPULAR_SEARCHES_TITLE: "POPULAR SEARCHES",
//     QUICK_LINKS_TITLE: "QUICK LINKS",
//   },
//   KEYS: {
//     ESCAPE: "Escape",
//     ENTER: "Enter",
//   },
// } as const;
// constants/navbar.constant.ts
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
export const videoData: VideoData[] = [
  {
    id: "fashion",
    title: "Fashion & Accessories",
    subtitle: "Shop now",
    link: "/fashion",
    videoUrl:
      "https://res.cloudinary.com/dlqd8n49u/video/upload/v1755860840/9760427-uhd_4096_2160_25fps_vm9djp.mp4",
    thumbnail:
      "https://diorama.dam-broadcast.com/cdn-cgi/image/width=1440,format=auto/pm_11872_1097_1097688-66nku5afvr-whr.jpg",
  },
  {
    id: "fragrance",
    title: "Fragrance & Beauty",
    subtitle: "Shop now",
    link: "/fragrance",
    videoUrl:
      "https://res.cloudinary.com/dlqd8n49u/video/upload/v1755860835/5805065-uhd_3840_2160_25fps_trgq4k.mp4",
    thumbnail:
      "https://diorama.dam-broadcast.com/cdn-cgi/image/width=3000,format=auto/pm_11872_1142_1142166-08w02b9ro4-whr.jpg",
  },
];
