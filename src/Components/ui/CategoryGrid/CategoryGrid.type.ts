export interface Category {
  id: number;
  name: string;
  image: string;
  count: string;
}

export interface CategoryGridProps {
  categories: Category[];
}
