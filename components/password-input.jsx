"use client"
import { memo, useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"

const PasswordInput = memo(({ name="password", ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <Lock className="text-muted-foreground/40 absolute top-1/2 left-4 size-3 -translate-y-1/2" />

            <Input
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                className="pr-10 pl-9"
                {...props}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground/40 absolute top-1/2 right-4 -translate-y-1/2"
            >
                {showPassword ? (
                    <EyeOff className="size-3" />
                ) : (
                    <Eye className="size-3" />
                )}
            </button>
        </div>
    )
})

PasswordInput.displayName = "PasswordInput"
export default PasswordInput