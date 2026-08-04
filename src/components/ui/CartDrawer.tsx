"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, addToCart, totalItems } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-carbon/50 backdrop-blur-sm z-[100]"
        />
      )}
      {isCartOpen && (
        <motion.div key="drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-carbon/5">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Cart ({totalItems})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-carbon/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted gap-4">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p>Your cart is empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-cobalt font-medium hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-carbon/5 rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-carbon text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-cobalt font-semibold mb-3">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 bg-carbon/5 rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-muted hover:text-carbon"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-muted hover:text-carbon"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-muted hover:text-red-500 underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-carbon/5 bg-alabaster">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted font-medium">Subtotal</span>
                <span className="text-xl font-semibold text-carbon">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <button 
                onClick={() => {
                  alert("Proceeding to checkout...");
                  setIsCartOpen(false);
                }}
                className="w-full py-4 bg-carbon text-white rounded-xl font-medium hover:bg-carbon-light transition-colors shadow-lg shadow-carbon/20"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
