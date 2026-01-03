
export type PaymentStatusLabel = "Overdue" | "Ongoing" | "Completed" | "Halted";
export interface Payment {
  id: string;
  accountName: string;
  assetId: string;
  amount: number;
  paidAt: string;        // date paid
  reference: string;     // bank ref / GCash ref
  accountId: string;     // where money came from\
  createdAt: string;
}
export interface PaymentSummary {
  totalPaid: number;
  expectedPaid: number;
  monthsCovered: number;
  remaining: number;
  status: {
    label: PaymentStatusLabel;
    color: string;
  };
}