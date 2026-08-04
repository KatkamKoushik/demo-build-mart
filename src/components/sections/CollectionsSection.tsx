"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Curated collections grouping the original 19 categories for a premium feel
const collections = [
  {
    id: "structural",
    title: "Structural Core",
    description: "High-grade cement, TMT steel, and foundational elements.",
    bg: "bg-carbon",
    text: "text-white",
    colSpan: "md:col-span-8",
    rowSpan: "md:row-span-2",
    image: "/inspiration-exterior.png", // Using the exterior generated image
  },
  {
    id: "finishes",
    title: "Surface & Finishes",
    description: "Architectural tiles, marbles, and engineered stones.",
    bg: "bg-cobalt",
    text: "text-white",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
    image: null,
  },
  {
    id: "woodwork",
    title: "Timber & Joinery",
    description: "Premium laminates, solid woods, and architectural doors.",
    bg: "bg-white",
    text: "text-carbon",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
    image: null,
  },
  {
    id: "electrical",
    title: "Lighting & Power",
    description: "Smart home systems and industrial-grade electricals.",
    bg: "bg-white",
    text: "text-carbon",
    colSpan: "md:col-span-4",
    rowSpan: "md:row-span-1",
    image: null,
  },
  {
    id: "plumbing",
    title: "Bath & Plumbing",
    description: "Luxury sanitaryware and precision fittings.",
    bg: "bg-carbon-light",
    text: "text-white",
    colSpan: "md:col-span-8",
    rowSpan: "md:row-span-1",
    image: "/inspiration-interior.png", // Using the interior generated image
  },
];

export default function CollectionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="collections" ref={containerRef} className="py-24 relative z-10 bg-alabaster">
      <div className="container-main">
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-medium tracking-tight text-carbon mb-4"
          >
            Material Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted"
          >
            Curated selections for distinct phases of construction and interior refinement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[300px]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`
                group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-end
                ${collection.bg} ${collection.text} ${collection.colSpan} ${collection.rowSpan}
              `}
            >
              {/* Background Image / Overlay */}
              {collection.image && (
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${collection.image})` }}
                >
                  <div className="absolute inset-0 bg-carbon/40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/20 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start h-full justify-between">
                <div className="w-full flex justify-end">
                  <a href="#featured-products" className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1 ${collection.image ? 'bg-white/20 hover:bg-white/30' : 'bg-black/5 hover:bg-black/10'}`}>
                    <ArrowUpRight className={`w-5 h-5 ${collection.image ? 'text-white' : collection.text}`} />
                  </a>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2 tracking-tight">
                    {collection.title}
                  </h3>
                  <p className={`text-sm md:text-base max-w-sm ${collection.image ? 'text-white/80' : 'opacity-70'}`}>
                    {collection.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
