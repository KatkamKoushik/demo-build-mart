"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, MapPin, ChevronDown } from "lucide-react";
import LocationModal from "@/components/ui/LocationModal";
import { useCart } from "@/providers/CartProvider";

const navItems = [
  { id: "home", label: "Home", href: "#", active: true },
  { id: "collections", label: "Collections", href: "#collections" },
  { id: "inspiration", label: "Inspiration", href: "#inspiration" },
];

export default function Header() {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [pinCode, setPinCode] = useState("560001");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    else if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] hidden md:block transition-all duration-300 ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(38, 38, 38,0.04)]" 
            : "bg-transparent"
        }`}
      >
        <div className="container-main h-full flex items-center gap-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <span className="text-xl font-medium text-charcoal tracking-tight">
              Build<strong className="font-extrabold">Mart</strong>
            </span>
          </a>

          {/* Desktop Navigation - Minimalist */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  item.active ? "text-charcoal" : "text-muted hover:text-charcoal"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search Bar - Refined */}
          <motion.div
            className="hidden md:flex relative max-w-sm w-full"
            animate={{ scale: isSearchFocused ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="search"
              readOnly
              placeholder="Search materials..."
              onClick={() => setIsSearchOpen(true)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-charcoal/5 border-none
                         text-sm text-charcoal placeholder:text-muted-light cursor-pointer
                         focus:outline-none focus:ring-1 focus:ring-charcoal/20
                         transition-all duration-300"
            />
          </motion.div>

          {/* Location Selector - Refined */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 text-sm text-charcoal font-medium hover:opacity-70 transition-opacity"
          >
            <MapPin className="w-4 h-4 text-charcoal" />
            <span>{pinCode}</span>
            <ChevronDown className="w-3 h-3 text-muted" />
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-charcoal text-white hover:bg-charcoal-light transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-light text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:hidden flex items-center justify-between px-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(38, 38, 38,0.04)]" 
            : "bg-transparent"
        }`}
      >
        <a href="#" className="text-lg font-medium text-charcoal tracking-tight">
          Build<strong className="font-extrabold">Mart</strong>
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white shadow-sm border border-border"
        >
          <MapPin className="w-3 h-3 text-primary" />
          {pinCode}
        </button>
      </header>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPin={pinCode}
        onUpdatePin={(pin) => setPinCode(pin)}
      />
    </>
  );
}
