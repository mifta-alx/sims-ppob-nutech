import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DialogConfig {
  type: "success" | "error"
  title: string
  description: string
  buttonText?: string
  autoClose?: boolean
  redirectTo?: string
  timeout?: number
  showStatus?: boolean
  invert?: boolean
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
    timeout?: number
    showStatus?: boolean
    invert?: boolean
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
    timeout: 1500,
    showStatus: false,
    invert: false,
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
        timeout: action.payload.timeout || 1500,
        showStatus: action.payload.showStatus ?? false,
        invert: action.payload.invert ?? false,
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
