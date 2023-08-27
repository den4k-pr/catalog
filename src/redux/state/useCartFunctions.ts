import { Product } from '@/types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cart';

const getInitialCartFromLocalStorage = (): Product[] => {
  if (typeof window !== 'undefined') {
    const cartJson = window.localStorage.getItem(CART_STORAGE_KEY) || '[]';
    return JSON.parse(cartJson) as Product[];
  } else {
    return [];
  }
};

const saveCartToLocalStorage = (cart: Product[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.findIndex((item) => item._id === action.payload._id);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the item from state
      const updatedState = state.filter((item) => item._id !== action.payload);

      // Save the updated state to local storage
      saveCartToLocalStorage(updatedState);

      return updatedState;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToLocalStorage(state);
    },
    clearCart: () => {
      saveCartToLocalStorage([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
