import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  monthlyPrice?: number;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nerve_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('nerve_cart', JSON.stringify(newItems));
  };

  const addItem = (item: CartItem) => {
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      saveCart(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      saveCart([...items, item]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      saveCart(items.filter(i => i.id !== id));
    } else {
      saveCart(items.map(i => i.id === id ? { ...i, quantity } : i));
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalUpfront = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMonthly = items.reduce((sum, item) => sum + ((item.monthlyPrice || 0) * item.quantity), 0);

  return { items, addItem, updateQuantity, clearCart, totalUpfront, totalMonthly };
}
