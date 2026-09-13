"use client";

import { createContext, useContext, useMemo } from "react";
import { useShopifyCart, CartState } from "@/hooks/use-shopify-cart";

type CartContextValue = CartState & {
  addItem: (item: { id: string; title: string; artworkId: string; category: string; media: string; size: string; quantity: number; price: number }) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useShopifyCart();

  const value = useMemo(
    () => ({
      ...cart,
      addItem: cart.addItem,
      removeItem: cart.removeItem,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
