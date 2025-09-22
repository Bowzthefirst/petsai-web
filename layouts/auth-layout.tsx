"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { FeaturedTestimonials } from "@/components/featured-testimonials";

// Sample of pet images for the auth layout grid
const AUTH_PET_IMAGES = [
  "abstract-shapes.jpg",
  "anime-style.jpg",
  "arctic-glacier.jpg",
  "astronaut-suit.jpg",
  "birthday-cake.jpg",
  "celebrity-glam.jpg",
  "crystal-energy.jpg",
  "cyber-avatar.jpg",
  "fairy-tale.jpg",
  "festival-vibes.jpg",
  "gaming-setup.jpg",
  "gradient-glow.jpg",
  "hero-aura.jpg",
  "kawaii.jpg",
  "luxury-yacht.jpg",
  "mystic-castle.jpg",
  "neon-city.jpg",
  "oil-painting.jpg",
  "pop-art.jpg",
  "rainbow-sheen.jpg",
  "royal-crown.jpg",
  "sparkle-veil.jpg",
  "superhero-suit.jpg",
  "watercolor.jpg"
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle and select 12 images for the grid
    const shuffled = [...AUTH_PET_IMAGES].sort(() => Math.random() - 0.5);
    setDisplayImages(shuffled.slice(0, 12));
  }, []);

  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        {children}
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-800 overflow-hidden bg-gray-50 dark:bg-neutral-900 flex-col">
          {/* Header Section */}
          <div className="p-8 text-center">
            <h2 className="font-fredoka text-2xl font-bold text-neutral-800 dark:text-white mb-2">
              Transform Your Pets with AI Magic
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Join thousands creating stunning AI art of their beloved pets
            </p>
          </div>
          
          {/* Pet Image Grid */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-3 gap-3 h-full">
              {displayImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group"
                >
                  <Image
                    src={`/pet-images/${image}`}
                    alt="AI Pet Art"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 0px, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="p-6 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              ✨ Create magical transformations of your pets in seconds
            </p>
          </div>
          
          <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
        </div>
      </div>
    </>
  );
}
