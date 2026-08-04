"use client";

import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

export default function MobileBottomNav() {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();

  const navItems = [
    { id: "home", label: "Home", icon: Home, active: true },
    { id: "explore", label: "Explore", icon: Search },
    { id: "cart", label: "Cart", icon: ShoppingBag, badge: totalItems },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-max z-50"
    >
      <div className="glass-dark rounded-full px-6 py-3 md:px-8 md:py-4 border border-white/10 shadow-2xl flex justify-between md:justify-center md:gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "cart") setIsCartOpen(true);
              else if (item.id === "explore") setIsSearchOpen(true);
            }}
            className="relative flex flex-col items-center justify-center w-12 h-12"
          >
            <item.icon
              className={`w-5 h-5 mb-1 transition-colors ${
                item.active ? "text-primary-light" : "text-white/50"
              }`}
            />
            {item.active && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary-light"
              />
            )}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-primary-light text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-charcoal">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
