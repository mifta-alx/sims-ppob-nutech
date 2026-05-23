import { memo, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { formatNumberPrice } from "@/lib/utils"
import Image from "next/image"

const BalanceInfo = memo(({ balance }: { balance: number | 0 }) => {
  const [showBalance, setShowBalance] = useState(false)
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute top-5 left-5 flex h-full w-full flex-col md:gap-3">
        <p className="text-sm font-medium text-background">Saldo anda</p>
        <p className="font-semibold text-background md:text-3xl">
          {showBalance ? `Rp ${formatNumberPrice(balance)}` : "Rp ••••••••"}
        </p>
        <button
          type="button"
          onClick={() => setShowBalance(!showBalance)}
          className="flex w-fit items-center gap-1 bg-primary text-background"
        >
          <p className="text-xs font-medium text-background">
            {showBalance ? "Tutup" : "Lihat"} Saldo
          </p>
          {showBalance ? (
            <EyeOff className="size-2" />
          ) : (
            <Eye className="size-2" />
          )}
        </button>
      </div>
      <Image
        src="/images/balance-bg.png"
        alt="balance-bg"
        width={670}
        height={160}
        className="h-full w-full object-cover"
      />
    </div>
  )
})

BalanceInfo.displayName = "BalanceInfo"
export default BalanceInfo
