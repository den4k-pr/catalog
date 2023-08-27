import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    burgerValue: boolean;
}

const initialState: AppState = {
  burgerValue: false,
};

const burgerSelect = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBurgerValue: (state) => {
        state.burgerValue = !state.burgerValue;
    },
  },
});

export const { setBurgerValue } = burgerSelect.actions;

export default burgerSelect.reducer;
