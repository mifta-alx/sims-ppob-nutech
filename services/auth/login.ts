import { AxiosError } from "axios"

import { api } from "@/lib/axios"
import { LoginPayload, LoginResponseData } from "@/types/auth"
import { ApiResponse } from "@/types/api"

interface ValidationError {
  field: string
  message: string
}

export async function login(
  payload: LoginPayload
): Promise<ApiResponse<LoginResponseData>> {
  const errors: ValidationError[] = []

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(payload.email)) {
    errors.push({
      field: "email",
      message: "Format email tidak valid",
    })
  }

  if (payload.password.length < 8) {
    errors.push({
      field: "password",
      message: "Password minimal 8 karakter",
    })
  }

  if (errors.length > 0) {
    throw errors
  }

  try {
    const response = await api.post<ApiResponse<LoginResponseData>>(
      "/login",
      payload
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<LoginResponseData>>

    throw new Error(
      err.response?.data?.message || "Terjadi kesalahan saat login"
    )
  }
}
