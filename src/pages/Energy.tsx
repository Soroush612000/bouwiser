import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Home,
  Leaf,
  ThermometerSun,
  PanelsTopLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";

export default function Energy() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const measures = [
    { title: t("energy.measures.roof.title"), description: t("energy.measures.roof.description"), impact: t("energy.impact.high"), category: t("energy.categories.insulation"), icon: Home },
    { title: t("energy.measures.glazing.title"), description: t("energy.measures.glazing.description"), impact: t("energy.impact.high"), category: t("energy.categories.windows"), icon: PanelsTopLeft },
    { title: t("energy.measures.heatPump.title"), description: t("energy.measures.heatPump.description"), impact: t("energy.impact.mediumHigh"), category: t("energy.categories.heating"), icon: ThermometerSun },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a90f35]">
                <Leaf className="h-4 w-4" strokeWidth={1.8} />
                {t("energy.hero.eyebrow")}
              </div>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-6xl">
                {t("energy.hero.title")}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {t("energy.hero.description")}
              </p>

              <button
                type="button"
                onClick={() => navigate("/ai-scan")}
                className="group mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
              >
                {t("energy.hero.analyse")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                {t("energy.hero.note")}
              </p>
            </div>
          </div>
        </section>

        {/* EXAMPLE JOURNEY */}
        <section className="border-b border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                  {t("energy.scenario.eyebrow")}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  {t("energy.scenario.title")}
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  {t("energy.scenario.description")}
                </p>
              </div>

              <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
                {t("energy.scenario.badge")}
              </span>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1.35fr_auto_1fr] lg:items-stretch">
              {/* CURRENT */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Gauge className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {t("energy.scenario.current")}
                </p>

                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
                  {t("energy.scenario.labelD")}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {t("energy.scenario.currentDescription")}
                </p>
              </article>

              <div className="hidden items-center justify-center lg:flex">
                <ArrowRight className="h-5 w-5 text-slate-300" />
              </div>

              {/* IMPROVEMENTS */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Home className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {t("energy.scenario.improvements")}
                </p>

                <div className="mt-4 space-y-3">
                  {(
                    t("energy.scenario.improvementItems", {
                      returnObjects: true,
                    }) as string[]
                  ).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={1.8}
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <div className="hidden items-center justify-center lg:flex">
                <ArrowRight className="h-5 w-5 text-slate-300" />
              </div>

              {/* POTENTIAL */}
              <article className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Leaf className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  {t("energy.scenario.potential")}
                </p>

                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
                  {t("energy.scenario.labelB")}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {t("energy.scenario.potentialDescription")}
                </p>
              </article>
            </div>

            <p className="mt-5 max-w-4xl text-xs leading-5 text-slate-400">
              {t("energy.scenario.note")}
            </p>
          </div>
        </section>

        {/* MEASURES */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                {t("energy.renovation.eyebrow")}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                {t("energy.renovation.title")}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {t("energy.renovation.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {measures.map((measure) => {
                const Icon = measure.icon;

                return (
                  <article
                    key={measure.title}
                    className="group flex min-h-[290px] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {t("energy.impactLabel", { impact: measure.impact })}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-slate-950">
                      {measure.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {measure.description}
                    </p>

                    <div className="mt-auto pt-7">
                      <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center text-sm font-semibold text-slate-900 transition group-hover:text-[#a90f35]"
                      >
                        {t("energy.exploreCategory", { category: measure.category.toLowerCase() })}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-3xl bg-slate-950 px-7 py-8 text-white sm:px-9 sm:py-9">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium text-orange-300">
                    {t("energy.cta.eyebrow")}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {t("energy.cta.title")}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                    {t("energy.cta.description")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/ai-scan")}
                  className="group inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  {t("energy.cta.button")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-400">
              {t("energy.cta.note")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}