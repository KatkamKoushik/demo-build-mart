"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPin: string;
  onUpdatePin: (pin: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  currentPin,
  onUpdatePin,
}: LocationModalProps) {
  const [value, setValue] = useState(currentPin);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      setValue(currentPin);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, currentPin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      onUpdatePin(value);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-carbon/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <dialog
            ref={dialogRef}
            id="location-modal"
            className="relative z-10 bg-transparent border-none p-0 m-0
                       max-w-md w-full backdrop:bg-transparent open:flex"
            onClose={onClose}
          >
            <motion.div
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cobalt/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-cobalt" />
                  </div>
                  <h3 className="text-lg font-semibold text-carbon">
                    Change Delivery Location
                  </h3>
                </div>
                <button
                  id="modal-close"
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-carbon/5 text-muted hover:text-carbon
                             transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="pin-input"
                    className="block text-sm font-medium text-carbon mb-2"
                  >
                    Enter your PIN code
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    id="pin-input"
                    value={value}
                    onChange={(e) =>
                      setValue(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    placeholder="e.g. 560001"
                    className="w-full px-4 py-3 rounded-xl bg-alabaster border border-border
                               text-base text-carbon placeholder:text-muted-light
                               focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10
                               transition-all tracking-widest font-semibold text-center text-lg"
                  />
                  {value.length > 0 && value.length < 6 && (
                    <p className="text-xs text-muted mt-1.5">
                      Enter a valid 6-digit PIN code
                    </p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  id="pin-submit"
                  className="w-full py-3 rounded-xl bg-cobalt text-white font-semibold text-sm
                             hover:bg-cobalt-dark transition-colors cursor-pointer
                             disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={value.length !== 6}
                  whileHover={{ scale: value.length === 6 ? 1.01 : 1 }}
                  whileTap={{ scale: value.length === 6 ? 0.98 : 1 }}
                >
                  Update Location
                </motion.button>
              </form>
            </motion.div>
          </dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
