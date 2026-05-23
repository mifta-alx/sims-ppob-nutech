"use client"
import React, { memo, useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Field, FieldError } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  errors: Record<string, string>
}

const PasswordInput = memo(
  ({
    id,
    name = "password",
    placeholder,
    value,
    onChange,
    required = false,
    errors,
    className,
    ...props
  }: FormInputProps) => {
    const fieldError = errors?.[name]
    const hasError = Boolean(fieldError)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <Field className={className}>
        <InputGroup className="h-12 gap-1.5 px-2">
          <InputGroupInput
            id={id || name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={hasError}
            {...props}
          />
          <InputGroupAddon
            className={cn(
              "size-5 transition-colors duration-300 ease-in-out",
              hasError ? "text-primary" : "text-muted-foreground/40",
              value ? "text-foreground" : "text-muted-foreground/40"
            )}
          >
            <Lock />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              className="text-muted-foreground/40 hover:bg-transparent hover:text-muted-foreground/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-3" />
              ) : (
                <Eye className="size-3" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {hasError && (
          <FieldError className="text-end text-xs">{fieldError}</FieldError>
        )}
      </Field>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
export default PasswordInput
