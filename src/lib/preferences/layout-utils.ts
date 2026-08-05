export function applyContentLayout(value: "centered" | "full-width") {
  const root = document.documentElement;
  root.setAttribute("data-content-layout", value);
}

export function applyNavbarStyle(value: "sticky" | "scroll") {
  const root = document.documentElement;
  root.setAttribute("data-navbar-style", value);
}

export function applySidebarVariant(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-sidebar-variant", value);
}

export function applySidebarCollapsible(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-sidebar-collapsible", value);
}

export function applyFontFamily(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-font-family", value);
}

export function applyFontSize(value: number) {
  const root = document.documentElement;
  // Scale the root font-size so every Tailwind rem-based text/spacing
  // utility (text-sm, text-base, ...) scales with it — setting only
  // body's font-size has no visible effect since components use explicit
  // rem classes that are relative to the root, not to body.
  root.style.fontSize = `${value}px`;
}
