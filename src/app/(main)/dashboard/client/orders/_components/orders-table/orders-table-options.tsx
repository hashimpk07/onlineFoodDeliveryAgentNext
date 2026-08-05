export interface SelectOption {
  value: string;
  label: string;
}
export interface ClientTypes {
  id: number;
  name: string;
}

export interface OrderStatus {
  id: number;
  name: string;
  class: string;
}
export function getOrderShopOptions(shops?: ClientTypes[]): SelectOption[] {
  if (!Array.isArray(shops)) {
    return [];
  }

  return shops.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));
}

export function getOrderStatusOptions(
  statuses?: ClientTypes[],
): SelectOption[] {
  if (!Array.isArray(statuses)) {
    return [];
  }

  return statuses.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));
}

export interface Order {
  id: number;
  order_id: string;
  shopname: string;
  status: string;
  created_at: string;
}

export interface OrderFilters {
  search?: string;
  fromDate?: string;
  toDate?: string;
  shopId?: string;
  statusId?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: {
    orders: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
