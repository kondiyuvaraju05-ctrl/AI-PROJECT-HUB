import React, { useState } from "react";
import { User } from "../types";
import { 
  Bot, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  X,
  UserPlus,
  LogIn
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onBackToLanding?: () => void;
  initialMode?: "login" | "signup";
}

interface ToastMessage {
  id: string;
  type: "success" | "error";
  title: string;
  description: string;
}

interface AuthModalState {
  isOpen: boolean;
  type: "email_not_found" | "already_registered" | "invalid_password" | "success_register";
  title: string;
  message: string;
  emailPrefill?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onBackToLanding,
  initialMode = "login" 
}) => {
  // Navigation mode: "login" or "signup"
  const [authMode, setAuthMode] = useState<"login" | "signup">(initialMode);

  // Form Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading & Popup Modal States
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modalState, setModalState] = useState<AuthModalState>({
    isOpen: false,
    type: "email_not_found",
    title: "",
    message: "",
  });

  const addToast = (type: "success" | "error", title: string, description: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  // Handle Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !validateEmail(email)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email Address", err);
      return;
    }

    if (!password) {
      const err = "Please enter your password.";
      setFormError(err);
      addToast("error", "Password Required", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);

        // Scenario 1: Email does NOT exist in database -> Show Popup Modal
        if (res.status === 404 || data.emailNotFound) {
          setModalState({
            isOpen: true,
            type: "email_not_found",
            title: "No account found with this email address.",
            message: "Please register first to create an account.",
            emailPrefill: email.trim(),
          });
          return;
        }

        // Scenario 2: Password incorrect
        setModalState({
          isOpen: true,
          type: "invalid_password",
          title: "Invalid email address or password.",
          message: "Please check your password and try again.",
        });
        setFormError("Invalid email address or password.");
        return;
      }

      // Successful Login -> Redirect directly to Dashboard
      addToast("success", "Login Successful!", `Welcome back, ${data.user.name}! Redirecting to Dashboard...`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(data.user);
      }, 500);

    } catch (err: any) {
      setIsLoading(false);
      setFormError("Server error during login. Please try again.");
    }
  };

  // Handle Registration Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !validateEmail(email)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email Address", err);
      return;
    }

    if (!password) {
      const err = "Password is required.";
      setFormError(err);
      addToast("error", "Password Required", err);
      return;
    }

    if (password.length < 8) {
      const err = "Password must be at least 8 characters long.";
      setFormError(err);
      addToast("error", "Security Rule", err);
      return;
    }

    if (password !== confirmPassword) {
      const err = "Password and Confirm Password do not match.";
      setFormError(err);
      addToast("error", "Password Mismatch", err);
      setModalState({
        isOpen: true,
        type: "invalid_password",
        title: "Passwords Do Not Match",
        message: "Please ensure New Password and Confirm Password match exactly.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);

        // Scenario: Email is ALREADY registered -> Show Popup Modal
        if (data.alreadyRegistered) {
          setModalState({
            isOpen: true,
            type: "already_registered",
            title: "This email is already registered.",
            message: "Please log in to continue.",
            emailPrefill: email.trim(),
          });
          return;
        }

        setFormError(data.error || "Registration failed.");
        addToast("error", "Registration Failed", data.error || "Failed to create account.");
        return;
      }

      // Successful Registration -> Automatically redirect user directly to Dashboard
      addToast("success", "Registration successful.", `Welcome, ${data.user.name}! Redirecting directly to Dashboard...`);

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(data.user);
      }, 600);

    } catch (err: any) {
      setIsLoading(false);
      setFormError("Server error during registration. Please try again.");
    }
  };

  // Handle Google OAuth Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || "user.scholar@gmail.com",
          name: username || "Google User",
        }),
      });

      const data = await res.json();
      addToast("success", "Google Sign-In Successful", "Redirecting directly to Dashboard...");
      
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(data.user);
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setFormError("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F5] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Top Left Navigation Back to Landing Page */}
      {onBackToLanding && (
        <div className="absolute top-5 left-5 z-40">
          <button
            onClick={onBackToLanding}
            className="px-4 py-2 rounded-xl bg-[#2A374E] text-[#B8C9DD] hover:text-white border border-[#38475F] text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <span>← Back to Landing Page</span>
          </button>
        </div>
      )}
      
      {/* Floating Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
              toast.type === "success"
                ? "bg-[#2A374E] border-[#22C55E]/50 text-[#22C55E]"
                : "bg-[#2A374E] border-[#EF4444]/50 text-[#EF4444]"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-white mb-0.5">{toast.title}</h4>
              <p className="text-[#B8C9DD] leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#B8C9DD] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Authentication Popup Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12171F]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#2A374E] border border-[#38475F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            
            <button
              onClick={() => setModalState({ ...modalState, isOpen: false })}
              className="absolute top-4 right-4 p-1.5 text-[#B8C9DD] hover:text-white rounded-lg hover:bg-[#38475F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {modalState.type === "email_not_found" ? (
              <div className="w-16 h-16 rounded-2xl bg-[#1F98DC]/20 border border-[#1F98DC]/40 text-[#1F98DC] flex items-center justify-center mx-auto mb-4 shadow-md">
                <AlertCircle className="w-9 h-9" />
              </div>
            ) : modalState.type === "already_registered" ? (
              <div className="w-16 h-16 rounded-2xl bg-[#63A0D9]/20 border border-[#63A0D9]/40 text-[#63A0D9] flex items-center justify-center mx-auto mb-4 shadow-md">
                <ShieldCheck className="w-9 h-9" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] flex items-center justify-center mx-auto mb-4 shadow-md">
                <AlertCircle className="w-9 h-9" />
              </div>
            )}

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              {modalState.title}
            </h3>

            <p className="text-xs text-[#B8C9DD] mb-6 leading-relaxed">
              {modalState.message}
            </p>

            {/* Action Buttons inside Popup Modal */}
            {modalState.type === "email_not_found" ? (
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    if (modalState.emailPrefill) setEmail(modalState.emailPrefill);
                    setModalState({ ...modalState, isOpen: false });
                  }}
                  className="w-full py-3 px-4 bg-[#1F98DC] hover:bg-[#63A0D9] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalState({ ...modalState, isOpen: false })}
                  className="w-full py-2.5 px-4 bg-[#38475F] hover:bg-[#2A374E] text-[#B8C9DD] hover:text-white font-semibold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : modalState.type === "already_registered" ? (
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    if (modalState.emailPrefill) setEmail(modalState.emailPrefill);
                    setModalState({ ...modalState, isOpen: false });
                  }}
                  className="w-full py-3 px-4 bg-[#1F98DC] hover:bg-[#63A0D9] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Go to Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalState({ ...modalState, isOpen: false })}
                  className="w-full py-2.5 px-4 bg-[#38475F] hover:bg-[#2A374E] text-[#B8C9DD] hover:text-white font-semibold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setModalState({ ...modalState, isOpen: false })}
                className="w-full py-3 px-4 bg-[#38475F] hover:bg-[#2A374E] text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Try Again
              </button>
            )}

          </div>
        </div>
      )}

      {/* Branding Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1F98DC] text-white shadow-xl mb-4 border border-[#63A0D9]">
          <Bot className="w-9 h-9" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12171F] tracking-tight">
          AI Project Hub
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6A7788] max-w-sm mx-auto font-medium">
          Comprehensive AI Documentation Platform & Research System
        </p>
      </div>

      {/* Auth Card - `#FFFFFF` background with `#E5E7EB` border */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-[#E5E7EB]">
          
          {/* Mode Switch Tabs */}
          <div className="flex bg-[#F1F2F5] p-1 rounded-2xl mb-6 border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setFormError("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                authMode === "login"
                  ? "bg-[#1F98DC] text-white shadow-xs"
                  : "text-[#6A7788] hover:text-[#12171F]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setFormError("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                authMode === "signup"
                  ? "bg-[#1F98DC] text-white shadow-xs"
                  : "text-[#6A7788] hover:text-[#12171F]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-5 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
              <span>{formError}</span>
            </div>
          )}

          {/* Form Section */}
          {authMode === "login" ? (
            /* ================= LOGIN FORM ================= */
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              {/* Email Address field */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              {/* Password field with Show/Hide Toggle */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6A7788] hover:text-[#12171F] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Link below Login Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setFormError("");
                  }}
                  className="text-xs text-[#1F98DC] hover:text-[#63A0D9] font-medium transition-colors cursor-pointer"
                >
                  Don't have an account? <span className="font-bold underline">Register</span>
                </button>
              </div>
            </form>
          ) : (
            /* ================= REGISTRATION FORM ================= */
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              {/* Username field */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              {/* Email Address field */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              {/* New Password field */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6A7788] hover:text-[#12171F] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6A7788] hover:text-[#12171F] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Register Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Link below Register Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setFormError("");
                  }}
                  className="text-xs text-[#1F98DC] hover:text-[#63A0D9] font-medium transition-colors cursor-pointer"
                >
                  Already have an account? <span className="font-bold underline">Log In</span>
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-[#FFFFFF] px-3 text-[#6A7788] font-semibold tracking-wider">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Authentication Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#12171F] bg-[#FFFFFF] hover:bg-[#F1F2F5] flex items-center justify-center gap-3 transition-all cursor-pointer hover:border-[#63A0D9] shadow-xs group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
