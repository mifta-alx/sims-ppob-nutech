import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { AtSign } from "lucide-react"
import { Logo } from "../logo"
import PasswordInput from "../password-input"

const LoginForm = ({
    className,
    ...props
}) =>{
    return (
        <form className={cn("flex flex-col gap-8", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center text-center gap-6 mb-2">
                    <Logo/>
                    <h1 className="text-2xl font-bold">Masuk atau buat akun <br />untuk memulai</h1>
                </div>
                <Field>
                    <div className="relative">
                        <AtSign className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />
                        <Input id="email" type="email" placeholder="masukkan email anda" required className="pl-9" />
                    </div>
                </Field>
                <Field>
                    <PasswordInput name="password" placeholder="masukkan password anda" />
                </Field>
                <Field className="mt-4">
                    <Button type="submit" className="text-xs" size="lg">Masuk</Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center text-xs">
                        belum punya akun? registrasi{" "}
                        <Link href="/register" className="font-bold text-primary no-underline!"
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
