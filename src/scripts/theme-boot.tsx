/**
 * Boot script that reads user preference values (theme mode, theme preset,
 * content layout, navbar style) from cookies or localStorage based on the
 * configured persistence mode.
 *
 * Runs early in <head> to apply the correct data attributes before hydration,
 * preventing layout or theme flicker and keeping RootLayout fully static.
 */
import Script from "next/script";

import {
  PREFERENCE_DEFAULTS,
  PREFERENCE_PERSISTENCE,
} from "@/lib/preferences/preferences-config";

export function ThemeBootScript() {
  const persistence = JSON.stringify({
    theme_mode: PREFERENCE_PERSISTENCE.theme_mode,
    theme_preset: PREFERENCE_PERSISTENCE.theme_preset,
    content_layout: PREFERENCE_PERSISTENCE.content_layout,
    navbar_style: PREFERENCE_PERSISTENCE.navbar_style,
    sidebar_variant: PREFERENCE_PERSISTENCE.sidebar_variant,
    sidebar_collapsible: PREFERENCE_PERSISTENCE.sidebar_collapsible,
    font_size: PREFERENCE_PERSISTENCE.font_size,
    font_family: PREFERENCE_PERSISTENCE.font_family,
  });

  const defaults = JSON.stringify({
    theme_mode: PREFERENCE_DEFAULTS.theme_mode,
    theme_preset: PREFERENCE_DEFAULTS.theme_preset,
    content_layout: PREFERENCE_DEFAULTS.content_layout,
    navbar_style: PREFERENCE_DEFAULTS.navbar_style,
    sidebar_variant: PREFERENCE_DEFAULTS.sidebar_variant,
    sidebar_collapsible: PREFERENCE_DEFAULTS.sidebar_collapsible,
    font_size: PREFERENCE_DEFAULTS.font_size,
    font_family: PREFERENCE_DEFAULTS.font_family,
  });

  const code = `
    (function () {
      try {
        var root = document.documentElement;
        var PERSISTENCE = ${persistence};
        var DEFAULTS = ${defaults};

        function readCookie(name) {
          var match = document.cookie.split("; ").find(function(c) {
            return c.indexOf(name + "=") === 0;
          });
          return match ? match.split("=")[1] : null;
        }

        function readLocal(name) {
          try {
            return window.localStorage.getItem(name);
          } catch (e) {
            return null;
          }
        }

        function readPreference(key, fallback) {
          var mode = PERSISTENCE[key];
          var value = null;

          if (mode === "localStorage") {
            value = readLocal(key);
          }

          if (!value && (mode === "client-cookie" || mode === "server-cookie")) {
            value = readCookie(key);
          }

          if (!value || typeof value !== "string") {
            return fallback;
          }

          return value;
        }

        var rawMode = readPreference("theme_mode", DEFAULTS.theme_mode);
        var rawPreset = readPreference("theme_preset", DEFAULTS.theme_preset);
        var rawContentLayout = readPreference("content_layout", DEFAULTS.content_layout);
        var rawNavbarStyle = readPreference("navbar_style", DEFAULTS.navbar_style);
        var rawSidebarVariant = readPreference("sidebar_variant", DEFAULTS.sidebar_variant);
        var rawSidebarCollapsible = readPreference("sidebar_collapsible", DEFAULTS.sidebar_collapsible);
        var rawFontSize = readPreference("font_size", DEFAULTS.font_size);
        var rawFontFamily = readPreference("font_family", DEFAULTS.font_family);

        var mode = (rawMode === "dark" || rawMode === "light") ? rawMode : "light";
        var preset = rawPreset || DEFAULTS.theme_preset;
        var contentLayout = rawContentLayout || DEFAULTS.content_layout;
        var navbarStyle = rawNavbarStyle || DEFAULTS.navbar_style;
        var sidebarVariant = rawSidebarVariant || DEFAULTS.sidebar_variant;
        var sidebarCollapsible = rawSidebarCollapsible || DEFAULTS.sidebar_collapsible;
        var fontSize = parseInt(rawFontSize, 10);
        if (!fontSize || isNaN(fontSize)) fontSize = DEFAULTS.font_size;
        var fontFamily = rawFontFamily || DEFAULTS.font_family;

        root.classList.remove("light", "dark");
        root.classList.add(mode);
        root.setAttribute("data-theme-preset", preset);
        root.setAttribute("data-content-layout", contentLayout);
        root.setAttribute("data-navbar-style", navbarStyle);
        root.setAttribute("data-sidebar-variant", sidebarVariant);
        root.setAttribute("data-sidebar-collapsible", sidebarCollapsible);
        root.setAttribute("data-font-family", fontFamily);
        root.style.fontSize = fontSize + "px";

        root.style.colorScheme = mode === "dark" ? "dark" : "light";

        var prefs = {
          themeMode: mode,
          themePreset: preset,
          contentLayout: contentLayout,
          navbarStyle: navbarStyle,
          sidebarVariant: sidebarVariant,
          sidebarCollapsible: sidebarCollapsible,
          fontSize: fontSize,
          fontFamily: fontFamily,
        };

        window.__PREFERENCES__ = prefs;
      } catch (e) {
        console.warn("ThemeBootScript error:", e);
      }
    })();
  `;

  /* biome-ignore lint/security/noDangerouslySetInnerHtml: required for pre-hydration boot script */
  return <Script id="theme-boot" dangerouslySetInnerHTML={{ __html: code }} />;
}
