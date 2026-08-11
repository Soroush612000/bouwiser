import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroImage from "@/assets/dutch-house.jpg";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
              {t("hero.eyebrow")}
            </p>

            <h1 className="mt-5 text-[44px] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px]">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-7 text-slate-600">
              {t("hero.description")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="group inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
              >
                {t("hero.exploreProducts")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/ai")}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {t("hero.askAI")}
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              {t("hero.note")}
            </p>
          </div>

          {/* Right */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={heroImage}
                alt={t("hero.imageAlt")}
                className="h-[390px] w-full object-cover sm:h-[440px] lg:h-[470px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}