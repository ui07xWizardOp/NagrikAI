import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Loader2 } from "lucide-react";
import { googleSignIn, initAuth } from "../lib/firebaseAuth";

export default function Login({
  setView,
}: {
  setView: (v: "dashboard") => void;
}) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        // Automatically proceed if we already have a valid session
        setView("dashboard");
      },
      () => {
        // Needs auth
      },
    );
    return () => unsubscribe();
  }, [setView]);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setView("dashboard");
      }
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4 || otp.length === 6) {
      setView("dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in w-full">
      <div className="w-full max-w-md bg-surface-card border border-border-default rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
            <Smartphone size={24} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
            Welcome to NagrikAI
          </h1>
          <p className="text-sm text-text-secondary">
            {step === "phone"
              ? "Sign in to continue"
              : `We sent a code to ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoggingIn}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              )}
              Continue with Google
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border-default"></div>
              <span className="flex-shrink-0 mx-4 text-text-muted text-xs uppercase tracking-widest font-semibold">
                Or
              </span>
              <div className="flex-grow border-t border-border-default"></div>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="flex bg-surface-muted rounded-xl border border-border-default focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all overflow-hidden">
                  <div className="px-4 py-3 border-r border-border-default text-text-secondary bg-surface-card/50">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="flex-1 bg-transparent px-4 py-3 outline-none text-text-primary placeholder:text-text-muted"
                    placeholder="99999 99999"
                    maxLength={10}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-surface-muted hover:bg-border-default disabled:bg-surface-muted/50 disabled:text-text-muted text-text-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                Continue with Phone <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-widest flex justify-between">
                <span>Enter OTP</span>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-accent hover:underline normal-case tracking-normal"
                >
                  Edit Number
                </button>
              </label>
              <input
                type="text"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-surface-muted rounded-xl border border-border-default focus:border-accent focus:ring-1 focus:ring-accent transition-all px-4 py-4 outline-none text-text-primary text-center tracking-[1em] font-mono text-lg"
                placeholder="••••"
                maxLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={otp.length < 4}
              className="w-full bg-accent hover:bg-accent-hover disabled:bg-surface-muted disabled:text-text-muted text-text-on-accent font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
