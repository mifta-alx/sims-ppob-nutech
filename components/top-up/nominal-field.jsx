import { memo } from "react"
const nominals = [
    {
        label: "Rp10.000",
        value: 10000,
    },
    {
        label: "Rp20.000",
        value: 20000,
    },
    {
        label: "Rp50.000",
        value: 50000,
    },
    {
        label: "Rp100.000",
        value: 100000,
    },
    {
        label: "Rp250.000",
        value: 250000,
    },
    {
        label: "Rp500.000",
        value: 500000,
    },
]

const NominalField = memo(({
}) => {
    return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            {nominals.map((nominals, index) => (
                <button key={index} className="border border-muted-foreground/30 text-foreground/80 text-xs font-medium h-10 transition-all duration-300 ease-in-out hover:border-muted-foreground/50 hover:scale-105 hover:font-semibold rounded-sm">
                    {nominals.label}
                </button>
            ))}
        </div>
    )
})

NominalField.displayName = "NominalField"
export default NominalField