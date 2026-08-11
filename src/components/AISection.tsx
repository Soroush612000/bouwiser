import {
  ArrowRight,
  BarChart3,
  Bot,
  Camera,
  Euro,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AISection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">
              <Sparkles className="h-4 w-4" />
              {t("aiSection.label")}
            </div>

            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
              {t("aiSection.titleLine1")}
              <br />
              {t("aiSection.titleLine2")}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {t("aiSection.description")}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                {t("aiSection.insight1")}
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <Bot className="h-5 w-5 text-orange-500" />
                {t("aiSection.insight2")}
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <Euro className="h-5 w-5 text-orange-500" />
                {t("aiSection.insight3")}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="group mt-9 inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              {t("aiSection.startScan")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              {t("aiSection.disclaimer")}
            </p>
          </div>

          {/* Right */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="rounded-[22px] bg-white p-6 sm:p-8">

              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Camera className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold text-slate-950">
                      {t("aiSection.previewTitle")}
                    </p>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {t("aiSection.previewSubtitle")}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {t("aiSection.example")}
                </span>
              </div>

              <div className="py-7">
                <p className="text-sm font-medium text-slate-500">
                  {t("aiSection.opportunity")}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  {t("aiSection.recommendationTitle")}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  {t("aiSection.recommendationDescription")}
                </p>
              </div>

              <div className="grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {t("aiSection.energyImpact")}
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {t("aiSection.high")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {t("aiSection.costIndication")}
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {t("aiSection.medium")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {t("aiSection.priority")}
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {t("aiSection.recommended")}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}