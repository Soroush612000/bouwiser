import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardSidebar from "../components/DashboardSidebar";

import ProjectHeader from "../components/project/ProjectHeader";
import ProjectTabs from "../components/project/ProjectTabs";
import ProjectSummary from "../components/project/ProjectSummary";
import KPICards from "../components/project/KPICards";
import EnergyCard from "../components/project/EnergyCard";
import AIRecommendations from "../components/project/AIRecommendations";
import Timeline from "../components/project/Timeline";
import ActivityFeed from "../components/project/ActivityFeed";
import BudgetCard from "../components/project/BudgetCard";

import { projects } from "../data/projects";
import { supabase } from "@/utils/supabase";

type ProjectData = (typeof projects)[number];

type SupabaseProject = {
  id: number;
  created_at: string | null;
  user_id: string | null;
  project_name: string | null;
  property_type: string | null;
  construction_year: number | null;
  postal_code: string | null;
  city: string | null;
  floor_area: number | null;
  current_energy_label: string | null;
  annual_energy_cost: number | null;
  heating_type: string | null;
  renovation_goal: string | null;
  budget: number | null;
  status: string | null;
  target_energy_label: string | null;
  annual_saving: number | null;
  ai_score: number | null;
  co2_reduction: number | null;
  progress: number | null;
  next_action: string | null;
  roi: string | null;
  street_address: string | null;
  photo_categories: unknown;
};

