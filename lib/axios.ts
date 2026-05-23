import axios from "axios"
import Cookies from "js-cookie"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]
  }
  return config
})
