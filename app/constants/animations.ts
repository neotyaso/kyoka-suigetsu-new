import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    }
  })
};

export const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const titleGlow: Variants = {
  visible: {
    textShadow: [
      "0 0 0px rgba(92, 85, 79, 0.5)",
      "0 0 20px rgba(92, 85, 79, 0.3)",
      "0 0 0px rgba(92, 85, 79, 0.5)"
    ],
    transition: { duration: 3, repeat: Infinity }
  }
};

export const mobileMenuPanel: Variants = {
  closed: { x: "100%" },
  open: {
    x: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export const mobileMenuOverlay: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + i * 0.1 }
  })
};