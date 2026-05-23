"use client"

import { useAppSelector, useAppDispatch } from "@/store"
import { closeAlert } from "@/store/slices/uiSlice"
import { Alert } from "@/components/alert"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AlertProvider() {
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
  } = useAppSelector((state) => state.ui.dialog)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen && autoClose) {
      timer = setTimeout(() => {
        dispatch(closeAlert())
        if (redirectTo) {
          router.push(redirectTo)
        }
      }, 1500)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, autoClose, redirectTo, dispatch, router])

  const handleClose = () => {
    dispatch(closeAlert())
    if (redirectTo) {
      router.push(redirectTo)
    }
  }

  return (
    <Alert
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
      type={type}
      title={title}
      description={description}
      buttonText={buttonText}
    />
  )
}
