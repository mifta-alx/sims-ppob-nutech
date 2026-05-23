"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import { Pencil } from "lucide-react"
import Image from "next/image"
import { memo, useRef, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { updateProfileImage } from "@/services/profile"
import { openAlert } from "@/store/slices/uiSlice"
import { setProfile } from "@/store/slices/authSlice"

const ProfileUserSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Skeleton className="size-32 rounded-full border border-muted-foreground/10 object-cover" />
      <Skeleton className="h-10 w-56 rounded-sm" />
    </div>
  )
}

const ProfileUser = memo(({ loading }: { loading: boolean }) => {
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.auth)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "User"

  const avatarSrc =
    profile?.profile_image && !profile.profile_image.includes("null")
      ? profile.profile_image
      : "/icons/profile-photo.png"

  const handleEdit = () => {
    if (uploading) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 100 * 1024) {
      dispatch(
        openAlert({
          type: "error",
          title: "Upload Gagal",
          description: "Ukuran file maksimal adalah 100 KB",
          buttonText: "Tutup",
        })
      )
      return
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      dispatch(
        openAlert({
          type: "error",
          title: "Format Tidak Sesuai",
          description: "Hanya diperbolehkan menggunakan format JPEG atau PNG",
          buttonText: "Tutup",
        })
      )
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setUploading(true)

    try {
      const res = await updateProfileImage(formData)

      dispatch(setProfile(res.data))

      dispatch(
        openAlert({
          type: "success",
          title: "Berhasil",
          description: "Foto profil Anda berhasil diperbarui",
        })
      )
    } catch (error: any) {
      dispatch(
        openAlert({
          type: "error",
          title: "Gagal Mengubah Foto Profil",
          description:
            error.message || "Terjadi kesalahan saat mengunggah foto",
        })
      )
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  if (loading) return <ProfileUserSkeleton />
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <Image
          src={avatarSrc}
          alt="profile-photo"
          priority
          unoptimized
          width={128}
          height={128}
          className="size-32 rounded-full border border-muted-foreground/10 object-cover"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
          className="hidden"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={handleEdit}
          className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-muted-foreground/50 bg-background"
        >
          <Pencil className="size-3" />
        </button>
      </div>

      <p className="text-3xl font-semibold">{fullName}</p>
    </div>
  )
})

ProfileUser.displayName = "ProfileUser"
export default ProfileUser
