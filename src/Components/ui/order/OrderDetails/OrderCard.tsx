import React from "react";
import type { Order } from "./OrderDetails.types";
import ProductItem from "./ProductItem";
import Button from "../../Button";

const OrderCard = React.forwardRef<HTMLDivElement, { order: Order }>(
  ({ order }, ref) => (
    <div
      ref={ref}
      className="bg-white border-b  border-gray-200 rounded-lg p-6 mb-6 "
    >
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-6">
          <div className="grid grid-cols-4 gap-8 flex-1">
            <div>
              <p className="font-secondary text-sm text-gray-500 mb-1">
                Order ID
              </p>
              <p className="font-body text-sm font-medium text-gray-900">
                {order.id}
              </p>
            </div>
            <div>
              <p className="font-secondary text-sm text-gray-500 mb-1">Date</p>
              <p className="font-body text-sm font-medium text-gray-900">
                {order.date}
              </p>
            </div>
            <div>
              <p className="font-secondary text-sm text-gray-500 mb-1">
                Total Amount
              </p>
              <p className="font-body text-sm font-medium text-gray-900">
                ${order.totalAmount}
              </p>
            </div>
            <div>
              <p className="font-secondary text-sm text-gray-500 mb-1">
                Order Status
              </p>
              {/* <StatusBadge status={order.status} /> */}
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          {order.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            children=" View Invoice"
            className="cursor-pointer text-sm font-medium font-body"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-secondary text-sm text-gray-500">Order ID</p>
            <p className="font-body text-sm font-medium text-gray-900 mb-2">
              {order.id}
            </p>
            <p className="font-secondary text-sm text-gray-500">Date</p>
            <p className="font-body text-sm font-medium text-gray-900 mb-2">
              {order.date}
            </p>
            <p className="font-secondary text-sm text-gray-500">Total Amount</p>
            <p className="font-body text-sm font-medium text-gray-900">
              ${order.totalAmount}
            </p>
          </div>
          {/* <StatusBadge status={order.status} /> */}
        </div>

        <div className="space-y-4 mb-4">
          {order.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        <div className="flex space-x-3">
          <Button
            variant="secondary"
            children="View Invoice"
            className="cursor-pointer text-sm font-medium font-body"
          />
        </div>
      </div>
    </div>
  )
);

OrderCard.displayName = "OrderCard";
export default OrderCard;
