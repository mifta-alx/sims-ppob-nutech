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

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "success" | "error"
  title: string
  description: string
  buttonText?: string
  showStatus?: boolean
  invert?: boolean
}
export function CustomDialog({
  open,
  onOpenChange,
  type,
  title,
  description,
  buttonText = "Tutup",
  showStatus = false,
  invert = false,
}: DialogProps) {
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
          {invert ? (
            <>
              <DialogTitle className="text-center text-sm text-foreground/80">
                {title}
              </DialogTitle>
              <DialogDescription className="text-center text-2xl font-bold tracking-tight text-foreground">
                {description}
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="text-center text-xl font-bold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            </>
          )}
          {showStatus && (
            <DialogDescription className="text-center text-sm text-foreground/80">
              {isSuccess ? "berhasil!" : "gagal"}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-2 w-full">
          <Button
            className="w-full text-sm font-semibold text-primary hover:bg-transparent hover:font-bold hover:text-primary"
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

CustomDialog.displayName = "CustomDialog"
