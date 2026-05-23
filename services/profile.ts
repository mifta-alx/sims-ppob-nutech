import { api } from "@/lib/axios"
import { ApiResponse } from "@/types/api"
import { ProfileResponseData, UpdateProfilePayload } from "@/types/profile"
import { AxiosError } from "axios"

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