import {
  ArrowRight,
  CalendarDays,
  Home,
  MapPin,
  Ruler,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ProjectData } from "../../data/project";

interface ProjectSummaryProps {
  project: ProjectData;
}

export default function ProjectSummary({
  project,
}: ProjectSummaryProps) {
  const { t } = useTranslation();

  const translateKnownValue = (value: string) => {
    const knownValues: Record<string, string> = {
      Home: t("projectSummary.values.home"),
      Woning: t("projectSummary.values.home"),

      "Detached house": t("projectSummary.propertyTypes.detached"),
      "Vrijstaande woning": t("projectSummary.propertyTypes.detached"),

      "Semi-detached house": t("projectSummary.propertyTypes.semiDetached"),
      "Twee-onder-een-kapwoning": t("projectSummary.propertyTypes.semiDetached"),

      "Terraced house": t("projectSummary.propertyTypes.terraced"),
      Rijtjeswoning: t("projectSummary.propertyTypes.terraced"),

      Apartment: t("projectSummary.propertyTypes.apartment"),
      Appartement: t("projectSummary.propertyTypes.apartment"),

      "AI analysis completed": t("projectSummary.status.aiAnalysisCompleted"),
      "AI-analyse voltooid": t("projectSummary.status.aiAnalysisCompleted"),

      "AI Home Scan in progress": t("projectSummary.status.aiScanInProgress"),
      "AI-woningscan bezig": t("projectSummary.status.aiScanInProgress"),

      "AI analysis pending": t("projectSummary.status.aiAnalysisPending"),
      "AI-analyse in afwachting": t("projectSummary.status.aiAnalysisPending"),

      "Review AI renovation recommendations": t(
        "projectSummary.nextActions.reviewRecommendations",
      ),
      "Bekijk de AI-renovatieaanbevelingen": t(
        "projectSummary.nextActions.reviewRecommendations",
      ),
      "Continue AI Home Scan": t(
        "projectSummary.nextActions.continueAiScan",
      ),
      "Ga verder met AI-woningscan": t(
        "projectSummary.nextActions.continueAiScan",
      ),
    };

    return knownValues[value] ?? value;
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
            {t("projectSummary.eyebrow")}
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {t("projectSummary.title")}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {t("projectSummary.description")}
          </p>
        </div>

        <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-xs font-bold text-orange-700">
          {translateKnownValue(project.status)}
        </span>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              {t("projectSummary.propertyType")}
            </p>
            <p className="mt-1 font-black text-slate-950">
              {translateKnownValue(project.propertyType)}
            </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              {t("projectSummary.constructionYear")}
            </p>
            <p className="mt-1 font-black text-slate-950">
              {project.yearBuilt}
            </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Ruler className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              {t("projectSummary.floorArea")}
            </p>
            <p className="mt-1 font-black text-slate-950">
              {project.floorArea} m²
            </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              {t("projectSummary.location")}
            </p>
            <p className="mt-1 font-black text-slate-950">
              {project.address}, {project.city}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/60 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-orange-600">
                  {t("projectSummary.nextBestAction")}
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {translateKnownValue(project.nextAction)}
                </h3>
              </div>
            </div>
            <Zap className="h-6 w-6 shrink-0 text-orange-500" />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {t("projectSummary.recommendationDescription")}
          </p>

          <button
            type="button"
            className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-700 transition hover:text-orange-800"
          >
            {t("projectSummary.reviewRecommendation")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>

        <article className="rounded-3xl bg-slate-950 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Target className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400">
                {t("projectSummary.renovationTarget")}
              </p>
              <h3 className="mt-1 text-xl font-black">
                {t("projectSummary.improveEnergyPerformance")}
              </h3>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("projectSummary.current")}
              </p>
              <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl font-black">
                {project.currentEnergyLabel}
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-500" />

            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("projectSummary.target")}
              </p>
              <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl font-black">
                {project.targetEnergyLabel}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                {t("projectSummary.projectProgress")}
              </span>
              <span className="font-black">
                {project.progress}%
              </span>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}