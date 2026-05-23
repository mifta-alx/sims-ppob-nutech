import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ServiceItem } from "@/types/information"

interface ServiceState {
  services: ServiceItem[]
}

const initialState: ServiceState = {
  services: [],
}

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<ServiceItem[]>) => {
      state.services = action.payload
    },
    clearServices: (state) => {
      state.services = []
    },
  },
})

export const { setServices, clearServices } = serviceSlice.actions
export default serviceSlice.reducer