"use client"
import { memo, useState } from "react"
import { Field, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Banknote } from "lucide-react"
import NominalField from "./nominal-field"
import FormInput from "@/components/form-input"
import { formatNumberPrice } from "@/lib/utils"
import { topUp } from "@/services/transaction"
import { openAlert } from "@/store/slices/uiSlice"
import { useAppDispatch } from "@/store"
import ConfirmationDialog from "../confirmation-dialog"
import { setBalance } from "@/store/slices/authSlice"

interface TopUpInputFormProps {
  nominal: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
}

const TopUpInputForm = ({
  nominal,
  handleChange,
  loading,
  onSubmit,
}: TopUpInputFormProps) => {
  const isButtonDisabled =
    !nominal || Number(nominal.replace(/\./g, "")) <= 0 || loading
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-4">
        <FormInput
          name="top_up_amount"
          type="text"
          placeholder="masukkan nominal top up"
          value={nominal}
          onChange={handleChange}
          icon={<Banknote />}
        />
        <Field>
          <Button
            type="submit"
            className="text-xs disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale-100"
            size="lg"
            disabled={isButtonDisabled}
          >
            Top up
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

const TopUpForm = memo(() => {
  const dispatch = useAppDispatch()
  const [nominal, setNominal] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value
    const cleanValue = rawValue.replace(/\./g, "")
    if (/^\d*$/.test(cleanValue)) {
      if (cleanValue === "") {
        setNominal("")
      } else {
        const formattedPrice = formatNumberPrice(Number(cleanValue))
        setNominal(formattedPrice)
      }
    }
  }

  const handleSelectNominal = (value: number) => {
    const formattedPrice = formatNumberPrice(Number(value))
    setNominal(formattedPrice)
  }

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nominal) return
    setIsConfirmOpen(true)
  }

  const handleSubmit = async () => {
    setIsConfirmOpen(false)
    setLoading(true)

    const cleanAmount = Number(nominal.replace(/\./g, ""))

    try {
      const res = await topUp({ top_up_amount: cleanAmount })

      if (res?.data?.balance !== undefined) {
        dispatch(setBalance(res.data.balance))
      }

      dispatch(
        openAlert({
          type: "success",
          title: "Top Up sebesar",
          description: `Rp ${nominal}`,
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
          title: error.isCustomError ? error.title : "Top Up sebesar",
          description: error.isCustomError
            ? error.description
            : `Rp ${nominal}`,
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <TopUpInputForm
          onSubmit={handleOpenConfirmation}
          nominal={nominal}
          handleChange={handleChange}
          loading={loading}
        />
      </div>
      <div className="col-span-1">
        <NominalField setNominal={handleSelectNominal} />
      </div>
      <ConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Anda yakin untuk Top up sebesar"
        description={`Rp ${nominal} ?`}
        confirmText="Ya, lanjutkan Top up"
        cancelText="Batalkan"
        onConfirm={handleSubmit}
      />
    </div>
  )
})

TopUpForm.displayName = "TopUpForm"
export default TopUpForm
