"use client"

import { configureStore } from '@reduxjs/toolkit'
import togleReducer from "./state/togleSelect"
import burgerReducer from "./state/togleBurger"
import adminChooseReducer from "./state/togleAdminChoose"
import cartReducer from "./state/useCartFunctions"
import authReducer from "./state/authSlice"

export const store = configureStore({
    reducer: {
        togle: togleReducer,
        boorger: burgerReducer,
        adminChoose: adminChooseReducer,
        cart: cartReducer,
        auth: authReducer,
    }
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;