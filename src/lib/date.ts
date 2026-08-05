export function formatDate(date: Date | number): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);

  return `${datePart} ${timePart}`;
}

// ✅ Date → API / URL (YYYY-MM-DD)
export function toApiDate(date?: Date | null): string | null {
  if (!date) return null;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

// ✅ API / URL → Date (DatePicker-safe, NO timezone bug)
export function fromApiDate(value?: string | null): Date | undefined {
  if (!value) return undefined;

  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return undefined;

  return new Date(y, m - 1, d);
}

export function formatDateTime(dateString?: string | null) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

export function timeToMinutes(time?: string) {
  if (!time) return Infinity;

  const parts = time.trim().split(" ");
  if (parts.length !== 2) return Infinity;

  const [timePart, meridiem] = parts;
  const [hours, minutes] = timePart.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return Infinity;

  let h = hours;

  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;

  return h * 60 + minutes;
}

export function getSlotEndMinutes(slotName: string) {
  const [, endTime] = slotName.split(" - ");
  return timeToMinutes(endTime);
}

export function toDDMMYYYY(date?: Date): string | null {
  if (!date) return null;

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
}

// DD-MM-YYYY or DD/MM/YYYY → Date
export function fromDDMMYYYY(value?: string | null): Date | undefined {
  if (!value) return undefined;

  const parts = value.split(/[-/]/).map(Number);
  if (parts.length !== 3) return undefined;

  const [dd, mm, yyyy] = parts;
  if (!dd || !mm || !yyyy) return undefined;

  return new Date(yyyy, mm - 1, dd);
}
export function toMDYDate(dateString?: string | null): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${m}/${d}/${y}`;
}

export function parseToYMD(value?: string | null): string {
  if (!value) return "";
  // If already YYYY-MM-DD, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  // Try fallback to native Date parsing FIRST (handles MM/DD/YYYY cleanly)
  const nativeDate = new Date(value);
  if (!isNaN(nativeDate.getTime())) {
    const yyyy = nativeDate.getFullYear();
    const mm = String(nativeDate.getMonth() + 1).padStart(2, "0");
    const dd = String(nativeDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // If DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const parts = value.split("-");
    // Only trust it as DD-MM if the MM part is valid (<=12)
    // If it's something like 24-10-2029 (DD-MM-YYYY), parts[1] is '10' (valid month)
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return value;
}
