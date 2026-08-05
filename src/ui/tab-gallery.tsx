"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

interface TabGalleryProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
  className?: string;
}

export function TabGallery({
  images,
  title = "Tab Gallery",
  description = "Click on an image to expand it:",
  className,
}: TabGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(
    () => images[0] ?? null,
  );

  return (
    <div className={cn("w-full space-y-8", className)}>
      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text bg-gradient-to-r text-black">
          {title}
        </h2>
        <p className="text-base text-muted-foreground font-medium">
          {description}
        </p>
      </div>

      {/* Thumbnails */}
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.url}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300",
              selectedImage?.url === image.url
                ? "border-primary ring-4 ring-primary/20 scale-105 z-10"
                : "border-transparent hover:border-primary/40 hover:shadow-primary/10",
            )}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            key={selectedImage.url}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative mt-12 overflow-hidden rounded-[2rem] bg-background shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] ring-1 ring-border/50"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="h-full w-full object-cover"
              />

              {/* Close Button - Premium Glassmorphism */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-2xl transition-all hover:bg-white/20 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close image"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Caption - Premium Gradient & Typography */}
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 pt-20">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white drop-shadow-md"
                  >
                    {selectedImage.caption}
                  </motion.p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
