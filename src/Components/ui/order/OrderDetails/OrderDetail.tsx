import React from "react";
import type { Order } from "./OrderDetails.types";
import { dummyOrders } from "../../../../constants/order";
import OrderCard from "./OrderCard";

export interface OrderDetailsProps {
  orders?: Order[];
  className?: string;
}

const OrderDetails = React.forwardRef<HTMLDivElement, OrderDetailsProps>(
  ({ orders = dummyOrders, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 ${className}`}
      >
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">
            Order Details
          </h1>
          <p className="font-body text-gray-600">
            Check the status of recent and old orders & discover more products
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} />
          ))}
        </div>
      </div>
    );
  }
);

OrderDetails.displayName = "OrderDetails";

export default OrderDetails;
