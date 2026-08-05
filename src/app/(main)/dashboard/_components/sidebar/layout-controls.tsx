/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";

import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FONT_OPTIONS, type FontFamily } from "@/lib/preferences/fonts";
import {
  FONT_SIZE_MAX,
  FONT_SIZE_MIN,
  FONT_SIZE_STEP,
} from "@/lib/preferences/layout";
import {
  THEME_PRESET_OPTIONS,
  type ThemePreset,
} from "@/lib/preferences/theme";

import { useLayoutSettings } from "./use-layout-settings";

export function LayoutSettings() {
  const {
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
  } = useLayoutSettings();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h4 className="text-sm leading-none font-medium">Layout Settings</h4>
          <p className="text-muted-foreground text-xs">
            Customize your dashboard layout preferences.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-[10px] px-2"
          onClick={onRestoreDefaults}
        >
          Restore Defaults
        </Button>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <SearchableSelect
            label="Preset"
            value={themePreset}
            placeholder="Preset"
            options={THEME_PRESET_OPTIONS.map((preset) => ({
              id: preset.value,
              label: preset.label,
              color:
                themeMode === "dark"
                  ? preset.primary.dark
                  : preset.primary.light,
            }))}
            onChange={(value) => onThemePresetChange(value as ThemePreset)}
          />
        </div>

        <div className="space-y-1">
          <SearchableSelect
            label="Font Family"
            value={fontFamily}
            placeholder="Font Family"
            options={FONT_OPTIONS.map((font) => ({
              id: font.value,
              label: font.label,
            }))}
            onChange={(value) => onFontFamilyChange(value as FontFamily)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Font Size</Label>
            <span className="text-xs text-muted-foreground tabular-nums">
              {fontSize}px
            </span>
          </div>
          <Slider
            dir="ltr"
            value={[fontSize]}
            min={FONT_SIZE_MIN}
            max={FONT_SIZE_MAX}
            step={FONT_SIZE_STEP}
            onValueChange={([value]) => onFontSizeChange(value)}
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Mode</Label>
          <ToggleGroup
            className="w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs"
            size="sm"
            variant="outline"
            type="single"
            value={themeMode}
            onValueChange={onThemeModeChange}
          >
            <ToggleGroupItem value="light" aria-label="Toggle inset">
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Toggle sidebar">
              Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Sidebar Variant</Label>
          <ToggleGroup
            className="w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs"
            size="sm"
            variant="outline"
            type="single"
            value={variant}
            onValueChange={onSidebarStyleChange}
          >
            <ToggleGroupItem value="inset" aria-label="Toggle inset">
              Inset
            </ToggleGroupItem>
            <ToggleGroupItem value="sidebar" aria-label="Toggle sidebar">
              Sidebar
            </ToggleGroupItem>
            <ToggleGroupItem value="floating" aria-label="Toggle floating">
              Floating
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Navbar Style</Label>
          <ToggleGroup
            className="w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs"
            size="sm"
            variant="outline"
            type="single"
            value={navbarStyle}
            onValueChange={onNavbarStyleChange}
          >
            <ToggleGroupItem value="sticky" aria-label="Toggle sticky">
              Sticky
            </ToggleGroupItem>
            <ToggleGroupItem value="scroll" aria-label="Toggle scroll">
              Scroll
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Sidebar Collapsible</Label>
          <ToggleGroup
            className="w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs"
            size="sm"
            variant="outline"
            type="single"
            value={collapsible}
            onValueChange={onSidebarCollapseModeChange}
          >
            <ToggleGroupItem value="icon" aria-label="Toggle icon">
              Icon
            </ToggleGroupItem>
            <ToggleGroupItem value="offcanvas" aria-label="Toggle offcanvas">
              OffCanvas
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium">Content Layout</Label>
          <ToggleGroup
            className="w-full **:data-[slot=toggle-group-item]:flex-1 **:data-[slot=toggle-group-item]:text-xs"
            size="sm"
            variant="outline"
            type="single"
            value={contentLayout}
            onValueChange={onContentLayoutChange}
          >
            <ToggleGroupItem value="centered" aria-label="Toggle centered">
              Centered
            </ToggleGroupItem>
            <ToggleGroupItem value="full-width" aria-label="Toggle full-width">
              Full Width
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}

export function LayoutControls() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="icon" variant="ghost" disabled>
        <Settings />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <LayoutSettings />
      </PopoverContent>
    </Popover>
  );
}
