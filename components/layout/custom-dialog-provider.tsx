"use client"

import { useAppSelector, useAppDispatch } from "@/store"
import { closeAlert } from "@/store/slices/uiSlice"
import { CustomDialog } from "@/components/custom-dialog"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function CustomDialogProvider() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    isOpen,
    type,
    title,
    description,
    buttonText,
    autoClose,
    redirectTo,
    timeout,
    showStatus,
    invert,
  } = useAppSelector((state) => state.ui.dialog)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen && autoClose) {
      timer = setTimeout(() => {
        dispatch(closeAlert())
        if (redirectTo) {
          router.push(redirectTo)
        }
      }, timeout)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, autoClose, redirectTo, dispatch, router, timeout])

  const handleClose = () => {
    dispatch(closeAlert())
    if (redirectTo) {
      router.push(redirectTo)
    }
  }

  return (
    <>
      <CustomDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose()
        }}
        type={type}
        title={title}
        description={description}
        buttonText={buttonText}
        showStatus={showStatus}
        invert={invert}
      />
    </>
  )
}
