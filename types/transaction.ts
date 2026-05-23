export interface BalanceResponseData {
  balance: number
}

export interface TopUpPayload {
  top_up_amount: number
}

export interface TransactionResponseData {
  offset: number
  limit: number
  records: TransactionRecord[]
}
export interface TransactionRecord {
  invoice_number: string
  transaction_type: string
  description: string
  total_amount: number
  created_on: string
}