import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const savedIsAuthenticated = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') : null;
const initialIsAuthenticated = savedIsAuthenticated ? JSON.parse(savedIsAuthenticated) : false;

const initialState: AuthState = {
  isAuthenticated: initialIsAuthenticated,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      if (state.isAuthenticated !== action.payload) {
        state.isAuthenticated = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('isAuthenticated', JSON.stringify(action.payload));
        }
      }
    },
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
