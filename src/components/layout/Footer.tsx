"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-carbon text-white/80">
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="text-cobalt-light">
                <svg viewBox="0 0 28 28" fill="none" width="24" height="24" aria-hidden="true">
                  <rect x="2" y="14" width="10" height="12" rx="1.5" fill="currentColor" />
                  <rect x="14" y="8" width="12" height="18" rx="1.5" fill="currentColor" opacity=".7" />
                  <polygon points="14,2 26,8 2,8" fill="currentColor" opacity=".5" />
                </svg>
              </span>
              <span className="text-lg font-semibold text-white tracking-tight">
                Build<strong className="font-extrabold">Mart</strong>
              </span>
            </a>
            <p className="text-sm text-white/50 max-w-xs text-center md:text-left">
              Your trusted hyperlocal construction materials marketplace.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-xs text-white/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; 2026 BuildMart. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
