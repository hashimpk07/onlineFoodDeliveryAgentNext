export enum SoundType {
  NEW_ORDER = "new-order",
  PENDING = "pending",
  NEW_TICKET = "new-ticket",
  NEW_MESSAGE = "new-message",
}

const SOUND_PATHS: Record<SoundType, string> = {
  [SoundType.NEW_ORDER]: "/sounds/new-order.mp3",
  [SoundType.PENDING]: "/sounds/pending.mp3",
  [SoundType.NEW_TICKET]: "/sounds/new-ticket.mp3",
  [SoundType.NEW_MESSAGE]: "/sounds/new-message.mp3",
};

// Cache audio instances for better performance
const audioCache = new Map<SoundType, HTMLAudioElement>();

function getAudioInstance(soundType: SoundType): HTMLAudioElement {
  if (!audioCache.has(soundType)) {
    const audio = new Audio(SOUND_PATHS[soundType]);
    audio.preload = "auto";
    audioCache.set(soundType, audio);
  }
  return audioCache.get(soundType);
}

export function playSound(soundType: SoundType): void {
  if (typeof window === "undefined") return;

  try {
    const audio = getAudioInstance(soundType);
    // Reset to start if already playing
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn(`Failed to play sound ${soundType}:`, error);
    });
  } catch (error) {
    console.error(`Error playing sound ${soundType}:`, error);
  }
}

// Preload all sounds after the page has fully loaded to avoid 404s on startup
export function preloadSounds(): void {
  if (typeof window === "undefined") return;

  window.addEventListener(
    "load",
    () => {
      Object.values(SoundType).forEach((soundType) => {
        getAudioInstance(soundType);
      });
    },
    { once: true },
  );
}
