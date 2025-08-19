export const setToken = (token: string) =>
  localStorage.setItem("auth_token", token);

export const getToken = (): string | null => {
  const token = localStorage.getItem("auth_token");
  return token;
};

export const clearToken = () => localStorage.removeItem("auth_token");
