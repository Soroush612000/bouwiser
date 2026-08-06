import { useState } from "react";
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

export default function ProjectDetails() {
  const { id } = useParams();

  const [activeMenu, setActiveMenu] = useState("projects");
  const [activeTab, setActiveTab] = useState("Overview");

  const project = projects.find(
    (item) => item.id === Number(id),
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
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