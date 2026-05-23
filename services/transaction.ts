import { api } from "@/lib/axios"
import { ApiResponse } from "@/types/api"
import { BalanceResponseData, TopUpPayload, TransactionResponseData } from "@/types/transaction"
import { AxiosError } from "axios"

interface ValidationError {
  field: string
  message: string
}

export async function getBalance() {
  try {
    const response = await api.get<ApiResponse<BalanceResponseData>>("/balance")

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<BalanceResponseData>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat mendapatkan data saldo"
    )
  }
}

export async function topUp(
  payload: TopUpPayload
): Promise<ApiResponse<BalanceResponseData>> {
  if (Number(payload.top_up_amount) < 10000) {
    throw {
      isCustomError: true,
      title: "Minimal nominal top up adalah",
      description: "Rp 10.000",
    }
  }

  if (Number(payload.top_up_amount) > 1000000) {
    throw {
      isCustomError: true,
      title: "Maksimal nominal top up adalah",
      description: "Rp 1.000.000",
    }
  }

  try {
    const response = await api.post<ApiResponse<BalanceResponseData>>(
      "/topup",
      payload
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<BalanceResponseData>>

    throw {
      isCustomError: true,
      title: "Top Up Gagal",
      description:
        err.response?.data?.message || "Terjadi kesalahan saat top up saldo",
    }
  }
}

export async function getTransactions({ offset = 0, limit = 5 }: { offset?: number; limit?: number }) {
  try {
    const response = await api.get<ApiResponse<TransactionResponseData>>(
      `/transaction/history?offset=${offset}&limit=${limit}`
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<TransactionResponseData>>

    throw new Error(
      err.response?.data?.message ||
        "Terjadi kesalahan saat mendapatkan data transaksi"
    )
  }
}