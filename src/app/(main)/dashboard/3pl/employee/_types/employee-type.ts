export type Employee = {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
};

export interface EmployeePagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface EmployeeListResponse {
  status: string;
  message: string;
  data: {
    order: Employee[];
    pagination: EmployeePagination;
  };
}

export type EmployeeStatusResponse = {
  status: "success" | "error" | "fail";
  message?: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
  };
  errors?: Record<string, string[]>;
};
