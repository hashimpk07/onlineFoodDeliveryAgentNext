"use server";

import {
  PaginationLink,
  TransactionFilters,
  TransactionsData,
  TransactionsResponse,
} from "@/app/[locale]/(main)/dashboard/client/transactions/_types"; // "@/app/[locale]/(main)/dashboard/client/transactions/_types";
import { api } from "@/lib/api.client";

const EMPTY_STATS: TransactionsData = {
  transactions: [],
  pagination: {
    current_page: 1,
    from: null,
    last_page: 1,
    links: [] as PaginationLink[],
    path: "",
    per_page: 10,
    to: null,
    total: 0,
  },
};

export default async function getClientTransactions(
  filters: TransactionFilters,
): Promise<TransactionsResponse> {
  try {
    const responseData = await api.get<TransactionsResponse>(
      "/client/transactions",
      { params: filters },
    );

    if (responseData.status === "error" || !responseData.data) {
      throw new Error(
        responseData.message ?? "Failed to fetch client transactions data",
      );
    }

    return responseData;
  } catch (error) {
    console.error("client transactions error:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
      data: EMPTY_STATS,
    };
  }
}
