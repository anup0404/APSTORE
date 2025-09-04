export interface Filters {
  search: string;
  category: string[];
  subcategory: string[];
  priceRange: [number, number];
  availability: string[];
  rating: number; // keep as number since you're using 0 (not null)
  color: string[];
  size: string[];
  material: string[];
  sortBy: "featured" | "priceLowHigh" | "priceHighLow" | "newest"; // add allowed values
}

export type ArrayFilterKeys =
  | "category"
  | "subcategory"
  | "availability"
  | "color"
  | "size"
  | "material";

export type ExpandedFilters = {
  category: boolean;
  subcategory: boolean;
  price: boolean;
  color: boolean;
  size: boolean;
  material: boolean;
  availability: boolean;
  rating: boolean;
};
