"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About2({ content, items }) {
  if (!content) return null;

  const { title, subtitle, description, image_url, cta_text, cta_link } =
    content;

  // Optional: Add "Read more" toggle for description if needed
  const [showFullDesc, setShowFullDesc] = useState(false);
  const maxDescLength = 250;
  const isLongDesc = description && description.length > maxDescLength;

  const toggleDesc = () => setShowFullDesc((prev) => !prev);

  return (
    <section
      id="about"
      className="w-full bg-[#000000] text-white py-2 px-8 md:px-20 flex flex-col items-center"
    >
      <motion.div
        className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Left: Text */}
        <div className="flex-1 w-full text-left max-w-lg">
          {title && (
            <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4 font-serif">
              {title}
            </h1>
          )}
          {subtitle && (
            <h2 className="text-lg md:text-xl font-medium text-gray-300 mb-4">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
              {isLongDesc && !showFullDesc
                ? description.slice(0, maxDescLength) + "..."
                : description}
              {isLongDesc && (
                <button
                  onClick={toggleDesc}
                  className="ml-2 text-blue-400 underline hover:text-blue-600 transition"
                  aria-label={showFullDesc ? "Read less" : "Read more"}
                >
                  {showFullDesc ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          )}

          {cta_text && cta_link && (
            <Link href={cta_link}>
              <Button
                variant="default"
                size="lg"
                className="bg-white text-black hover:bg-gray-200 transition px-8 py-4"
              >
                {cta_text}
              </Button>
            </Link>
          )}
        </div>

        {/* Right: Image */}
        {image_url && (
          <div className="flex-1 w-full h-full max-h-[650px] min-h-[500px] relative overflow-hidden shadow-2xl">
            <Image
              src={image_url}
              alt="About Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </motion.div>

      {/* Items section below */}
      {items && items.length > 0 && (
        <motion.div
          className="mt-20 max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          {items.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-gray-900 rounded-lg p-8 flex flex-col items-center text-white shadow-lg hover:bg-gray-800 transition"
            >
              <div className="text-6xl mb-5">{icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-300 text-lg">{description}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
