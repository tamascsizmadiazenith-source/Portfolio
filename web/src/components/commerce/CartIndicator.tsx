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
      className="fixed right-6 top-6 z-50 rounded-3xl border border-white/10 bg-[#11131A]/95 px-4 py-3 text-left text-sm text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-[#1c202b]"
    >
      <div className="font-semibold tracking-[0.15em] text-white/80">Cart</div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        <span className="font-semibold text-[#D4AF37]">€{total}</span>
      </div>
    </button>
  );
}
