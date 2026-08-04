"use client";

import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, User } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, active: true },
  { id: "explore", label: "Explore", icon: Search },
  { id: "cart", label: "Cart", icon: ShoppingBag, badge: 3 },
  { id: "profile", label: "Profile", icon: User },
];

export default function MobileBottomNav() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
    >
      <div className="glass-dark rounded-full px-6 py-3 border border-white/10 shadow-2xl flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="relative flex flex-col items-center justify-center w-12 h-12"
          >
            <item.icon
              className={`w-5 h-5 mb-1 transition-colors ${
                item.active ? "text-cobalt-light" : "text-white/50"
              }`}
            />
            {item.active && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-cobalt-light"
              />
            )}
            {item.badge && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-cobalt-light text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-carbon">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
