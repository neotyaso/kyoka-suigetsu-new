"use client"

import { motion } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({ isOpen, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 w-12 h-12 bg-white bg-opacity-70 md:bg-transparent rounded-full flex flex-col justify-center items-center space-y-1 hover:bg-opacity-90 md:hover:bg-transparent transition-all duration-300 lg:hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
    >
      {[
        { rotate: isOpen ? 45 : 0,  y: isOpen ? 6 : 0  },
        { opacity: isOpen ? 0 : 1                       },
        { rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 },
      ].map((anim, i) => (
        <motion.div
          key={i}
          className="w-6 md:w-9 h-0.5 bg-[#5c554f]"
          animate={anim}
          transition={{ duration: 0.3 }}
        />
      ))}
    </motion.button>
  );
}