import { AxiosError } from "axios"

import { api } from "@/lib/axios"

import { RegisterPayload } from "@/types/auth"
import { ApiResponse } from "@/types/api"

interface ValidationError {
  field: string
  message: string
}

export async function registerService(
  payload: RegisterPayload
): Promise<ApiResponse> {
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

  if (payload.password.length !== payload.confirm_password.length) {
    errors.push({
      field: "confirm_password",
      message: "Password tidak sama",
    })
  }

  if (errors.length > 0) {
    throw errors
  }

  const { confirm_password, ...rest } = payload

  try {
    const response = await api.post<ApiResponse>("/registration", rest)

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse>

    throw new Error(
      err.response?.data?.message || "Terjadi kesalahan saat registrasi"
    )
  }
}
