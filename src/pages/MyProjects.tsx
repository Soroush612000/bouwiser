import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Euro,
  Filter,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Zap,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardSidebar from "../components/DashboardSidebar";
import { supabase } from "@/utils/supabase";

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

type DisplayProject = {
  id: number;
  name: string;
  propertyType: string;
  city: string;
  status: string;
  currentEnergyLabel: string;
  targetEnergyLabel: string;
  progress: number;
  budgetValue: number;
  budgetDisplay: string;
  annualSaving: number;
  roi: string;
  nextAction: string;
  aiScore: number;
  co2Reduction: number;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDisplayName(fullName: unknown, email?: string) {
  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

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

function normalizeProject(project: SupabaseProject): DisplayProject {
  const budgetValue = Number(project.budget ?? 0);
  const annualSaving = Number(project.annual_saving ?? 0);

  return {
    id: project.id,
    name: project.project_name?.trim() || "My Renovation Project",
    propertyType: project.property_type?.trim() || "Home",
    city: project.city?.trim() || "Unknown city",
    status: project.status?.trim() || "AI analysis completed",
    currentEnergyLabel: project.current_energy_label?.trim() || "?",
    targetEnergyLabel: project.target_energy_label?.trim() || "B",
    progress: Math.min(100, Math.max(0, Number(project.progress ?? 0))),
    budgetValue,
    budgetDisplay:
      budgetValue > 0 ? formatEuro(budgetValue) : "To be estimated",
    annualSaving,
    roi: project.roi?.trim() || "To be estimated",
    nextAction:
      project.next_action?.trim() ||
      "Review AI renovation recommendations",
    aiScore: Number(project.ai_score ?? 0),
    co2Reduction: Number(project.co2_reduction ?? 0),
  };
}

export default function MyProjects() {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("projects");
  const [searchQuery, setSearchQuery] = useState("");

  const [userName, setUserName] = useState("Homeowner");
  const [userInitial, setUserInitial] = useState("H");

  const [authLoading, setAuthLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProjectsForUser = async (userId: string) => {
      setProjectsLoading(true);
      setLoadError("");

      const { data, error } = await supabase
        .from("Projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.error("Could not load Bouwiser projects:", error);
        setProjects([]);
        setLoadError("We could not load your projects.");
        setProjectsLoading(false);
        return;
      }

      const normalizedProjects = ((data ?? []) as SupabaseProject[]).map(
        normalizeProject,
      );

      setProjects(normalizedProjects);
      setProjectsLoading(false);
    };

    const applySession = async (session: any) => {
      if (!mounted) return;

      if (!session?.user) {
        setAuthLoading(false);
        setProjectsLoading(false);
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

      await loadProjectsForUser(session.user.id);
    };

    const loadUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Could not load Bouwiser session:", error);
        setAuthLoading(false);
        setProjectsLoading(false);
        navigate("/", { replace: true });
        return;
      }

      await applySession(session);
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void applySession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) =>
      [
        project.name,
        project.city,
        project.propertyType,
        project.status,
        project.currentEnergyLabel,
        project.targetEnergyLabel,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query),
      ),
    );
  }, [projects, searchQuery]);

  const totalInvestment = useMemo(
    () =>
      projects.reduce(
        (sum, project) => sum + project.budgetValue,
        0,
      ),
    [projects],
  );

  const totalSavings = useMemo(
    () =>
      projects.reduce(
        (sum, project) => sum + project.annualSaving,
        0,
      ),
    [projects],
  );

  const activeProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.progress > 0 && project.progress < 100,
      ).length,
    [projects],
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading your Bouwiser projects...
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
              Project management
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              My Projects
            </h1>

            <p className="mt-2 text-slate-500">
              Track renovation progress, budgets and energy improvements.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/ai-scan")}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [
              "Total projects",
              String(projects.length),
              "All renovation projects",
              "text-emerald-600",
            ],
            [
              "Active projects",
              String(activeProjects),
              "Currently progressing",
              "text-orange-600",
            ],
            [
              "Total investment",
              formatEuro(totalInvestment),
              "Planned project budget",
              "text-slate-500",
            ],
            [
              "Estimated savings",
              formatEuro(totalSavings),
              "Per year",
              "text-emerald-600",
            ],
          ].map(([label, value, note, noteClass]) => (
            <article
              key={label}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {label}
              </p>

              <p className="mt-2 text-3xl font-black text-slate-950">
                {value}
              </p>

              <p className={`mt-2 text-sm ${noteClass}`}>
                {note}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Renovation projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all renovation plans.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search projects..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:bg-white sm:w-72"
                />
              </div>

              <button
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Filter className="h-5 w-5" />
                Filter
              </button>
            </div>
          </div>

          {projectsLoading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading projects from Bouwiser...
              </p>
            </div>
          ) : loadError ? (
            <div className="py-16 text-center">
              <p className="text-lg font-black text-slate-950">
                Could not load projects
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {loadError}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-7 grid gap-6 xl:grid-cols-2">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group rounded-[28px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                          <Home className="h-7 w-7" />
                        </div>

                        <div>
                          <h3 className="text-xl font-black text-slate-950">
                            {project.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {project.propertyType} · {project.city}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Project options"
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        {project.status}
                      </span>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        Label {project.currentEnergyLabel} →{" "}
                        {project.targetEnergyLabel}
                      </span>

                      {project.aiScore > 0 && (
                        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                          AI Score {project.aiScore}%
                        </span>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          Project progress
                        </span>

                        <span className="font-black text-slate-950">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Euro className="h-4 w-4" />

                          <span className="text-xs font-semibold">
                            Budget
                          </span>
                        </div>

                        <p className="mt-2 font-black text-slate-950">
                          {project.budgetDisplay}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-slate-500">
                          <CalendarDays className="h-4 w-4" />

                          <span className="text-xs font-semibold">
                            Payback
                          </span>
                        </div>

                        <p className="mt-2 font-black text-slate-950">
                          {project.roi}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Zap className="h-4 w-4" />

                        <span className="text-xs font-bold uppercase tracking-wide">
                          Next action
                        </span>
                      </div>

                      <p className="mt-2 font-bold text-emerald-950">
                        {project.nextAction}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/projects/${project.id}`)
                      }
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                    >
                      Open Project
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </article>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg font-black text-slate-950">
                    {projects.length === 0
                      ? "No projects yet"
                      : "No projects found"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {projects.length === 0
                      ? "Start your first AI Home Scan to create a renovation project."
                      : "Try a different project name, city or property type."}
                  </p>

                  {projects.length === 0 && (
                    <button
                      type="button"
                      onClick={() => navigate("/ai-scan")}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                    >
                      <Plus className="h-4 w-4" />
                      Start AI Home Scan
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
