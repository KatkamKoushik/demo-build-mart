"use client";

import { useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Search, Store, Shield, Clock, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-carbon via-carbon-dark to-carbon" />
  ),
});

const headlineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const trustItems = [
  { icon: Shield, label: "Verified Shops" },
  { icon: Clock, label: "Fast Delivery" },
  { icon: DollarSign, label: "Best Local Prices" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    // Parallax on the background image
    gsap.to(bgRef.current, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/90 via-carbon/80 to-carbon/95" />
        {/* Cobalt accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cobalt/10 via-transparent to-cobalt/5" />
      </div>

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 container-main pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24">
        <div className="max-w-3xl">
          {/* Delivery Badge */}
          <motion.div
            id="delivery-badge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/10
                       text-sm text-white/80 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MapPin className="w-3.5 h-3.5 text-cobalt-light" />
            <span>
              Delivering to Bangalore:{" "}
              <strong className="text-white" id="delivery-pin">
                560001
              </strong>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white
                        leading-[1.05] tracking-tight mb-6"
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="inline-block" variants={wordVariants}>
              Build{" "}
            </motion.span>
            <motion.span className="inline-block" variants={wordVariants}>
              Smarter.
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-cobalt-light to-cobalt bg-clip-text text-transparent"
              variants={wordVariants}
            >
              Source{" "}
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-cobalt to-cobalt-light bg-clip-text text-transparent"
              variants={wordVariants}
            >
              Locally.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Cement, Steel & TMT Bars, Tiles, Electrical, Plumbing, Paint, Sand &
            Aggregates — from{" "}
            <em className="text-white/80 not-italic font-medium">
              verified local vendors
            </em>{" "}
            near you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <motion.a
              href="#collections"
              id="cta-explore"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full
                         bg-white text-carbon font-medium text-sm
                         hover:bg-white/90 shadow-2xl shadow-white/10
                         transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collections
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2.5 text-white/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-cobalt-light" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-alabaster to-transparent z-10"
        aria-hidden="true"
      />
    </section>
  );
}
