import {
  BadgeEuro,
  CircleDollarSign,
  Clock3,
  WalletCards,
} from "lucide-react";

import type { ProjectData } from "../../data/project";

interface KPICardsProps {
  project: ProjectData;
}

const icons = [
  WalletCards,
  BadgeEuro,
  CircleDollarSign,
  Clock3,
];

const iconStyles = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
];

export default function KPICards({
  project,
}: KPICardsProps) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {project.kpis.map((kpi, index) => {
        const Icon = icons[index] ?? WalletCards;
        const iconStyle =
          iconStyles[index] ?? "bg-slate-100 text-slate-600";

        return (
          <article
            key={kpi.label}
            className="group rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconStyle}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 transition group-hover:bg-orange-50 group-hover:text-orange-600">
                Overview
              </span>
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-500">
              {kpi.label}
            </p>

            <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {kpi.value}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {kpi.description}
            </p>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "w-[78%] bg-orange-500"
                    : index === 1
                      ? "w-[62%] bg-blue-500"
                      : index === 2
                        ? "w-[71%] bg-emerald-500"
                        : "w-[55%] bg-violet-500"
                }`}
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}