import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <Skeleton className="size-14 rounded-sm" />
        <Skeleton className="h-4 w-14 rounded-sm" />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold text-foreground">
          Temukan promo menarik
        </p>
        <Skeleton className="h-24 w-72 rounded-sm" />
      </div>
    </div>
  )
}
