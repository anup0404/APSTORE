export const PRODUCT_BADGES = {
  NEW: { label: "NEW", className: "bg-black text-white" },
  SALE: { label: "SALE", className: "bg-red-600 text-white" },
  BESTSELLER: { label: "BESTSELLER", className: "bg-yellow-500 text-black" },
  EXCLUSIVE: { label: "EXCLUSIVE", className: "bg-purple-600 text-white" },
  LIMITED: { label: "LIMITED", className: "bg-amber-500 text-white" },
} as const;

export const MIN_STOCK_QUANTITY = 5;
export const SOCIAL_PLATFORMS = [
  {
    name: "Facebook",
    icon: "Facebook",
    color: "text-blue-600",
    shareUrl: (url: string, text: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Twitter",
    icon: "Twitter",
    color: "text-blue-400",
    shareUrl: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "Instagram",
    icon: "Instagram",
    color: "text-pink-600",
    shareUrl: (url: string, text: string) => "#", // Instagram doesn't support direct URL sharing
  },
  {
    name: "Email",
    icon: "Mail",
    color: "text-gray-600",
    shareUrl: (url: string, text: string) =>
      `mailto:?subject=${encodeURIComponent(
        text
      )}&body=Check out this product: ${encodeURIComponent(url)}`,
  },
] as const;
