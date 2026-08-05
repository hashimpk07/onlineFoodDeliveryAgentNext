import { ReactNode } from "react";

import {
  DM_Sans,
  Figtree,
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Lora,
  Merriweather,
  Noto_Sans,
  Noto_Serif,
  Nunito_Sans,
  Outfit,
  Playfair_Display,
  Public_Sans,
  Raleway,
  Roboto,
  Roboto_Slab,
  Silkscreen,
} from "next/font/google";

import { ExportModal } from "@/components/export-modal";
import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config/app-config";
import initTranslations from "@/lib/i18n";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import { ExportStoreProvider } from "@/providers/export-store-provider";
import { PreferencesStoreProvider } from "@/providers/preferences-store-provider";
import QueryProvider from "@/providers/query-provider";
import TranslationsProvider from "@/providers/translations-provider";
import { ThemeBootScript } from "@/scripts/theme-boot";

import type { Metadata } from "next";

import "../globals.css";

// All selectable UI fonts are loaded up front (each exposed as its own CSS
// variable) so switching fonts at runtime is just a CSS variable swap —
// see applyFontFamily() in lib/preferences/layout-utils.ts and the
// [data-font-family="..."] rules in globals.css.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const geistPixelSquare = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-geist-pixel-square",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const fontVariables = [
  geist.variable,
  inter.variable,
  notoSans.variable,
  nunitoSans.variable,
  figtree.variable,
  roboto.variable,
  raleway.variable,
  dmSans.variable,
  publicSans.variable,
  outfit.variable,
  geistMono.variable,
  geistPixelSquare.variable,
  jetbrainsMono.variable,
  notoSerif.variable,
  robotoSlab.variable,
  merriweather.variable,
  lora.variable,
  playfairDisplay.variable,
].join(" ");

export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
};

const i18nNamespaces = ["common"];

export default async function RootLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;
  const {
    theme_mode,
    theme_preset,
    content_layout,
    navbar_style,
    sidebar_variant,
    sidebar_collapsible,
    font_family,
  } = PREFERENCE_DEFAULTS;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${theme_mode} ${fontVariables}`}
      data-theme-preset={theme_preset}
      data-content-layout={content_layout}
      data-navbar-style={navbar_style}
      data-sidebar-variant={sidebar_variant}
      data-sidebar-collapsible={sidebar_collapsible}
      data-font-family={font_family}
      suppressHydrationWarning
    >
      <head>
        {/* Applies theme and layout preferences on load to avoid flicker and unnecessary server rerenders. */}
        <ThemeBootScript />
      </head>
      <body className="min-h-screen antialiased">
        <QueryProvider>
          <TranslationsProvider
            locale={locale}
            namespaces={i18nNamespaces}
            resources={resources}
          >
            <PreferencesStoreProvider
              themeMode={theme_mode}
              themePreset={theme_preset}
              contentLayout={content_layout}
              navbarStyle={navbar_style}
            >
              <ExportStoreProvider>
                {children}
                <ExportModal />
              </ExportStoreProvider>

              <Toaster />
            </PreferencesStoreProvider>
          </TranslationsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
