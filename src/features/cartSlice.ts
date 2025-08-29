import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  // Define the properties of a cart item, e.g.:
  id: string;
  name: string;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
  },
});
