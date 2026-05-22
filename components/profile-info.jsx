"use client"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { memo, useState } from "react"

const ProfileInfo = memo(() => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between itemsc-center">
            <div className="flex flex-col">
                <Image
                    src="/icons/profile-photo.png"
                    alt="profile-photo"
                    width={70}
                    height={70}
                    className="size-14 mb-4"
                />
                <p className="text-base font-medium text-muted-foreground">
                    Selamat datang,
                </p>
                <p className="text-3xl font-semibold">
                    Kristanto Wibowo
                </p>
            </div>
            <div className="relative w-full max-w-xl">
                <div className="absolute top-5 left-5 w-full h-full flex flex-col md:gap-3">
                    <p className="text-background text-sm font-medium">
                        Saldo anda
                    </p>
                    <p className="text-background md:text-3xl font-semibold">
                        Rp
                    </p>
                    <div className="flex items-center bg-primary w-fit ">
                        <p className="text-background text-xs font-medium">
                            Lihat saldo
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-background px-1"
                        >
                            {showPassword ? (
                                <EyeOff className="size-2" />
                            ) : (
                                <Eye className="size-2" />
                            )}
                        </button>
                    </div>
                </div>
                <Image
                    src="/images/balance-bg.png"
                    alt="balance-bg"
                    width={670}
                    height={160}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
})

ProfileInfo.displayName = "ProfileInfo"
export default ProfileInfo
