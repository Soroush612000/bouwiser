import {
  ArrowLeft,
  MapPin,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { ProjectData } from "../../data/project";

interface ProjectHeaderProps {
  project: ProjectData;
}

export default function ProjectHeader({
  project,
}: ProjectHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const translateKnownValue = (value: string) => {
    const knownValues: Record<string, string> = {
      "My Renovation Project": t("projectHeader.values.defaultProjectName"),
      "Mijn renovatieproject": t("projectHeader.values.defaultProjectName"),

      Home: t("projectHeader.values.home"),
      Woning: t("projectHeader.values.home"),

      "Detached house": t("projectHeader.propertyTypes.detached"),
      "Vrijstaande woning": t("projectHeader.propertyTypes.detached"),

      "Semi-detached house": t("projectHeader.propertyTypes.semiDetached"),
      "Twee-onder-een-kapwoning": t("projectHeader.propertyTypes.semiDetached"),

      "Terraced house": t("projectHeader.propertyTypes.terraced"),
      "Rijtjeswoning": t("projectHeader.propertyTypes.terraced"),

      Apartment: t("projectHeader.propertyTypes.apartment"),
      Appartement: t("projectHeader.propertyTypes.apartment"),

      "AI analysis completed": t("projectHeader.status.aiAnalysisCompleted"),
      "AI-analyse voltooid": t("projectHeader.status.aiAnalysisCompleted"),

      "AI Home Scan in progress": t("projectHeader.status.aiScanInProgress"),
      "AI-woningscan bezig": t("projectHeader.status.aiScanInProgress"),

      "AI analysis pending": t("projectHeader.status.aiAnalysisPending"),
      "AI-analyse in afwachting": t("projectHeader.status.aiAnalysisPending"),
    };

    return knownValues[value] ?? value;
  };

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            aria-label={t("projectHeader.backToProjects")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {translateKnownValue(project.name)}
              </h1>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                {translateKnownValue(project.status)}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                {project.address}, {project.city}
              </span>

              <span>{translateKnownValue(project.propertyType)}</span>

              <span>
                {t("projectHeader.built", {
                  year: project.yearBuilt,
                })}
              </span>

              <span>{project.floorArea} m²</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <Share2 className="h-4 w-4" />
            {t("projectHeader.share")}
          </button>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            aria-label={t("projectHeader.moreActions")}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-500">
            {t("projectHeader.currentLabel")}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl font-black text-white shadow-lg shadow-orange-500/20">
              {project.currentEnergyLabel}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {t("projectHeader.currentPerformance")}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {t("projectHeader.beforeImprovements")}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-500">
            {t("projectHeader.targetLabel")}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-2xl font-black text-white shadow-lg shadow-emerald-500/20">
              {project.targetEnergyLabel}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {t("projectHeader.renovationTarget")}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {t("projectHeader.afterImprovements")}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              {t("projectHeader.projectProgress")}
            </p>

            <span className="text-sm font-black text-slate-950">
              {project.progress}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {t("projectHeader.planCompletion")}
          </p>
        </article>

        <article className="rounded-2xl bg-slate-950 p-5 text-white shadow-xl">
          <p className="text-sm font-semibold text-slate-400">
            {t("projectHeader.aiConfidenceScore")}
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-4xl font-black">
              {project.aiScore}%
            </p>

            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
              {t("projectHeader.highConfidence")}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
              style={{ width: `${project.aiScore}%` }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}