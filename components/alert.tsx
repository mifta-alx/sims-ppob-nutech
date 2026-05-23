"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "success" | "error"
  title: string
  description: string
  buttonText?: string
}

export function Alert({
  open,
  onOpenChange,
  type,
  title,
  description,
  buttonText = "Tutup",
}: AlertProps) {
  const isSuccess = type === "success"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col items-center justify-center gap-6 p-6 text-center sm:max-w-xs"
        showCloseButton={false}
      >
        <div
          className={cn(
            "rounded-full p-5 text-card",
            isSuccess ? "bg-[#53BD95]" : "bg-primary/80"
          )}
        >
          {isSuccess ? <Check className="size-8" /> : <X className="size-8" />}
        </div>

        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-center text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 w-full">
          <Button
            className="w-full text-sm font-semibold text-primary hover:font-bold hover:text-primary hover:bg-transparent"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

Alert.displayName = "Alert"
