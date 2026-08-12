import {
  ArrowRight,
  Building2,
  Factory,
  Handshake,
  Network,
  PackageSearch,
  Store,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function Hub() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const partnerTypes = [
    {
      title: t("partnersPage.types.manufacturers.title"),
      description: t("partnersPage.types.manufacturers.description"),
      icon: Factory,
    },
    {
      title: t("partnersPage.types.suppliers.title"),
      description: t("partnersPage.types.suppliers.description"),
      icon: Store,
    },
    {
      title: t("partnersPage.types.professionals.title"),
      description: t("partnersPage.types.professionals.description"),
      icon: Users,
    },
  ];

  const benefits = [
    {
      title: t("partnersPage.benefits.visibility.title"),
      description: t("partnersPage.benefits.visibility.description"),
      icon: PackageSearch,
    },
    {
      title: t("partnersPage.benefits.comparison.title"),
      description: t("partnersPage.benefits.comparison.description"),
      icon: Network,
    },
    {
      title: t("partnersPage.benefits.connections.title"),
      description: t("partnersPage.benefits.connections.description"),
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a90f35]">
                <Handshake className="h-4 w-4" strokeWidth={1.8} />
                {t("partnersPage.hero.eyebrow")}
              </div>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-6xl">
                {t("partnersPage.hero.titleLine1")}
                <br />
                {t("partnersPage.hero.titleLine2")}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {t("partnersPage.hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Partner types */}
        <section className="border-b border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                {t("partnersPage.network.eyebrow")}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                {t("partnersPage.network.title")}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {t("partnersPage.network.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {partnerTypes.map((partner) => {
                const Icon = partner.icon;

                return (
                  <article
                    key={partner.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-slate-950">
                      {partner.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {partner.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Value for partners */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Building2 className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                  {t("partnersPage.value.eyebrow")}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  {t("partnersPage.value.title")}
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  {t("partnersPage.value.description")}
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article
                      key={benefit.title}
                      className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          {benefit.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {benefit.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 overflow-hidden rounded-3xl bg-slate-950 px-7 py-8 text-white sm:px-9 sm:py-9">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium text-orange-300">
                    {t("partnersPage.cta.eyebrow")}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {t("partnersPage.cta.title")}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                    {t("partnersPage.cta.description")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="group inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  {t("partnersPage.cta.button")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}