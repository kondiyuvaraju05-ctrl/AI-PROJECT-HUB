import React, { useState } from "react";
import { User } from "../types";
import { 
  Bot, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  X,
  LogIn,
  KeyRound,
  Send,
  Sparkles
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onBackToLanding?: () => void;
  initialMode?: string;
}

interface ToastMessage {
  id: string;
  type: "success" | "error";
  title: string;
  description: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  onBackToLanding 
}) => {
  // OTP Auth States
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"request" | "verify">("request");
  const [simulatedOtpCode, setSimulatedOtpCode] = useState<string | null>(null);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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

  // Handle OTP Generation Request
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError("");

    const targetEmail = otpEmail.trim();
    if (!targetEmail || !validateEmail(targetEmail)) {
      const err = "Please enter a valid email address.";
      setFormError(err);
      addToast("error", "Invalid Email Address", err);
      return;
    }

    setIsOtpLoading(true);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      setIsOtpLoading(false);

      if (!res.ok) {
        setFormError(data.error || "Failed to send OTP code.");
        addToast("error", "OTP Request Failed", data.error || "Failed to send OTP code.");
        return;
      }

      setOtpStep("verify");
      setSimulatedOtpCode(data.otpSimulatedCode || null);
      addToast("success", "OTP Code Sent!", `6-digit verification code sent to ${targetEmail}`);
    } catch (err: any) {
      setIsOtpLoading(false);
      setFormError("Server error requesting OTP code. Please try again.");
    }
  };

  // Handle OTP Verification & Login
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      const err = "Please enter the 6-digit OTP code.";
      setFormError(err);
      addToast("error", "OTP Code Required", err);
      return;
    }

    setIsOtpLoading(true);

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim(), otpCode: otpCode.trim() }),
      });

      const data = await res.json();
      setIsOtpLoading(false);

      if (!res.ok) {
        setFormError(data.error || "Invalid OTP code.");
        addToast("error", "OTP Verification Failed", data.error || "Invalid OTP code.");
        return;
      }

      if (data.token) {
        localStorage.setItem("ai_hub_token", data.token);
      }
      addToast("success", "OTP Verified!", `Authenticated as ${data.user.email}`);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setIsOtpLoading(false);
      setFormError("Server error verifying OTP code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F5] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Top Left Navigation Back to Landing Page */}
      {onBackToLanding && (
        <div className="absolute top-5 left-5 z-40">
          <button
            onClick={onBackToLanding}
            className="px-4 py-2 rounded-xl bg-[#2A374E] text-[#B8C9DD] hover:text-white border border-[#38475F] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
              className="text-[#B8C9DD] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

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
          
          {/* Card Title Header */}
          <div className="flex items-center justify-center gap-2 mb-6 pb-4 border-b border-[#E5E7EB] text-center">
            <KeyRound className="w-5 h-5 text-[#1F98DC]" />
            <span className="text-sm font-extrabold text-[#12171F]">Passwordless OTP Login</span>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="mb-5 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
              <span>{formError}</span>
            </div>
          )}

          {/* OTP Flow */}
          {otpStep === "request" ? (
            <form className="space-y-4" onSubmit={handleRequestOtp}>
              <div className="text-center mb-2">
                <h3 className="text-sm font-bold text-[#12171F]">Request One-Time Password</h3>
                <p className="text-xs text-[#6A7788] mt-1">
                  Enter your email address to receive a 6-digit login verification code.
                </p>
              </div>

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
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isOtpLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isOtpLoading ? (
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

              <div className="p-3 bg-[#F1F2F5] rounded-xl border border-[#E5E7EB] text-center mt-3">
                <p className="text-[11px] text-[#6A7788] leading-relaxed">
                  <span className="font-bold text-[#12171F]">New User?</span> An account will be created automatically upon verifying your OTP code.
                </p>
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <div className="text-center mb-2">
                <h3 className="text-sm font-bold text-[#12171F]">Enter Verification Code</h3>
                <p className="text-xs text-[#6A7788] mt-1">
                  Sent 6-digit code to <span className="font-bold text-[#12171F]">{otpEmail}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpStep("request")}
                  className="text-[11px] text-[#1F98DC] hover:underline mt-1 font-semibold cursor-pointer"
                >
                  Change Email
                </button>
              </div>

              {/* Demo OTP Banner for testing */}
              {simulatedOtpCode && (
                <div className="p-3 border border-[#1F98DC]/30 bg-[#1F98DC]/5 rounded-2xl text-center">
                  <div className="text-[11px] font-bold text-[#6A7788] flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#1F98DC]" />
                    <span>Your OTP Verification Code</span>
                  </div>
                  <div className="text-xl font-black tracking-widest text-[#1F98DC] my-1 font-mono">
                    {simulatedOtpCode}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtpCode(simulatedOtpCode)}
                    className="text-[10px] font-bold px-3 py-1 bg-[#1F98DC] text-white rounded-lg hover:bg-[#63A0D9] transition-colors cursor-pointer shadow-2xs"
                  >
                    Auto-Fill Code
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#12171F] mb-1.5">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#6A7788] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-10 pr-4 py-2.5 text-base font-mono tracking-widest bg-[#F1F2F5] border border-[#E5E7EB] rounded-xl text-[#12171F] placeholder-[#6A7788] focus:outline-hidden focus:ring-2 focus:ring-[#1F98DC] focus:bg-[#FFFFFF] transition-all text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isOtpLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#1F98DC] hover:bg-[#63A0D9] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isOtpLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleRequestOtp()}
                  disabled={isOtpLoading}
                  className="text-xs text-[#1F98DC] hover:text-[#63A0D9] font-medium transition-colors cursor-pointer"
                >
                  Didn't receive code? <span className="font-bold underline">Resend OTP</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
};
