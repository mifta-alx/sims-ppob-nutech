export interface RegisterPayload {
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponseData {
  token: string
}