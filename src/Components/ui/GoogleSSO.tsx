// components/ui/GoogleSSO/GoogleSSO.tsx
import React from "react";
import Button from "./Button";

interface GoogleSSOProps {
  mode: "login" | "register";
  onGoogleAuth: () => void;
  loading?: boolean;
  dividerText?: string;
}

export const GoogleSSO = React.forwardRef<HTMLDivElement, GoogleSSOProps>(
  ({ mode, onGoogleAuth, loading = false }, ref) => {
    const buttonText =
      mode === "login" ? "Sign in with Google" : "Sign up with Google";

    return (
      <div ref={ref} className="w-full">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            className="flex w-full justify-center"
            onClick={onGoogleAuth}
            disabled={loading}
          >
            <img src="../icons/google.svg" alt="Google" className="w-5 h-5" />
            {loading ? "Processing..." : buttonText}
          </Button>
        </div>
      </div>
    );
  }
);

GoogleSSO.displayName = "GoogleSSO";
