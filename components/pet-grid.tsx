"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

// Actual pet images from the directory - using verified filenames
const PET_IMAGES = [
  "DSC03892.jpeg",
  "Leonardo_Phoenix_10_A_charismatic_dog_with_a_shiny_black_coat_0.jpg",
  "abstract-shapes.jpg",
  "airmail.jpg",
  "alps-mountains.jpg",
  "ancient-pyramid.jpg",
  "ancient-ruins.jpg",
  "angry-emoji.jpg",
  "angry-flames.jpg",
  "anime-style.jpg",
  "arcane-runes.jpg",
  "arctic-glacier.jpg",
  "arctic-ice.jpg",
  "art-deco-20s.jpg",
  "artist-palette.jpg",
  "astronaut-suit.jpg",
  "aurora-trail.jpg",
  "autumn-leaves.jpg",
  "award-stage.jpg",
  "aztec-lines.jpg",
  "baby-bib-1.jpg",
  "baby-bib.jpg",
  "baseball-diamond.jpg",
  "basketball-court.jpg",
  "birthday-cake.jpg",
  "birthday-candles.jpg",
  "birthday-card.jpg",
  "blueprints.jpg",
  "bookish-style.jpg",
  "boom-burst.jpg",
  "bored-blank.jpg",
  "boxing-ring.jpg",
  "bubble-dream.jpg",
  "business-suit.jpg",
  "calligraphy-ink.jpg",
  "camera-setup.jpg",
  "canyon-run.jpg",
  "caption-box.jpg",
  "cartoonify.jpg",
  "celebrity-glam.jpg",
  "celebrity-redcarpet.jpg",
  "celestial-sky.jpg",
  "chalkboard-doodle.jpg",
  "champagne-toast.jpg",
  "charcoal-drawing-1.jpg",
  "charcoal-texture.jpg",
  "chef-outfit.jpg",
  "city-neon.jpg",
  "classic-meme.jpg",
  "club-lights.jpg"
];

// Shuffle Button with Moving Border - adapted to theme colors
const ShuffleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-12 w-32 overflow-hidden bg-transparent p-[1px] text-lg rounded-2xl"
    >
      <div className="absolute inset-0 rounded-2xl">
        <MovingBorder duration={3000} rx="30%" ry="30%">
          <div className="h-16 w-16 bg-[radial-gradient(#020022_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>
      <div className="relative flex h-full w-full items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-black/90 text-sm text-neutral-900 dark:text-white antialiased backdrop-blur-xl rounded-2xl hover:bg-white dark:hover:bg-black transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Shuffle
      </div>
    </button>
  );
};

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export function PetGrid() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use useEffect to shuffle images client-side only, avoiding hydration mismatch
  useEffect(() => {
    const shuffled = [...PET_IMAGES].sort(() => Math.random() - 0.5);
    setSelectedImages(shuffled.slice(0, 12)); // Show 12 images (3 rows of 4)
  }, []);

  const shuffleImages = () => {
    const shuffled = [...PET_IMAGES].sort(() => Math.random() - 0.5);
    setSelectedImages(shuffled.slice(0, 12));
  };

  const formatImageTitle = (filename: string) => {
    return filename
      .split('.')[0]
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="relative z-20 py-10 lg:py-40 overflow-hidden">
      <Heading as="h2">AI Pet Gallery</Heading>
      <Subheading className="text-center">
        Explore our collection of AI-generated pet images with various artistic styles and themes.
      </Subheading>
      
      {/* Shuffle Button */}
      <div className="flex justify-center mt-8 mb-4">
        <ShuffleButton onClick={shuffleImages} />
      </div>
      
      {/* Clean grid layout for 12 images (3 rows of 4) - 3:4 aspect ratio */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 mt-8">
        {selectedImages.map((image, index) => (
          <div 
            key={index} 
            className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={`/pet-images/${image}`}
              alt={formatImageTitle(image)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium truncate">
                {formatImageTitle(image)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] aspect-[3/4]">
            <Image
              src={`/pet-images/${selectedImage}`}
              alt={formatImageTitle(selectedImage)}
              fill
              className="object-contain rounded-lg"
              sizes="90vw"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                {formatImageTitle(selectedImage)}
              </h3>
              <p className="text-white/80 text-sm">
                AI-generated pet image with unique styling
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
