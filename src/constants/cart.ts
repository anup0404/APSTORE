import type { CartItem } from "../Components/ui/ShoppingBag/ShoppingCart.types";

export const dummyItems: CartItem[] = [
  {
    id: "1",
    name: "Hollow Port",
    description: "Awesome yellow t-shirt",
    price: 39.11,
    originalPrice: 49.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    size: "M",
    color: "Yellow",
    inStock: true,
    maxQuantity: 5,
    category: "T-Shirts",
  },
  {
    id: "2",
    name: "Circular Sienna",
    description: "Awesome white t-shirt",
    price: 24.89,
    originalPrice: 34.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    size: "L",
    color: "White",
    inStock: true,
    maxQuantity: 3,
    category: "T-Shirts",
  },
  {
    id: "3",
    name: "Realm Bone",
    description: "Awesome black t-shirt",
    price: 22.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    size: "S",
    color: "Black",
    inStock: true,
    maxQuantity: 7,
    category: "T-Shirts",
  },
];
