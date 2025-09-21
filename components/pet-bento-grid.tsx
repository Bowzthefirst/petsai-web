"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useId } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { IconUpload, IconSparkles, IconCamera, IconPalette } from "@tabler/icons-react";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Compare } from "./ui/compare";

export function PetBentoGrid() {
  return (
    <div className="relative z-20 py-10 lg:py-40 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <Heading as="h2">Transform your pet photos with AI</Heading>
        <Subheading className="text-center">
          Create stunning, artistic photos of your beloved pets using our state-of-the-art AI technology. 
          From portraits to fantasy scenes, bring your pet's personality to life.
        </Subheading>
        <div className="mt-12 grid grid-flow-col grid-cols-1 grid-rows-6 gap-2 md:grid-cols-2 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
          <Card className="row-span-2">
            <CardContent>
              <CardTitle>AI Style Generation</CardTitle>
              <CardDescription>
                Transform your pet into any artistic style - from anime to oil painting, 
                cyberpunk to royal portraits.
              </CardDescription>
            </CardContent>
            <CardSkeletonBody>
              <PetStyleSkeleton />
            </CardSkeletonBody>
          </Card>
          <Card className="overflow-hidden">
            <CardContent>
              <CardTitle>Easy Photo Upload</CardTitle>
              <CardDescription>
                Simply drag and drop or click to upload your pet's photo. 
                We'll handle the rest with our advanced AI.
              </CardDescription>
            </CardContent>
            <CardSkeletonBody>
              <UploadSkeleton />
            </CardSkeletonBody>
          </Card>
          <Card>
            <CardContent className="pb-2">
              <CardTitle>AI Style Library</CardTitle>
            </CardContent>
            <CardSkeletonBody className="flex-1">
              <StyleLibrarySkeleton />
            </CardSkeletonBody>
          </Card>
          <Card className="row-span-2">
            <CardContent>
              <CardTitle>Before & After Results</CardTitle>
              <CardDescription>
                See the incredible transformation from ordinary pet photo to stunning 
                AI-enhanced artwork.
              </CardDescription>
            </CardContent>
            <CardSkeletonBody className="h-full max-h-full overflow-hidden">
              <BeforeAfterSkeleton />
            </CardSkeletonBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Pet-focused Skeletons

const PetStyleSkeleton = () => {
  const petStyles = [
    {
      src: "/pet-images/anime-style.jpg",
      style: "Anime Style",
      score: 98,
    },
    {
      src: "/pet-images/oil-painting.jpg", 
      style: "Oil Painting",
      score: 95,
    },
    {
      src: "/pet-images/cyber-avatar.jpg",
      style: "Cyberpunk",
      score: 92,
    },
    {
      src: "/pet-images/royal-portrait.jpg",
      style: "Royal Portrait", 
      score: 96,
    },
  ];

  const [active, setActive] = useState(petStyles[0]);

  const intervalTime = 3000; // 3 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = petStyles.indexOf(prev);
        const nextIndex = (currentIndex + 1) % petStyles.length;
        return petStyles[nextIndex];
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const Highlighter = () => {
    return (
      <motion.div layoutId="pet-highlighter" className="absolute inset-0">
        <div className="absolute -left-px -top-px h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-primary bg-transparent"></div>
        <div className="absolute -right-px -top-px h-4 w-4 rounded-tr-lg border-r-2 border-t-2 border-primary bg-transparent"></div>
        <div className="absolute -bottom-px -left-px h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-primary bg-transparent"></div>
        <div className="absolute -bottom-px -right-px h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-primary bg-transparent"></div>
      </motion.div>
    );
  };

  const StyleLabel = () => {
    return (
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
          repeat: 0,
        }}
        className="absolute inset-x-0 bottom-4 m-auto h-fit w-fit rounded-md border border-neutral-100 bg-white px-2 py-1 text-xs text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
      >
        {active.style} <span className="font-bold">{active.score}%</span>
      </motion.span>
    );
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 justify-center gap-4">
        {petStyles.map((style, index) => (
          <motion.div
            key={`pet-style-${index}`}
            className="relative"
            animate={{
              opacity: active.src === style.src ? 1 : 0.5,
              filter: active.src === style.src ? "none" : "grayscale(100%)",
              scale: active.src === style.src ? 0.95 : 1,
            }}
            transition={{ duration: 1 }}
          >
            {active.src === style.src && <Highlighter />}
            {active.src === style.src && <StyleLabel />}
            <Image
              key={`pet-style-image-${index}`}
              src={style.src}
              alt={style.style}
              width={100}
              height={140}
              className="h-[200px] w-full rounded-lg object-cover object-center"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProcessingSkeleton = () => {
  const ProcessingIcon = ({ 
    icon: Icon, 
    className, 
    delay = 0 
  }: { 
    icon: any; 
    className?: string; 
    delay?: number;
  }) => {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "absolute z-30 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-200",
          className,
        )}
      >
        <Icon className="h-4 w-4 text-primary" />
      </motion.div>
    );
  };

  return (
    <div className="group/bento relative flex h-40 flex-col overflow-hidden px-2 py-8">
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <motion.div 
          className="relative h-20 w-20 rounded-full border-2 border-dashed border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <ProcessingIcon 
            icon={IconCamera} 
            className="left-8 top-2" 
            delay={0}
          />
          <ProcessingIcon 
            icon={IconSparkles} 
            className="right-2 top-8" 
            delay={0.5}
          />
          <ProcessingIcon 
            icon={IconPalette} 
            className="bottom-2 left-2" 
            delay={1}
          />
        </motion.div>
      </div>
      <motion.div 
        className="absolute inset-x-0 bottom-8 mx-auto w-fit rounded-md border border-neutral-100 bg-white px-3 py-1 text-xs text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Processing... 87%
      </motion.div>
    </div>
  );
};

const StyleLibrarySkeleton = () => {
  const styles = [
    "/pet-images/fairy-tale.jpg",
    "/pet-images/oil-painting.jpg", 
    "/pet-images/cyber-avatar.jpg",
    "/pet-images/royal-portrait.jpg",
    "/pet-images/anime-style.jpg",
    "/pet-images/heroic-armor.jpg",
    "/pet-images/pop-art.jpg",
    "/pet-images/neon-city.jpg",
  ];

  return (
    <div className="h-full p-3 pt-1">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
        {styles.map((image, index) => (
          <div 
            key={`style-${index}`}
            className="aspect-square relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800 w-full"
          >
            <Image
              src={image}
              alt={`AI Style ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BeforeAfterSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <Compare
        firstImage="/compare/nike-before.jpg"
        secondImage="/compare/nike-after.png"
        className="w-full h-full max-w-md max-h-80 rounded-lg"
        firstImageClassName="object-cover"
        secondImageClassname="object-cover"
        slideMode="hover"
        autoplay={true}
        autoplayDuration={3000}
      />
    </div>
  );
};

const UploadSkeleton = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="relative block h-full w-full cursor-pointer overflow-hidden rounded-none"
      >
        <input
          ref={fileInputRef}
          id="pet-file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_top,white,transparent)]">
          <PetGridPattern />
        </div>
        <div className="flex h-full max-h-96 flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent,white,transparent)]">
          <div className="relative mx-auto w-full max-w-xs">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"pet-file" + idx}
                  layoutId={idx === 0 ? "pet-file-upload" : "pet-file-upload-" + idx}
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-24 dark:bg-neutral-900",
                    "border-t border-neutral-100 shadow-md dark:border-neutral-800",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="max-w-xs truncate text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="w-fit flex-shrink-0 rounded-lg px-2 py-1 text-xs text-neutral-600 shadow-md dark:bg-neutral-800 dark:text-white"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
                    >
                      Pet Photo
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      Ready for AI ✨
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="pet-file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <IconUpload className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
                  <span className="text-xs text-neutral-500">Pet Photo</span>
                </div>
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-primary bg-transparent opacity-0"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Card structure (reused from original)
const CardSkeletonBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "font-sans text-sm font-medium tracking-tight text-neutral-700 dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "mt-2 max-w-xs font-sans text-sm font-normal tracking-tight text-neutral-500 dark:text-neutral-400",
        className,
      )}
    >
      {children}
    </h3>
  );
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover="animate"
      className={cn(
        "group isolate flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

// Variants
const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = { 
  initial: { opacity: 0 }, 
  animate: { opacity: 1 } 
};

// Pet-themed grid pattern
export function PetGridPattern() {
  const columns = 20;
  const rows = 5;
  return (
    <div className="flex flex-shrink-0 scale-110 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          const isPaw = index % 7 === 0; // Occasional paw prints
          return (
            <div
              key={`${col}-${row}-pet-grid`}
              className={`flex h-10 w-10 flex-shrink-0 rounded-[2px] ${
                isPaw
                  ? "bg-primary/5 shadow-[0px_0px_1px_3px_rgba(2,0,34,0.1)_inset]"
                  : index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}

