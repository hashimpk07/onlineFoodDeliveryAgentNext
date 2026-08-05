export interface BaseSelectOption {
  label: string;
  value: string;
}

export function getCaptainWorkStatusOptions(): BaseSelectOption[] {
  const workStatuses: BaseSelectOption[] = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Leave", value: "Leave" },
    { label: "Banned", value: "Banned" },
    { label: "Request", value: "Request" },
  ];

  return workStatuses;
}

export function getCaptainShiftStatusOptions(): BaseSelectOption[] {
  const shiftStatuses: BaseSelectOption[] = [
    { label: "Online", value: "ONLINE" },
    { label: "Offline", value: "OFFLINE" },
  ];

  return shiftStatuses;
}

type WithId = {
  id: string | number;
};

export function mapToSelectOptions<T extends WithId>(
  items?: T[],
  getLabel?: (item: T) => string,
): BaseSelectOption[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({
    value: String(item.id),
    label: getLabel ? getLabel(item) : String((item as any).name),
  }));
}
