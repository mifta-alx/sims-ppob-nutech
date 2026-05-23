"use client"

import { memo, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { TransactionRecord } from "@/types/transaction"
import { getTransactions } from "@/services/transaction"
import { formatNumberPrice, formatDate } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { useAppDispatch } from "@/store"
import { openAlert } from "@/store/slices/uiSlice"

const LIMIT = 5

const TransactionSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: LIMIT }).map((_, i) => (
        <Skeleton className="h-20 w-full rounded-xl" key={i} />
      ))}
    </div>
  )
}

const TransactionItem = ({
  transaction,
}: {
  transaction: TransactionRecord
}) => {
  const isPayment = transaction.transaction_type === "PAYMENT"
  return (
    <div className="flex flex-row justify-between gap-4 rounded-lg border border-muted-foreground/20 px-6 py-4">
      <div className="flex flex-col gap-2">
        <p
          className={`text-xl font-semibold ${isPayment ? "text-red-500" : "text-green-500"}`}
        >
          {isPayment ? "-" : "+"} Rp.
          {formatNumberPrice(transaction.total_amount)}
        </p>
        <p className="text-xs font-medium text-muted-foreground/40">
          {formatDate(transaction.created_on)}
        </p>
      </div>
      <p className="mt-1 text-[11px] font-medium text-foreground/80">
        {transaction.description}
      </p>
    </div>
  )
}

const TransactionList = memo(() => {
  const dispatch = useAppDispatch()
  const [initialLoading, setInitialLoading] = useState(true)
  const [moreLoading, setMoreLoading] = useState(false)
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTransactions() {
      if (offset === 0) setInitialLoading(true)
      else setMoreLoading(true)
      try {
        const res = await getTransactions({ offset, limit: LIMIT })
        const newRecords = res.data.records || []

        if (offset === 0) {
          setTransactions(newRecords)
        } else {
          setTransactions((prev) => [...prev, ...newRecords])
        }

        if (newRecords.length < LIMIT) {
          setHasMore(false)
        }
      } catch (error: any) {
        dispatch(
          openAlert({
            type: "error",
            title: "Fetch Gagal!",
            description: error.message,
            buttonText: "Tutup",
            autoClose: true,
          })
        )
      } finally {
        setInitialLoading(false)
        setMoreLoading(false)
      }
    }
    fetchTransactions()
  }, [offset])

  const handleShowMore = () => {
    if (moreLoading) return
    setOffset((prevOffset) => prevOffset + LIMIT)
  }

  if (initialLoading) return <TransactionSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        {transactions.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground/50">
            Maaf tidak ada histori transaksi saat ini
          </p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))
        )}
        {hasMore && transactions.length > 0 && (
          <button
            className="flex w-full items-center justify-center gap-2 font-semibold text-primary"
            onClick={handleShowMore}
          >
            {moreLoading ? (
              <Spinner className="size-6 text-primary" />
            ) : (
              "Show more"
            )}
          </button>
        )}
      </div>
    </div>
  )
})

TransactionList.displayName = "TransactionList"
export default TransactionList
