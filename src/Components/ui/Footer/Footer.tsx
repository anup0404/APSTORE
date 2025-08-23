import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import type { FooterProps } from "./Footer.type";

const Footer = React.forwardRef<HTMLElement, FooterProps>(({ year }, ref) => (
  <footer ref={ref} className="bg-black text-white">
    {/* Main Footer Content */}
    <div className="border-b border-gray-800">
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-light tracking-widest mb-6 text-white">
              MAISON ÉLÉGANTE
            </h3>
            <p className="text-gray-300 font-light leading-relaxed text-sm mb-8 max-w-sm">
              Discover the epitome of luxury fashion. Our curated collection
              represents timeless elegance, exceptional craftsmanship, and
              sophisticated design for the discerning connoisseur.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="font-light">+91 (11) 2345-6789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="font-light">contact@maisonelegante.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="font-light">
                  Connaught Place, New Delhi, India
                </span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2">
            <h4 className="font-light text-white mb-6 text-sm tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Ready-to-Wear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Haute Couture
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Handbags
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Jewelry
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Footwear
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-light text-white mb-6 text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Personal Styling
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Alterations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Gift Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  VIP Appointments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2">
            <h4 className="font-light text-white mb-6 text-sm tracking-wider uppercase">
              Customer Care
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Size Exchange
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Order Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="lg:col-span-2">
            <h4 className="font-light text-white mb-6 text-sm tracking-wider uppercase">
              About
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Craftsmanship
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                >
                  Store Locator
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Newsletter Section */}
    <div className="border-b border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h4 className="text-xl font-light text-white mb-3 tracking-wide">
            Stay Connected
          </h4>
          <p className="text-gray-300 font-light text-sm mb-8 leading-relaxed">
            Be the first to discover our latest collections, exclusive events,
            and luxury fashion insights.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-white text-black text-sm font-light placeholder-gray-500 border-none focus:outline-none focus:ring-0"
            />
            <button className="px-6 py-3 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300 sm:ml-0 mt-0 flex items-center justify-center space-x-2">
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Social & Copyright */}
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Social Media */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm font-light">
          <p>&copy; {year} Maison Élégante. All rights reserved.</p>
        </div>

        {/* Legal Links */}
        <div className="flex items-center space-x-6 text-sm">
          <a
            href="#"
            className="text-gray-400 font-light hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 font-light hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";
export default Footer;
