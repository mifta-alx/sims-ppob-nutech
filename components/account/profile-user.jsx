import { Pencil } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const ProfileUser = memo(() => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative">
                <Image
                    src="/icons/profile-photo.png"
                    alt="profile-photo"
                    width={70}
                    height={70}
                    className="size-32 rounded-full object-cover border border-muted-foreground/10"
                />
                <button className="absolute bottom-0 right-0 size-8 rounded-full bg-background border border-muted-foreground/50 flex justify-center items-center">
                    <Pencil className="size-3" />
                </button>
            </div>

            <p className="text-3xl font-semibold">
                Kristanto Wibowo
            </p>
        </div>
    )
})

ProfileUser.displayName = "ProfileUser"
export default ProfileUser