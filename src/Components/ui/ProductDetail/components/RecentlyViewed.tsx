import React, { useState, useEffect } from "react";
import { Star, Heart, Eye } from "lucide-react";

interface RecentProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  viewedAt: Date;
}

interface RecentlyViewedProps {
  currentProductId: string;
  maxItems?: number;
  className?: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  currentProductId,
  maxItems = 4,
  className = "",
}) => {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from localStorage or API
    const mockRecentProducts: RecentProduct[] = [
      {
        id: "recent1",
        name: "Dior J'adore Eau de Parfum",
        brand: "Dior",
        price: 165,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop",
        viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "recent2",
        name: "Chanel No. 5 Eau de Parfum",
        brand: "Chanel",
        price: 180,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
        viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ];

    setRecentProducts(
      mockRecentProducts
        .filter((p) => p.id !== currentProductId)
        .slice(0, maxItems)
    );
  }, [currentProductId, maxItems]);

  if (recentProducts.length === 0) return null;

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Recently Viewed</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium line-clamp-2">
                {product.name}
              </h4>
              <div className="text-xs text-gray-500">{product.brand}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentlyViewed.displayName = "RecentlyViewed";
export default RecentlyViewed;
