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

import type { ProjectData } from "../../data/project";

interface ProjectSummaryProps {
  project: ProjectData;
}

export default function ProjectSummary({
  project,
}: ProjectSummaryProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
            Project overview
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Home renovation summary
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review the property details, renovation target and next recommended
            action.
          </p>
        </div>

        <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-xs font-bold text-orange-700">
          {project.status}
        </span>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Home className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Property type
            </p>

            <p className="mt-1 font-black text-slate-950">
              {project.propertyType}
            </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Construction year
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
              Floor area
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
              Location
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
                  Next best action
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {project.nextAction}
                </h3>
              </div>
            </div>

            <Zap className="h-6 w-6 shrink-0 text-orange-500" />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            This recommendation is based on the expected energy impact,
            investment level and estimated payback period.
          </p>

          <button
            type="button"
            className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-700 transition hover:text-orange-800"
          >
            Review recommendation
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
                Renovation target
              </p>

              <h3 className="mt-1 text-xl font-black">
                Improve energy performance
              </h3>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current
              </p>

              <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-3xl font-black">
                {project.currentEnergyLabel}
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-500" />

            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Target
              </p>

              <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl font-black">
                {project.targetEnergyLabel}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Project progress</span>

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