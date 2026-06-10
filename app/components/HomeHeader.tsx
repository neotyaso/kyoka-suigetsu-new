"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/index";
import Link from "next/link";
import { headerVariants, titleGlow } from '../constants/animations';
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburgerButton";

const menuItems: MenuItem[] = [
  { name: "見どころ", to: "/highlight" },
  { name: "歴史",     to: "/story"     },
  { name: "お知らせ", to: "/news"      },
  { name: "利用案内", to: "/access"    },
  { name: "アクセス", to: "/access"    },
  { name: "お問い合わせ", to: "/contact" },
];

export default function HomeHeader(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[url('/images/home/sumi_maho.jpg')] bg-center bg-cover min-h-[110vh] md:min-h-[150vh] lg:min-h-[190vh] xl:min-h-[230vh] relative">

      {/* ヘッダーバー */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-30 flex justify-between lg:font-bold font-yuji text-[#5c554f] bg-white shadow-md"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link href="/">
          <motion.h1
            className="md:text-4xl lg:text-4xl xl:text-6xl md:ml-[2vw] lg:ml-[2vw] xl:ml-[3vw] md:py-2 lg:py-2 hidden md:block font-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            鏡花水月城
          </motion.h1>
        </Link>

        {/* デスクトップメニュー */}
        <motion.ul
          className="flex gap-3 lg:text-xl xl:text-2xl items-center lg:mr-[2vw] xl:mr-[2.5vw]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {menuItems.map((item, idx) => (
            <Link key={`${item.name}-${idx}`} href={item.to}>
              <motion.li
                className="hidden lg:block py-2 px-2"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.li>
            </Link>
          ))}
        </motion.ul>

        <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(v => !v)} />
      </motion.header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
      />

      {/* メイン縦書きタイトル  */}
      <motion.div
        className="absolute inset-0 flex justify-center items-start pt-[12vh] md:pt-[18vh] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="
            font-bold font-yuji text-[#5c554f]
            [writing-mode:vertical-rl]
            text-[32vw]
            sm:text-[20vw]
            md:text-[25vw]
            lg:text-[20vw]
            xl:text-[15vw]
          "
          variants={titleGlow}
          animate="visible"
        >
          鏡花水月城
        </motion.h2>
      </motion.div>

    </div>
  );
}