import { TopUpForm } from "@/components/top-up"

const TopUpPage = () => {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <p className="text-base font-medium text-muted-foreground">
            Silahkan masukkan
          </p>
          <p className="text-3xl font-semibold">Nominal Top Up</p>
        </div>
        <TopUpForm />
      </div>
    )
}

export default TopUpPage