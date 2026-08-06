import {
  BadgeEuro,
  CircleDollarSign,
  PiggyBank,
  TrendingDown,
  WalletCards,
} from "lucide-react";

import type { ProjectData } from "../../data/project";

interface BudgetCardProps {
  project: ProjectData;
}

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

export default function BudgetCard({
  project,
}: BudgetCardProps) {
  const totalBudget = parseEuro(project.budget);
  const subsidy = parseEuro(project.subsidy);
  const netInvestment = Math.max(totalBudget - subsidy, 0);
  const subsidyPercentage =
    totalBudget > 0 ? Math.round((subsidy / totalBudget) * 100) : 0;

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
            Project budget
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Financial overview
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Review the planned investment, estimated subsidy, annual savings
            and expected payback period.
          </p>
        </div>

        <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700">
          {subsidyPercentage}% subsidy coverage
        </span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <WalletCards className="h-6 w-6" />
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            Total budget
          </p>

          <p className="mt-2 text-3xl font-black text-slate-950">
            {project.budget}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Planned renovation investment
          </p>
        </article>

        <article className="rounded-[24px] border border-blue-100 bg-blue-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <BadgeEuro className="h-6 w-6" />
          </div>

          <p className="mt-5 text-sm font-semibold text-blue-700">
            Estimated subsidy
          </p>

          <p className="mt-2 text-3xl font-black text-blue-950">
            {project.subsidy}
          </p>

          <p className="mt-2 text-sm text-blue-700">
            Potential government support
          </p>
        </article>

        <article className="rounded-[24px] border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CircleDollarSign className="h-6 w-6" />
          </div>

          <p className="mt-5 text-sm font-semibold text-emerald-700">
            Annual saving
          </p>

          <p className="mt-2 text-3xl font-black text-emerald-950">
            {project.annualSaving}
          </p>

          <p className="mt-2 text-sm text-emerald-700">
            Expected yearly energy saving
          </p>
        </article>

        <article className="rounded-[24px] border border-violet-100 bg-violet-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <PiggyBank className="h-6 w-6" />
          </div>

          <p className="mt-5 text-sm font-semibold text-violet-700">
            Payback period
          </p>

          <p className="mt-2 text-3xl font-black text-violet-950">
            {project.roi}
          </p>

          <p className="mt-2 text-sm text-violet-700">
            Estimated return on investment
          </p>
        </article>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[26px] bg-slate-950 p-6 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-slate-400">
                Estimated net investment
              </p>

              <p className="mt-3 text-4xl font-black">
                {formatEuro(netInvestment)}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Total budget after estimated subsidy
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <TrendingDown className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Subsidy contribution
              </span>

              <span className="font-black">
                {subsidyPercentage}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                style={{ width: `${subsidyPercentage}%` }}
              />
            </div>
          </div>
        </article>

        <article className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-orange-500">
            Financial insight
          </p>

          <h3 className="mt-3 text-xl font-black text-slate-950">
            Renovation affordability
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            The current renovation plan combines subsidy support and expected
            yearly savings to reduce the effective investment.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4">
              <span className="text-sm font-semibold text-slate-500">
                Gross investment
              </span>

              <span className="font-black text-slate-950">
                {project.budget}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white p-4">
              <span className="text-sm font-semibold text-slate-500">
                Subsidy reduction
              </span>

              <span className="font-black text-emerald-600">
                − {project.subsidy}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-4">
              <span className="text-sm font-semibold text-orange-700">
                Net investment
              </span>

              <span className="font-black text-orange-950">
                {formatEuro(netInvestment)}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}