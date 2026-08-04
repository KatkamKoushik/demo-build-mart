"use client";

import SmoothScrollProvider from "./SmoothScrollProvider";
import { CartProvider } from "./CartProvider";
import CartDrawer from "@/components/ui/CartDrawer";

import SearchModal from "@/components/ui/SearchModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SmoothScrollProvider>
        {children}
        <CartDrawer />
        <SearchModal />
      </SmoothScrollProvider>
    </CartProvider>
  );
}
