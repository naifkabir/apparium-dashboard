"use server";

import apiClient from "@/lib/axios";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

export async function GetAllInquiryMassages() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  //   if (!accessToken) {
  //     return { error: "No access token found." };
  //   }

  try {
    const response = await apiClient.get(`/message/get-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return {
        error:
          error.response.data?.message || error.message || "An error occurred.",
      };
    }
    return { error: "An unknown error occurred." };
  }
}

export async function DeleteInquiryMassage(message_id: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  //   if (!accessToken) {
  //     return { error: "No access token found." };
  //   }

  try {
    const response = await apiClient.delete(`/message/get-all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return {
        error:
          error.response.data?.message || error.message || "An error occurred.",
      };
    }
    return { error: "An unknown error occurred." };
  }
}
