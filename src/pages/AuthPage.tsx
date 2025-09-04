import React from "react";
import { AuthImage } from "../Components/ui/AuthImage";
import LoginForm from "../Components/forms/LoginForm/LoginForm";
import { GoogleSSO } from "../Components/ui/GoogleSSO";
import type { loginOrRegisterPayload } from "../interfaces/auth/loginOrRegister";
import { LOGO_NAME } from "../constants/global.constant";
import { useLoginOrRegisterMutation } from "../store/api/authApi";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [loginOrRegister] = useLoginOrRegisterMutation();
  const navigate = useNavigate();

  const handleLoginOrRegister = async (payload: loginOrRegisterPayload) => {
    console.log("Login/Register payload:", payload);

    try {
      const response = await loginOrRegister(payload).unwrap();
      console.log("Login/Register response:", response);
      navigate("/otp-verification");
    } catch (error) {
      console.error("Login/Register error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Auth Image) */}
      <div className="hidden lg:flex lg:w-1/2 h-full">
        <div className="relative w-full h-full">
          <AuthImage
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Right Side (Auth Content) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 relative">
        {/* Subtle Texture Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-5.5 0c0-8.008-6.492-14.5-14.5-14.5s-14.5 6.492-14.5 14.5 6.492 14.5 14.5 14.5 14.5-6.492 14.5-14.5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="w-full max-w-md mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Brand Logo */}
            <div className="mb-6">
              <span className="font-serif text-2xl sm:text-3xl font-light text-gray-900 tracking-[0.25em] relative">
                {LOGO_NAME}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
              </span>
            </div>

            {/* Welcome Text */}
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-3">
              Welcome Back
            </h1>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-gray-300" />
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-gray-300" />
            </div>
            <p className="font-light text-gray-600 text-sm sm:text-base leading-relaxed">
              Access your exclusive fashion sanctuary
            </p>
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <LoginForm onSubmit={handleLoginOrRegister} />
          </div>

          {/* Google Login */}
          <GoogleSSO
            mode="login"
            onGoogleAuth={() => {}}
            className="w-full py-3 sm:py-4 mt-6 sm:mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
