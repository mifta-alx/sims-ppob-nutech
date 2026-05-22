import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AtSign, User } from "lucide-react"

const AccountForm = ({ className, ...props }) => {
  return (
    <form {...props}>
      <FieldGroup className="gap-6">
        <Field>
          <FieldLabel className="text-xs">Email</FieldLabel>
          <div className="relative">
            <AtSign className="absolute top-1/2 left-4 size-3 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="masukkan email anda"
              required
              className="h-10 pl-9"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel className="text-xs">Nama Depan</FieldLabel>
          <div className="relative">
            <User className="absolute top-1/2 left-4 size-3 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="nama depan"
              required
              className="h-10 pl-9"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel className="text-xs">Nama Belakang</FieldLabel>
          <div className="relative">
            <User className="absolute top-1/2 left-4 size-3 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="nama belakang"
              required
              className="h-10 pl-9"
            />
          </div>
        </Field>
        <Field className="flex gap-6">
          <Button type="button" className="text-xs border-primary text-primary" size="lg" variant="outline">
            Edit Profile
          </Button>
          <Button type="button" className="text-xs" size="lg">
            Logout
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
AccountForm.displayName = "AccountForm"
export default AccountForm
