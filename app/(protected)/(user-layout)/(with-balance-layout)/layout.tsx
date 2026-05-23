"use client"
import ProfileInfo from "@/components/layout/profile-info"
import { getProfile } from "@/services/profile"
import { getBalance } from "@/services/transaction"
import { useAppDispatch } from "@/store"
import { setBalance, setProfile } from "@/store/slices/authSlice"
import { useEffect, useState } from "react"

const WithBalanceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLayoutData() {
      try {
        const [profileRes, balanceRes] = await Promise.all([ 
          getProfile(),
          getBalance(),
        ])

        dispatch(setProfile(profileRes.data))
        dispatch(setBalance(balanceRes.data.balance))
      } catch (error) {
        console.error("Gagal memuat data layout:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLayoutData()
  }, [dispatch])

  return (
    <div className="flex w-full max-w-6xl flex-col gap-10">
      <ProfileInfo loading={loading} />
      {children}
    </div>
  )
}

export default WithBalanceLayout
