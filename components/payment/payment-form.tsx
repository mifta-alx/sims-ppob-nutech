"use client"
import { memo, useEffect, useState } from "react"
import { Field, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Banknote } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store"
import { getLayananService } from "@/services/information"
import { setServices } from "@/store/slices/serviceSlice"
import { openAlert } from "@/store/slices/uiSlice"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import FormInput from "@/components/form-input"
import { payment } from "@/services/transaction"
import { Spinner } from "@/components/ui/spinner"
import { deductBalance } from "@/store/slices/authSlice"
import { formatNumberPrice } from "@/lib/utils"

const PaymentFormSkeleton = () => {
  return (
    <div className="mt-2 flex flex-col gap-10">
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="size-8 rounded-sm" />
        <Skeleton className="h-6 w-32 rounded-sm" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="size-10 w-full rounded-sm" />
        <Skeleton className="size-10 w-full rounded-sm" />
      </div>
    </div>
  )
}

const PaymentForm = memo(({ code }: { code: string }) => {
  const { services } = useAppSelector((state) => state.service)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const currentService = services.find(
    (item) =>
      item.service_code.toUpperCase() === (code as string)?.toUpperCase()
  )

  useEffect(() => {
    async function initServiceData() {
      if (services.length === 0) {
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
      } else {
        setLoading(false)
      }
    }

    initServiceData()
  }, [services, dispatch])

  if (loading) {
    return <PaymentFormSkeleton />
  }

  const isButtonDisabled = !currentService?.service_tariff || loading

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (
      !currentService?.service_code &&
      !currentService?.service_name &&
      !currentService?.service_tariff
    ) {
      return
    }
    const formattedTariff = formatNumberPrice(currentService.service_tariff)
    setLoadingSubmit(true)
    try {
      await payment({ service_code: currentService?.service_code })

      dispatch(deductBalance(currentService.service_tariff))
      dispatch(
        openAlert({
          type: "success",
          title: `Pembayaran ${currentService?.service_name} sebesar`,
          description: `Rp ${formattedTariff}`,
          buttonText: "Kembali ke Beranda",
          redirectTo: "/",
          invert: true,
          showStatus: true,
        })
      )
    } catch (error: any) {
      dispatch(
        openAlert({
          type: "error",
          title: `Pembayaran ${currentService?.service_name} sebesar`,
          description: `Rp ${formattedTariff}`,
          buttonText: "Kembali ke Beranda",
          redirectTo: "/",
          invert: true,
          showStatus: true,
        })
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row items-center gap-4">
        {currentService?.service_icon && currentService?.service_name && (
          <Image
            src={currentService?.service_icon}
            alt={currentService?.service_name}
            priority
            unoptimized
            width={32}
            height={32}
            className="flex size-8 shrink-0 object-cover"
          />
        )}
        <p className="text-xl font-semibold">{currentService?.service_name}</p>
      </div>
      <form onSubmit={handlePay}>
        <FieldGroup className="gap-4">
          <FormInput
            name="payment_amount"
            type="text"
            placeholder="masukkan nominal pembayaran"
            value={currentService?.service_tariff || ""}
            icon={<Banknote />}
            disabled
          />
          <Field>
            <Button
              type="submit"
              className="text-xs disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale-100"
              size="lg"
              disabled={isButtonDisabled}
            >
              {loadingSubmit ? <Spinner /> : "Bayar"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
})

PaymentForm.displayName = "PaymentForm"
export default PaymentForm
