import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Videogioco } from "./videogiochiSlice";

export interface CartItem {
  id: number;
  nome: string;
  prezzo: number;
  imgUrl?: string;
  quantity: number;
  qntMax: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.qntMax) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartQuantities: (state, action: PayloadAction<Videogioco[]>) => {
      action.payload.forEach((g) => {
        const item = state.items.find((i) => i.id === Number(g.id));
        if (item) {
          item.qntMax = g.qntMax;
          if (item.quantity > item.qntMax) {
            item.quantity = item.qntMax;
          }
        }
      });
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  updateCartQuantities,
} = cartSlice.actions;

export default cartSlice.reducer;
