

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getInitialState = (): AppState => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('adminChooseValue');
    return {
      chooseValue: storedValue ? storedValue : "products",
    };
  }
  return { chooseValue: "products" };
};

interface AppState {
  chooseValue: string;
}

const initialState: AppState = getInitialState();

const adminChooseSelect = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setAdminValue: (state: any, action: PayloadAction<string>) => {
      state.chooseValue = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminChooseValue', action.payload);
      }
    },
  },
});

export const { setAdminValue } = adminChooseSelect.actions;

export default adminChooseSelect.reducer;
