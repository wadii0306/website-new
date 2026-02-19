"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import featuresData from "./FeatureData.json";

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

  const cardsX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(features.length - 1) * 400]
  );

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
      const scrollPosition = containerTop + (containerHeight / features.length) * index;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (Math.abs(diff) > 1) return null;

    if (diff === -1) return "left";
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return null;
  };

  const getCardVariants = (position: string | null) => {
    switch (position) {
      case "left":
        return {
          x: -420,
          scale: 0.85,
          y: 20,
          opacity: 0.5,
          zIndex: 1,
        };
      case "center":
        return {
          x: 0,
          scale: 1,
          y: -20,
          opacity: 1,
          zIndex: 10,
        };
      case "right":
        return {
          x: 420,
          scale: 0.85,
          y: 20,
          opacity: 0.5,
          zIndex: 1,
        };
      default:
        return {
          x: 0,
          scale: 0.5,
          opacity: 0,
          zIndex: 0,
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
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-6xl mx-auto h-full flex items-center justify-center">
          <div className="relative w-[400px] h-[500px]">
            {features.map((feature, index) => {
              const position = getCardPosition(index);
              if (!position) return null;

              return (
                <motion.div
                  key={feature.id}
                  animate={getCardVariants(position)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute inset-0 w-[400px] bg-white rounded-2xl shadow-2xl p-8 cursor-pointer"
                  onClick={() => {
                    if (position === "left") prevCard();
                    if (position === "right") nextCard();
                  }}
                  whileHover={
                    position === "center"
                      ? { scale: 1.02 }
                      : { scale: 0.87 }
                  }
                  style={{
                    border: position === "center" ? "2px solid #818cf8" : "none",
                  }}
                >
                  <div className="h-64 bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl mb-6 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-indigo-600" />
            </button>

            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-indigo-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextCard}
              disabled={currentIndex === features.length - 1}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          <div className="absolute top-8 right-8 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {currentIndex + 1} / {features.length}
          </div>
        </div>
      </div>
    </div>
  );
}
