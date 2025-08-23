// import React, { useState, forwardRef } from "react";
// import { Smartphone, Mail, User } from "lucide-react";
// import { validateEmail, validateMobile } from "../../../utils/validators";
// import type { Errors } from "./LoginForm.type";
// import Button from "../../ui/Button";
// import InputField from "../../ui/Input";
// import type { loginOrRegisterPayload } from "../../../interfaces/auth/loginOrRegister";

// interface LoginFormProps {
//   onSubmit: (payload: loginOrRegisterPayload) => void;
// }

// const LoginForm = forwardRef<HTMLDivElement, LoginFormProps>(
//   ({ onSubmit }, ref) => {
//     const [loginMethod, setLoginMethod] = useState<"Email" | "Mobile">(
//       "Mobile"
//     );
//     const [mobile, setMobile] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [errors, setErrors] = useState<Errors>({});

//     const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();

//       const newErrors: Errors = {
//         ...(loginMethod === "Email" && { email: validateEmail(email) }),
//         ...(loginMethod === "Mobile" && { mobile: validateMobile(mobile) }),
//       };

//       setErrors(newErrors);

//       if (!newErrors.email && !newErrors.mobile) {
//         console.log("Form submitted:", { email, mobile });
//       }
//       onSubmit({
//         ...(loginMethod === "Email" && { email: email || null }),
//         ...(loginMethod === "Mobile" && { phone_number: mobile || null }),
//       } as loginOrRegisterPayload);
//       setEmail("");
//       setMobile("");
//       setErrors({});
//     };

//     return (
//       <div ref={ref} className="min-h-[260px]">
//         {/* Login Method Toggle */}
//         <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
//           <Button
//             prefixElement={<Smartphone className="w-4 h-4 inline mr-2" />}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//               loginMethod === "Mobile"
//                 ? "bg-white text-gray-900 shadow-sm"
//                 : "text-gray-600 hover:text-gray-900"
//             }`}
//             onClick={() => setLoginMethod("Mobile")}
//           >
//             Mobile
//           </Button>

//           <Button
//             prefixElement={<Mail className="w-4 h-4 inline mr-2" />}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//               loginMethod === "Email"
//                 ? "bg-white text-gray-900 shadow-sm"
//                 : "text-gray-600 hover:text-gray-900"
//             }`}
//             onClick={() => setLoginMethod("Email")}
//           >
//             Email
//           </Button>
//         </div>

//         {/* Email or Mobile login form */}
//         <div className="space-y-6">
//           {loginMethod === "Email" && (
//             <InputField
//               prefixElement={<User size={20} />}
//               type="email"
//               label="Email"
//               placeholder="Enter your email"
//               error={errors.email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           )}

//           {loginMethod === "Mobile" && (
//             <InputField
//               type="tel"
//               label="Mobile Number"
//               className="font-secondary"
//               prefixElement={<Smartphone size={20} />}
//               placeholder="+91 9087654321"
//               error={errors.mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />
//           )}

//           <Button
//             variant="primary"
//             type="button"
//             className="mb-4 flex w-full justify-center"
//             onClick={handleSubmit}
//           >
//             Send OTP
//           </Button>
//         </div>
//       </div>
//     );
//   }
// );

// LoginForm.displayName = "LoginForm";
// export default LoginForm;

