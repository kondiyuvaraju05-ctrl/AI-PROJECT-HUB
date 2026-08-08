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
  Send,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck
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
  // Navigation tab state: "login" | "register" | "otp"
  const [activeTab, setActiveTab] = useState<"login" | "register" | "otp">(
    initialMode === "signup" ? "register" : "login"
  );

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // OTP Auth States
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"request" | "verify">("request");
  const [simulatedOtpCode, setSimulatedOtpCode] = useState<string | null>(null);

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
    }, 4500);
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
    setActiveTab("register");
    addToast("info", "Registration Tab Ready", `Pre-filled email: ${emailToUse}`);
  };

  // Handle Standard Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

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
        // If email is not found in database -> Show Pop-up Modal to Register
        if (res.status === 404 || data.emailNotFound) {
          setUnregisteredEmailAttempt(emailClean);
          setShowUnregisteredModal(true);
          return;
        }

        // Incorrect password or other error
        const errMsg = data.error || data.message || "Invalid credentials. Please try again.";
        setFormError(errMsg);
        addToast("error", "Login Failed", errMsg);
        return;
      }

      // Login Successful
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

      // Registration Successful -> Store session and proceed to Dashboard
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

  // Handle OTP Code Request
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError("");

    const targetEmail = otpEmail.trim();
    if (!targetEmail || !validateEmail(targetEmail)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setFormError(data.error || "Failed to send OTP code.");
        addToast("error", "OTP Failed", data.error || "Failed to send code.");
        return;
      }

      setOtpStep("verify");
      setSimulatedOtpCode(data.otpSimulatedCode || null);
      addToast("success", "OTP Sent!", `Verification code sent to ${targetEmail}`);
    } catch (err: any) {
      setIsLoading(false);
      setFormError("Server error requesting OTP code.");
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      const err = "Please enter the 6-digit OTP code.";
      setFormError(err);
      addToast("error", "OTP Code Required", err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim(), otpCode: otpCode.trim() }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setFormError(data.error || "Invalid OTP code.");
        addToast("error", "Verification Failed", data.error || "Invalid code.");
        return;
      }

      if (data.token) {
        localStorage.setItem("ai_hub_token", data.token);
      }
      addToast("success", "OTP Verified!", `Authenticated as ${data.user.email}`);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setIsLoading(false);
      setFormError("Server error verifying OTP code.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Left Navigation Back to Landing Page */}
      {onBackToLanding && (
        <div className="absolute top-6 left-6 z-40">
          <button
            onClick={onBackToLanding}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 transition-all duration-300 transform translate-y-0 backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-slate-800/95 border-emerald-500/40 text-emerald-400"
                : toast.type === "info"
                ? "bg-slate-800/95 border-blue-500/40 text-blue-400"
                : "bg-slate-800/95 border-rose-500/40 text-rose-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === "info" ? (
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-white mb-0.5">{toast.title}</h4>
              <p className="text-slate-300 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Alert Modal for Unregistered Users */}
      {showUnregisteredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            
            <button
              onClick={() => setShowUnregisteredModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Account Not Found</h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              The email address <span className="font-semibold text-blue-400">{unregisteredEmailAttempt}</span> was not found in our user database. 
              <br className="hidden sm:inline" />
              You must register an account first before logging in.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleTransferToRegister(unregisteredEmailAttempt)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Now</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowUnregisteredModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer border border-slate-700"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20 mb-4 border border-blue-400/30">
          <Bot className="w-9 h-9" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Project Hub
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto font-medium">
          Comprehensive AI Documentation Platform & Workspace
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800">
          
          {/* Navigation Tab Header */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setFormError("");
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "login"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
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
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "register"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{formError}</span>
            </div>
          )}

          {/* LOGIN TAB */}
          {activeTab === "login" && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("otp")}
                    className="text-[11px] text-blue-400 hover:underline font-medium"
                  >
                    Forgot or use OTP?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
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

              <div className="pt-3 text-center border-t border-slate-800/80 mt-4">
                <p className="text-xs text-slate-400">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("register");
                      setFormError("");
                    }}
                    className="font-bold text-blue-400 hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* REGISTER TAB */}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name / Username
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password (min. 8 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
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

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-center">
                <p className="text-[11px] text-slate-400 leading-relaxed flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Your account details are securely stored in the database.</span>
                </p>
              </div>
            </form>
          )}

          {/* OTP TAB */}
          {activeTab === "otp" && (
            <div>
              {otpStep === "request" ? (
                <form className="space-y-4" onSubmit={handleRequestOtp}>
                  <div className="text-center mb-2">
                    <h3 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                      <KeyRound className="w-4 h-4 text-blue-400" />
                      <span>Passwordless OTP Login</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your email to receive a 6-digit verification code.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Verification Code</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleVerifyOtp}>
                  <div className="text-center mb-2">
                    <h3 className="text-sm font-bold text-white">Enter Verification Code</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Sent 6-digit code to <span className="font-bold text-white">{otpEmail}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpStep("request")}
                      className="text-[11px] text-blue-400 hover:underline mt-1 font-semibold cursor-pointer"
                    >
                      Change Email
                    </button>
                  </div>

                  {simulatedOtpCode && (
                    <div className="p-3 border border-blue-500/30 bg-blue-500/10 rounded-2xl text-center">
                      <div className="text-[11px] font-bold text-slate-300 flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>Demo OTP Code</span>
                      </div>
                      <div className="text-xl font-black tracking-widest text-blue-400 my-1 font-mono">
                        {simulatedOtpCode}
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpCode(simulatedOtpCode)}
                        className="text-[10px] font-bold px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
                      >
                        Auto-Fill Code
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      6-Digit Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-2.5 text-base font-mono tracking-widest bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Verify & Continue</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="text-center pt-3 border-t border-slate-800/80 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setFormError("");
                  }}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  ← Back to standard Sign In
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
