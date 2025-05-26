"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function Service({ content, items = [] }) {
  if (!content || items.length === 0) return null;

  const { title, subtitle, description, cta_text, cta_link, main_video_id } =
    content;

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="services" className="relative w-full min-h-screen py-20 px-6 md:px-12 bg-black text-white flex flex-col items-center">
      {/* Top container: Video left, Content right */}
      <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10 w-full">
        {/* Left: Video */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-3xl overflow-hidden shadow-lg relative"
          style={{ paddingTop: "56.25%", height: 0 }}
        >
          {isPlaying ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-3xl"
              src={`https://www.youtube.com/embed/${main_video_id}?autoplay=1&rel=0&modestbranding=1&controls=0&showinfo=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <Image
                src={`https://img.youtube.com/vi/${main_video_id}/maxresdefault.jpg`}
                alt="Video thumbnail"
                fill
                className="object-cover cursor-pointer"
                onClick={() => setIsPlaying(true)}
                priority
              />
              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Play Video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white hover:text-red-500"
              >
                <PlayCircle size={80} />
              </button>
            </>
          )}
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 space-y-6 text-right"
        >
          {title && (
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-pink-100 font-serif tracking-wide drop-shadow-lg">
              {title}
            </h1>
          )}
          {subtitle && (
            <h2 className="text-2xl md:text-3xl text-pink-300 italic font-light tracking-wider">
              {subtitle}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              {description}
            </p>
          )}
          {cta_text && cta_link && (
            <Link href={cta_link}>
              <Button className="bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-md hover:from-pink-500 hover:to-fuchsia-600 transition-all duration-300">
                {cta_text}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Cards Grid: 4 cards in one row, vertical layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 px-4">
  {items.map((item) => (
    <div
      key={item.id}
      className="bg-gray-900 bg-opacity-80 border border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
      style={{ minHeight: "300px" }}
    >
      {/* Fixed height for title */}
      <h3
        className="text-3xl font-semibold text-gray-200 mb-4"
        style={{ minHeight: "4.5rem" }}
      >
        {item.title}
      </h3>

      {/* Thin line */}
      <div className="border-b border-gray-700 mb-4" />

      {/* Fixed height for description */}
      <p className="text-gray-400" style={{ minHeight: "8rem" }}>
        {item.description}
      </p>
    </div>
  ))}
</div>

    </section>
  );
}
