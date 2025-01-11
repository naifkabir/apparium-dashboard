"use server";

import apiClient from "@/lib/axios";
import { cookies } from "next/headers";

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  message: string;
  data?: T;
}

export async function LoginUser(
  data: LoginData
): Promise<
  | { redirect: { destination: string; permanent: boolean }; message: string }
  | { error: string }
> {
  try {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      "/admins/log-in",
      data
    );

    cookies().set({
      name: "accessToken",
      value: response.data.data?.accessToken || "",
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
    });

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      error:
        error.response?.data?.message || error.message || "An error occurred.",
    };
  }
}
