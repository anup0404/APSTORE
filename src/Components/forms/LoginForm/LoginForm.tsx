import React, { useState, forwardRef } from "react";
import { Smartphone, Mail, User } from "lucide-react";
import { validateEmail, validateMobile } from "../../../utils/validators";
import type { Errors } from "./LoginForm.type";
import Button from "../../ui/Button";
import InputField from "../../ui/Input";
import type { loginOrRegisterPayload } from "../../../interfaces/auth/loginOrRegister";

interface LoginFormProps {
  onSubmit: (payload: loginOrRegisterPayload) => void;
}

const LoginForm = forwardRef<HTMLDivElement, LoginFormProps>(
  ({ onSubmit }, ref) => {
    const [loginMethod, setLoginMethod] = useState<"Email" | "Mobile">(
      "Mobile"
    );
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const newErrors: Errors = {
        ...(loginMethod === "Email" && { email: validateEmail(email) }),
        ...(loginMethod === "Mobile" && { mobile: validateMobile(mobile) }),
      };

      setErrors(newErrors);

      if (!newErrors.email && !newErrors.mobile) {
        console.log("Form submitted:", { email, mobile });
      }
      onSubmit({
        ...(loginMethod === "Email" && { email: email || null }),
        ...(loginMethod === "Mobile" && { phone_number: mobile || null }),
      } as loginOrRegisterPayload);
      setEmail("");
      setMobile("");
      setErrors({});
    };

    return (
      <div ref={ref} className="min-h-[260px]">
        {/* Login Method Toggle */}
        <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
          <Button
            prefixElement={<Smartphone className="w-4 h-4 inline mr-2" />}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === "Mobile"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setLoginMethod("Mobile")}
          >
            Mobile
          </Button>

          <Button
            prefixElement={<Mail className="w-4 h-4 inline mr-2" />}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === "Email"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setLoginMethod("Email")}
          >
            Email
          </Button>
        </div>

        {/* Email or Mobile login form */}
        <div className="space-y-6">
          {loginMethod === "Email" && (
            <InputField
              prefixElement={<User size={20} />}
              type="email"
              label="Email"
              placeholder="Enter your email"
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {loginMethod === "Mobile" && (
            <InputField
              type="tel"
              label="Mobile Number"
              prefixElement={<Smartphone size={20} />}
              placeholder="+91 9087654321"
              error={errors.mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          )}

          <Button
            variant="primary"
            type="button"
            className="mb-4 flex w-full justify-center"
            onClick={handleSubmit}
          >
            Send OTP
          </Button>
        </div>
      </div>
    );
  }
);

LoginForm.displayName = "LoginForm";
export default LoginForm;
