import { Mail, Smartphone, User } from "lucide-react";
import { forwardRef, useState } from "react";
import type {
  FormErrors,
  loginOrRegisterPayload,
} from "../../../interfaces/auth/loginOrRegister";
import { validateEmail, validateMobile } from "../../../utils/validators";
import AuthInput from "../../ui/AuthInput";
import AuthButton from "../../ui/LuxuryButton";

interface LoginFormProps {
  onSubmit: (payload: loginOrRegisterPayload) => void;
}

const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(
  ({ onSubmit }, ref) => {
    const [loginMethod, setLoginMethod] = useState("Mobile");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode] = useState("+91"); // Fixed to India only
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const formErrors: FormErrors = {
        ...(loginMethod === "Email" && {
          email: validateEmail(email) || undefined,
        }),
        ...(loginMethod === "Mobile" && {
          mobile: validateMobile(mobile) || undefined,
        }),
      };

      setErrors(formErrors);

      if (!formErrors.email && !formErrors.mobile) {
        const payload: loginOrRegisterPayload = {
          ...(loginMethod === "Email" && { email: email || null }),
          ...(loginMethod === "Mobile" && {
            phone_number: `${countryCode}${mobile.replace(/\D/g, "")}` || null,
          }),
        };
        console.log("inside form", payload);

        onSubmit(payload);

        setEmail("");
        setMobile("");
        setErrors({});
      }
    };

    const handleMobileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const value: string = e.target.value;
      const cleaned: string = value.replace(/[^\d\s\-()]/g, "");
      setMobile(cleaned);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="space-y-6 sm:space-y-8 relative"
        noValidate
      >
        {/* Login method toggles */}
        <div className="flex border-b border-gray-200 mb-4 sm:mb-6">
          {["Mobile", "Email"].map((method) => (
            <button
              key={method}
              type="button"
              className={`flex-1 pb-4 sm:pb-6 text-xs sm:text-sm font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 ${
                loginMethod === method
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setLoginMethod(method)}
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {method === "Mobile" ? (
                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2 sm:mr-3" />
              ) : (
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2 sm:mr-3" />
              )}
              {method}
            </button>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          {loginMethod === "Email" && (
            <AuthInput
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              prefixElement={<User className="w-4 h-4 sm:w-5 sm:h-5" />}
              error={errors.email}
              placeholder="Enter your email address"
            />
          )}

          {loginMethod === "Mobile" && (
            <div className="relative">
              <AuthInput
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                prefixElement={<Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />}
                error={errors.mobile}
                placeholder="Enter your mobile number"
              />
            </div>
          )}

          <AuthButton
            type="submit"
            className="w-full py-3 sm:py-4 mt-6 sm:mt-8"
          >
            <span className="text-sm sm:text-base">Send Verification Code</span>
          </AuthButton>
        </div>
      </form>
    );
  }
);
LoginForm.displayName = "LoginForm";

export default LoginForm;
