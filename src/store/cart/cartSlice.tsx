import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define a type for the slice state
export interface CartState {
  productId: string;
  amount: number;
  image: string;
  name: string;
  price: number;
}

// Define the initial state using that type
const initialState: CartState[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartState>) => {
      const data = action.payload;
      toast.success("Thêm giỏ hàng thành công");
      if (state.some((item) => data.productId === item.productId)) {
        return [...state].map((item) =>
          item.productId === data.productId
            ? { ...item, amount: item.amount + data.amount }
            : item
        );
      } else {
        return [...state, action.payload];
      }
    },
    removeProductToCart: (state, action: PayloadAction<string>) =>
      [...state].filter((item) => item.productId !== action.payload),
    changeAmountProduct: (
      state,
      action: PayloadAction<{ productId: string; amount: number }>
    ) =>
      state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, ...action.payload }
          : item
      ),
  },
});

export const { addProductToCart, removeProductToCart, changeAmountProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
