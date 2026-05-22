import Image from "next/image";

export function Logo({size = "default"}) {
    const fontSize = {
        default: "text-xl",
        sm: "text-base",
    }
    const iconSize = {
        default: "size-6",
        sm: "size-5",
    }
    return (
        <div className="flex flex-row gap-2 items-center">
            <Image
                src="/icons/logo.png"
                alt="SIMS PPOB"
                width={32}
                height={32}
                className={iconSize[size]}
            />
            <h1 className={`${fontSize[size]} font-semibold`}>SIMS PPOB</h1>
        </div>
    )
}