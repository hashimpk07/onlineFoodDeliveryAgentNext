// Selectable global UI font. `value` is kebab-case and matches both the
// `--font-{value}` CSS variable produced by next/font (see app/[locale]/layout.tsx)
// and the `[data-font-family="{value}"]` selector in globals.css.
export const FONT_OPTIONS = [
  { label: "Geist", value: "geist" },
  { label: "Inter", value: "inter" },
  { label: "Noto Sans", value: "noto-sans" },
  { label: "Nunito Sans", value: "nunito-sans" },
  { label: "Figtree", value: "figtree" },
  { label: "Roboto", value: "roboto" },
  { label: "Raleway", value: "raleway" },
  { label: "DM Sans", value: "dm-sans" },
  { label: "Public Sans", value: "public-sans" },
  { label: "Outfit", value: "outfit" },
  { label: "Geist Mono", value: "geist-mono" },
  // "Geist Pixel Square" isn't a real distributable web font; substituted
  // with Silkscreen, the closest available pixel-square style Google Font.
  { label: "Geist Pixel Square", value: "geist-pixel-square" },
  { label: "JetBrains Mono", value: "jetbrains-mono" },
  { label: "Noto Serif", value: "noto-serif" },
  { label: "Roboto Slab", value: "roboto-slab" },
  { label: "Merriweather", value: "merriweather" },
  { label: "Lora", value: "lora" },
  { label: "Playfair Display", value: "playfair-display" },
] as const;

export const FONT_FAMILY_VALUES = FONT_OPTIONS.map((f) => f.value);
export type FontFamily = (typeof FONT_FAMILY_VALUES)[number];
export const FONT_FAMILY_DEFAULT: FontFamily = "inter";
