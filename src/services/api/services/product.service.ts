import type { Product } from "../../../Components/ui/ProductDetail/ProductDetail.type";

export const fetchProductById = async (id: string): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        title: "Premium Cotton T-Shirt",
        description:
          "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece offers a perfect blend of style and comfort for everyday wear.",
        brand: "PREMIUM BASICS",
        price: 1299,
        originalPrice: 1999,
        categories: [
          { id: "cat-1", name: "Fashion" },
          { id: "cat-2", name: "T-Shirts" },
        ],
        variants: [
          {
            id: "var-1",
            productId: id,
            color: { name: "Navy Blue", value: "#1e3a8a" },
            size: "S",
            price: 1299,
            stock: 15,
            imageUrl:
              "https://images.unsplash.com/photo-1520975922071-3d2c3e1b0f3f", // navy t-shirt image
          },
          {
            id: "var-2",
            productId: id,
            color: { name: "Black", value: "#000000" },
            size: "M",
            price: 1299,
            stock: 22,
            imageUrl:
              "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", // black t-shirt image
          },
          {
            id: "var-3",
            productId: id,
            color: { name: "White", value: "#ffffff" },
            size: "L",
            price: 1299,
            stock: 8,
            imageUrl:
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", // white t-shirt image
          },
        ],
        images: [
          {
            id: "img-1",
            productId: id,
            url: "https://images.unsplash.com/photo-1520975922071-3d2c3e1b0f3f", // navy t-shirt
            isPrimary: true,
          },
          {
            id: "img-2",
            productId: id,
            url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", // black t-shirt
            isPrimary: false,
          },
          {
            id: "img-3",
            productId: id,
            url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", // white t-shirt folded
            isPrimary: false,
          },
        ],
        // ... rest unchanged
        reviews: [
          {
            id: "rev-1",
            productId: id,
            reviewerName: "Rajesh Kumar",
            rating: 5,
            comment:
              "Excellent quality fabric and perfect fit. Highly recommended!",
            reviewDate: new Date("2025-08-10"),
            verified: true,
            images: [
              "https://images.unsplash.com/photo-1520975922071-3d2c3e1b0f3f",
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
            ],
          },
          {
            id: "rev-2",
            productId: id,
            reviewerName: "Priya Sharma",
            rating: 4,
            comment:
              "Great t-shirt but delivery was a bit delayed. Overall satisfied with the quality.",
            reviewDate: new Date("2025-08-05"),
            verified: true,
            images: [
              "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
            ],
          },
        ],
        averageRating: 4.5,
        reviewsCount: 156,
        features: {
          Material: "100% Organic Cotton",
          Fit: "Regular Fit",
          "Neck Type": "Round Neck",
          "Sleeve Type": "Short Sleeve",
        },
        specifications: {
          Fabric: "Cotton",
          Pattern: "Solid",
          "Care Instructions": "Machine Wash",
          "Country of Origin": "India",
        },
        offers: {
          discount: "35",
          cashback: "10%",
          exchange: "Available",
        },
        deliveryInfo: {
          free: true,
          express: "Next day delivery",
        },
        returnPolicy: "15 days return policy",
        isActive: true,
        isNew: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }, 1000);
  });
};
