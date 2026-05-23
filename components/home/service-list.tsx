"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { getLayananService } from "@/services/information"
import { useAppDispatch } from "@/store"
import { openAlert } from "@/store/slices/uiSlice"
import { ServiceItem } from "@/types/information"
import Image from "next/image"
import { useEffect, useState } from "react"

const ServiceSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="size-16 rounded-sm" />
      <Skeleton className="h-4 w-16 rounded-sm" />
    </div>
  )
}

const Service = ({ service }: { service: ServiceItem }) => {
  return (
    <div className="flex w-16 flex-col items-center gap-2">
      <Image
        src={service.service_icon}
        alt={service.service_name}
        width={40}
        height={40}
        className="flex size-16 shrink-0 object-cover"
      />
      <p className="text-center text-[10px] font-medium text-foreground">
        {service.service_name}
      </p>
    </div>
  )
}

const ServiceList = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await getLayananService()
        setServices(res.data)
      } catch (error: any) {
        dispatch(
          openAlert({
            type: "error",
            title: "Fetch Gagal!",
            description: error.message,
            buttonText: "Tutup",
            autoClose: true,
          })
        )
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-row flex-wrap gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <ServiceSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-row flex-wrap gap-8">
      {services.map((service) => (
        <Service key={service.service_code} service={service} />
      ))}
    </div>
  )
}

ServiceList.displayName = "ServiceList"
export default ServiceList
