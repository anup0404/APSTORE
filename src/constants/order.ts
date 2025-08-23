import type { Order } from "../Components/ui/order/OrderDetails/OrderDetails.types";

// Dummy data
export const dummyOrders: Order[] = [
  {
    id: "#449927440087",
    date: "14 January, 2022",
    totalAmount: 499,
    status: "Pending",
    products: [
      {
        id: "1",
        name: "Apple Watch Series 7",
        variant: "Golden",
        price: 359,
        image:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=60&q=80", // Apple Watch
      },
      {
        id: "2",
        name: "Beylob 90 Speaker",
        variant: "Space Gray",
        price: 49,
        image:
          "https://images.unsplash.com/photo-1512499617640-c2f999098c0b?auto=format&fit=crop&w=60&q=80", // Speaker
      },
    ],
  },
  {
    id: "#449927440088",
    date: "14 January, 2022",
    totalAmount: 299,
    status: "Delivered",
    products: [
      {
        id: "3",
        name: "Apple Watch Series 7",
        variant: "Golden",
        price: 359,
        image:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=60&q=80",
      },
      {
        id: "4",
        name: "Beylob 90 Speaker",
        variant: "Space Gray",
        price: 49,
        image:
          "https://images.unsplash.com/photo-1512499617640-c2f999098c0b?auto=format&fit=crop&w=60&q=80",
      },
    ],
  },
];
