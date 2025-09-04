import { useSelector, useDispatch } from "react-redux";

import type {
  Color,
  ColorWithAvailability,
  Product,
  ProductVariant,
  SizeOption,
} from "../data/productDetailsData";
import type { RootState } from "../store/store";
import {
  setPincode,
  setQuantity,
  setSelectedVariant,
} from "../store/slice/productSlice";

export const useProductSelection = (product: Product | undefined) => {
  const dispatch = useDispatch();
  const { selectedVariantId, quantity, pincode } = useSelector(
    (state: RootState) => state.productSelection
  );
  const getUniqueSizes = () => {
    if (!product) return [];

    const sizeSet = new Set<string>();
    product.variants.forEach((v: ProductVariant) => {
      sizeSet.add(v.size);
    });
    return Array.from(sizeSet);
  };

  // Get selected variant
  const selectedVariant =
    product?.variants.find((v) => v.id === selectedVariantId) || null;

  // Get unique colors with availability
  const getColorsWithAvailability = (): ColorWithAvailability[] => {
    if (!product) return [];

    const colorMap = new Map<string, Color>();
    product.variants.forEach((v: ProductVariant) => {
      if (!colorMap.has(v.color.name)) {
        colorMap.set(v.color.name, v.color as Color);
      }
    });

    return Array.from(colorMap.values()).map((color) => ({
      ...color,
      isAvailable: product.variants.some(
        (v) => v.color.name === color.name && v.stock > 0
      ),
    }));
  };

  // Get sizes with availability for selected color
  const getSizesWithAvailability = (): SizeOption[] => {
    if (!product || !selectedVariant) return [];

    const sizes = new Set(product.variants.map((v) => v.size));

    return Array.from(sizes).map((size) => {
      const variant = product.variants.find(
        (v) => v.color.name === selectedVariant.color.name && v.size === size
      );

      return {
        size,
        stock: variant?.stock || 0,
        isAvailable: Boolean(variant && variant.stock > 0),
      };
    });
  };

  // Handle color selection
  const handleColorSelect = (colorName: string) => {
    if (!product) return;

    // Try to keep same size, fallback to first available size for new color
    let newVariant = product.variants.find(
      (v) =>
        v.color.name === colorName &&
        v.size === selectedVariant?.size &&
        v.stock > 0
    );

    if (!newVariant) {
      newVariant = product.variants.find(
        (v) => v.color.name === colorName && v.stock > 0
      );
    }

    if (newVariant) {
      dispatch(setSelectedVariant(newVariant.id));
    }
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    if (!product || !selectedVariant) return;

    const newVariant = product.variants.find(
      (v) =>
        v.color.name === selectedVariant.color.name &&
        v.size === size &&
        v.stock > 0
    );

    if (newVariant) {
      dispatch(setSelectedVariant(newVariant.id));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    const maxQuantity = selectedVariant?.stock || 0;
    const validQuantity = Math.min(Math.max(1, newQuantity), maxQuantity);
    dispatch(setQuantity(validQuantity));
  };

  // Handle pincode change
  const handlePincodeChange = (newPincode: string) => {
    dispatch(setPincode(newPincode));
  };

  // Initialize variant selection
  const initializeVariant = (product: Product) => {
    if (!selectedVariantId) {
      const firstAvailable = product.variants.find((v) => v.stock > 0);
      if (firstAvailable) {
        dispatch(setSelectedVariant(firstAvailable.id));
      }
    }
  };

  return {
    selectedVariant,
    quantity,
    pincode,
    colorsWithAvailability: getColorsWithAvailability(),
    sizesWithAvailability: getSizesWithAvailability(),
    handleColorSelect,
    handleSizeSelect,
    handleQuantityChange,
    handlePincodeChange,
    initializeVariant,
    getUniqueSizes,
  };
};
