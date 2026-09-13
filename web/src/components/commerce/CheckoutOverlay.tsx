"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/dictionary";

type CheckoutOverlayProps = {
  onClose: () => void;
};

export default function CheckoutOverlay({ onClose }: CheckoutOverlayProps) {
  const { t } = useTranslation();
  const { items, total, removeItem, updateItemQuantity } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEmpty = items.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#11131A] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          {t("checkout.close")}
        </button>

        <div className="p-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">{t("checkout.currentOrder")}</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{t("checkout.reviewSelection")}</h3>
          </div>

          {isEmpty ? (
            <div className="rounded-[24px] border border-white/10 bg-[#0A0C10] p-8 text-center text-white/70">
              <p className="text-lg font-medium text-white">{t("checkout.emptyTitle")}</p>
              <p className="mt-3 text-sm leading-7">{t("checkout.emptyBody")}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-[#0A0C10] p-5">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-white/60">{t(`acquisition.materials.${item.media}`)} · {item.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white transition hover:border-white/20 hover:bg-white/10"
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        −
                      </button>
                      <span className="min-w-[36px] text-center text-sm font-semibold text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white transition hover:border-white/20 hover:bg-white/10"
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        +
                      </button>
                      <div className="ml-4 text-sm font-semibold text-white">€{item.price * item.quantity}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-white/50 transition hover:text-white"
                    >
                      {t("checkout.remove")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-[24px] border border-white/10 bg-[#0A0C10] p-6">
            <div className="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <span>{t("checkout.orderTotal")}</span>
              <span className="text-lg font-semibold text-white">€{total}</span>
            </div>
            {error && (
              <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <button
              type="button"
              disabled={isEmpty || isSubmitting}
              onClick={async () => {
                if (isEmpty) return;
                setIsSubmitting(true);
                setError(null);

                try {
                  const response = await fetch("/api/create-checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }),
                  });
                  const data = await response.json();
                  if (data.url) {
                    window.location.href = data.url;
                    return;
                  }
                  setError(data.error || t("checkout.genericError"));
                } catch (err) {
                  console.error(err);
                  setError(t("checkout.stripeUnavailable"));
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition ${
                isEmpty || isSubmitting
                  ? "cursor-not-allowed bg-white/10 text-white/40"
                  : "bg-[#D4AF37] text-[#0A0C10] hover:bg-[#c5992f]"
              }`}
            >
              {isSubmitting ? t("checkout.preparingCheckout") : t("checkout.checkoutButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
