import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { AtSign, User } from "lucide-react"
import { Logo } from "../logo"
import PasswordInput from "../password-input"

const RegisterForm = ({
    className,
    ...props
}) => {
    return (
        <form className={cn("flex flex-col gap-8", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center text-center gap-6 mb-2">
                    <Logo />
                    <h1 className="text-2xl font-bold">Lengkapi data untuk <br />membuat akun</h1>
                </div>
                <Field>
                    <div className="relative">
                        <AtSign className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />
                        <Input id="email" name="email" type="email" placeholder="masukkan email anda" required className="pl-9" />
                    </div>
                </Field>
                <Field>
                    <div className="relative">
                        <User className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />
                        <Input id="first_name" name="first_name" type="text" placeholder="nama depan" required className="pl-9" />
                    </div>
                </Field>
                <Field>
                    <div className="relative">
                        <User className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />
                        <Input id="last_name" name="last_name" type="text" placeholder="nama belakang" required className="pl-9" />
                    </div>
                </Field>
                <Field>
                    <PasswordInput name="password" placeholder="buat password" />
                </Field>
                <Field>
                    <PasswordInput name="confirm_password" placeholder="konfirmasi password" />
                </Field>
                <Field className="mt-4">
                    <Button type="submit" className="text-xs" size="lg">Registrasi</Button>
                </Field>
                <Field>
                    <FieldDescription className="text-center text-xs">
                        sudah punya akun? login{" "}
                        <Link href="/login" className="font-bold text-primary no-underline!"
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