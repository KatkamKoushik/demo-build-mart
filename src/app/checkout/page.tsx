"use client";

import React, { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";
import { ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST mock
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-alabaster flex flex-col items-center justify-center pt-24 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-medium text-charcoal mb-4">Order Placed!</h1>
          <p className="text-muted mb-8">Thank you for your order. We've received it and will begin processing it shortly.</p>
          <button 
            className="w-full py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal-light transition-colors"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-muted hover:text-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-medium text-charcoal mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <p className="text-muted mb-4">Your cart is empty.</p>
                <button 
                  className="px-6 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-charcoal-light transition-colors"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-charcoal">{item.name}</h3>
                    <p className="text-sm text-muted">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-charcoal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted">₹{item.price.toLocaleString('en-IN')} each</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h3 className="text-lg font-medium text-charcoal mb-6">Order Total</h3>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-muted">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-charcoal font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Taxes (18% GST)</span>
                  <span className="text-charcoal font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="pt-4 border-t border-charcoal/10 flex justify-between items-center text-lg font-semibold">
                  <span className="text-charcoal">Total</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-primary text-charcoal-dark rounded-xl font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
