import { memo, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { formatNumberPrice } from "@/lib/utils"
import Image from "next/image"

const BalanceInfo = memo(({ balance }: { balance: number | 0 }) => {
  const [showBalance, setShowBalance] = useState(false)
  return (
    <div className="relative w-full lg:max-w-xl">
      <div className="absolute top-3 sm:top-5 left-3.5 sm:left-5 flex h-full w-full flex-col gap-1.5 sm:gap-3 md:gap-5 lg:gap-3">
        <p className="text-sm font-medium text-background">Saldo anda</p>
        <p className="sm:text-4xl md:text-5xl font-semibold text-background lg:text-3xl">
          {showBalance ? `Rp ${formatNumberPrice(balance)}` : "Rp ••••••••"}
        </p>
        <button
          type="button"
          onClick={() => setShowBalance(!showBalance)}
          className="flex w-1/2 items-center gap-2 bg-[#f13a2f] text-background"
        >
          <p className="text-xs md:text-sm font-medium text-background">
            {showBalance ? "Tutup" : "Lihat"} Saldo
          </p>
          {showBalance ? (
            <EyeOff className="size-2 md:size-3" />
          ) : (
            <Eye className="size-2 md:size-3" />
          )}
        </button>
      </div>
      <Image
        src="/images/balance-bg.png"
        alt="balance-bg"
        loading="eager"
        width={670}
        height={160}
        className="h-full w-full object-cover"
      />
    </div>
  )
})

BalanceInfo.displayName = "BalanceInfo"
export default BalanceInfo
