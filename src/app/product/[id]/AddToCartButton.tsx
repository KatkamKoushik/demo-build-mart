"use client";

import { useCart } from "@/providers/CartProvider";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button
      disabled={!product.in_stock}
      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-4 px-8 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingCart className="w-5 h-5" />
      {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
