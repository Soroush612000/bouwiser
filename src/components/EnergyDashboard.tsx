import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Home,
  Leaf,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const metrics = [
  {
    title: "Annual Saving",
    value: "€980",
    description: "Estimated yearly energy saving",
    icon: CircleDollarSign,
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "CO₂ Reduction",
    value: "31%",
    description: "Lower household emissions",
    icon: Leaf,
    iconClass: "bg-green-100 text-green-600",
  },
  {
    title: "Home Value",
    value: "+€22K",
    description: "Estimated property value increase",
    icon: TrendingUp,
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    title: "Payback Period",
    value: "6.2 yrs",
    description: "Expected return on investment",
    icon: Gauge,
    iconClass: "bg-orange-100 text-orange-600",
  },
];

const upgrades = [
  {
    name: "Roof insulation",
    saving: "€310/year",
    progress: 92,
  },
  {
    name: "Triple glazing",
    saving: "€220/year",
    progress: 76,
  },
  {
    name: "Hybrid heat pump",
    saving: "€290/year",
    progress: 84,
  },
  {
    name: "Solar panels",
    saving: "€160/year",
    progress: 68,
  },
];

export default function EnergyDashboard() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-28">
      <div className="absolute left-[-160px] top-10 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
            Home Energy Dashboard
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
            See your home’s full energy potential
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Understand your current energy performance, possible savings,
            recommended upgrades, subsidies, and expected return on investment.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Current Energy Performance
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Your energy score
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Zap className="h-6 w-6 text-orange-400" />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-5">
              <div className="rounded-3xl bg-white/10 p-6 text-center">
                <p className="text-sm text-slate-400">
                  Current label
                </p>

                <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500 text-5xl font-black">
                  D
                </div>
              </div>

              <ArrowRight className="h-7 w-7 text-slate-500" />

              <div className="rounded-3xl bg-white/10 p-6 text-center">
                <p className="text-sm text-slate-400">
                  Potential label
                </p>

                <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 text-5xl font-black">
                  B
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Energy score
                </span>

                <span className="font-bold text-white">
                  67 / 100
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "67%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <BadgeEuro className="h-5 w-5 text-orange-400" />

                <p className="mt-4 text-sm text-slate-400">
                  Estimated investment
                </p>

                <p className="mt-1 text-2xl font-black">
                  €12,800
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Home className="h-5 w-5 text-emerald-400" />

                <p className="mt-4 text-sm text-slate-400">
                  Available subsidies
                </p>

                <p className="mt-1 text-2xl font-black">
                  €4,350
                </p>
              </div>
            </div>

            <Button className="mt-8 h-12 w-full rounded-xl bg-orange-500 text-base text-white hover:bg-orange-600">
              View Full Energy Roadmap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="space-y-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-5 text-sm font-medium text-slate-500">
                      {metric.title}
                    </p>

                    <p className="mt-1 text-3xl font-black text-slate-950">
                      {metric.value}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {metric.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[30px] border border-slate-200 bg-slate-50 p-7 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
                    Recommended upgrades
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    Best next steps for your home
                  </h3>
                </div>

                <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                  Label B achievable
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {upgrades.map((upgrade, index) => (
                  <div key={upgrade.name}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                        <span className="font-semibold text-slate-800">
                          {upgrade.name}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-600">
                        {upgrade.saving}
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${upgrade.progress}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}