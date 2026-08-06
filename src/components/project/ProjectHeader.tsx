import {
  ArrowLeft,
  MapPin,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { ProjectData } from "../../data/project";

interface ProjectHeaderProps {
  project: ProjectData;
}

export default function ProjectHeader({
  project,
}: ProjectHeaderProps) {
  const navigate = useNavigate();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            aria-label="Back to projects"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {project.name}
              </h1>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                {project.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                {project.address}, {project.city}
              </span>

              <span>{project.propertyType}</span>

              <span>Built {project.yearBuilt}</span>

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
            Share
          </button>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            aria-label="More project actions"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-500">
            Current label
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl font-black text-white shadow-lg shadow-orange-500/20">
              {project.currentEnergyLabel}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Current performance
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Before improvements
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-500">
            Target label
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-2xl font-black text-white shadow-lg shadow-emerald-500/20">
              {project.targetEnergyLabel}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Renovation target
              </p>

              <p className="mt-1 text-xs text-slate-500">
                After improvements
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Project progress
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
            Renovation plan completion
          </p>
        </article>

        <article className="rounded-2xl bg-slate-950 p-5 text-white shadow-xl">
          <p className="text-sm font-semibold text-slate-400">
            AI confidence score
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-4xl font-black">
              {project.aiScore}%
            </p>

            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
              High confidence
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