import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CircleDollarSign,
  FolderKanban,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardLayout from "../layouts/DashboardLayout";
import { projects } from "../data/projects";

function parseEuro(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");

  const statistics = useMemo(() => {
    const activeProjects = projects.filter(
      (project) => project.progress < 100,
    ).length;

    const totalSavings = projects.reduce(
      (total, project) =>
        total + parseEuro(project.annualSaving),
      0,
    );

    const averageAiScore = Math.round(
      projects.reduce(
        (total, project) => total + project.aiScore,
        0,
      ) / projects.length,
    );

    return [
      {
        title: "Active Projects",
        value: String(activeProjects),
        description: `${projects.length} total projects`,
        icon: FolderKanban,
        iconStyle: "bg-orange-100 text-orange-600",
      },
      {
        title: "AI Reports",
        value: String(projects.length),
        description: `${averageAiScore}% average confidence`,
        icon: Bot,
        iconStyle: "bg-violet-100 text-violet-600",
      },
      {
        title: "Estimated Savings",
        value: formatEuro(totalSavings),
        description: "Expected annual savings",
        icon: CircleDollarSign,
        iconStyle: "bg-emerald-100 text-emerald-600",
      },
      {
        title: "Average AI Score",
        value: `${averageAiScore}%`,
        description: "Across all projects",
        icon: Zap,
        iconStyle: "bg-blue-100 text-blue-600",
      },
    ];
  }, []);

  const totalSavings = projects.reduce(
    (total, project) =>
      total + parseEuro(project.annualSaving),
    0,
  );

  const averageProgress = Math.round(
    projects.reduce(
      (total, project) => total + project.progress,
      0,
    ) / projects.length,
  );

  const averageCo2Reduction = Math.round(
    projects.reduce(
      (total, project) =>
        total + Number(project.co2Reduction.replace("%", "")),
      0,
    ) / projects.length,
  );

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          activeItem={activeItem}
          onSelect={setActiveItem}
        />
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
              Dashboard overview
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Welcome back, Yousef
            </h1>

            <p className="mt-2 text-slate-500">
              Manage renovation projects, AI reports and energy improvements.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((statistic) => {
            const Icon = statistic.icon;

            return (
              <article
                key={statistic.title}
                className="group rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${statistic.iconStyle}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {statistic.title}
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  {statistic.value}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {statistic.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
                  Active projects
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Renovation progress
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Monitor each project and continue from its current stage.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 space-y-5">
              {projects.slice(0, 4).map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    navigate(`/projects/${project.id}`)
                  }
                  className="group w-full rounded-[24px] border border-slate-200 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-black text-slate-950 group-hover:text-orange-600">
                          {project.name}
                        </h3>

                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                          {project.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {project.propertyType} · {project.city}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm text-slate-500">
                        Estimated budget
                      </p>

                      <p className="mt-1 font-black text-slate-950">
                        {project.budget}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Project progress
                      </span>

                      <span className="font-black text-slate-950">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      {project.nextAction}
                    </div>

                    <div className="flex items-center gap-2 font-bold text-orange-600">
                      Open project
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-7 text-white shadow-2xl">
            <p className="text-sm font-semibold text-slate-400">
              Portfolio performance
            </p>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-6xl font-black">
                  {averageProgress}%
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Average project progress
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
                <Zap className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Portfolio completion
                </span>

                <span className="font-black">
                  {averageProgress} / 100
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                  style={{ width: `${averageProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <article className="rounded-2xl bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Annual savings
                </p>

                <p className="mt-2 text-2xl font-black">
                  {formatEuro(totalSavings)}
                </p>
              </article>

              <article className="rounded-2xl bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  CO₂ reduction
                </p>

                <p className="mt-2 text-2xl font-black">
                  {averageCo2Reduction}%
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-[24px] bg-white/5 p-5">
              <p className="text-sm font-semibold text-slate-400">
                Best-performing project
              </p>

              <p className="mt-2 text-lg font-black">
                {
                  [...projects].sort(
                    (a, b) => b.progress - a.progress,
                  )[0].name
                }
              </p>

              <p className="mt-2 text-sm text-emerald-400">
                {
                  [...projects].sort(
                    (a, b) => b.progress - a.progress,
                  )[0].progress
                }
                % completed
              </p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}