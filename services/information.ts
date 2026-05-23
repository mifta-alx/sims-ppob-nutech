import { api } from "@/lib/axios"
import { ApiResponse } from "@/types/api"
import { Banner, ServiceItem } from "@/types/information"
import { AxiosError } from "axios"

export async function getBannerService() {
  try {
    const response = await api.get<ApiResponse<Banner[]>>("/banner")

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<Banner[]>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat mendapatkan data banner"
    )
  }
}

export async function getLayananService() {
  try {
    const response = await api.get<ApiResponse<ServiceItem[]>>("/services")

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<ServiceItem[]>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat mendapatkan data layanan"
    )
  }
}