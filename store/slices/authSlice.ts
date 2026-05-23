import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserProfile {
  email: string
  first_name: string
  last_name: string
  profile_image: string
}

interface AuthState {
  token: string | null
  profile: UserProfile | null
  balance: number | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  profile: null,
  balance: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    },
    logout(state) {
      state.token = null
      state.profile = null
      state.balance = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, setProfile, setBalance, logout } =
  authSlice.actions
export default authSlice.reducer
