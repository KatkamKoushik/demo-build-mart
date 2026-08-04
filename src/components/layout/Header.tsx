"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShoppingBag, MapPin, ChevronDown } from "lucide-react";
import LocationModal from "@/components/ui/LocationModal";

const navItems = [
  { id: "home", label: "Home", href: "#", active: true },
  { id: "collections", label: "Collections", href: "#collections" },
  { id: "inspiration", label: "Inspiration", href: "#inspiration" },
];

export default function Header() {
  const [pinCode, setPinCode] = useState("560001");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(250,250,250,0)", "rgba(250,250,250,0.85)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 30px rgba(43,45,66,0.04)"]
  );

  return (
    <>
      <motion.header
        id="site-header"
        className="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] hidden md:block"
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: headerShadow,
        }}
      >
        <div className="container-main h-full flex items-center gap-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <span className="text-xl font-medium text-carbon tracking-tight">
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
                  item.active ? "text-carbon" : "text-muted hover:text-carbon"
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
              placeholder="Search materials..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-carbon/5 border-none
                         text-sm text-carbon placeholder:text-muted-light
                         focus:outline-none focus:ring-1 focus:ring-carbon/20
                         transition-all duration-300"
            />
          </motion.div>

          {/* Location Selector - Refined */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 text-sm text-carbon font-medium hover:opacity-70 transition-opacity"
          >
            <MapPin className="w-4 h-4 text-carbon" />
            <span>{pinCode}</span>
            <ChevronDown className="w-3 h-3 text-muted" />
          </button>
          
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-carbon text-white hover:bg-carbon-light transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cobalt-light text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
              3
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Top Header - Extremely Minimal */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-16 md:hidden flex items-center justify-between px-4"
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
        }}
      >
        <a href="#" className="text-lg font-medium text-carbon tracking-tight">
          Build<strong className="font-extrabold">Mart</strong>
        </a>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white shadow-sm border border-border"
        >
          <MapPin className="w-3 h-3 text-cobalt" />
          {pinCode}
        </button>
      </motion.header>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPin={pinCode}
        onUpdatePin={(pin) => setPinCode(pin)}
      />
    </>
  );
}
