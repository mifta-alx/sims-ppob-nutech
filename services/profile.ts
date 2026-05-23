import { api } from "@/lib/axios"
import { ApiResponse } from "@/types/api"
import { ProfileResponseData, UpdateProfilePayload } from "@/types/profile"
import { AxiosError } from "axios"
interface ValidationError {
  field: string
  message: string
}

export async function getProfile() {
  try {
    const response = await api.get<ApiResponse<ProfileResponseData>>("/profile")

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<ProfileResponseData>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat mendapatkan data akun"
    )
  }
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const errors: ValidationError[] = []

  if (!payload.first_name) {
    errors.push({
      field: "first_name",
      message: "Nama depan wajib diisi",
    })
  }

  if (!payload.last_name) {
    errors.push({
      field: "last_name",
      message: "Nama belakang wajib diisi",
    })
  }

  if (errors.length > 0) {
    throw errors
  }

  try {
    const response = await api.put<ApiResponse<ProfileResponseData>>(
      "/profile/update",
      payload
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<ProfileResponseData>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui data akun"
    )
  }
}

export async function updateProfileImage(payload: FormData) {
  try {
    const response = await api.put<ApiResponse<ProfileResponseData>>(
      "/profile/image",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<ProfileResponseData>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui foto profile"
    )
  }
}
