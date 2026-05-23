"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import Link from "next/link"
import { AtSign } from "lucide-react"
import { Logo } from "@/components/logo"
import PasswordInput from "@/components/password-input"
import { useState } from "react"
import { useAppDispatch } from "@/store"
import FormInput from "@/components/form-input"
import { loginService } from "@/services/auth/login"
import { setCredentials } from "@/store/slices/authSlice"
import { openAlert } from "@/store/slices/uiSlice"
import { useRouter } from "next/navigation"
import { formatValidationErrors } from "@/lib/validations"
import Cookies from "js-cookie"
import { Spinner } from "@/components/ui/spinner"

const DEFAULT_FORM_VALUES = {
  email: "",
  password: "",
}

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      const response = await loginService(formData)
      const token = response.data.token
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      })

      dispatch(setCredentials({ token }))
      router.replace("/")
    } catch (error: any) {
      if (Array.isArray(error)) {
        setErrors(formatValidationErrors(error))
      } else {
        dispatch(
          openAlert({
            type: "error",
            title: "Login Gagal!",
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
            Masuk atau buat akun <br />
            untuk memulai
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
        <PasswordInput
          name="password"
          placeholder="masukkan password anda"
          value={formData.password}
          onChange={handleChange}
          errors={errors}
        />
        <Field className="mt-4">
          <Button
            type="submit"
            className="text-xs"
            size="lg"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Masuk"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center text-xs">
            belum punya akun? registrasi{" "}
            <Link
              href="/register"
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
LoginForm.displayName = "LoginForm"
export default LoginForm
