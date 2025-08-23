import React from "react";
import { AuthImage } from "../Components/ui/AuthImage";
import LoginForm from "../Components/forms/LoginForm/LoginForm";
import { GoogleSSO } from "../Components/ui/GoogleSSO";
import { loginOrRegisterUser } from "../services/api/services/auth.service";
import type { loginOrRegisterPayload } from "../interfaces/auth/loginOrRegister";

const AuthPage: React.FC = () => {
  // const handleGoogleAuth = () => {
  //     console.log("Google authentication triggered");
  //     // Implement Google SSO logic here
  // };

  const handleLoginOrRegister = async (payload: loginOrRegisterPayload) => {
    console.log("Login/Register payload:", payload);
    try {
      const response = await loginOrRegisterUser(payload);
      console.log("Login/Register response:", response);
    } catch (error) {
      console.error("Login/Register error:", error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left side - only visible on large screens */}
      <div className="hidden lg:block lg:w-1/2 ">
        <AuthImage alt="logo" />
      </div>

      {/* Right side */}
      <div className="flex flex-col items-start  w-full lg:w-1/2 p-6 sm:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center my-6">
            <div className="bg-black w-12 h-12 inline-flex items-center justify-center rounded-lg mb-4 mx-auto">
              <span className="text-white font-bold text-lg">AP</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">
              Welcome Back!
            </h1>
            <p className="font-body text-gray-600 text-sm">
              Login or Register to your fashion account
            </p>
          </div>

          {/* Login form */}
          <LoginForm onSubmit={handleLoginOrRegister} />

          {/* Google login */}
          <GoogleSSO mode="login" onGoogleAuth={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
