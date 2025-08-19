import React from "react";

interface AuthImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const AuthImage = React.forwardRef<HTMLDivElement, AuthImageProps>(
  (
    {
      src = "https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
      alt,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`hidden lg:flex w-full bg-gradient-to-br from-blue-600 to-purple-700 h-full ${className}`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20" />

          {/* Image */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 object-cover w-full h-full"
            loading="lazy"
          />

          {/* Optional content overlay */}
          <div className="relative z-10 text-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Fashion Community
            </h2>
            <p className="text-lg opacity-90">
              Discover the latest trends and connect with fashion enthusiasts
              worldwide
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AuthImage.displayName = "AuthImage";
