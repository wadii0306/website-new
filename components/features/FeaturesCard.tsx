"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import featuresData from "./FeatureDataTemp.json";
import Image from "next/image";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function FeaturesCard() {
  const features: Feature[] = featuresData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, features.length - 1]
  );

  useMotionValueEvent(cardIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (index !== currentIndex && index >= 0 && index < features.length) {
      setCurrentIndex(index);
    }
  });

  const nextCard = () => {
    if (currentIndex < features.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToCard(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToCard(currentIndex - 1);
    }
  };

  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollPosition =
        containerTop + (containerHeight / features.length) * index;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CARD_WIDTH = 500;

  // Responsive dimensions
  const getResponsiveDimensions = () => {
    if (typeof window === 'undefined') return { width: CARD_WIDTH, height: 480, imageHeight: 300 };
    
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 640) { // Small mobile
      return { width: 280, height: 380, imageHeight: 200 };
    } else if (screenWidth < 768) { // Large mobile
      return { width: 320, height: 420, imageHeight: 240 };
    } else if (screenWidth < 1024) { // Tablet
      return { width: 400, height: 450, imageHeight: 270 };
    } else { // Desktop
      return { width: 500, height: 480, imageHeight: 300 };
    }
  };

  const getCardVariants = (index: number) => {
    const diff = index - currentIndex;
    const dimensions = getResponsiveDimensions();
    const peekWidth = dimensions.width * 0.3;
    const gap = dimensions.width * 0.05;

    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1)",
      };
    } else if (diff === -1) {
      return {
        x: -(dimensions.width / 2 + peekWidth / 2 + gap),
        scale: 0.85,
        opacity: 0.9,
        zIndex: 5,
        filter: "brightness(0.8)",
      };
    } else if (diff === 1) {
      return {
        x: dimensions.width / 2 + peekWidth / 2 + gap,
        scale: 0.85,
        opacity: 0.9,
        zIndex: 5,
        filter: "brightness(0.8)",
      };
    } else if (diff === -2) {
      return {
        x: -(dimensions.width / 2 + peekWidth + gap * 2),
        scale: 0.7,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(0.6)",
      };
    } else if (diff === 2) {
      return {
        x: dimensions.width / 2 + peekWidth + gap * 2,
        scale: 0.7,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(0.6)",
      };
    } else {
      return {
        x: diff > 0 ? dimensions.width * 2 : -dimensions.width * 2,
        scale: 0.6,
        opacity: 0,
        zIndex: 0,
        filter: "brightness(0.5)",
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >

        {/* Cards stage */}
        <div className="relative w-full flex items-center justify-center"
          style={{ height: 520 }}
        >
          {features.map((feature, index) => {
            const diff = index - currentIndex;
            if (Math.abs(diff) > 2) return null;

            const variants = getCardVariants(index);
            const isCenter = diff === 0;
            const isSide = Math.abs(diff) === 1;
            const dimensions = getResponsiveDimensions();

            return (
              <motion.div
                key={feature.id}
                animate={variants}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="absolute rounded-2xl shadow-xl overflow-hidden cursor-pointer select-none bg-white"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  border: isCenter ? "2px solid #818cf8" : "2px solid transparent",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(99,102,241,0.18), 0 8px 24px rgba(0,0,0,0.08)"
                    : "0 8px 32px rgba(0,0,0,0.10)",
                  zIndex: variants.zIndex,
                  pointerEvents: isSide ? "auto" : isCenter ? "auto" : "none",
                }}
                onClick={() => {
                  if (diff === -1) prevCard();
                  if (diff === 1) nextCard();
                }}
                whileHover={
                  isSide
                    ? { filter: "brightness(0.85)", scale: variants.scale as number * 1.02 }
                    : isCenter
                    ? { scale: 1.02 }
                    : {}
                }
              >
                {/* Image area */}
                <div className="relative w-full"
                  style={{ height: dimensions.imageHeight }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text area */}
                <div className="p-4 sm:p-5 md:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                {/* Down arrow button to skip to pricing - only show on center card */}
                {isCenter && (
                  <motion.button
                    onClick={scrollToPricing}
                    className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-indigo-50 border border-gray-100 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{
                      transform: `translate(${variants.x}px, 0)`,
                    }}
                  >
                    <ChevronDown className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="relative z-20 flex items-center gap-5 mt-8">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-600" />
          </button>

          <div className="flex gap-2 items-center">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-7 h-2.5 bg-indigo-600"
                    : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === features.length - 1}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {/* Counter badge */}
        <div className="absolute top-8 right-10 z-20 bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow">
          {currentIndex + 1} / {features.length}
        </div>
      </div>
    </div>
  );
}