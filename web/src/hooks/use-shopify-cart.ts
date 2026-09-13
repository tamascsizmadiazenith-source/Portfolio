"use client";

import { useMemo, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  artworkId: string;
  category: string;
  media: string;
  size: string;
  quantity: number;
  price: number;
};

export type ShopifyCartItem = CartItem;

export type CartState = {
  items: CartItem[];
  total: number;
};

export function useShopifyCart(defaultItems: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(defaultItems);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry
        );
      }
      return [...current, item];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((current) => current.filter((entry) => entry.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((entry) => entry.id !== itemId);
      }
      return current.map((entry) =>
        entry.id === itemId ? { ...entry, quantity } : entry
      );
    });
  };

  return {
    items,
    total,
    addItem,
    removeItem,
    updateItemQuantity,
  };
}
