export interface ProfileResponseData {
  email: string
  first_name: string
  last_name: string
  profile_image: string
}

export interface UpdateProfilePayload {
  first_name: string
  last_name: string
}