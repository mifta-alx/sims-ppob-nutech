import { api } from "@/lib/axios"
import { ApiResponse } from "@/types/api"
import { ProfileResponseData } from "@/types/profile"
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