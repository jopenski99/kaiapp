"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Props {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  onOpenSettings: () => void;
}

export default function TopBar({
  title,
  showBack,
  rightAction,
  onOpenSettings,
}: Props) {
  const router = useRouter();

  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <header
      ref={containerRef}
      className="ax-navbar bg-black w-full fixed h-14 px-4 flex items-center justify-between border-b border-neutral-800"
      style={{ zIndex: 999 }}
    >
      <div ref={titleRef} className="flex items-center gap-3 w-full bg-black">
        <button
          onClick={() => router.back()}
          className="p-1 rounded hover:bg-neutral-800"
          style={{ visibility: showBack ? "visible" : "hidden" }}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-2 justify-center w-full">
          <img
            src="/assets/favicon-32x32.png"
            alt="logo"
            className="h-9 w-9"
          />

          {title && (
            <div
              
              className="flex flex-col items-center"
            >
              <h1 className="text-lg font-semibold">Axcelion</h1>
              <p className="text-neutral-400 text-sm">{title}</p>
            </div>
          )}
        </div>

        <button
          onClick={onOpenSettings}
          className="ml-auto p-1 rounded hover:bg-neutral-800"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
