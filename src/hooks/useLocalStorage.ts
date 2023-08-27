

import { Product } from '@/types/products';
import { addToCart, clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '@/redux/state/useCartFunctions';
import { RootState } from '@/redux/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CART_STORAGE_KEY = 'cart';

const getInitialCartFromLocalStorage = (): Product[] => {
  if (typeof window !== 'undefined') {
    const cartJson = window.localStorage.getItem(CART_STORAGE_KEY) || '[]';
    return JSON.parse(cartJson) as Product[];
  } else {
    return [];
  }
};

const useCart = (): {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  getTotalPrice: () => number;
  getTotalLength: () => number;
} => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

useEffect(() => {
    // Run this effect only on the client
    if (typeof window !== 'undefined') {
      const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalPrice(price);
    }
  }, [cart]);

  const handleAddToCart = (item: Product): void => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (itemId: string): void => {
    dispatch(removeFromCart(itemId));
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  };

  const getTotalLength = (): number => {
    return cart.reduce((total: any, item: any) => total + item.quantity, 0);
  };

  const handleIncrementQuantity = (itemId: string): void => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrementQuantity = (itemId: string): void => {
    dispatch(decrementQuantity(itemId));
  };

  const handleClearCart = (): void => {
    dispatch(clearCart());
  };

  return {
    cart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    getTotalPrice,
    getTotalLength,
    // @ts-ignore
    incrementQuantity: handleIncrementQuantity,
    decrementQuantity: handleDecrementQuantity,
    clearCart: handleClearCart,
  };
};

export default useCart;
