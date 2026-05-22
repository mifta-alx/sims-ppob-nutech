import { PaymentForm } from "@/components/payment"

const PaymentPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col">
                <p className="text-base font-medium text-muted-foreground">
                    Pembayaran
                </p>
                <p className="text-xl font-semibold">
                    Listrik
                </p>
            </div>
            <PaymentForm />
        </div>
    )
}

export default PaymentPage