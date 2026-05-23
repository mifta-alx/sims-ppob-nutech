import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import uiReducer from "./slices/uiSlice"
import authReducer from "./slices/authSlice"
import serviceReducer from "./slices/serviceSlice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    service: serviceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
