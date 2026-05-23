"use client"

import React, { memo } from "react"
import { cn } from "@/lib/utils"
import { Field, FieldError } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string 
  errors?: Record<string, string>
  icon?: React.ReactNode 
}

const FormInput = memo(({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  errors,
  icon,
  className,
  ...props
}: FormInputProps) => {
  const fieldError = errors?.[name]
  const hasError = Boolean(fieldError)

  return (
    <Field className={className}>
      <InputGroup className="h-12 gap-1.5 px-2">
        <InputGroupInput
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={hasError}
          {...props}
        />
        {icon && (
          <InputGroupAddon
            className={cn(
              "size-5 transition-colors duration-300 ease-in-out",
              hasError ? "text-primary" : "text-muted-foreground/40",
              value ? "text-foreground" : "text-muted-foreground/40"
            )}
          >
            {icon}
          </InputGroupAddon>
        )}
      </InputGroup>

      {hasError && (
        <FieldError className="text-end text-xs">{fieldError}</FieldError>
      )}
    </Field>
  )
})

FormInput.displayName = "FormInput"
export default FormInput
