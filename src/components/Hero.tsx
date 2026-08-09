import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import heroImage from "@/assets/dutch-house.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Left */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
              Smarter home renovation
            </p>

            <h1 className="mt-5 text-[44px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px]">
              Make better decisions
              <br />
              for your home.
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-7 text-slate-600">
              Plan your renovation, compare building products and prices,
              and get personalised guidance — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="group inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
              >
                Explore products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/ai")}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Ask Bouwiser AI
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Independent guidance for smarter renovation choices.
            </p>
          </div>

          {/* Right */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={heroImage}
                alt="Dutch home renovation"
                className="h-[390px] w-full object-cover sm:h-[440px] lg:h-[470px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}