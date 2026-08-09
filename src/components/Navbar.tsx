import { ChevronDown, Globe2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [productsOpen, setProductsOpen] = useState(false);

  const linkStyle =
    "whitespace-nowrap px-1 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950";

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <div>
              <p className="text-[22px] font-bold tracking-[-0.03em] text-slate-950">
                BOU
                <span className="text-[#a90f35]">W</span>
                ISER
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Smart Renovation Platform
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link className={linkStyle} to="/">
              Home
            </Link>

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`${linkStyle} flex items-center gap-1`}
                onClick={() => navigate("/products")}
              >
                Products
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>

              {productsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">

                    <Link
                      to="/products"
                      className="block rounded-lg p-3 transition hover:bg-slate-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        Browse & compare products
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        Compare building products, prices and performance.
                      </p>
                    </Link>

                    <div className="my-3 border-t border-slate-100" />

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {[
                        "Insulation",
                        "Windows",
                        "Flooring",
                        "Heating",
                        "Solar",
                        "Materials",
                      ].map((item) => (
                        <Link
                          key={item}
                          to="/products"
                          className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link className={linkStyle} to="/compare">
              Compare
            </Link>

            <Link className={linkStyle} to="/energy">
              Energy
            </Link>

            <Link className={linkStyle} to="/ai">
              AI Assistant
            </Link>

            <Link className={linkStyle} to="/hub">
              Partners
            </Link>

            <Link className={linkStyle} to="/about">
              About
            </Link>

            <Link className={linkStyle} to="/contact">
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 xl:flex"
            >
              <Globe2 className="h-4 w-4" strokeWidth={1.8} />
              EN
            </button>

            <LoginModal />

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="hidden h-10 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-[#a90f35] xl:flex"
            >
              Start AI Scan
            </button>
          </div>
        </div>
      </header>

      {/* Product comparison strip */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-3 px-6 text-xs lg:px-8">
          <span className="font-semibold text-slate-700">
            Compare smarter.
          </span>

          <span className="hidden text-slate-500 md:inline">
            Compare products, specifications and retailer prices in one place.
          </span>

          <Link
            to="/products"
            className="font-semibold text-[#a90f35] transition hover:text-slate-950"
          >
            Explore products →
          </Link>
        </div>
      </div>
    </>
  );
}