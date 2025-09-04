// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// // Define a type for the slice state
// interface CounterState {
//   value: number;
// }

// // Define the initial state using that type
// const initialState: CounterState = {
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     // Use the PayloadAction type to declare the contents of `action.payload`
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default counterSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductSelectionState {
  selectedVariantId: string | null;
  quantity: number;
  pincode: string;
}

const initialState: ProductSelectionState = {
  selectedVariantId: null,
  quantity: 1,
  pincode: "",
};

const productSlice = createSlice({
  name: "productSelection",
  initialState,
  reducers: {
    setSelectedVariant: (state, action: PayloadAction<string>) => {
      state.selectedVariantId = action.payload;
      state.quantity = 1; // Reset quantity when variant changes
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = Math.max(1, action.payload);
    },
    setPincode: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
    resetSelection: () => initialState,
  },
});

export const { setSelectedVariant, setQuantity, setPincode, resetSelection } =
  productSlice.actions;
export default productSlice.reducer;
