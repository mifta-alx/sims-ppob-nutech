import { TransactionList } from "@/components/transaction"

const TransactionPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-bold text-foreground">Semua Transaksi</p>
      <TransactionList />
    </div>
  )
}

export default TransactionPage
