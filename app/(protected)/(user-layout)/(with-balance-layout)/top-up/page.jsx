import { NominalField, TopUpForm } from "@/components/top-up"

const TopUpPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col">
                <p className="text-base font-medium text-muted-foreground">
                    Silahkan masukkan
                </p>
                <p className="text-3xl font-semibold">
                    Nominal Top Up
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <TopUpForm />
                </div>
                <div className="col-span-1">
                    <NominalField />
                </div>
            </div>
        </div>
    )
}

export default TopUpPage