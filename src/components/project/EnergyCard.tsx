import {
  ArrowRight,
  Leaf,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ProjectData } from "../../data/project";

interface EnergyCardProps {
  project: ProjectData;
}

export default function EnergyCard({
  project,
}: EnergyCardProps) {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-7 text-white shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-orange-400">
            <Sparkles className="h-5 w-5" />

            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              {t("energyCard.eyebrow")}
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-black">
            {t("energyCard.title")}
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            {t("energyCard.description")}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Zap className="h-7 w-7 text-orange-400" />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="text-center">
          <p className="text-sm text-slate-400">
            {t("energyCard.current")}
          </p>

          <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500 text-5xl font-black shadow-lg shadow-orange-500/30">
            {project.currentEnergyLabel}
          </div>
        </div>

        <ArrowRight className="h-8 w-8 text-slate-500" />

        <div className="text-center">
          <p className="text-sm text-slate-400">
            {t("energyCard.predicted")}
          </p>

          <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 text-5xl font-black shadow-lg shadow-emerald-500/30">
            {project.targetEnergyLabel}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            {t("energyCard.renovationProgress")}
          </span>

          <span className="font-black">
            {project.progress}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-emerald-500"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-emerald-400">
            <Leaf className="h-5 w-5" />

            <span className="text-xs font-bold uppercase">
              {t("energyCard.co2Reduction")}
            </span>
          </div>

          <p className="mt-3 text-3xl font-black">
            {project.co2Reduction}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-orange-400">
            <TrendingUp className="h-5 w-5" />

            <span className="text-xs font-bold uppercase">
              {t("energyCard.aiConfidence")}
            </span>
          </div>

          <p className="mt-3 text-3xl font-black">
            {project.aiScore}%
          </p>
        </div>
      </div>
    </section>
  );
}