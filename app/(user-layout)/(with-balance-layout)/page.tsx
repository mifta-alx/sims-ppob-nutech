import BannerList from "@/components/home/banner-list"
import ServiceList from "@/components/home/service-list"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <ServiceList />
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold text-foreground">
          Temukan promo menarik
        </p>
        <BannerList />
      </div>
    </div>
  )
}
