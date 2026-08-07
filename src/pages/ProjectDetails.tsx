import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

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
    address: row.city?.trim() || "Unknown city",
    yearBuilt: row.construction_year ?? 0,
    floorArea: Number(row.floor_area) || 0,
    currentEnergyLabel: row.current_energy_label?.trim() || "?",
    targetEnergyLabel: row.target_energy_label?.trim() || "B",
    status: row.status?.trim() || "AI analysis completed",
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

export default function ProjectDetails() {
  const { id } = useParams();

  const [activeMenu, setActiveMenu] = useState("projects");
  const [activeTab, setActiveTab] = useState("Overview");

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");

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
          setLoadError("Project template is unavailable.");
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
        setLoadError("You must be signed in to view this project.");
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
        setLoadError("We could not load this project.");
        setLoading(false);
        return;
      }

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProject(
        mapSupabaseProject(data as SupabaseProject, template),
      );
      setLoading(false);
    };

    void loadProject();

    return () => {
      mounted = false;
    };
  }, [id]);

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
              Loading project...
            </h1>
            <p className="mt-2 text-slate-500">
              Retrieving your renovation project from Bouwiser.
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
              Unable to load project
            </h1>
            <p className="mt-2 text-slate-600">
              {loadError || "The project could not be loaded."}
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
                  AI report summary
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Renovation analysis
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  The property can improve from energy label{" "}
                  {project.currentEnergyLabel} to{" "}
                  {project.targetEnergyLabel} by completing the recommended
                  renovation measures.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl bg-orange-50 p-5">
                    <p className="text-sm font-semibold text-orange-700">
                      Current energy label
                    </p>

                    <p className="mt-2 text-4xl font-black text-orange-950">
                      {project.currentEnergyLabel}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-emerald-50 p-5">
                    <p className="text-sm font-semibold text-emerald-700">
                      Predicted energy label
                    </p>

                    <p className="mt-2 text-4xl font-black text-emerald-950">
                      {project.targetEnergyLabel}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-sm font-semibold text-blue-700">
                      CO₂ reduction
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-950">
                      {project.co2Reduction}
                    </p>
                  </article>

                  <article className="rounded-2xl bg-violet-50 p-5">
                    <p className="text-sm font-semibold text-violet-700">
                      AI confidence
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
              Project photos
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Property photo gallery
            </h2>

            <p className="mt-3 text-slate-500">
              Upload roof, facade, window, heating-system and meter photos.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[
                "Roof",
                "Facade",
                "Windows",
                "Heating System",
                "Energy Meter",
                "Floor",
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  className="flex min-h-44 flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <span className="text-lg font-black text-slate-950">
                    {category}
                  </span>

                  <span className="mt-2 text-sm text-slate-500">
                    Upload photos
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Documents" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              Project documents
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Document workspace
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Energy Label Certificate.pdf",
                "AI Renovation Report.pdf",
                "Existing Floor Plan.pdf",
                "Contractor Quotation.pdf",
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
                      Updated {index + 1} day{index === 0 ? "" : "s"} ago
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    View document
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Quotes" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              Contractor quotes
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Compare quotations
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                {
                  company: "GreenBuild",
                  price: "€14,850",
                  status: "Recommended",
                },
                {
                  company: "EcoRenovatie",
                  price: "€16,200",
                  status: "Received",
                },
                {
                  company: "HomeEnergy NL",
                  price: "€17,100",
                  status: "Under review",
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
                    Review quote
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Tasks" && (
          <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              Project tasks
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Renovation checklist
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Upload roof photos",
                  completed: true,
                },
                {
                  title: "Review AI renovation report",
                  completed: true,
                },
                {
                  title: "Compare insulation products",
                  completed: false,
                },
                {
                  title: "Request contractor quotations",
                  completed: false,
                },
                {
                  title: "Schedule installation",
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