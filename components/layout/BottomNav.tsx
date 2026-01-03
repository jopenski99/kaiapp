"use client";

import { Home, Wallet, CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
  { label: "Home", icon: Home, href: "/locked/dashboard" },
  { label: "Assets", icon: Wallet, href: "/locked/assets" },
  { label: "Expenses", icon: CreditCard, href: "/locked/expense" },
];

gsap.registerPlugin(useGSAP);

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        y: +100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );
  return (
    <nav ref={containerRef} className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 h-16 flex justify-around items-center">
      {navItems.map(({ label, icon: Icon, href }) => {
        const active = pathname.startsWith(href);

        return (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center text-xs ${active ? "text-teal-400" : "text-neutral-400"
              }`}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
