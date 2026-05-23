"use client"
import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import Cookies from "js-cookie"
import { logout } from "@/store/slices/authSlice"
import { Spinner } from "@/components/ui/spinner"

const LogoutButton = memo(() => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsPending(true)

    Cookies.remove("token")

    router.push("/login")

    setTimeout(() => {
      dispatch(logout())
    }, 400)
  }
  return (
    <Button
      onClick={handleLogout}
      type="button"
      className="border-primary text-xs text-primary transition-all duration-300 hover:bg-background hover:text-primary hover:opacity-65"
      size="lg"
      variant="outline"
      disabled={isPending}
    >
      {isPending ? <Spinner className="text-primary" /> : "Logout"}
    </Button>
  )
})

LogoutButton.displayName = "LogoutButton"
export default LogoutButton
