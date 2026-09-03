import React, { useState, useEffect } from "react";
import { User } from "../types";
import { 
  Bot, 
  Mail, 
  Lock,
  User as UserIcon,
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  X,
  LogIn,
  UserPlus,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Check
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onBackToLanding?: () => void;
  initialMode?: "login" | "signup";
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onBackToLanding,
  initialMode = "login"
}) => {
  // Navigation mode: "login" | "register" | "forgot_email" | "forgot_password"
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot_email" | "forgot_password">(
    initialMode === "signup" ? "register" : "login"
  );

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState<string | null>(null);

  // Register Form State
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Forgot Password Flow States
  const [forgotEmail, setForgotEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [verifiedUserName, setVerifiedUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI & Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Pop-up Modal State for Unregistered Users
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const [unregisteredEmailAttempt, setUnregisteredEmailAttempt] = useState("");

  useEffect(() => {
    if (initialMode === "signup") {
      setActiveTab("register");
    }
  }, [initialMode]);

  const addToast = (type: "success" | "error" | "info", title: string, description: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  // Switch to Register tab and pre-fill email
  const handleTransferToRegister = (emailToUse: string) => {
    setShowUnregisteredModal(false);
    setRegisterEmail(emailToUse);
    setFormError("");
    setLoginSuccessMsg(null);
    setActiveTab("register");
    addToast("info", "Registration Ready", `Pre-filled email: ${emailToUse}`);
  };

  // Handle Standard Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoginSuccessMsg(null);

    const emailClean = loginEmail.trim();
    if (!emailClean || !validateEmail(emailClean)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email", err);
      return;
    }

    if (!loginPassword) {
      const err = "Please enter your password.";
      setFormError(err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailClean, password: loginPassword }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        if (res.status === 404 || data.emailNotFound) {
          setUnregisteredEmailAttempt(emailClean);
          setShowUnregisteredModal(true);
          return;
        }

        const errMsg = data.error || data.message || "Invalid credentials. Please try again.";
        setFormError(errMsg);
        addToast("error", "Login Failed", errMsg);
        return;
      }

      if (data.token) {
        localStorage.setItem("ai_hub_token", data.token);
      }
      addToast("success", "Login Successful!", `Welcome back, ${data.user.name || data.user.email}`);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setIsLoading(false);
      const msg = "Network error while logging in. Please ensure the dev server is running.";
      setFormError(msg);
      addToast("error", "Connection Error", msg);
    }
  };

  // Handle User Registration Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoginSuccessMsg(null);

    const emailClean = registerEmail.trim();
    const usernameClean = registerUsername.trim();

    if (!emailClean || !validateEmail(emailClean)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email", err);
      return;
    }

    if (registerPassword.length < 8) {
      const err = "Password must be at least 8 characters long.";
      setFormError(err);
      addToast("error", "Short Password", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameClean || emailClean.split("@")[0],
          email: emailClean,
          password: registerPassword,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        if (res.status === 409 || data.alreadyRegistered) {
          setFormError("This email is already registered in the database. Please log in.");
          addToast("info", "Already Registered", "Account exists in database. Please log in instead.");
          setLoginEmail(emailClean);
          return;
        }

        const errMsg = data.error || "Registration failed. Please try again.";
        setFormError(errMsg);
        addToast("error", "Registration Error", errMsg);
        return;
      }

      if (data.token) {
        localStorage.setItem("ai_hub_token", data.token);
      }
      addToast("success", "Account Created & Saved!", `Stored in database. Redirecting to Dashboard...`);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setIsLoading(false);
      const msg = "Server error during registration. Please try again.";
      setFormError(msg);
      addToast("error", "Server Error", msg);
    }
  };

  // Handle Step 1: Verify Email in Database for Password Reset
  const handleVerifyEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const targetEmail = forgotEmail.trim();
    if (!targetEmail || !validateEmail(targetEmail)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        if (res.status === 404 || data.emailNotFound) {
          const notFoundMsg = "This email is not registered in our database. Please check your email or register a new account.";
          setFormError(notFoundMsg);
          addToast("error", "Account Not Found", notFoundMsg);
          return;
        }

        const errMsg = data.error || "Failed to verify email in database.";
        setFormError(errMsg);
        addToast("error", "Verification Error", errMsg);
        return;
      }

      setVerifiedEmail(data.email || targetEmail);
      setVerifiedUserName(data.name || "");
      setNewPassword("");
      setConfirmPassword("");
      setFormError("");
      setActiveTab("forgot_password");
      addToast("success", "Email Verified in Database!", `Account found for ${data.email}. Please create your new password.`);
    } catch (err: any) {
      setIsLoading(false);
      const msg = "Network error verifying email. Please check server connection.";
      setFormError(msg);
      addToast("error", "Connection Error", msg);
    }
  };

  // Handle Step 2: Set New Password & Update in Database
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!newPassword || newPassword.length < 8) {
      const err = "New password must be at least 8 characters long.";
      setFormError(err);
      addToast("error", "Short Password", err);
      return;
    }

    if (newPassword !== confirmPassword) {
      const err = "New password and Confirm password do not match. Please re-enter.";
      setFormError(err);
      addToast("error", "Password Mismatch", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verifiedEmail,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        const errMsg = data.error || "Failed to update password in database.";
        setFormError(errMsg);
        addToast("error", "Reset Failed", errMsg);
        return;
      }

      setLoginEmail(verifiedEmail);
      setLoginPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoginSuccessMsg("✓ Password updated successfully in database! Please sign in with your new password.");
      setActiveTab("login");
      addToast(
        "success",
        "Password Updated!",
        "Your password has been changed in the database. Please sign in with your new password."
      );
    } catch (err: any) {
      setIsLoading(false);
      const msg = "Network error updating password. Please try again.";
      setFormError(msg);
      addToast("error", "Connection Error", msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#2A374E] text-white flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#1F98DC] selection:text-white">
      
      {/* Top Left Navigation Back to Landing Page */}
      {onBackToLanding && (
        <div className="absolute top-6 left-6 z-40">
          <button
            onClick={onBackToLanding}
            className="px-4 py-2 rounded-xl bg-[#38475F] hover:bg-[#38475F]/80 text-[#B8C9DD] hover:text-white border border-[#63A0D9]/30 text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 transition-all duration-300 backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-[#2A374E]/95 border-[#22C55E]/40 text-[#22C55E]"
                : toast.type === "info"
                ? "bg-[#2A374E]/95 border-[#1F98DC]/40 text-[#1F98DC]"
                : "bg-[#2A374E]/95 border-[#EF4444]/40 text-[#EF4444]"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            ) : toast.type === "info" ? (
              <ShieldCheck className="w-5 h-5 text-[#1F98DC] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-white mb-0.5">{toast.title}</h4>
              <p className="text-[#B8C9DD] leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Alert Modal for Unregistered Users */}
      {showUnregisteredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12171F]/80 backdrop-blur-md">
          <div className="bg-[#2A374E] border border-[#38475F] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            
            <button
              onClick={() => setShowUnregisteredModal(false)}
              className="absolute top-4 right-4 p-2 text-[#B8C9DD] hover:text-white rounded-full hover:bg-[#38475F] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Account Not Found</h3>
            
            <p className="text-xs text-[#B8C9DD] leading-relaxed mb-6">
              The email address <span className="font-semibold text-[#1F98DC]">{unregisteredEmailAttempt}</span> was not found in our user database. 
              <br className="hidden sm:inline" />
              You must register an account first before logging in.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleTransferToRegister(unregisteredEmailAttempt)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1F98DC] hover:bg-[#63A0D9] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Now</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowUnregisteredModal(false)}
                className="py-3 px-4 rounded-xl bg-[#38475F] hover:bg-[#38475F]/80 text-[#B8C9DD] hover:text-white font-semibold text-xs transition-colors cursor-pointer border border-[#38475F]"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1F98DC] text-white shadow-xl mb-4">
          <Bot className="w-9 h-9" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Project Hub
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#B8C9DD] max-w-sm mx-auto font-medium">
          Comprehensive AI Documentation Platform & Workspace
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-[#2A374E] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#38475F]">
          
          {/* Navigation Tab Header */}
          {(activeTab === "login" || activeTab === "register") && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#38475F]/70 rounded-2xl border border-[#38475F] mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setFormError("");
                }}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "login"
                    ? "bg-[#1F98DC] text-white shadow-md"
                    : "text-[#B8C9DD] hover:text-white hover:bg-[#38475F]"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setFormError("");
                  setLoginSuccessMsg(null);
                }}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "register"
                    ? "bg-[#1F98DC] text-white shadow-md"
                    : "text-[#B8C9DD] hover:text-white hover:bg-[#38475F]"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>
          )}

          {/* Success Banner */}
          {loginSuccessMsg && activeTab === "login" && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-start gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E] mt-0.5" />
              <span className="leading-relaxed font-medium text-white">{loginSuccessMsg}</span>
            </div>
          )}

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444] text-xs flex items-start gap-2.5 shadow-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444] mt-0.5" />
              <span className="leading-relaxed font-medium text-white">{formError}</span>
            </div>
          )}

          {/* 1. LOGIN TAB */}
          {activeTab === "login" && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#B8C9DD]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setFormError("");
                      setLoginSuccessMsg(null);
                      setActiveTab("forgot_email");
                    }}
                    className="text-[11px] text-[#1F98DC] hover:text-[#63A0D9] hover:underline font-semibold cursor-pointer transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>

              <div className="pt-3 text-center border-t border-[#38475F] mt-4">
                <p className="text-xs text-[#B8C9DD]">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("register");
                      setFormError("");
                      setLoginSuccessMsg(null);
                    }}
                    className="font-bold text-[#1F98DC] hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 2. REGISTER TAB */}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                  Full Name / Username
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                  Password (min. 8 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account & Saving...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register & Go to Dashboard</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-[#38475F]/60 rounded-xl border border-[#38475F] text-center">
                <p className="text-[11px] text-[#B8C9DD] leading-relaxed flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>Your account details are securely stored in the database.</span>
                </p>
              </div>

              <div className="pt-2 text-center border-t border-[#38475F] mt-2">
                <p className="text-xs text-[#B8C9DD]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("login");
                      setFormError("");
                    }}
                    className="font-bold text-[#1F98DC] hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 3. FORGOT PASSWORD - STEP 1: VERIFY EMAIL */}
          {activeTab === "forgot_email" && (
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#38475F]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1F98DC] text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </div>
                  <span className="text-xs font-bold text-white">Verify Email</span>
                </div>
                <div className="w-8 h-0.5 bg-[#38475F]" />
                <div className="flex items-center gap-2 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-[#38475F] text-[#B8C9DD] text-[11px] font-bold flex items-center justify-center">
                    2
                  </div>
                  <span className="text-xs font-medium text-[#B8C9DD]">Set Password</span>
                </div>
              </div>

              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#1F98DC]/20 border border-[#63A0D9]/30 text-[#1F98DC] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Reset Account Password</h3>
                <p className="text-xs text-[#B8C9DD] mt-1">
                  Enter your registered email address to verify your account in the database.
                </p>
              </div>

              <form onSubmit={handleVerifyEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Checking Database...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Email in Database</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center border-t border-[#38475F]">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("login");
                      setFormError("");
                    }}
                    className="text-xs font-semibold text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. FORGOT PASSWORD - STEP 2: SET NEW PASSWORD */}
          {activeTab === "forgot_password" && (
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#38475F]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#22C55E] text-white text-[11px] font-bold flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-[#22C55E]">Email Verified</span>
                </div>
                <div className="w-8 h-0.5 bg-[#1F98DC]" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1F98DC] text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </div>
                  <span className="text-xs font-bold text-white">New Password</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#38475F]/60 border border-[#38475F] rounded-2xl mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-[#B8C9DD] uppercase tracking-wider block font-semibold">Account Verified</span>
                  <span className="text-xs font-bold text-white truncate block">{verifiedEmail}</span>
                </div>
              </div>

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                    New Password (min. 8 characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B8C9DD] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#B8C9DD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#38475F] border border-[#63A0D9]/30 rounded-xl text-white placeholder-[#B8C9DD] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving New Password...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Update Password & Sign In</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center border-t border-[#38475F]">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("forgot_email");
                      setFormError("");
                    }}
                    className="text-xs font-semibold text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
                  >
                    ← Verify a different email
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
