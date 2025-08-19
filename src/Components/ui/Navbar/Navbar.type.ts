export interface NavItem {
  label: string;
  categories: string[];
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface NavbarProps {
  className?: string;
  onSearch?: (query: string) => void;
  cartItemCount?: number;
}
