import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DialogConfig {
  type: "success" | "error"
  title: string
  description: string
  buttonText?: string
  autoClose?: boolean
  redirectTo?: string
}

interface UIState {
  dialog: {
    isOpen: boolean
    type: "success" | "error"
    title: string
    description: string
    buttonText: string
    autoClose?: boolean
    redirectTo?: string | null
  }
}

const initialState: UIState = {
  dialog: {
    isOpen: false,
    type: "success",
    title: "",
    description: "",
    buttonText: "Close",
    autoClose: false,
    redirectTo: null,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<DialogConfig>) => {
      state.dialog = {
        isOpen: true,
        type: action.payload.type,
        title: action.payload.title,
        description: action.payload.description,
        buttonText:
          action.payload.buttonText ||
          (action.payload.type === "success" ? "Selesai" : "Tutup"),
        autoClose: action.payload.autoClose ?? false,
        redirectTo: action.payload.redirectTo || null,
      }
    },
    closeAlert: (state) => {
      state.dialog.isOpen = false
      state.dialog.redirectTo = null
    },
  },
})

export const { openAlert, closeAlert } = uiSlice.actions
export default uiSlice.reducer
