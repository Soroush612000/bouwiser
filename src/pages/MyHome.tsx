import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bot,
  Building2,
  Gauge,
  Home,
  Leaf,
  LoaderCircle,
  MapPin,
  Ruler,
  Sparkles,
  Zap,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardSidebar from "../components/DashboardSidebar";
import { supabase } from "@/utils/supabase";

type HomeProject = {
  id: number;
  project_name: string | null;
  property_type: string | null;
  construction_year: number | null;
  postal_code: string | null;
  city: string | null;
  floor_area: number | null;
  current_energy_label: string | null;
  target_energy_label: string | null;
  annual_gas_usage: number | null;
  annual_electricity_usage: number | null;
  annual_saving: number | null;
  ai_score: number | null;
  co2_reduction: number | null;
  renovation_goal: string | null;
  street_address: string | null;
  scan_status: string | null;
  scan_step: number | null;
  progress: number | null;
  updated_at: string | null;
};

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("nl-NL").format(value);
}

function formatEuro(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MyHome() {
  const navigate = useNavigate();
  const {} = useTranslation();

  const [activeItem, setActiveItem] = useState("my-home");
  const [project, setProject] = useState<HomeProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadHome = async () => {
      setLoading(true);
      setLoadError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (userError || !user) {
        navigate("/", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("Projects")
        .select(`
          id,
          project_name,
          property_type,
          construction_year,
          postal_code,
          city,
          floor_area,
          current_energy_label,
          target_energy_label,
          annual_gas_usage,
          annual_electricity_usage,
          annual_saving,
          ai_score,
          co2_reduction,
          renovation_goal,
          street_address,
          scan_status,
          scan_step,
          progress,
          updated_at
        `)
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("Could not load My Home:", error);
        setLoadError("Could not load your home information.");
        setLoading(false);
        return;
      }

      setProject((data ?? null) as HomeProject | null);
      setLoading(false);
    };

    void loadHome();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const goals = useMemo(
    () =>
      String(project?.renovation_goal ?? "")
        .split(",")
        .map((goal) => goal.trim())
        .filter(Boolean),
    [project],
  );

  const isCompleted = project?.scan_status === "completed";

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
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
              My Home
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Your home at a glance
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              View your property profile, energy status and the latest AI Home Scan results in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/ai-scan")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Sparkles className="h-4 w-4" />
            {project ? "Update AI Home Scan" : "Start AI Home Scan"}
          </button>
        </div>

        {loading && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LoaderCircle className="h-5 w-5 animate-spin text-orange-500" />
            <span className="font-semibold text-slate-600">Loading your home…</span>
          </div>
        )}

        {!loading && loadError && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {loadError}
          </div>
        )}

        {!loading && !loadError && !project && (
          <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Home className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-3xl font-black text-slate-950">
              Add your home to Bouwiser
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
              Complete the AI Home Scan to create your property profile and receive renovation recommendations.
            </p>

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-orange-500"
            >
              Start AI Home Scan
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}

        {!loading && !loadError && project && (
          <>
            <section className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                <div className="p-7 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                      <Home className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-orange-500">
                        Property profile
                      </p>

                      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                        {project.project_name || "My Home"}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {[project.street_address, project.city, project.postal_code]
                            .filter(Boolean)
                            .join(", ") || "Address not provided"}
                        </span>

                        {project.property_type && (
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="h-4 w-4" />
                            {project.property_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoCard
                      label="Year built"
                      value={project.construction_year ? String(project.construction_year) : "—"}
                      icon={Building2}
                    />

                    <InfoCard
                      label="Floor area"
                      value={project.floor_area ? `${formatNumber(project.floor_area)} m²` : "—"}
                      icon={Ruler}
                    />

                    <InfoCard
                      label="Gas use"
                      value={project.annual_gas_usage ? `${formatNumber(project.annual_gas_usage)} m³` : "—"}
                      icon={Gauge}
                    />

                    <InfoCard
                      label="Electricity"
                      value={project.annual_electricity_usage ? `${formatNumber(project.annual_electricity_usage)} kWh` : "—"}
                      icon={Zap}
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-7 text-white lg:p-8">
                  <p className="text-sm font-semibold text-slate-400">Latest scan</p>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-5xl font-black">
                        {project.ai_score ?? 0}%
                      </p>
                      <p className="mt-2 text-sm text-slate-400">AI confidence</p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                      <Bot className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Scan status</span>
                      <span className="font-bold">
                        {isCompleted ? "Completed" : "In progress"}
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400"
                        style={{ width: `${Math.max(0, Math.min(100, project.progress ?? 0))}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      isCompleted
                        ? navigate(`/projects/${project.id}`)
                        : navigate("/ai-scan")
                    }
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-orange-50"
                  >
                    {isCompleted ? "Open renovation project" : "Continue AI Home Scan"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <EnergyStatusCard
                currentLabel={project.current_energy_label}
                targetLabel={project.target_energy_label}
              />

              <MetricCard
                icon={Leaf}
                label="Estimated annual saving"
                value={formatEuro(project.annual_saving)}
                description="Potential yearly saving based on your latest scan."
              />

              <MetricCard
                icon={Zap}
                label="CO₂ reduction"
                value={
                  project.co2_reduction !== null &&
                  project.co2_reduction !== undefined
                    ? `${project.co2_reduction}%`
                    : "—"
                }
                description="Estimated reduction after the recommended improvements."
              />
            </div>

            <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
                    Renovation goals
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    What you want to improve
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
                >
                  View full project
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {goals.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {goals.map((goal) => (
                    <span
                      key={goal}
                      className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-slate-500">
                  No renovation goals have been selected yet.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Home;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-orange-500" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
    </article>
  );
}

function EnergyStatusCard({
  currentLabel,
  targetLabel,
}: {
  currentLabel: string | null;
  targetLabel: string | null;
}) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        <Gauge className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">Energy label</p>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-3xl font-black text-slate-950">
          {currentLabel || "?"}
        </span>

        <ArrowRight className="h-5 w-5 text-slate-300" />

        <span className="text-3xl font-black text-emerald-600">
          {targetLabel || "?"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Current label and predicted potential after recommended improvements.
      </p>
    </article>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof Home;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </article>
  );
}