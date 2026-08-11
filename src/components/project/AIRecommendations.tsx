import {
  ArrowRight,
  BadgeEuro,
  Clock3,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type {
  ProjectData,
  ProjectRecommendation,
} from "../../data/project";

interface AIRecommendationsProps {
  project: ProjectData;
}

function getPriorityStyle(
  priority: ProjectRecommendation["priority"],
) {
  if (priority === "High") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "Medium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

function getStatusStyle(
  status: ProjectRecommendation["status"],
) {
  if (status === "Completed") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Planned") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-orange-100 text-orange-700";
}

export default function AIRecommendations({
  project,
}: AIRecommendationsProps) {
  const { t } = useTranslation();

  const translateKnownValue = (value: string) => {
    const knownValues: Record<string, string> = {
      "Roof insulation": t("aiRecommendations.items.roofInsulation"),
      Dakisolatie: t("aiRecommendations.items.roofInsulation"),

      "Triple glazing": t("aiRecommendations.items.tripleGlazing"),
      "Driedubbel glas": t("aiRecommendations.items.tripleGlazing"),

      "Hybrid heat pump": t("aiRecommendations.items.hybridHeatPump"),
      "Hybride warmtepomp": t("aiRecommendations.items.hybridHeatPump"),

      "Solar panels": t("aiRecommendations.items.solarPanels"),
      Zonnepanelen: t("aiRecommendations.items.solarPanels"),

      Insulation: t("aiRecommendations.categories.insulation"),
      Isolatie: t("aiRecommendations.categories.insulation"),

      Windows: t("aiRecommendations.categories.windows"),
      Ramen: t("aiRecommendations.categories.windows"),

      Heating: t("aiRecommendations.categories.heating"),
      Verwarming: t("aiRecommendations.categories.heating"),

      Solar: t("aiRecommendations.categories.solar"),
      Zonneenergie: t("aiRecommendations.categories.solar"),

      Completed: t("aiRecommendations.status.completed"),
      Voltooid: t("aiRecommendations.status.completed"),

      Planned: t("aiRecommendations.status.planned"),
      Gepland: t("aiRecommendations.status.planned"),

      Recommended: t("aiRecommendations.status.recommended"),
      Aanbevolen: t("aiRecommendations.status.recommended"),

      High: t("aiRecommendations.priority.high"),
      Hoog: t("aiRecommendations.priority.high"),

      Medium: t("aiRecommendations.priority.medium"),
      Gemiddeld: t("aiRecommendations.priority.medium"),

      Low: t("aiRecommendations.priority.low"),
      Laag: t("aiRecommendations.priority.low"),
    };

    return knownValues[value] ?? value;
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex items-center gap-2 text-orange-500">
            <Sparkles className="h-5 w-5" />

            <p className="text-sm font-bold uppercase tracking-[0.16em]">
              {t("aiRecommendations.eyebrow")}
            </p>
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {t("aiRecommendations.title")}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            {t("aiRecommendations.description")}
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 transition hover:bg-orange-100"
        >
          {t("aiRecommendations.viewFullReport")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {project.recommendations.map((recommendation, index) => (
          <article
            key={recommendation.id}
            className="group rounded-[26px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-600">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-bold text-orange-500">
                    {translateKnownValue(recommendation.category)}
                  </p>

                  <h3 className="mt-1 text-xl font-black text-slate-950">
                    {translateKnownValue(recommendation.title)}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getPriorityStyle(
                    recommendation.priority,
                  )}`}
                >
                  {t("aiRecommendations.priorityLabel", {
                    priority: translateKnownValue(recommendation.priority),
                  })}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                    recommendation.status,
                  )}`}
                >
                  {translateKnownValue(recommendation.status)}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <BadgeEuro className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {t("aiRecommendations.cost")}
                  </span>
                </div>
                <p className="mt-3 text-lg font-black text-slate-950">
                  {recommendation.estimatedCost}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {t("aiRecommendations.saving")}
                  </span>
                </div>
                <p className="mt-3 text-lg font-black text-emerald-950">
                  {recommendation.annualSaving}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <div className="flex items-center gap-2 text-violet-700">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {t("aiRecommendations.payback")}
                  </span>
                </div>
                <p className="mt-3 text-lg font-black text-violet-950">
                  {recommendation.paybackPeriod}
                </p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 ${
                  index === 0
                    ? "w-[92%]"
                    : index === 1
                      ? "w-[81%]"
                      : index === 2
                        ? "w-[72%]"
                        : "w-[64%]"
                }`}
              />
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
            >
              {t("aiRecommendations.viewProducts")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}