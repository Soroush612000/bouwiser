import { Link } from "react-router-dom";
import {
  Home,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  city: string;
  address: string;
  propertyType: string;
  currentEnergyLabel: string;
  targetEnergyLabel: string;
  progress: number;
  aiScore: number;
  estimatedBudget: number;
  annualSaving: number;
  status: string;
}

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-black group-hover:text-orange-500">
            {project.name}
          </h2>

          <div className="mt-3 space-y-2 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <Home size={16} />
              {project.propertyType}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {project.city}
            </div>

          </div>

        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
          {project.status}
        </span>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <div className="text-xs text-slate-500">
            Current
          </div>

          <div className="mt-2 text-3xl font-black text-orange-500">
            {project.currentEnergyLabel}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <div className="text-xs text-slate-500">
            Target
          </div>

          <div className="mt-2 text-3xl font-black text-emerald-500">
            {project.targetEnergyLabel}
          </div>
        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">

          <span>Progress</span>

          <span className="font-bold">
            {project.progress}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-200">

          <div
            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
            style={{ width: `${project.progress}%` }}
          />

        </div>

      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div>
          <div className="text-xs text-slate-500">
            Budget
          </div>

          <div className="font-black">
            €{project.estimatedBudget.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500">
            Saving
          </div>

          <div className="font-black">
            €{project.annualSaving}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500">
            AI Score
          </div>

          <div className="font-black">
            {project.aiScore}%
          </div>
        </div>

      </div>

      <div className="mt-8 flex items-center justify-end gap-2 font-bold text-orange-500">

        Open Project

        <ArrowRight size={18} />

      </div>

    </Link>
  );
}