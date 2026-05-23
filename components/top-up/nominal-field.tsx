import { memo } from "react"
import { nominals } from "@/constants/nominals"

interface NominalFieldProps {
  setNominal: (nominal: number) => void
}

const NominalField = memo(({ setNominal }: NominalFieldProps) => {
    return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            {nominals.map((nominals, index) => (
                <button key={index} onClick={() => setNominal(nominals.value)} className="border border-muted-foreground/30 text-foreground/80 text-xs font-medium h-10 transition-all duration-300 ease-in-out hover:border-muted-foreground/50 hover:scale-105 hover:font-semibold rounded-sm">
                    {nominals.label}
                </button>
            ))}
        </div>
    )
})

NominalField.displayName = "NominalField"
export default NominalField