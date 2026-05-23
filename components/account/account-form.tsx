"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { AtSign, User } from "lucide-react"
import FormInput from "@/components/form-input"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { Skeleton } from "@/components/ui/skeleton"
import { updateProfile } from "@/services/profile"
import { openAlert } from "@/store/slices/uiSlice"
import { formatValidationErrors } from "@/lib/validations"
import { Spinner } from "@/components/ui/spinner"
import { setProfile } from "@/store/slices/authSlice"
import LogoutButton from "./logout-button"

const DEFAULT_FORM_VALUES = {
  email: "",
  first_name: "",
  last_name: "",
}

const FormSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="flex flex-col gap-2" key={i}>
          <Skeleton className="h-4 w-20 rounded-sm" />
          <Skeleton className="size-12 w-full rounded-sm" />
        </div>
      ))}
      <Skeleton className="size-10 w-full rounded-sm" />
      <Skeleton className="size-10 w-full rounded-sm" />
    </div>
  )
}

const AccountForm = ({
  loading,
}: React.ComponentPropsWithoutRef<"form"> & { loading: boolean }) => {
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.auth)
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
  const [errors, setErrors] = useState({})
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      })
    }
  }, [profile])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    setLoadingUpdate(true)
    try {
      const res = await updateProfile(formData)

      dispatch(
        openAlert({
          type: "success",
          title: "Edit Profile Berhasil!",
          description:
            "Profile Anda telah sukses diperbarui.",
          autoClose: true,
        })
      )

      dispatch(setProfile(res.data))
      setIsEditing(false)
      setFormData(DEFAULT_FORM_VALUES)
      setErrors({})
    } catch (error: any) {
      if (Array.isArray(error)) {
        setErrors(formatValidationErrors(error))
      } else {
        dispatch(
          openAlert({
            type: "error",
            title: "Edit Profile Gagal!",
            description: error.message || "Terjadi kesalahan pada server",
            autoClose: true,
          })
        )
      }
    } finally {
      setLoadingUpdate(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (profile) {
      setFormData({
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      })
    }
    setErrors({})
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
  }

  if (loading) return <FormSkeleton />

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <Field>
          <FieldLabel className="text-xs">Email</FieldLabel>
          <FormInput
            name="email"
            type="email"
            placeholder="masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            errors={errors}
            icon={<AtSign />}
            required
            disabled
          />
        </Field>
        <Field>
          <FieldLabel className="text-xs">Nama Depan</FieldLabel>
          <FormInput
            name="first_name"
            type="text"
            placeholder="nama depan"
            value={formData.first_name}
            onChange={handleChange}
            errors={errors}
            icon={<User />}
            disabled={!isEditing}
          />
        </Field>
        <Field>
          <FieldLabel className="text-xs">Nama Belakang</FieldLabel>
          <FormInput
            name="last_name"
            type="text"
            placeholder="nama belakang"
            value={formData.last_name}
            onChange={handleChange}
            errors={errors}
            icon={<User />}
            disabled={!isEditing}
          />
        </Field>
        {!isEditing ? (
          <div className="flex flex-col gap-6">
            <Button
              type="button"
              onClick={handleEditClick}
              size="lg"
              className="text-xs"
            >
              Edit Profile
            </Button>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <Button type="submit" size="lg" className="text-xs">
              {loadingUpdate ? <Spinner /> : "Simpan"}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="border-primary text-xs text-primary transition-all duration-300 hover:bg-background hover:text-primary hover:opacity-65"
              size="lg"
              variant="outline"
            >
              Batalkan
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
AccountForm.displayName = "AccountForm"
export default AccountForm
