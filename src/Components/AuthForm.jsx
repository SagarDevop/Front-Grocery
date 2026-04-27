import React, { useState } from "react";
import { signup, login, verifyOTP, forgotPassword, resetPassword, googleLogin } from "../api/auth";
import { auth, googleProvider } from "../Utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import { Success, Error } from "../Utils/toastUtils.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Mail, Lock, User, KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); 

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", otp: "" });
  const [awaitingOTP, setAwaitingOTP] = useState(false);
  const [forgotOTPStage, setForgotOTPStage] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (awaitingOTP) {
        const res = await verifyOTP({ email: formData.email, otp: formData.otp });
        Success(res.data.message);

        const loginRes = await login({ email: formData.email, password: formData.password });
        dispatch(loginUser({ user: loginRes.data.user, token: loginRes.data.token }));

        setAwaitingOTP(false);
        navigate("/");
      } else if (mode === "signup") {
        const res = await signup(formData);
        setMessage(res.data.message);
        Success("OTP sent to your email.");
        setAwaitingOTP(true);
      } else if (mode === "login") {
        const res = await login(formData);
        dispatch(loginUser({ user: res.data.user, token: res.data.token }));
        Success(`Welcome back, ${res.data.user.name}!`);

        if (res.data.user.is_admin) navigate("/admin-dashboard");
        else if (res.data.user.role === "seller") navigate("/seller-dashboard");
        else navigate("/");
      } else if (mode === "forgot") {
        if (!forgotOTPStage) {
          const res = await forgotPassword(formData.email);
          Success(res.data.message);
          setMessage("OTP sent to your email.");
          setForgotOTPStage(true);
        } else {
          const res = await resetPassword({
            email: formData.email,
            otp: formData.otp,
            new_password: newPassword,
          });
          Success(res.data.message);
          setForgotOTPStage(false);
          setMode("login");
          setNewPassword("");
          setFormData((prev) => ({ ...prev, otp: "" }));
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong.";
      setMessage(errorMsg);
      Error(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Google Sign-In Handler
   * Initiates Firebase popup, then sends token to our backend
   */
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 1. Firebase Popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // 2. Send token to our backend
      const res = await googleLogin(idToken);
      
      // 3. Update Redux
      dispatch(loginUser({ user: res.data.user, token: res.data.token }));
      Success(`Login Successful! Welcome, ${res.data.user.name}`);

      // 4. Redirect based on role
      if (res.data.user.is_admin) navigate("/admin-dashboard");
      else if (res.data.user.role === "seller") navigate("/seller-dashboard");
      else navigate("/");

    } catch (err) {
      console.error("Google Auth Error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        Error("Sign-in cancelled");
      } else {
        const errorMsg = err.response?.data?.error || "Google Sign-In failed.";
        Error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (awaitingOTP) return "Verify OTP";
    if (mode === "login") return "Welcome Back";
    if (mode === "signup") return "Create Account";
    return "Reset Password";
  };

  const getSubtitle = () => {
    if (awaitingOTP) return "Enter the code sent to your email";
    if (mode === "login") return "Sign in to your GreenCart account";
    if (mode === "signup") return "Start your fresh grocery journey";
    return "We'll send you a recovery code";
  };

  const inputClass = "w-full h-12 pl-12 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 ring-brand-500 focus:border-transparent transition-all duration-300 outline-none";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400";

  const renderFormFields = () => {
    if (awaitingOTP) {
      return (
        <div className="relative">
          <KeyRound size={18} className={iconClass} />
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP code"
            value={formData.otp}
            onChange={handleChange}
            className={inputClass}
            required
            autoFocus
          />
        </div>
      );
    }

    if (mode === "forgot") {
      return (
        <>
          <div className="relative">
            <Mail size={18} className={iconClass} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          {forgotOTPStage && (
            <>
              <div className="relative">
                <KeyRound size={18} className={iconClass} />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP code"
                  value={formData.otp}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="relative">
                <Lock size={18} className={iconClass} />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </>
          )}
        </>
      );
    }

    return (
      <>
        {mode === "signup" && (
          <div className="relative">
            <User size={18} className={iconClass} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        )}
        <div className="relative">
          <Mail size={18} className={iconClass} />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div className="relative">
          <Lock size={18} className={iconClass} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </>
    );
  };

  const getButtonLabel = () => {
    if (loading) {
      if (awaitingOTP) return "Verifying...";
      if (mode === "login") return "Signing in...";
      if (mode === "signup") return "Creating account...";
      return "Sending...";
    }
    if (awaitingOTP) return "Verify OTP";
    if (mode === "login") return "Sign In";
    if (mode === "signup") return "Create Account";
    if (forgotOTPStage) return "Reset Password";
    return "Send Reset Code";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-dark p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-surface-dark-gray rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30">
              <ShoppingCart className="text-white" size={28} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {getTitle()}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {getSubtitle()}
            </p>
          </div>

          {message && (
            <div className="mb-6 p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 text-center text-sm text-brand-700 dark:text-brand-300 font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode + awaitingOTP + forgotOTPStage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {renderFormFields()}
              </motion.div>
            </AnimatePresence>

            <Button
              type="submit"
              loading={loading}
              className="w-full h-12 rounded-xl text-base mt-2"
            >
              {getButtonLabel()}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-surface-dark-gray text-slate-400 font-semibold uppercase tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 font-semibold text-sm text-slate-700 dark:text-slate-300 disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>

          {/* Footer Links */}
          {!awaitingOTP && (
            <div className="text-center mt-8 space-y-3">
              {mode !== "forgot" && (
                <button
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setMessage(null);
                  }}
                  className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {mode === "login"
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </button>
              )}
              <div>
                {mode === "forgot" ? (
                  <button
                    onClick={() => {
                      setMode("login");
                      setMessage(null);
                      setForgotOTPStage(false);
                    }}
                    className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 mx-auto"
                  >
                    <ArrowLeft size={14} /> Back to Sign In
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMode("forgot");
                      setMessage(null);
                    }}
                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
