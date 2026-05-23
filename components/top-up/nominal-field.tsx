import { memo } from "react"
import { nominals } from "@/constants/nominals"

interface NominalFieldProps {
  setNominal: (nominal: number) => void
  disabled?: boolean
}

const NominalField = memo(({ setNominal, disabled }: NominalFieldProps) => {
    return (
      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {nominals.map((nominals, index) => (
          <button
            disabled={disabled}
            key={index}
            onClick={() => setNominal(nominals.value)}
            className="h-10 rounded-sm border border-muted-foreground/30 text-xs font-medium text-foreground/80 transition-all duration-300 ease-in-out hover:scale-105 hover:border-muted-foreground/50 hover:font-semibold"
          >
            {nominals.label}
          </button>
        ))}
      </div>
    )
})

NominalField.displayName = "NominalField"
export default NominalField