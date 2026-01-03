"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import AssetHeader from "@/components/assets/AssetHeader";
import ObligationSummary from "@/components/assets/ObligationSummary";
import PaymentList from "@/components/payments/PaymentList";
import PaymentSummaryCard from "@/components/payments/PaymentSummary";

import { Asset } from "@/lib/models/assets";
import { Payment, PaymentStatusLabel, PaymentSummary } from "@/lib/models/payments";
import { getAssetById } from "@/lib/storage/assets";
import { getPaymentsByAssetId } from "@/lib/storage/payments";
import { computePaymentSummary } from "@/lib/services/paymentSummary";




export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  const summary : PaymentSummary  =
    asset && payments
      ? computePaymentSummary(asset, payments)
      : {
        totalPaid: 0,
        expectedPaid: 0,
        monthsCovered: 0,
        remaining: 0,
        status: {
          label: "Ongoing" as PaymentStatusLabel,
          color: "gray",
        },
      } as PaymentSummary;


  useEffect(() => {
    if (!id) return;

    getAssetById(id).then(setAsset);
    getPaymentsByAssetId(id).then(setPayments);
  }, [id]);


  return (
    <AppShell title="Asset" showBack>
      {!asset ? (<p className="text-neutral-400">Loading asset…</p>) : (
        <div className="space-y-6">
          <AssetHeader asset={asset} />
          {summary && <PaymentSummaryCard summary={summary} asset={asset} />}
          <ObligationSummary asset={asset} />


          <div className="space-y-3">
            <h2 className="text-lg font-semibold">
              Payments

            </h2>
            <PaymentList payments={payments} />
          </div>

          <button
            onClick={() =>
              router.push(`/locked/assets/${asset.id}/payments/new`)
            }
            className={`w-full p-2 rounded-2xl ${summary.remaining > 0 ? "bg-teal-500 text-black" : "bg-gray-800 text-gray-400"} font-semibold`}
            disabled={summary.remaining > 0 ? false : true}
          >
            Add Payment
          </button>
        </div>
      )}

    </AppShell>
  );
};
