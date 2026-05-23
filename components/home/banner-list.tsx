"use client"
import { memo, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Banner } from "@/types/information"
import Image from "next/image"
import { getBannerService } from "@/services/information"
import { openAlert } from "@/store/slices/uiSlice"
import { useAppDispatch } from "@/store"

const BannerSkeleton = () => {
  return <Skeleton className="flex h-[114px] w-64 shrink-0 rounded-sm" />
}

const BannerList = memo(() => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await getBannerService()
        setBanners(res.data)
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
    fetchBanners()
  }, [])

  if (loading) {
    return (
      <div className="no-scrollbar flex w-full gap-8 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <BannerSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="no-scrollbar flex w-full gap-8 overflow-x-auto">
      {banners.map((banner, index) => (
        <Image
          key={index}
          src={banner.banner_image}
          alt={banner.banner_name}
          width={288}
          height={96}
          className="h-full w-64 object-cover flex shrink-0"
        />
      ))}
    </div>
  )
})

BannerList.displayName = "BannerList"
export default BannerList