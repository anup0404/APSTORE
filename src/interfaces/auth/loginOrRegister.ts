export interface loginOrRegisterPayload {
  email?: string | null;
  phone_number?: string | null;
}

export interface loginOrRegisterResponse {
  token: string;
}
