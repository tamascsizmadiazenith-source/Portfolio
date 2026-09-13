"use client";

import { useCart } from "@/context/CartContext";

type CartIndicatorProps = {
  onOpen?: () => void;
};

export default function CartIndicator({ onOpen }: CartIndicatorProps) {
  const { items, total } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed right-3 top-24 z-40 rounded-2xl border border-white/10 bg-[#11131A]/95 px-3 py-2 text-left text-xs text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-[#1c202b] sm:right-6 sm:top-6 sm:rounded-3xl sm:px-4 sm:py-3 sm:text-sm"
    >
      <div className="font-semibold tracking-[0.15em] text-white/80">Cart</div>
      <div className="mt-1 flex items-center justify-between gap-3 sm:mt-2 sm:gap-4">
        <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        <span className="font-semibold text-[#D4AF37]">€{total}</span>
      </div>
    </button>
  );
}
