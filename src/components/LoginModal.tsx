import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, X } from "lucide-react";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    localStorage.setItem("loggedIn", "true");

    setIsOpen(false);

    navigate("/dashboard");
  }

  // اگر قبلاً لاگین کرده باشد دکمه Login نمایش داده نشود
  if (localStorage.getItem("loggedIn") === "true") {
    return null;
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
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white">
                B
              </div>

              <h2 className="mt-6 text-3xl font-black">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to manage your renovation projects.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Email address</label>

              <div className="mt-2 flex items-center rounded-xl border px-4">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  className="h-12 w-full px-3 outline-none"
                  type="email"
                  required
                />
              </div>

              <label className="mt-5 block">Password</label>

              <div className="mt-2 flex items-center rounded-xl border px-4">
                <LockKeyhole className="h-5 w-5 text-slate-400" />

                <input
                  className="h-12 w-full px-3 outline-none"
                  type={showPassword ? "text" : "password"}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <button
                className="mt-7 h-12 w-full rounded-xl bg-orange-500 font-bold text-white"
              >
                Login to Bouwiser
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}