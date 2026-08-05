/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";

import axiosInstance from "./axios";
/**
 * Central API wrapper
 * Usage:
 *   api.get("/endpoint")
 *   api.post("/endpoint", payload)
 */
export const api = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axiosInstance.get<T>(url, config);
      return res.data;
    } catch (error: any) {
      if (error.response?.status !== 429) {
        if (error.response?.data) {
          console.error(
            "API GET Error Response:",
            JSON.stringify(error.response.data, null, 2),
          );
        } else {
          console.error("GET API Error:", error);
        }
      }
      throw error;
    }
  },
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const res = await axiosInstance.post<T>(url, data, config);
      return res.data;
    } catch (error: any) {
      if (error.response?.data) {
        console.error(
          "API POST Error Response:",
          JSON.stringify(error.response.data, null, 2),
        );
      } else {
        console.error("API POST Error:", error);
      }
      throw error;
    }
  },
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const res = await axiosInstance.put<T>(url, data, config);
      return res.data;
    } catch (error: any) {
      if (error.response?.data) {
        console.error(
          "API PUT Error Response:",
          JSON.stringify(error.response.data, null, 2),
        );
      } else {
        console.error("API PUT Error:", error);
      }
      throw error;
    }
  },
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await axiosInstance.patch<T>(url, data, config);
    return res.data;
  },
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  },
};
