"use client";

import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useState } from "react";

export default function FeaturedProductsSection() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    setAddedItems((prev) => new Set(prev).add(product.id));
    
    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section className="py-24 bg-white relative z-10" id="featured-products">
      <div className="container-main">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-carbon mb-2">
              Featured Materials
            </h2>
            <p className="text-muted">Top-grade materials available for immediate dispatch.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => {
            const isAdded = addedItems.has(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-alabaster border border-carbon/5 hover:border-carbon/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cobalt px-2 py-1 bg-cobalt/10 rounded-md">
                      {product.category}
                    </span>
                    <span className="text-sm font-medium text-carbon">
                      ₹{product.price.toLocaleString('en-IN')} <span className="text-muted font-normal">/ {product.unit}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-carbon mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted mb-6 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isAdded 
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                      : "bg-carbon text-white hover:bg-carbon-light shadow-lg shadow-carbon/20"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
