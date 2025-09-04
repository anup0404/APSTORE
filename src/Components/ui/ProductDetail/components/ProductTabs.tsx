import React from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "../../../../data/productDetailsData";

interface ContactInfo {
  message: string;
  phone: string;
  email: string;
  storeHours: string;
}

interface ProductTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  product: Product;
  tabs: readonly string[];
  contactInfo: ContactInfo;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  onTabChange,
  product,
  tabs,
  contactInfo,
}) => {
  return (
    <div className="border-t border-gray-100">
      {tabs.map((tab) => (
        <div key={tab} className="border-b border-gray-100 last:border-b-0">
          <button
            onClick={() => onTabChange(activeTab === tab ? "Description" : tab)}
            className="w-full py-5 lg:py-6 text-left flex items-center justify-between text-xs lg:text-sm font-medium text-gray-900 tracking-wider uppercase hover:bg-gray-50 px-0 transition-colors"
          >
            <span>{tab}</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform ${
                activeTab === tab ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeTab === tab && (
            <div className="pb-5 lg:pb-6 text-sm text-gray-700 leading-relaxed">
              {tab === "Description" && (
                <div className="space-y-4">
                  <p>{product?.description}</p>
                  {product?.features && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Features:</h4>
                      {Object.entries(product.features).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="font-medium min-w-32">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "Size & Fit" && (
                <div className="space-y-4">
                  {product?.specifications && (
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium min-w-32">{key}:</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {tab === "Contact & In-Store Availability" && (
                <div className="space-y-4">
                  <p>{contactInfo.message}</p>
                  <div className="space-y-2">
                    <p>
                      <strong>Phone:</strong> {contactInfo.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {contactInfo.email}
                    </p>
                    <p>
                      <strong>Store Hours:</strong> {contactInfo.storeHours}
                    </p>
                  </div>

                  {product?.deliveryInfo && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">
                        Delivery Information:
                      </h4>
                      <p>
                        •{" "}
                        {product?.deliveryInfo?.free
                          ? "Free delivery"
                          : "Paid delivery"}
                      </p>
                      {product?.deliveryInfo?.express && (
                        <p>• {product?.deliveryInfo?.express}</p>
                      )}
                      {product?.returnPolicy && (
                        <p>• {product?.returnPolicy}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

ProductTabs.displayName = "ProductTabs";
export default ProductTabs;
