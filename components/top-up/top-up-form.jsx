import { memo } from "react"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Banknote } from "lucide-react"

const TopUpForm = memo(() => {
    return (
        <form>
            <FieldGroup className="gap-4">
                <Field>
                    <div className="relative">
                       <Banknote className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />
                       <Input id="nominal" type="text" placeholder="masukkan nominal top up" required className="pl-9 h-10" />
                    </div>
                </Field>
                <Field>
                    <Button type="submit" className="text-xs disabled:grayscale-100 disabled:opacity-30 disabled:cursor-not-allowed" size="lg" disabled>Top up</Button>
                </Field>
            </FieldGroup>
        </form>
    )
})

TopUpForm.displayName = "TopUpForm"
export default TopUpForm