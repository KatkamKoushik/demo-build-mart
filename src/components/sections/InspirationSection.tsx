"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function InspirationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section id="inspiration" ref={containerRef} className="py-24 relative z-10 bg-charcoal text-white overflow-hidden">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
            >
              Built with BuildMart
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/60"
            >
              Explore landmark projects realized using our material ecosystem.
            </motion.p>
          </div>
          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="text-sm font-medium border-b border-white/30 pb-1 hover:border-white transition-colors cursor-pointer"
          >
            {isGalleryOpen ? "Close gallery" : "View full gallery"}
          </button>
        </div>

        {isGalleryOpen ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh] md:h-[80vh]"
          >
            <div className="relative rounded-3xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/inspiration-interior.png')" }} />
            <div className="relative rounded-3xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/inspiration-exterior.png')" }} />
          </motion.div>
        ) : (
          <motion.div 
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 -top-[10%] -bottom-[10%] w-full h-[120%] bg-cover bg-center"
              style={{ backgroundImage: "url('/inspiration-interior.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md">
              <p className="text-primary-light font-medium text-sm mb-2">Featured Project</p>
              <h3 className="text-2xl md:text-4xl font-medium mb-2 tracking-tight">The Vertex Residence</h3>
              <p className="text-white/70 text-sm md:text-base">
                Featuring our architectural glass, structural steel, and polished concrete finishes.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
