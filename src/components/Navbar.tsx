import { Globe2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-xl font-black text-white shadow-lg shadow-orange-500/25">
            B
          </div>

          <div>
            <p className="text-2xl font-black tracking-tight text-slate-950">
              BOU<span className="text-orange-500">W</span>ISER
            </p>

            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Smart Renovation Platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          <Link className="transition hover:text-orange-500" to="/">
            Home
          </Link>

          <Link className="transition hover:text-orange-500" to="/energy">
            Energy
          </Link>

          <Link className="transition hover:text-orange-500" to="/ai">
            AI Assistant
          </Link>

          <Link className="transition hover:text-orange-500" to="/compare">
            Compare
          </Link>

          <Link className="transition hover:text-orange-500" to="/hub">
            Hub
          </Link>

          <Link className="transition hover:text-orange-500" to="/about">
            About
          </Link>

          <Link className="transition hover:text-orange-500" to="/contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 sm:flex"
          >
            <Globe2 className="h-4 w-4" />
            EN
          </button>

          <LoginModal />

          <button
            type="button"
            onClick={() => navigate("/ai-scan")}
            className="hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-orange-500/40 sm:block"
          >
            Start Your Scan
          </button>
        </div>
      </div>
    </header>
  );
}