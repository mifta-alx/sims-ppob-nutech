import { Skeleton } from "@/components/ui/skeleton"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
                <Skeleton className="size-14 rounded-sm" />
                <Skeleton className="w-14 h-4 rounded-sm" />
            </div>
            <div className="flex flex-col gap-6">
                <p className="text-foreground text-xs font-semibold">Temukan promo menarik</p>
                <Skeleton className="h-24 w-72 rounded-sm" />
            </div>
        </div>
    )
}

export default HomePage