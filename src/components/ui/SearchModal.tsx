"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

const POPULAR_SEARCHES = ["Cement", "Plywood", "Vitrified Tiles", "TMT Bars", "LED Lights"];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");

  // Simple mock results
  const hasResults = query.length > 2;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-carbon/80 backdrop-blur-md z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 w-full max-w-3xl mx-auto mt-16 sm:mt-24 bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center p-4 sm:p-6 border-b border-carbon/5">
              <Search className="w-5 h-5 text-muted shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search for materials, brands, or categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 text-lg font-medium text-carbon placeholder:text-muted/60"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-carbon/5 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5 text-carbon" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              {!hasResults ? (
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-carbon/5 hover:bg-carbon/10 rounded-full text-sm font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                    Products
                  </h3>
                  {/* Mock Search Results */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-carbon/5 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-muted opacity-50" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-carbon group-hover:text-cobalt transition-colors">
                          Premium {query} Type {i}
                        </h4>
                        <p className="text-sm text-muted">Category • Brand</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
