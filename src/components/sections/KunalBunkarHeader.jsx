"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx"; // Optional, for cleaner className logic

export default function Header5({ content, items = [] }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show if scrolling up, hide if down
      if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!content) return null;

  const {
    description,
    image_url,
    cta_text,
    cta_link,
  } = content;

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out bg-black bg-opacity-95 backdrop-blur-sm text-white shadow-md border-b border-gray-800",
        {
          "-translate-y-full": !showHeader,
          "translate-y-0": showHeader,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-6 px-6 md:px-12">
        {/* Logo & Description */}
        <motion.div
          className="flex items-center gap-6 md:gap-10 max-w-3xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {image_url && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={image_url}
                alt="Logo"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
            {description}
          </p>
        </motion.div>

        {/* Navigation */}
        <nav className="flex gap-8 md:gap-12 text-lg font-medium tracking-wide whitespace-nowrap">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            >
              <a
                href={item.link}
                className="text-gray-300 hover:text-white hover:underline underline-offset-4 transition"
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* CTA Button */}
        {cta_text && cta_link && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href={cta_link}>
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-pink-600 hover:via-indigo-600 hover:to-purple-600 text-white shadow-lg transition-transform hover:scale-105"
              >
                {cta_text}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
