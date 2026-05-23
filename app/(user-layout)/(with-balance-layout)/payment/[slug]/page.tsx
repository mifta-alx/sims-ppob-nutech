import { PaymentForm } from "@/components/payment"

const PaymentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params
  return (
      <div className="flex flex-col">
        <p className="text-base font-medium text-muted-foreground">
          Pembayaran
        </p>
        <PaymentForm code={slug} />
      </div>
  )
}

export default PaymentPage