// LoginForm component
const LoginForm = forwardRef(({ onSubmit }, ref) => {
  const [loginMethod, setLoginMethod] = useState("Mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [customCountryCode, setCustomCountryCode] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {
      ...(loginMethod === "Email" && { email: validateEmail(email) }),
      ...(loginMethod === "Mobile" && {
        mobile: validateMobile(mobile, countryCode),
      }),
    };

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.mobile) {
      const finalCountryCode = customCountryCode || countryCode;
      onSubmit({
        ...(loginMethod === "Email" && { email: email || null }),
        ...(loginMethod === "Mobile" && {
          phone_number:
            `${finalCountryCode}${mobile.replace(/\D/g, "")}` || null,
        }),
      });

      setEmail("");
      setMobile("");
      setCustomCountryCode("");
      setErrors({});
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d\s\-\(\)]/g, "");
    setMobile(cleaned);
  };

  const handleCountryCodeChange = (e) => {
    let value = e.target.value;
    if (value && !value.startsWith("+")) {
      value = "+" + value;
    }
    setCustomCountryCode(value);
    setCountryCode(value);
  };

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="space-y-8 relative"
      noValidate
    >
      {/* Login method toggles */}
      <div className="flex border-b border-gray-200 mb-6">
        {["Mobile", "Email"].map((method) => (
          <button
            key={method}
            type="button"
            className={`flex-1 pb-6 text-sm font-light tracking-[0.2em] uppercase transition-all duration-500 ${
              loginMethod === method
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setLoginMethod(method)}
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            {method === "Mobile" ? (
              <Smartphone className="w-4 h-4 inline mr-3" />
            ) : (
              <Mail className="w-4 h-4 inline mr-3" />
            )}
            {method}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {loginMethod === "Email" && (
          <LuxuryInput
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefixElement={<User className="w-5 h-5" />}
            error={errors.email}
          />
        )}

        {loginMethod === "Mobile" && (
          <div className="relative">
            {/* Country Code Selector */}
            <div ref={dropdownRef} className="absolute left-0 top-4 z-30">
              <div className="relative flex items-center cursor-pointer select-none">
                <input
                  type="text"
                  value={customCountryCode || countryCode}
                  onChange={handleCountryCodeChange}
                  onFocus={() => setIsCountryDropdownOpen(true)}
                  className="w-20 text-sm font-light bg-transparent border border-gray-300 rounded-md px-2 py-1 mr-2 focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="+91"
                  aria-label="Country code input"
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  aria-expanded={isCountryDropdownOpen}
                  aria-haspopup="listbox"
                  aria-label="Toggle country dropdown"
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isCountryDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {isCountryDropdownOpen && (
                <div
                  role="listbox"
                  tabIndex={-1}
                  className="absolute top-full left-0 mt-1 max-h-64 w-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
                >
                  {/* Search Input */}
                  <div className="p-2">
                    <input
                      type="search"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search countries"
                      autoFocus
                    />
                  </div>

                  {/* Country List */}
                  <ul className="max-h-48 overflow-auto" role="list">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <li
                          key={country.code + country.country}
                          role="option"
                          tabIndex={0}
                          onClick={() => {
                            setCountryCode(country.code);
                            setCustomCountryCode("");
                            setIsCountryDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setCountryCode(country.code);
                              setCustomCountryCode("");
                              setIsCountryDropdownOpen(false);
                              setSearchQuery("");
                            }
                          }}
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center space-x-3 text-sm"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="ml-auto text-gray-600">
                            {country.code}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-6 text-center text-gray-500 text-sm select-none">
                        No countries found. You can type a custom code above.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="tel"
              value={mobile}
              onChange={handleMobileChange}
              className="peer w-full bg-transparent border-0 border-b border-gray-300 pl-24 pr-0 py-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-black transition-colors duration-500 font-light tracking-[0.05em]"
              placeholder=" "
              id="mobile"
              aria-label="Mobile number input"
            />
            <label
              htmlFor="mobile"
              className="absolute left-24 top-4 text-gray-500 transform transition-all duration-500 origin-left pointer-events-none font-light tracking-[0.1em] text-xs uppercase peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:scale-75 peer-focus:text-black"
            >
              Mobile Number
            </label>
            {errors.mobile && (
              <p
                className="text-red-500 text-xs mt-3 font-light tracking-[0.1em] uppercase"
                aria-live="assertive"
              >
                {errors.mobile}
              </p>
            )}
          </div>
        )}

        <LuxuryButton type="submit" className="w-full py-4 mt-8">
          Send Verification Code
        </LuxuryButton>
      </div>
    </form>
  );
});
LoginForm.displayName = "LoginForm";

export default LoginForm;
