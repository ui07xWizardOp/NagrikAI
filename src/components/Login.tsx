import React, { useState } from "react";
import { ArrowRight, Smartphone } from "lucide-react";

export default function Login({
  setView,
}: {
  setView: (v: "dashboard") => void;
}) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

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
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
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
              ? "Enter your phone number to continue"
              : `We sent a code to ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
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
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-text-primary placeholder:text-text-muted"
                  placeholder="99999 99999"
                  maxLength={10}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={phone.length < 10}
              className="w-full bg-accent hover:bg-accent-hover disabled:bg-surface-muted disabled:text-text-muted text-text-on-accent font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Continue <ArrowRight size={18} />
            </button>
          </form>
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
