"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import Link from "next/link"
import { AtSign, User } from "lucide-react"
import { Logo } from "@/components/logo"
import PasswordInput from "@/components/password-input"
import { useState } from "react"
import { formatValidationErrors } from "@/lib/validations"
import { register } from "@/services/auth/register"
import FormInput from "@/components/form-input"
import { openAlert } from "@/store/slices/uiSlice"
import { useAppDispatch } from "@/store"
import { Spinner } from "@/components/ui/spinner"

const DEFAULT_FORM_VALUES = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirm_password: "",
}

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    try {
      await register(formData)

      dispatch(
        openAlert({
          type: "success",
          title: "Registrasi Berhasil!",
          description:
            "Akun Anda telah sukses dibuat. Silakan masuk ke halaman login.",
          buttonText: "Ke halaman login",
          autoClose: true,
          redirectTo: "/login",
        })
      )

      setFormData(DEFAULT_FORM_VALUES)
      setErrors({})
    } catch (error: any) {
      if (Array.isArray(error)) {
        setErrors(formatValidationErrors(error))
      } else {
        dispatch(
          openAlert({
            type: "error",
            title: "Registrasi Gagal!",
            description: error.message || "Terjadi kesalahan pada server",
            buttonText: "Tutup",
            autoClose: true,
          })
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <FieldGroup>
        <div className="mb-2 flex flex-col items-center gap-6 text-center">
          <Logo />
          <h1 className="text-2xl font-bold">
            Lengkapi data untuk <br />
            membuat akun
          </h1>
        </div>
        <FormInput
          name="email"
          type="email"
          placeholder="masukkan email anda"
          value={formData.email}
          onChange={handleChange}
          errors={errors}
          icon={<AtSign />}
          required
        />
        <FormInput
          name="first_name"
          type="text"
          placeholder="nama depan"
          value={formData.first_name}
          onChange={handleChange}
          errors={errors}
          icon={<User />}
          required
        />
        <FormInput
          name="last_name"
          type="text"
          placeholder="nama belakang"
          value={formData.last_name}
          onChange={handleChange}
          errors={errors}
          icon={<User />}
          required
        />
        <PasswordInput
          name="password"
          placeholder="buat password"
          value={formData.password}
          onChange={handleChange}
          errors={errors}
        />
        <PasswordInput
          name="confirm_password"
          placeholder="konfirmasi password"
          value={formData.confirm_password}
          onChange={handleChange}
          errors={errors}
        />
        <Field className="mt-4">
          <Button
            type="button"
            onClick={handleSubmit}
            className="text-xs"
            size="lg"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Registrasi"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center text-xs">
            sudah punya akun? login{" "}
            <Link
              href="/login"
              className="font-bold text-primary no-underline!"
            >
              di sini
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
RegisterForm.displayName = "RegisterForm"
export default RegisterForm
