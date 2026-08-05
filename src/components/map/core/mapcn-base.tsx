"use client";

import {
  forwardRef,
  type ReactNode,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";

import { Moon, Sun } from "lucide-react";

import {
  Map as Mapcn,
  MapControls,
  type MapRef as MapcnRef,
} from "@/components/ui/map";
import { persistPreference } from "@/lib/preferences/preferences-storage";
import { applyThemeMode } from "@/lib/preferences/theme-utils";
import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/providers/preferences-store-provider";

const SAUDI_BOUNDS: [number, number, number, number] = [
  34.49, 16.36, 55.66, 32.16,
];

interface MapcnBaseProps {
  children?: ReactNode;
  center?: [number, number];
  zoom?: number;
  className?: string;
  enableSingleTab?: boolean;
  restrictBounds?: boolean;
  theme?: "light" | "dark";
  showStyleToggle?: boolean;
  onMapLoad?: (map: MapcnRef) => void;
}

/**
 * Custom hook to enforce single tab usage of the map
 */
function useSingleTabEnforcement(enabled: boolean) {
  const [isTabBlocked, setIsTabBlocked] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const channel = new BroadcastChannel("map_tab_channel");
    const tabId = Math.random().toString(36).substring(7);

    channel.postMessage({ type: "CHECK_OPEN", sender: tabId });

    channel.onmessage = (event) => {
      const { type, sender } = event.data;
      if (type === "CHECK_OPEN" && sender !== tabId) {
        channel.postMessage({ type: "ALREADY_OPEN", sender: tabId });
      } else if (type === "ALREADY_OPEN" && sender !== tabId) {
        setIsTabBlocked(true);
      }
    };

    const handleUnload = () =>
      channel.postMessage({ type: "TAB_CLOSED", sender: tabId });
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      channel.close();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [enabled]);

  return isTabBlocked;
}

function TabBlockedUI() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-800 dark:bg-zinc-900 dark:text-gray-200">
      <div className="text-center">
        <h2 className="text-xl font-bold">Map Open in Another Tab</h2>
        <p>Please close other tabs to use the map here.</p>
      </div>
    </div>
  );
}

function StyleToggleButton({
  theme,
  onClick,
}: {
  theme: "light" | "dark";
  onClick: () => void;
}) {
  return (
    <div className="absolute top-2 right-2 z-20">
      <button
        onClick={onClick}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all dark:bg-zinc-800/90 dark:text-white"
        type="button"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
}

function useMapcnBaseState(enableSingleTab: boolean) {
  const isTabBlocked = useSingleTabEnforcement(enableSingleTab);
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);

  const setCurrentTheme = useCallback(
    (mode: "light" | "dark") => {
      applyThemeMode(mode);
      setThemeMode(mode);
      persistPreference("theme_mode", mode);
    },
    [setThemeMode],
  );

  return { isTabBlocked, currentTheme: themeMode, setCurrentTheme };
}

interface MapContainerProps {
  mapRef?: React.MutableRefObject<MapcnRef | null> | null;
  onMapLoad?: (map: MapcnRef) => void;
  center: [number, number];
  zoom: number;
  currentTheme: "light" | "dark";
  restrictBounds: boolean;
  children?: ReactNode;
}

function MapContainer({
  mapRef,
  onMapLoad,
  center,
  zoom,
  currentTheme,
  restrictBounds,
  children,
}: MapContainerProps) {
  return (
    <Mapcn
      ref={(instance) => {
        if (mapRef) mapRef.current = instance;
        if (instance) onMapLoad?.(instance);
      }}
      center={center}
      zoom={zoom}
      className="w-full h-full"
      theme={currentTheme}
      maxBounds={restrictBounds ? SAUDI_BOUNDS : undefined}
    >
      <MapControls
        position="bottom-left"
        showZoom
        showCompass
        showLocate
        showFullscreen
      />
      {children}
    </Mapcn>
  );
}

export const MapcnBase = forwardRef<MapcnRef, MapcnBaseProps>((props, ref) => {
  const {
    children,
    center = [46.6753, 24.7136],
    zoom = 6,
    className = "w-full h-full",
    enableSingleTab = false,
    restrictBounds = false,
    theme: initialTheme = "light",
    showStyleToggle = false,
    onMapLoad,
  } = props;

  const { isTabBlocked, currentTheme, setCurrentTheme } =
    useMapcnBaseState(enableSingleTab);
  const [mapInstance, setMapInstance] = useState<MapcnRef | null>(null);
  useImperativeHandle(ref, () => mapInstance as MapcnRef, [mapInstance]);

  if (isTabBlocked) return <TabBlockedUI />;

  return (
    <div className={cn("relative", className)}>
      <MapContainer
        mapRef={null} // Not using this ref anymore
        onMapLoad={(map) => {
          setMapInstance(map);
          onMapLoad?.(map);
        }}
        center={center}
        zoom={zoom}
        currentTheme={currentTheme}
        restrictBounds={restrictBounds}
      >
        {children}
      </MapContainer>

      {showStyleToggle && (
        <StyleToggleButton
          theme={currentTheme}
          onClick={() =>
            setCurrentTheme(currentTheme === "light" ? "dark" : "light")
          }
        />
      )}
    </div>
  );
});

MapcnBase.displayName = "MapcnBase";
