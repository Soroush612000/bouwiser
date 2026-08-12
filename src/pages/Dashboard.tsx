import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { getProjectDisplayData, projects } from "../data/projects";
import { supabase } from "@/utils/supabase";

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

function getDisplayName(fullName: unknown, email?: string) {
  if (typeof fullName === "string" && fullName.trim()) return fullName.trim();

  if (email) {
    const emailName = email.split("@")[0];
    if (emailName) {
      return emailName
        .split(/[._-]+/)
        .filter(Boolean)
        .map(
          (part) =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
        )
        .join(" ");
    }
  }

  return "Homeowner";
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "H";
}

type SavedScan = {
  id: number;
  createdAt: string;
  projectName: string;
  address: string;
  city: string;
  postalCode: string;
  propertyType: string;
  yearBuilt: string;
  floorArea: string;
  energyLabel: string;
  gasUsage: string;
  electricityUsage: string;
  goals: string[];
  uploadedPhotos: string[];
  analysis: {
    confidence: number;
    targetEnergyLabel: string;
    annualSaving: number;
    co2Reduction: number;
  };
  status: string;
  progress: number;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [userName, setUserName] = useState(t("dashboard.defaultUser"));
  const [userInitial, setUserInitial] = useState("H");
  const [authLoading, setAuthLoading] = useState(true);
  const [latestScan, setLatestScan] = useState<SavedScan | null>(null);

  useEffect(() => {
    try {
      const savedScan = localStorage.getItem("bouwiser_latest_scan");

      if (savedScan) {
        setLatestScan(JSON.parse(savedScan) as SavedScan);
      }
    } catch (error) {
      console.error("Could not load the latest Bouwiser scan:", error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const applySession = (session: any) => {
      if (!mounted) return;

      if (!session?.user) {
        setAuthLoading(false);
        navigate("/", { replace: true });
        return;
      }

      const displayName = getDisplayName(
        session.user.user_metadata?.full_name,
        session.user.email,
      );

      setUserName(displayName);
      setUserInitial(getInitial(displayName));
      setAuthLoading(false);
    };

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      applySession(session);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const dashboardProjects = useMemo(() => {
    if (!latestScan) return projects;

    const scannedProject = {
      id: String(latestScan.id),
      name: latestScan.projectName,
      propertyType: latestScan.propertyType || t("dashboard.home"),
      city: latestScan.city || t("dashboard.unknownCity"),
      status: latestScan.status,
      budget: t("dashboard.toBeEstimated"),
      progress: latestScan.progress,
      nextAction: t("dashboard.reviewAiRecommendations"),
      annualSaving: `€${latestScan.analysis.annualSaving}`,
      aiScore: latestScan.analysis.confidence,
      co2Reduction: `${latestScan.analysis.co2Reduction}%`,
      isLatestScan: true,
    };

    return [scannedProject, ...projects];
  }, [latestScan]);

  const statistics = useMemo(() => {
    const activeProjects = dashboardProjects.filter(
      (project) => project.progress < 100,
    ).length;

    const totalSavingsValue = dashboardProjects.reduce(
      (total, project) => total + parseEuro(project.annualSaving),
      0,
    );

    const averageAiScore =
      dashboardProjects.length > 0
        ? Math.round(
            dashboardProjects.reduce(
              (total, project) => total + project.aiScore,
              0,
            ) / dashboardProjects.length,
          )
        : 0;

    return [
      {
        title: t("dashboard.stats.activeProjects"),
        value: String(activeProjects),
        description: t("dashboard.stats.totalProjects", { count: dashboardProjects.length }),
        icon: FolderKanban,
        iconStyle: "bg-orange-100 text-orange-600",
      },
      {
        title: t("dashboard.stats.aiReports"),
        value: String(dashboardProjects.length),
        description: t("dashboard.stats.averageConfidence", { score: averageAiScore }),
        icon: Bot,
        iconStyle: "bg-violet-100 text-violet-600",
      },
      {
        title: t("dashboard.stats.estimatedSavings"),
        value: formatEuro(totalSavingsValue),
        description: t("dashboard.stats.expectedAnnualSavings"),
        icon: CircleDollarSign,
        iconStyle: "bg-emerald-100 text-emerald-600",
      },
      {
        title: t("dashboard.stats.averageAiScore"),
        value: `${averageAiScore}%`,
        description: t("dashboard.stats.acrossAllProjects"),
        icon: Zap,
        iconStyle: "bg-blue-100 text-blue-600",
      },
    ];
  }, [dashboardProjects, t]);

  const totalSavings = dashboardProjects.reduce(
    (total, project) => total + parseEuro(project.annualSaving),
    0,
  );

  const averageProgress =
    dashboardProjects.length > 0
      ? Math.round(
          dashboardProjects.reduce(
            (total, project) => total + project.progress,
            0,
          ) / dashboardProjects.length,
        )
      : 0;

  const averageCo2Reduction =
    dashboardProjects.length > 0
      ? Math.round(
          dashboardProjects.reduce(
            (total, project) =>
              total + Number(project.co2Reduction.replace("%", "")),
            0,
          ) / dashboardProjects.length,
        )
      : 0;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
          <p className="mt-4 text-sm font-semibold text-slate-600">
            {t("dashboard.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      userName={userName}
      userInitial={userInitial}
      sidebar={
        <DashboardSidebar
          activeItem={activeItem}
          onSelect={setActiveItem}
          userName={userName}
          userInitial={userInitial}
        />
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
              {t("dashboard.eyebrow")}
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              {t("dashboard.welcomeBack", { name: userName })}
            </h1>

            <p className="mt-2 text-slate-500">
              {t("dashboard.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/ai-scan")}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Plus className="h-5 w-5" />
            {t("dashboard.newProject")}
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
                  {t("dashboard.activeProjects")}
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {t("dashboard.renovationProgress")}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  {t("dashboard.monitorProjects")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
              >
                {t("dashboard.viewAllProjects")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 space-y-5">
              {dashboardProjects.slice(0, 4).map((project) => {
                const displayProject =
                  "isLatestScan" in project && project.isLatestScan
                    ? {
                        name: project.name,
                        propertyType: project.propertyType,
                        status: project.status,
                        nextAction: project.nextAction,
                      }
                    : getProjectDisplayData(project, i18n.language);

                return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    "isLatestScan" in project && project.isLatestScan
                      ? navigate("/ai-scan")
                      : navigate(`/projects/${project.id}`)
                  }
                  className="group w-full rounded-[24px] border border-slate-200 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-black text-slate-950 group-hover:text-orange-600">
                          {displayProject.name}
                        </h3>

                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                          {displayProject.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {displayProject.propertyType} · {project.city}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm text-slate-500">
                        {t("dashboard.estimatedBudget")}
                      </p>

                      <p className="mt-1 font-black text-slate-950">
                        {project.budget}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{t("dashboard.projectProgress")}</span>

                      <span className="font-black text-slate-950">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      {displayProject.nextAction}
                    </div>

                    <div className="flex items-center gap-2 font-bold text-orange-600">
                      {t("dashboard.openProject")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-7 text-white shadow-2xl">
            <p className="text-sm font-semibold text-slate-400">
              {t("dashboard.portfolioPerformance")}
            </p>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-6xl font-black">{averageProgress}%</p>

                <p className="mt-2 text-sm text-slate-400">
                  {t("dashboard.averageProjectProgress")}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
                <Zap className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{t("dashboard.portfolioCompletion")}</span>
                <span className="font-black">{averageProgress} / 100</span>
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
                  {t("dashboard.annualSavings")}
                </p>
                <p className="mt-2 text-2xl font-black">
                  {formatEuro(totalSavings)}
                </p>
              </article>

              <article className="rounded-2xl bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t("dashboard.co2Reduction")}
                </p>
                <p className="mt-2 text-2xl font-black">
                  {averageCo2Reduction}%
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-[24px] bg-white/5 p-5">
              <p className="text-sm font-semibold text-slate-400">
                {t("dashboard.bestPerformingProject")}
              </p>

              <p className="mt-2 text-lg font-black">
                {(() => {
                  const bestProject = [...dashboardProjects].sort(
                    (a, b) => b.progress - a.progress,
                  )[0];

                  if ("isLatestScan" in bestProject && bestProject.isLatestScan) {
                    return bestProject.name;
                  }

                  return getProjectDisplayData(
                    bestProject,
                    i18n.language,
                  ).name;
                })()}
              </p>

              <p className="mt-2 text-sm text-emerald-400">
                {
                  [...dashboardProjects].sort(
                    (a, b) => b.progress - a.progress,
                  )[0].progress
                }
                % {t("dashboard.completed")}
              </p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}