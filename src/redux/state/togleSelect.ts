import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  selectedValue: string;
}

const initialState: AppState = {
  selectedValue: '',
};

const togleSelect = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedValue: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload;
    },
  },
});

export const { setSelectedValue } = togleSelect.actions;

export default togleSelect.reducer;
