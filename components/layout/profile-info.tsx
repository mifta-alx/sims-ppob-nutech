"use client"
import Image from "next/image"
import { memo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppSelector } from "@/store"
import BalanceInfo from "./balance-info"

const ProfileSkeleton = () => {
  return (
    <div className="itemsc-center flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex flex-col">
        <Skeleton className="mb-4 size-14 rounded-full" />
        <Skeleton className="mb-2 h-5 w-32 rounded-sm" />
        <Skeleton className="h-8 w-68 rounded-sm" />
      </div>
      <Skeleton className="flex h-[138px] rounded-2xl md:w-1/2" />
    </div>
  )
}

const ProfileInfo = memo(({ loading }: { loading: boolean }) => {
  const { profile, balance } = useAppSelector((state) => state.auth)

  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "User"

  const avatarSrc =
    profile?.profile_image && !profile.profile_image.includes("null")
      ? profile.profile_image
      : "/icons/profile-photo.png"

  return loading ? (
    <ProfileSkeleton />
  ) : (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-row items-center lg:items-start gap-4 lg:flex-col">
        <Image
          src={avatarSrc}
          alt="profile-photo"
          width={70}
          height={70}
          className="size-14 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-base font-medium text-muted-foreground">
            Selamat datang,
          </p>
          <p className="text-3xl font-semibold">{fullName}</p>
        </div>
      </div>
      <BalanceInfo balance={balance} />
    </div>
  )
})

ProfileInfo.displayName = "ProfileInfo"
export default ProfileInfo
