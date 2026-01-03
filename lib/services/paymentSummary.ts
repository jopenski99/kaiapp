import { Payment, PaymentStatusLabel, PaymentSummary } from "@/lib/models/payments";
import { Asset, Obligation } from "@/lib/models/assets";



export function computePaymentSummary(
  asset: Asset,
  payments: Payment[]
): PaymentSummary {
  if (!asset.obligation) {
    return {
      totalPaid: 0,
      expectedPaid: 0,
      monthsCovered: 0,
      remaining: 0,
      status: { label: "Halted" as PaymentStatusLabel, color: "text-gray-600" },
    };
  }

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const tempRemaining = Math.max(asset.obligation.totalAmount - totalPaid, 0);
  const remaining = isNaN(tempRemaining) ? 0 : tempRemaining;
  const monthsElapsed = monthsBetween(
    new Date(asset.obligation.startDate),
    new Date()
  );

  const expectedPaid = Math.min(monthsElapsed, asset.obligation.termMonths) * asset.obligation.monthlyDue;


  const monthsCovered = Math.floor(Number(totalPaid) / Number(asset.obligation.monthlyDue));

  const status = remaining > 0 ? {label : 'Ongoing' as PaymentStatusLabel, color : 'text-yellow-600'} : {label : 'Completed' as PaymentStatusLabel, color : 'text-green-600'};
  return {
    totalPaid,
    expectedPaid,
    monthsCovered,
    remaining,
    status,
  };
}

function monthsBetween(start: Date, end: Date) {
  return (
    end.getFullYear() * 12 +
    end.getMonth() -
    (start.getFullYear() * 12 + start.getMonth()) +
    1
  );
}
