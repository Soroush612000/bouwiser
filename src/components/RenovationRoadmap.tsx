import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Euro,
  Home,
  Leaf,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Home Profile",
    description:
      "Add your property details, energy label and renovation photos.",
    icon: Home,
    status: "Completed",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Bouwiser analyses energy performance and renovation opportunities.",
    icon: Bot,
    status: "Completed",
  },
  {
    number: "03",
    title: "Recommendations",
    description:
      "Receive prioritized improvements matched to your property and goals.",
    icon: Sparkles,
    status: "Current",
  },
  {
    number: "04",
    title: "Cost Estimate",
    description:
      "Review expected investment, subsidies, savings and payback period.",
    icon: Euro,
    status: "Next",
  },
  {
    number: "05",
    title: "Compare Products",
    description:
      "Compare materials, systems, products, installers and stores.",
    icon: ClipboardCheck,
    status: "Next",
  },
  {
    number: "06",
    title: "Plan Renovation",
    description:
      "Create your implementation schedule, budget and renovation roadmap.",
    icon: CalendarDays,
    status: "Next",
  },
];

const summaryItems = [
  {
    label: "Available subsidy",
    value: "€2,400",
    icon: Coins,
  },
  {
    label: "Annual savings",
    value: "€890",
    icon: TrendingUp,
  },
  {
    label: "Estimated payback",
    value: "6 years",
    icon: CalendarDays,
  },
];

function getStatusStyles(status: string) {
  if (status === "Completed") {
    return {
      card: "border-emerald-200 bg-emerald-50/40",
      icon: "bg-emerald-50 text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    };
  }

  if (status === "Current") {
    return {
      card: "border-orange-300 bg-orange-50/60",
      icon: "bg-orange-500 text-white",
      badge: "bg-orange-500 text-white",
      dot: "bg-orange-500",
    };
  }

  return {
    card: "border-slate-200 bg-white",
    icon: "bg-slate-100 text-slate-600",
    badge: "bg-slate-100 text-slate-500",
    dot: "bg-slate-300",
  };
}

export default function RenovationRoadmap() {
  return (
    <section className="border-t border-slate-100 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">
            <Wrench className="h-4 w-4" />
            Renovation roadmap
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            From first insight to
            <br />
            a clear renovation plan.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Bouwiser brings your renovation decisions into one structured
            journey, from understanding your home to comparing solutions and
            planning the work.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-10 max-w-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Example renovation journey
            </span>

            <span className="text-sm font-bold text-orange-600">
              45%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="h-full rounded-full bg-orange-500"
            />
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-12">
          <div className="absolute left-[8%] right-[8%] top-5 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const styles = getStatusStyles(step.status);
              const isCompleted = step.status === "Completed";
              const isCurrent = step.status === "Current";

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  className={`relative rounded-2xl border p-5 transition ${styles.card}`}
                >
                  <div
                    className={`absolute left-1/2 top-[-6px] hidden h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-white lg:block ${styles.dot}`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-bold text-slate-400">
                      {step.number}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <h3 className="font-bold text-slate-950">
                      {step.title}
                    </h3>

                    {isCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}

                    {isCurrent && (
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                    )}
                  </div>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                    >
                      {step.status}
                    </span>

                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-950">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Completion preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 px-6 py-6 text-white sm:px-7"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold">
                  Renovation complete
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  <Check className="h-3.5 w-3.5" />
                  Target achieved
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Bring recommendations, product choices, costs and planning
                together in one completed renovation journey.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Zap className="h-4 w-4 text-orange-400" />
                <p className="mt-2 text-xs text-slate-400">
                  Energy label
                </p>
                <p className="mt-1 font-bold">
                  B
                </p>
              </div>

              <div>
                <Leaf className="h-4 w-4 text-emerald-400" />
                <p className="mt-2 text-xs text-slate-400">
                  CO₂ reduction
                </p>
                <p className="mt-1 font-bold">
                  32%
                </p>
              </div>

              <div>
                <TrendingUp className="h-4 w-4 text-violet-400" />
                <p className="mt-2 text-xs text-slate-400">
                  Annual saving
                </p>
                <p className="mt-1 font-bold">
                  €890
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}