import type { FontFamily } from "@/lib/preferences/fonts";
import type {
  ContentLayout,
  FontSize,
  NavbarStyle,
  SidebarCollapsible,
  SidebarVariant,
} from "@/lib/preferences/layout";
import {
  applyContentLayout,
  applyFontFamily,
  applyFontSize,
  applyNavbarStyle,
  applySidebarCollapsible,
  applySidebarVariant,
} from "@/lib/preferences/layout-utils";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import { persistPreference } from "@/lib/preferences/preferences-storage";
import { ThemeMode, ThemePreset } from "@/lib/preferences/theme";
import {
  applyThemeMode,
  applyThemePreset,
} from "@/lib/preferences/theme-utils";
import { usePreferencesStore } from "@/providers/preferences-store-provider";

export function useLayoutSettings() {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);
  const themePreset = usePreferencesStore((s) => s.themePreset);
  const setThemePreset = usePreferencesStore((s) => s.setThemePreset);
  const contentLayout = usePreferencesStore((s) => s.contentLayout);
  const setContentLayout = usePreferencesStore((s) => s.setContentLayout);
  const navbarStyle = usePreferencesStore((s) => s.navbarStyle);
  const setNavbarStyle = usePreferencesStore((s) => s.setNavbarStyle);
  const variant = usePreferencesStore((s) => s.sidebarVariant);
  const setSidebarVariant = usePreferencesStore((s) => s.setSidebarVariant);
  const collapsible = usePreferencesStore((s) => s.sidebarCollapsible);
  const setSidebarCollapsible = usePreferencesStore(
    (s) => s.setSidebarCollapsible,
  );
  const fontSize = usePreferencesStore((s) => s.fontSize);
  const setFontSize = usePreferencesStore((s) => s.setFontSize);
  const fontFamily = usePreferencesStore((s) => s.fontFamily);
  const setFontFamily = usePreferencesStore((s) => s.setFontFamily);

  const onThemePresetChange = (preset: ThemePreset) => {
    applyThemePreset(preset);
    setThemePreset(preset);
    persistPreference("theme_preset", preset);
  };

  const onThemeModeChange = (mode: ThemeMode | "") => {
    if (!mode) return;
    applyThemeMode(mode);
    setThemeMode(mode);
    persistPreference("theme_mode", mode);
  };

  const onContentLayoutChange = (layout: ContentLayout | "") => {
    if (!layout) return;
    applyContentLayout(layout);
    setContentLayout(layout);
    persistPreference("content_layout", layout);
  };

  const onNavbarStyleChange = (style: NavbarStyle | "") => {
    if (!style) return;
    applyNavbarStyle(style);
    setNavbarStyle(style);
    persistPreference("navbar_style", style);
  };

  const onSidebarStyleChange = (value: SidebarVariant | "") => {
    if (!value) return;
    setSidebarVariant(value);
    applySidebarVariant(value);
    persistPreference("sidebar_variant", value);
  };

  const onSidebarCollapseModeChange = (value: SidebarCollapsible | "") => {
    if (!value) return;
    setSidebarCollapsible(value);
    applySidebarCollapsible(value);
    persistPreference("sidebar_collapsible", value);
  };

  const onFontSizeChange = (size: FontSize) => {
    applyFontSize(size);
    setFontSize(size);
    persistPreference("font_size", String(size));
  };

  const onFontFamilyChange = (family: FontFamily) => {
    applyFontFamily(family);
    setFontFamily(family);
    persistPreference("font_family", family);
  };

  const onRestoreDefaults = () => {
    const defaults = PREFERENCE_DEFAULTS;

    // Apply and persist all defaults
    onThemeModeChange(defaults.theme_mode);
    onThemePresetChange(defaults.theme_preset);
    onContentLayoutChange(defaults.content_layout);
    onNavbarStyleChange(defaults.navbar_style);
    onSidebarStyleChange(defaults.sidebar_variant);
    onSidebarCollapseModeChange(defaults.sidebar_collapsible);
    onFontSizeChange(defaults.font_size);
    onFontFamilyChange(defaults.font_family);
  };

  return {
    themeMode,
    themePreset,
    contentLayout,
    navbarStyle,
    variant,
    collapsible,
    fontSize,
    fontFamily,
    onThemePresetChange,
    onThemeModeChange,
    onContentLayoutChange,
    onNavbarStyleChange,
    onSidebarStyleChange,
    onSidebarCollapseModeChange,
    onFontSizeChange,
    onFontFamilyChange,
    onRestoreDefaults,
  };
}
