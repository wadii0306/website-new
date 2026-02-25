"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const CARD_WIDTH = 500;
  const PEEK_WIDTH = 400;
  const GAP = 24;

  const getCardVariants = (index: number) => {
    const diff = index - currentIndex;

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
        x: -(CARD_WIDTH / 2 + PEEK_WIDTH / 3 + GAP),
        scale: 0.88,
        opacity: 1,
        zIndex: 5,
        filter: "brightness(0.75)",
      };
    } else if (diff === 1) {
      return {
        x: CARD_WIDTH / 2 + PEEK_WIDTH / 3 + GAP,
        scale: 0.88,
        opacity: 1,
        zIndex: 5,
        filter: "brightness(0.75)",
      };
    } else if (diff === -2) {
      return {
        x: -(CARD_WIDTH / 2 + PEEK_WIDTH + GAP * 2),
        scale: 0.76,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(0.5)",
      };
    } else if (diff === 2) {
      return {
        x: CARD_WIDTH / 2 + PEEK_WIDTH + GAP * 2,
        scale: 0.76,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(0.5)",
      };
    } else {
      return {
        x: diff > 0 ? 1600 : -1600,
        scale: 0.7,
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

            return (
              <motion.div
                key={feature.id}
                animate={variants}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="absolute rounded-2xl shadow-xl overflow-hidden cursor-pointer select-none"
                style={{
                  width: CARD_WIDTH,
                  height: isCenter ? 480 : 440,
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
                    ? { filter: "brightness(0.85)", scale: variants.scale as number * 1.01 }
                    : isCenter
                    ? { scale: 1.01 }
                    : {}
                }
              >
                {/* Image area */}
                <div className="relative w-full"
                  style={{ height: 300 }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text area */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
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