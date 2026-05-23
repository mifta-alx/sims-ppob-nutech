import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "-"
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return "-"

    const baseFormatted = format(date, "dd MMMM yyyy HH:mm", { locale: id })

    const timeZoneAbbr = new Intl.DateTimeFormat("id-ID", {
      timeZoneName: "short",
    })
      .format(date)
      .split(" ")
      .pop()

    return `${baseFormatted} ${timeZoneAbbr}`
  } catch (error) {
    console.error("Format date error:", error)
    return "-"
  }
}
