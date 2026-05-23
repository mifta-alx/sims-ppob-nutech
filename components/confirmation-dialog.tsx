"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { memo } from "react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}
const ConfirmationDialog = memo(
  ({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batalkan",
    onConfirm,
  }: DialogProps) => {
    const handleClick = () => {
      if (onConfirm) {
        onConfirm()
      }
    }
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="flex flex-col items-center justify-center gap-6 p-6 text-center sm:max-w-xs"
          showCloseButton={false}
        >
          <Image
            src="/icons/logo.png"
            alt="SIMS PPOB"
            width={56}
            height={56}
            className="size-14"
          />

          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-center text-sm text-foreground/80">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-2xl font-bold tracking-tight text-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex w-full flex-col gap-2.5">
            <Button
              className="w-full text-sm font-semibold text-primary transition-all duration-300 ease-in-out hover:bg-transparent hover:font-bold hover:text-primary"
              variant="ghost"
              onClick={handleClick}
            >
              {confirmText || "Ya, Lanjutkan"}
            </Button>
            <Button
              className="w-full text-sm font-semibold text-muted-foreground/50 transition-colors duration-300 ease-in-out hover:bg-transparent hover:font-bold hover:text-muted-foreground"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              {cancelText || "Batalkan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

ConfirmationDialog.displayName = "ConfirmationDialog"
export default ConfirmationDialog
