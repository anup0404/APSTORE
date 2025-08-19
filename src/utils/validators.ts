export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email address";
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain a special character";
  return undefined;
};

export const validateMobile = (mobile: string): string | undefined => {
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobile) return "Mobile number is required";
  if (!mobileRegex.test(mobile)) return "Enter a valid 10-digit mobile number";
  return undefined;
};
