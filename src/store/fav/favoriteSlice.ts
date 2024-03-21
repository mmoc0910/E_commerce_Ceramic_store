import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state


// Define the initial state using that type
const initialState: string[] = [];

const favoriteSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => [
      ...state,
      action.payload,
    ],
    removeFavorite: (state, action: PayloadAction<string>) =>
      [...state].filter((item) => item !== action.payload),
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
