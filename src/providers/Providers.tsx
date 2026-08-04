"use client";

import SmoothScrollProvider from "./SmoothScrollProvider";
import { CartProvider } from "./CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </CartProvider>
  );
}
