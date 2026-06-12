"use client"

import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types/index";
import Link from "next/link";
import { mobileMenuPanel, mobileMenuOverlay, mobileMenuItem } from "@/app/constants/animations";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
};

export default function MobileMenu({ isOpen, onClose, menuItems }: Props) {
  return (
    <AnimatePresence>
      {/* オーバーレイ */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white bg-opacity-50 z-40"
          variants={mobileMenuOverlay}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={onClose}
        />
      )}

      {/* パネル */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 md:w-100 bg-[#5c554f] shadow-2xl z-50 flex flex-col"
        variants={mobileMenuPanel}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="h-full flex flex-col">
          {/* ヘッダー行 */}
          <motion.div
            className="flex justify-between mt-[4vh] mx-[3vw]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white font-bold font-yuji text-2xl md:text-3xl">
              <Link href="/" onClick={onClose}>鏡花水月城</Link>
            </h2>
            <motion.button
              className="text-white text-3xl md:text-4xl font-bold font-yuji mt-[-1vh] md:mt-0"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>

          <div className="mt-[6vh]">
            <motion.div
              className="w-full h-0.5 bg-white opacity-50 mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <nav className="flex-1 space-y-2 font-yuji">
              {menuItems.map((item, index) => (
                <Link
                    key={item.name}
                    href={item.to}
                    className="block px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300 text-lg border-b border-gray-700 border-opacity-30"
                    onClick={onClose}
                    >
                    <span className="flex items-center justify-between">
                        {item.name}
                        <span className="text-sm">›</span>
                    </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}