function formatEuro(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "To be estimated";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function mapSupabaseProject(
  row: SupabaseProject,
  template: ProjectData,
): ProjectData {
  const budget = formatEuro(row.budget);
  const annualSaving = formatEuro(row.annual_saving);
  const roi = row.roi?.trim() || "To be estimated";

  /*
   * Keep the exact ProjectData structure expected by the existing project
   * components. In particular, `kpis` must remain an ARRAY because KPICards
   * renders it with project.kpis.map(...).
   *
   * For now we clone the existing KPI array from the UI template. We will
   * connect each KPI value to Supabase separately after this page is stable.
   */
  const kpis = template.kpis.map((kpi) => ({ ...kpi }));

  return {
    ...template,
    id: row.id,
    name: row.project_name?.trim() || "My Renovation Project",
    propertyType: row.property_type?.trim() || "Home",
    city: row.city?.trim() || "Unknown city",
    address: row.street_address?.trim() || row.city?.trim() || "Unknown address",
    yearBuilt: row.construction_year ?? 0,
    floorArea: Number(row.floor_area) || 0,
    currentEnergyLabel: row.current_energy_label?.trim() || "?",
    targetEnergyLabel: row.target_energy_label?.trim() || "?",
    status: row.status?.trim() || "AI analysis pending",
    progress: row.progress ?? 0,
    budget,
    annualSaving,
    roi,
    aiScore: row.ai_score ?? 0,
    co2Reduction:
      row.co2_reduction !== null && row.co2_reduction !== undefined
        ? `${row.co2_reduction}%`
        : "0%",
    nextAction:
      row.next_action?.trim() || "Review AI renovation recommendations",
    kpis,
  };
}


type StoredProjectPhoto = {
  category: string;
  path: string;
  fileName: string;
};

type ProjectPhoto = StoredProjectPhoto & {
  signedUrl: string;
};

function parseProjectPhotos(value: unknown): StoredProjectPhoto[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): StoredProjectPhoto | null => {
      if (
        item &&
        typeof item === "object" &&
        "category" in item &&
        "path" in item
      ) {
        const photo = item as {
          category?: unknown;
          path?: unknown;
          fileName?: unknown;
        };

        if (
          typeof photo.category === "string" &&
          typeof photo.path === "string" &&
          photo.path
        ) {
          return {
            category: photo.category,
            path: photo.path,
            fileName:
              typeof photo.fileName === "string" ? photo.fileName : "Photo",
          };
        }
      }

      return null;
    })
    .filter((photo): photo is StoredProjectPhoto => photo !== null);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [activeMenu, setActiveMenu] = useState("projects");
  const [activeTab, setActiveTab] = useState("Overview");

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [projectPhotos, setProjectPhotos] = useState<ProjectPhoto[]>([]);
  const [photoLoadError, setPhotoLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      setLoading(true);
      setNotFound(false);
      setLoadError("");

      const projectId = Number(id);

      if (!id || Number.isNaN(projectId)) {
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
        return;
      }

      const template = projects[0];

      if (!template) {
        if (mounted) {
          setLoadError(t("projectDetails.errors.templateUnavailable"));
          setLoading(false);
        }
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (userError || !user) {
        setLoadError(t("projectDetails.errors.signInRequired"));
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("Projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("Could not load Bouwiser project:", error);
        setLoadError(t("projectDetails.errors.loadFailed"));
        setLoading(false);
        return;
      }

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const row = data as SupabaseProject;

      setProject(
        mapSupabaseProject(row, template),
      );

      const storedPhotos = parseProjectPhotos(row.photo_categories);

      if (storedPhotos.length > 0) {
        const signedPhotos = await Promise.all(
          storedPhotos.map(async (photo) => {
            const { data: signedData, error: signedError } =
              await supabase.storage
                .from("project-photos")
                .createSignedUrl(photo.path, 60 * 60);

            if (signedError || !signedData?.signedUrl) {
              console.error(
                `Could not load project photo ${photo.path}:`,
                signedError,
              );
              return null;
            }

            return {
              ...photo,
              signedUrl: signedData.signedUrl,
            } satisfies ProjectPhoto;
          }),
        );

        if (mounted) {
          setProjectPhotos(
            signedPhotos.filter(
              (photo): photo is ProjectPhoto => photo !== null,
            ),
          );

          if (signedPhotos.every((photo) => photo === null)) {
            setPhotoLoadError(t("projectDetails.errors.photosFailed"));
          }
        }
      } else if (mounted) {
        setProjectPhotos([]);
      }

      setLoading(false);
    };

    void loadProject();

    return () => {
      mounted = false;
    };
  }, [id, t]);

  if (notFound) {
    return <Navigate to="/projects" replace />;
  }

  if (loading) {
    return (
      <DashboardLayout
        sidebar={
          <DashboardSidebar
            activeItem={activeMenu}
            onSelect={setActiveMenu}
          />
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[30px] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
            <h1 className="mt-5 text-3xl font-black text-slate-950">
              {t("projectDetails.loading.title")}
            </h1>
            <p className="mt-2 text-slate-500">
              {t("projectDetails.loading.description")}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (loadError || !project) {
    return (
      <DashboardLayout
        sidebar={
          <DashboardSidebar
            activeItem={activeMenu}
            onSelect={setActiveMenu}
          />
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[30px] border border-red-200 bg-red-50 p-10">
            <h1 className="text-3xl font-black text-slate-950">
              {t("projectDetails.errorTitle")}
            </h1>
            <p className="mt-2 text-slate-600">
              {loadError || t("projectDetails.errors.loadFailed")}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          activeItem={activeMenu}
          onSelect={setActiveMenu}
        />
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <ProjectHeader project={project} />

        <ProjectTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "Overview" && (
          <>
            <KPICards project={project} />

            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <ProjectSummary project={project} />
              <EnergyCard project={project} />
            </div>

            <AIRecommendations project={project} />

            <div className="grid gap-8 xl:grid-cols-2">
              <Timeline project={project} />
              <ActivityFeed project={project} />
            </div>
          </>
        )}

        {activeTab === "AI Report" && (
          <>
            <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
              <EnergyCard project={project} />

              <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
                  {t("projectDetails.aiReport.eyebrow")}
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {t("projectDetails.aiReport.title")}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {t("projectDetails.aiReport.description", {
                    current: project.currentEnergyLabel,
                    target: project.targetEnergyLabel,
                  })}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl bg-orange-50 p-5">
                    <p className="text-sm font-semibold text-orange-700">
                      {t("projectDetails.aiReport.currentLabel")}
                    </p>

                    <p className="mt-2 text-4xl font-black text-orange-950">
                      {project.currentEnergyLabel}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-emerald-50 p-5">
                    <p className="text-sm font-semibold text-emerald-700">
                      {t("projectDetails.aiReport.predictedLabel")}
                    </p>

                    <p className="mt-2 text-4xl font-black text-emerald-950">
                      {project.targetEnergyLabel}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-sm font-semibold text-blue-700">
                      {t("projectDetails.aiReport.co2Reduction")}
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-950">
                      {project.co2Reduction}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-violet-50 p-5">
                    <p className="text-sm font-semibold text-violet-700">
                      {t("projectDetails.aiReport.aiConfidence")}
                    </p>

                    <p className="mt-2 text-3xl font-black text-violet-950">
                      {project.aiScore}%
                    </p>
                  </article>
                </div>
              </section>
            </div>

            <AIRecommendations project={project} />
          </>
        )}

        {activeTab === "Photos" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              {t("projectDetails.photos.eyebrow")}
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-950">
                  {t("projectDetails.photos.title")}
                </h2>

                <p className="mt-3 text-slate-500">
                  {t("projectDetails.photos.description")}
                </p>
              </div>

              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                {t("projectDetails.photos.count", { count: projectPhotos.length })}
              </div>
            </div>

            {photoLoadError && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {photoLoadError}
              </div>
            )}

            {projectPhotos.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {projectPhotos.map((photo) => (
                  <article
                    key={`${t(`projectDetails.photoCategories.${photo.category}`, { defaultValue: photo.category })}-${photo.path}`}
                    className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={photo.signedUrl}
                        alt={t(`projectDetails.photoCategories.${t(`projectDetails.photoCategories.${photo.category}`, { defaultValue: photo.category })}`, { defaultValue: photo.category })}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />

                      <div className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
                        {t(`projectDetails.photoCategories.${photo.category}`, { defaultValue: photo.category })}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="font-black text-slate-950">
                        {t(`projectDetails.photoCategories.${photo.category}`, { defaultValue: photo.category })}
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {photo.fileName}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[26px] border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-lg font-black text-slate-950">
                  {t("projectDetails.photos.emptyTitle")}
                </p>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  {t("projectDetails.photos.emptyDescription")}
                </p>
              </div>
            )}
          </section>
        )}

        {activeTab === "Documents" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              {t("projectDetails.documents.eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {t("projectDetails.documents.title")}
            </h2>

            <div className="mt-8 space-y-4">
              {[
                t("projectDetails.documents.files.energyLabel"),
                t("projectDetails.documents.files.aiReport"),
                t("projectDetails.documents.files.floorPlan"),
                t("projectDetails.documents.files.contractorQuote"),
              ].map((document, index) => (
                <article
                  key={document}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-black text-slate-950">
                      {document}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {t("projectDetails.documents.updatedDaysAgo", { count: index + 1 })}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    {t("projectDetails.documents.view")}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Quotes" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              {t("projectDetails.quotes.eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {t("projectDetails.quotes.title")}
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                {
                  company: "GreenBuild",
                  price: "€14,850",
                  status: t("projectDetails.quotes.status.recommended"),
                },
                {
                  company: "EcoRenovatie",
                  price: "€16,200",
                  status: t("projectDetails.quotes.status.received"),
                },
                {
                  company: "HomeEnergy NL",
                  price: "€17,100",
                  status: t("projectDetails.quotes.status.underReview"),
                },
              ].map((quote) => (
                <article
                  key={quote.company}
                  className="rounded-[24px] border border-slate-200 p-6"
                >
                  <p className="text-sm font-bold text-orange-500">
                    {quote.status}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    {quote.company}
                  </h3>

                  <p className="mt-5 text-3xl font-black text-slate-950">
                    {quote.price}
                  </p>

                  <button
                    type="button"
                    className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                  >
                    {t("projectDetails.quotes.review")}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Tasks" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              {t("projectDetails.tasks.eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              {t("projectDetails.tasks.title")}
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: t("projectDetails.tasks.items.uploadRoofPhotos"),
                  completed: true,
                },
                {
                  title: t("projectDetails.tasks.items.reviewAiReport"),
                  completed: true,
                },
                {
                  title: t("projectDetails.tasks.items.compareInsulation"),
                  completed: false,
                },
                {
                  title: t("projectDetails.tasks.items.requestQuotes"),
                  completed: false,
                },
                {
                  title: t("projectDetails.tasks.items.scheduleInstallation"),
                  completed: false,
                },
              ].map((task) => (
                <label
                  key={task.title}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-5"
                >
                  <input
                    type="checkbox"
                    defaultChecked={task.completed}
                    className="h-5 w-5 accent-orange-500"
                  />

                  <span
                    className={`font-bold ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-950"
                    }`}
                  >
                    {task.title}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Budget" && (
          <BudgetCard project={project} />
        )}
      </div>
    </DashboardLayout>
  );
}