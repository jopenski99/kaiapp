import { getAccounts } from "@/lib/storage/accounts";
import { getDB } from "@/lib/storage/db";
import { Account } from "@/lib/models/accounts";

function createAccount(
  name: string,
  label: string,
  type: "CASH" | "BANK" | "E_WALLET"
): Account {
  const id = crypto.randomUUID();
  return {
    id,
    name,
    label,
    value: id,
    type,
    createdAt: new Date().toISOString(),
  };
}

export async function seedAccounts() {
  const existing = await getAccounts();
  if (existing.length > 0) return;

  const db = await getDB();

  const defaults: Account[] = [
    createAccount("Cash", "Cash", "CASH"),
    createAccount("BPI Savings Account", "BPI", "BANK"),
    createAccount("SB Savings Account", "SB", "BANK"),
    createAccount("RCBC Savings Account", "RCBC", "BANK"),
    createAccount("Maybank Savings Account", "Maybank", "BANK"),
    createAccount("Mari Bank Savings Account", "Mari Bank", "BANK"),
    createAccount("CIMB Savings Account", "CIMB", "BANK"),
    createAccount("GCash", "GCash", "E_WALLET"),
    createAccount("PayMaya", "PayMaya", "E_WALLET"),
    createAccount("ShopeePay", "ShopeePay", "E_WALLET"),
    createAccount("Coins.ph", "Coins.ph", "E_WALLET"),
    createAccount("Grabpay", "Grabpay", "E_WALLET"),
  ];

  for (const account of defaults) {
    await db.put("accounts", account);
  }
}
