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
  "abstract-shapes.jpg",
  "foil-metallic.jpg",
  "police-officer.jpg",
  "airmail.jpg",
  "football-field.jpg",
  "pool-party.jpg",
  "alps-mountains.jpg",
  "futurist-geometry.jpg",
  "pop-art-1.jpg",
  "ancient-pyramid.jpg",
  "game-cover.jpg",
  "pop-art.jpg",
  "ancient-ruins.jpg",
  "gaming-setup.jpg",
  "pop-halftone.jpg",
  "angry-emoji.jpg",
  "geometric-shapes.jpg",
  "pop-star.jpg",
  "angry-flames.jpg",
  "glitter-sparkle.jpg",
  "popstar-stage.jpg",
  "anime-style.jpg",
  "glossy-3d.jpg",
  "president-podium.jpg",
  "arcane-runes.jpg",
  "glow-sticks.jpg",
  "private-jet.jpg",
  "arctic-glacier.jpg",
  "gold-frame.jpg",
  "psychedelic-70s.jpg",
  "arctic-ice.jpg",
  "golf-course.jpg",
  "rainbow-sheen.jpg",
  "art-deco-20s.jpg",
  "gradient-glow.jpg",
  "rainforest.jpg",
  "artist-palette.jpg",
  "graduation-cap.jpg",
  "rainy-alley.jpg",
  "astronaut-suit.jpg",
  "graffiti-art.jpg",
  "reaction-face.jpg",
  "aurora-trail.jpg",
  "graffiti.jpg",
  "red-carpet.jpg",
  "autumn-leaves.jpg",
  "greek-temple.jpg",
  "renaissance-noble.jpg",
  "award-stage.jpg",
  "greeting-note.jpg",
  "retro-comic.jpg",
  "aztec-lines.jpg",
  "happy-smile.jpg",
  "retro-diner-50s.jpg",
  "baby-bib-1.jpg",
  "harvest-farm.jpg",
  "retro-gamer.jpg",
  "baby-bib.jpg",
  "heavenly-clouds.jpg",
  "retro-panels.jpg",
  "baseball-diamond.jpg",
  "hero-aura.jpg",
  "retro-pattern.jpg",
  "basketball-court.jpg",
  "heroic-armor.jpg",
  "retro-travel.jpg",
  "birthday-cake.jpg",
  "hockey-arena.jpg",
  "retro-vhs.jpg",
  "birthday-candles.jpg",
  "holiday-card.jpg",
  "rihanna.jpg",
  "birthday-card.jpg",
  "holiday-dinner.jpg",
  "rockstar.jpg",
  "blueprints.jpg",
  "holiday-fun.jpg",
  "roman-centurion.jpg",
  "bookish-style.jpg",
  "ikat-weave.jpg",
  "rome-colosseum.jpg",
  "boom-burst.jpg",
  "impressionism.jpg",
  "royal-crown.jpg",
  "bored-blank.jpg",
  "influencer-frame.jpg",
  "royal-portrait.jpg",
  "boxing-ring.jpg",
  "influencer-selfie.jpg",
  "safari-savanna.jpg",
  "bubble-dream.jpg",
  "ink-drawing.jpg",
  "sassy-attitude.jpg",
  "business-suit.jpg",
  "ink-outline.jpg",
  "scared-spooked.jpg",
  "calligraphy-ink.jpg",
  "jewel-box.jpg",
  "scientist-lab.jpg",
  "camera-setup.jpg",
  "jungle-expedition.jpg",
  "selena-gomez.jpg",
  "canyon-run.jpg",
  "justin-bieber.jpg",
  "selfie-frame.jpg",
  "caption-box.jpg",
  "kawaii.jpg",
  "shocked-surprise.jpg",
  "cartoonify.jpg",
  "keanu-reeves.jpg",
  "ski-slopes.jpg",
  "celebrity-glam.jpg",
  "lab-table.jpg",
  "sky-trail.jpg",
  "celebrity-redcarpet.jpg",
  "lady-gaga.jpg",
  "skyline-sunset.jpg",
  "celestial-sky.jpg",
  "laugh-cry.jpg",
  "sleepy-dream.jpg",
  "chalkboard-doodle.jpg",
  "laughing-joy.jpg",
  "snowy-peaks.jpg",
  "champagne-toast.jpg",
  "lawyer-suit.jpg",
  "snowy-village.jpg",
  "charcoal-drawing-1.jpg",
  "lebron-james.jpg",
  "soccer-stadium.jpg",
  "charcoal-texture.jpg",
  "london-bridge.jpg",
  "sparkle-veil.jpg",
  "chef-outfit.jpg",
  "love-hearts.jpg",
  "speech-bubbles.jpg",
  "city-neon.jpg",
  "love-letter.jpg",
  "spooky-night.jpg",
  "classic-meme.jpg",
  "luxury-brand.jpg",
  "sports-champ.jpg",
  "club-lights.jpg",
  "luxury-yacht.jpg",
  "spring-bloom.jpg",
  "coastal-cliffs.jpg",
  "magazine-cover.jpg",
  "stained-glass-1.jpg",
  "coding-screen.jpg",
  "magazine-spread.jpg",
  "stained-glass.jpg",
  "coffee-break.jpg",
  "mandala-aura.jpg",
  "stamp-collection.jpg",
  "collage-cutout.jpg",
  "marble-hall.jpg",
  "starry-desert.jpg",
  "comic-heroes.jpg",
  "mask-ball.jpg",
  "stealth-night.jpg",
  "conference-room.jpg",
  "medieval-knight.jpg",
  "steampunk-gears.jpg",
  "confetti-blast.jpg",
  "meme-style.jpg",
  "sticker-bomb.jpg",
  "confetti-pop.jpg",
  "meme-template.jpg",
  "sticker-collage.jpg",
  "construction-worker.jpg",
  "mermaid-lagoon.jpg",
  "sticker-cute.jpg",
  "cool-vibes.jpg",
  "minimal-letter.jpg",
  "storm-chase.jpg",
  "countryside-farm.jpg",
  "minimalist.jpg",
  "streaming-show.jpg",
  "cozy-library.jpg",
  "mischievous-grin.jpg",
  "streetwear-1.jpg",
  "creative-studio.jpg",
  "morgan-freeman.jpg",
  "streetwear.jpg",
  "crying-tears.jpg",
  "mosaic-tiles.jpg",
  "study-desk.jpg",
  "crystal-cave.jpg",
  "mountain-sunset.jpg",
  "summer-sun.jpg",
  "crystal-chandelier.jpg",
  "movie-night.jpg",
  "sunken-ship.jpg",
  "crystal-energy.jpg",
  "movie-poster.jpg",
  "superhero-suit.jpg",
  "cubism.jpg",
  "music-album.jpg",
  "surprised-wow.jpg",
  "cyber-avatar.jpg",
  "music-concert.jpg",
  "surrealism-1.jpg",
  "dance-challenge.jpg",
  "music-studio.jpg",
  "sydney-opera.jpg",
  "desert-camels.jpg",
  "mystic-castle.jpg",
  "taylor-swift.jpg",
  "desert-dunes.jpg",
  "mystic-hood.jpg",
  "teacher-desk.jpg",
  "desert-oasis.jpg",
  "neon-city.jpg",
  "tears-emoji.jpg",
  "determined-focus.jpg",
  "neon-dance.jpg",
  "tennis-match.jpg",
  "disco-ball.jpg",
  "neon-frames.jpg",
  "theater-spotlight.jpg",
  "doctor-uniform.jpg",
  "neon-kabuki.jpg",
  "thinking-mode.jpg",
  "dream-gel.jpg",
  "neon-panels.jpg",
  "tile-courtyard.jpg",
  "DSC03892.jpeg",
  "nervous-sweat.jpg",
  "tokyo-neon.jpg",
  "dwayne-johnson.jpg",
  "new-year-sparkle.jpg",
  "tom-hanks.jpg",
  "egyptian-pharaoh.jpg",
  "new-years.jpg",
  "tropical-beach.jpg",
  "embarrassed-blush.jpg",
  "newspaper-dots.jpg",
  "tropical-island.jpg",
  "emoji-party.jpg",
  "norse-runes.jpg",
  "vacation-beach.jpg",
  "enchanted-forest.jpg",
  "nyc-skyline.jpg",
  "valentine-glow.jpg",
  "epic-dragon.jpg",
  "office-desk.jpg",
  "velvet-couch.jpg",
  "excited-energy.jpg",
  "oil-painting-1.jpg",
  "victorian-ornate.jpg",
  "fairy-glade.jpg",
  "oil-painting.jpg",
  "villain-dark.jpg",
  "fairy-tale.jpg",
  "olympic-track.jpg",
  "vintage-postcard.jpg",
  "fantasy-garden.jpg",
  "otherworld.jpg",
  "volcanic-glow.jpg",
  "fashion-runway-1.jpg",
  "paper-lantern.jpg",
  "watercolor-1.jpg",
  "fashion-runway.jpg",
  "paper-texture.jpg",
  "watercolor.jpg",
  "fashion-show.jpg",
  "paris-eiffel.jpg",
  "wedding-veil.jpg",
  "festival-crowd.jpg",
  "party-celebration.jpg",
  "wild-rapids.jpg",
  "festival-lanterns.jpg",
  "pastel-clouds.jpg",
  "winter-wonder.jpg",
  "festival-mask.jpg",
  "pencil-sketch-1.jpg",
  "wizard-spell.jpg",
  "festival-vibes.jpg",
  "pencil-sketch.jpg",
  "workout-gym.jpg",
  "fire-hype.jpg",
  "phoenix-fire.jpg",
  "woven-rattan.jpg",
  "firefighter-gear.jpg",
  "pixar-look.jpg",
  "y2k-style.jpg",
  "floating-island.jpg",
  "pixel-art.jpg",
  "zap-lines.jpg",
  "flower-meadow.jpg",
  "polaroid-frame.jpg",
  "zodiac-stars.jpg"
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
