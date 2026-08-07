import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  X,
} from "lucide-react";

import { supabase } from "@/utils/supabase";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          setIsOpen(false);
          navigate("/dashboard");
          return;
        }

        setSuccessMessage(
          "Account created. Please check your email and confirm your account."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setIsOpen(false);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function switchMode() {
    setMode((current) => (current === "login" ? "signup" : "login"));
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
      >
        Login
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-md rounded-[28px] border border-white/60 bg-white p-8 shadow-2xl sm:p-10">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Close authentication window"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white">
                B
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h2>

              <p className="mt-2 text-slate-500">
                {mode === "login"
                  ? "Sign in to manage your renovation projects."
                  : "Create your Bouwiser account and start your renovation journey."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <>
                  <label className="text-sm font-semibold text-slate-700">
                    Full name
                  </label>

                  <div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
                    <User className="h-5 w-5 text-slate-400" />

                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      className="h-12 w-full border-0 bg-transparent px-3 text-slate-900 outline-none"
                    />
                  </div>
                </>
              )}

              <label
                className={`text-sm font-semibold text-slate-700 ${
                  mode === "signup" ? "mt-5 block" : ""
                }`}
              >
                Email address
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
                <Mail className="h-5 w-5 text-slate-400" />

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="h-12 w-full border-0 bg-transparent px-3 text-slate-900 outline-none"
                />
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
                <LockKeyhole className="h-5 w-5 text-slate-400" />

                <input
                  required
                  minLength={8}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 8 characters"
                  className="h-12 w-full border-0 bg-transparent px-3 text-slate-900 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-slate-400 transition hover:text-slate-700"
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errorMessage && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-7 h-12 w-full rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login to Bouwiser"
                  : "Create account"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              {mode === "login"
                ? "No account yet?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="font-bold text-orange-600 hover:text-orange-700"
              >
                {mode === "login" ? "Create account" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}