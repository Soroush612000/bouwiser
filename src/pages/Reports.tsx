import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  FileText,
  Gauge,
  Home,
  Leaf,
  LoaderCircle,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardSidebar from "../components/DashboardSidebar";
import { supabase } from "@/utils/supabase";

type ReportProject = {
  id: number;
  project_name: string | null;
  street_address: string | null;
  city: string | null;
  postal_code: string | null;
  property_type: string | null;
  current_energy_label: string | null;
  target_energy_label: string | null;
  annual_saving: number | null;
  ai_score: number | null;
  co2_reduction: number | null;
  renovation_goal: string | null;
  scan_status: string | null;
  updated_at: string | null;
};

function euro(value: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function date(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function Reports() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("reports");
  const [projects, setProjects] = useState<ReportProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadReports = async () => {
      setLoading(true);
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!mounted) return;
      if (!user) {
        navigate("/", { replace: true });
        return;
      }

      const { data, error: queryError } = await supabase
        .from("Projects")
        .select(`
          id, project_name, street_address, city, postal_code, property_type,
          current_energy_label, target_energy_label, annual_saving, ai_score,
          co2_reduction, renovation_goal, scan_status, updated_at
        `)
        .eq("user_id", user.id)
        .eq("scan_status", "completed")
        .order("updated_at", { ascending: false });

      if (!mounted) return;

      if (queryError) {
        console.error(queryError);
        setError("Could not load your reports.");
      } else {
        setProjects((data ?? []) as ReportProject[]);
      }
      setLoading(false);
    };

    void loadReports();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const latest = projects[0] ?? null;
  const goals = useMemo(
    () =>
      String(latest?.renovation_goal ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [latest],
  );

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar activeItem={activeItem} onSelect={setActiveItem} />
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">
              Reports
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Your renovation reports
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-500">
              Review completed AI Home Scan results, energy improvement potential
              and renovation recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/ai-scan")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Sparkles className="h-4 w-4" />
            New AI Home Scan
          </button>
        </div>

        {loading && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LoaderCircle className="h-5 w-5 animate-spin text-orange-500" />
            <span className="font-semibold text-slate-600">Loading reports…</span>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 font-semibold text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && !latest && (
          <section className="mt-8 rounded-[30px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <FileText className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-3xl font-black text-slate-950">
              No completed reports yet
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Complete an AI Home Scan and Bouwiser will create your first renovation report.
            </p>
            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-orange-500"
            >
              Start AI Home Scan
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}

        {!loading && !error && latest && (
          <>
            <section className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                <div className="p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-orange-500">
                        <FileText className="h-4 w-4" />
                        Latest AI Home Report
                      </div>
                      <h2 className="mt-3 text-3xl font-black text-slate-950">
                        {latest.project_name || "Home renovation report"}
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {[latest.street_address, latest.city, latest.postal_code]
                            .filter(Boolean)
                            .join(", ") || "Address not provided"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" />
                          {date(latest.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Metric
                      icon={Gauge}
                      label="Energy label"
                      value={`${latest.current_energy_label || "?"} → ${latest.target_energy_label || "?"}`}
                    />
                    <Metric
                      icon={Leaf}
                      label="Annual saving"
                      value={euro(latest.annual_saving)}
                    />
                    <Metric
                      icon={Zap}
                      label="CO₂ reduction"
                      value={latest.co2_reduction == null ? "—" : `${latest.co2_reduction}%`}
                    />
                    <Metric
                      icon={Bot}
                      label="AI confidence"
                      value={latest.ai_score == null ? "—" : `${latest.ai_score}%`}
                    />
                  </div>

                  {goals.length > 0 && (
                    <div className="mt-7">
                      <p className="text-sm font-black text-slate-900">
                        Recommended focus
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {goals.map((goal) => (
                          <span
                            key={goal}
                            className="rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm font-bold text-orange-700"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden bg-slate-950 p-7 text-white lg:p-8">
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                      <FileText className="h-7 w-7" />
                    </div>
                    <p className="mt-7 text-sm font-semibold text-slate-400">
                      Report status
                    </p>
                    <p className="mt-1 text-2xl font-black">Analysis completed</p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      This report uses the information saved during your completed AI Home Scan.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${latest.id}`)}
                      className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-orange-50"
                    >
                      View full report
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {projects.length > 1 && (
              <section className="mt-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-500">
                      Report history
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Previous reports
                    </h2>
                  </div>
                  <span className="text-sm font-semibold text-slate-400">
                    {projects.length} reports
                  </span>
                </div>

                <div className="mt-5 grid gap-4">
                  {projects.slice(1).map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600">
                        <Home className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-black text-slate-950">
                          {project.project_name || "Home renovation report"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {date(project.updated_at)} · {project.current_energy_label || "?"} → {project.target_energy_label || "?"}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Home;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-orange-500" />
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
    </article>
  );
}