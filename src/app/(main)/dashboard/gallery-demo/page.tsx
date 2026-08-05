"use client";

import { TabGallery } from "@/components/ui/tab-gallery";

const DEMO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    alt: "Mountain Range",
    caption: "Misty Mountain Peaks",
  },
  {
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    alt: "Lake Scene",
    caption: "Serene Lake reflections at sunset",
  },
  {
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
    alt: "Valley View",
    caption: "Lush Green Valley in the Alps",
  },
  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2150&auto=format&fit=crop",
    alt: "Northern Lights",
    caption: "Aurora Borealis dancing over the mountains",
  },
];

export default function GalleryDemoPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="rounded-3xl bg-card p-8 shadow-sm border border-border">
        <TabGallery
          images={DEMO_IMAGES}
          title="Premium Image Gallery"
          description="Explore our stunning landscape collection. Click a thumbnail to view details."
        />
      </div>

      <div className="mt-12 text-center text-muted-foreground text-sm">
        <p>Built with Tailwind CSS, Framer Motion, and Lucide React.</p>
      </div>
    </div>
  );
}
