export interface loginOrRegisterPayload {
  email?: string | null;
  phone_number?: string | null;
}

export interface loginOrRegisterResponse {
  token: string;
}

export interface FormErrors {
  email?: string;
  mobile?: string;
}

export type LoginMethod = "Email" | "Mobile";
