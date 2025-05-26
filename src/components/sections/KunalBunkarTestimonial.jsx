"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials({ content, items }) {
  if (!content || !items || items.length === 0) return null;

  const { title, subtitle, description } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const autoSlideInterval = useRef();

  // Auto slide every 5 seconds
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideInterval.current);
  }, []);

  // Reset auto slide timer on user interaction
  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
    startAutoSlide();
  };

  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const prevSlide = () => {
    resetAutoSlide();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetAutoSlide();
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const {
    title: userTitle,
    subtitle: userSubtitle,
    description: userDescription,
    image_url,
    rating,
  } = items[currentIndex];

  return (
    <section className="w-full bg-black text-white py-10 px-6 md:px-20 relative overflow-hidden select-none">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-gray-200 font-medium uppercase tracking-wide">
          {subtitle}
        </p>
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        <p className="text-gray-400 max-w-xl mx-auto">{description}</p>
      </motion.div>

      {/* Slider */}
      <div className="max-w-2xl mx-auto relative h-[340px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="flex flex-col items-center text-center px-6 absolute top-0 left-0 right-0"
          >
            {/* Circular image with cropping */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-pink-600 shadow-lg">
              <Image
                src={image_url}
                alt={userTitle}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>

            {/* Rating */}
            <p className="text-yellow-400 mb-3 text-lg tracking-wide">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </p>

            {/* User name and role */}
            <h3 className="text-2xl font-semibold mb-1">{userTitle}</h3>
            <p className="text-pink-500 text-base mb-4">{userSubtitle}</p>

            {/* Description */}
            <p className="text-gray-300 max-w-lg leading-relaxed">{userDescription}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        aria-label="Previous testimonial"
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-white bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition shadow-lg"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        aria-label="Next testimonial"
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-white bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition shadow-lg"
      >
        <ArrowRight size={24} />
      </button>
    </section>
  );
}
