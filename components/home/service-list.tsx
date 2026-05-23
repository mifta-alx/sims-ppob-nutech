"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { getLayananService } from "@/services/information"
import { useAppDispatch, useAppSelector } from "@/store"
import { openAlert } from "@/store/slices/uiSlice"
import { setServices } from "@/store/slices/serviceSlice"
import { ServiceItem } from "@/types/information"
import Image from "next/image"
import Link from "next/link"
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
    <Link
      href={`/payment/${service.service_code}`}
      className="flex flex-col items-center gap-2"
    >
      <Image
        src={service.service_icon}
        alt={service.service_name}
        priority
        unoptimized
        width={40}
        height={40}
        className="flex size-16 shrink-0 object-cover"
      />
      <p className="w-16 text-center text-[10px] font-medium text-foreground">
        {service.service_name}
      </p>
    </Link>
  )
}

const ServiceList = () => {
  const dispatch = useAppDispatch()
  const { services } = useAppSelector((state) => state.service)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      if (services.length > 0) {
        setLoading(false)
        return
      }

      try {
        const res = await getLayananService()
        dispatch(setServices(res.data))
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
  }, [dispatch, services.length])

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
    <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-8 justify-center">
      {services.map((service) => (
        <Service key={service.service_code} service={service} />
      ))}
    </div>
  )
}

ServiceList.displayName = "ServiceList"
export default ServiceList
