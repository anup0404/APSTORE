import React from "react";
import type { FooterProps } from "./Footer.type";

const Footer = React.forwardRef<HTMLElement, FooterProps>(({ year }, ref) => (
  <footer ref={ref} className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">AP</h3>
          <p className="text-gray-400 mb-4">
            Fashion-forward clothing for the modern man. Redefine your style
            with our premium collection.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Size Guide</li>
            <li>Returns</li>
            <li>Track Order</li>
          </ul>
        </div>
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Jeans</li>
            <li>Accessories</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {year} AP. All rights reserved.</p>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";
export default Footer;
