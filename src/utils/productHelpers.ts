import type { ProductVariant } from "../Components/ui/ProductDetail/ProductDetail.type";

export const getUniqueColors = (variants: ProductVariant[] = []) => {
  return variants.reduce((acc, variant) => {
    if (variant.color && !acc.some((c) => c.value === variant.color?.value)) {
      acc.push(variant.color);
    }
    return acc;
  }, [] as Array<{ name: string; value: string }>);
};

export const getUniqueSizes = (variants: ProductVariant[] = []) => {
  return [...new Set(variants.map((v) => v.size).filter(Boolean))];
};

export const calculateDiscount = (price: number, originalPrice?: number) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const formatPrice = (price: number | string, currency: string = "₹") => {
  if (typeof price === "number") {
    return `${currency}${price.toLocaleString()}`;
  }
  return `${currency}${price}`;
};

export const getStockStatus = (
  variant?: ProductVariant,
  threshold: number = 5
) => {
  if (!variant?.stock) {
    return { inStock: false, isLowStock: false, count: 0 };
  }

  const count = typeof variant.stock === "number" ? variant.stock : 0;
  const isLowStock =
    typeof variant.stock === "number" && variant.stock <= threshold;

  return {
    inStock: !!variant.stock,
    isLowStock,
    count,
  };
};
