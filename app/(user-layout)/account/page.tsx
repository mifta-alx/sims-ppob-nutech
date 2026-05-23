"use client"
import { ProfileUser, AccountForm } from "@/components/account"
import { getProfile } from "@/services/profile"
import { useAppDispatch } from "@/store"
import { setProfile } from "@/store/slices/authSlice"
import { openAlert } from "@/store/slices/uiSlice"
import { useEffect, useState } from "react"

const AccountPage = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLayoutData() {
      try {
        const res = await getProfile()

        dispatch(setProfile(res.data))
      } catch (error: any) {
        dispatch(
          openAlert({
            type: "error",
            title: "Fetch Gagal!",
            description: error.message,
            buttonText: "Tutup",
            autoClose: true,
          })
        )
      } finally {
        setLoading(false)
      }
    }

    fetchLayoutData()
  }, [dispatch])

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <ProfileUser loading={loading} />
      <AccountForm loading={loading} />
    </div>
  )
}

export default AccountPage
