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
  House,
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
    iconStyle: "bg-orange-500/15 text-orange-400",
  },
  {
    label: "Annual savings",
    value: "€890",
    icon: TrendingUp,
    iconStyle: "bg-emerald-500/15 text-emerald-400",
  },
  {
    label: "Estimated payback",
    value: "6 years",
    icon: CalendarDays,
    iconStyle: "bg-violet-500/15 text-violet-400",
  },
];

function getStatusStyles(status: string) {
  if (status === "Completed") {
    return {
      card: "border-emerald-400/20 bg-emerald-500/[0.06]",
      icon: "bg-emerald-500/15 text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400",
      dot: "bg-emerald-400",
    };
  }

  if (status === "Current") {
    return {
      card:
        "border-orange-400/60 bg-orange-500/[0.10] shadow-[0_24px_80px_rgba(249,115,22,0.15)]",
      icon: "bg-orange-500 text-white",
      badge: "bg-orange-500 text-white",
      dot: "bg-orange-400",
    };
  }

  return {
    card: "border-white/10 bg-white/[0.04]",
    icon: "bg-white/10 text-slate-300",
    badge: "bg-white/10 text-slate-400",
    dot: "bg-slate-600",
  };
}

export default function RenovationRoadmap() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-44 top-0 h-[460px] w-[460px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute -right-44 bottom-0 h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
            <Wrench className="h-4 w-4" />
            Renovation Roadmap
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            From home analysis to a clear renovation plan
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Bouwiser transforms complex renovation decisions into a simple,
            structured and personalized step-by-step journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-300">
              Renovation progress
            </span>

            <span className="font-black text-orange-400">45%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.35 }}
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-400"
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-semibold text-slate-500">
            <span>Home profile</span>
            <span>Recommendations</span>
            <span>Renovation complete</span>
          </div>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-emerald-400/60 via-orange-400/60 to-slate-700 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const styles = getStatusStyles(step.status);
              const isCompleted = step.status === "Completed";
              const isCurrent = step.status === "Current";

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-[28px] border p-6 backdrop-blur transition-all duration-300 ${styles.card}`}
                >
                  <div
                    className={`absolute left-1/2 top-[-11px] hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-slate-950 shadow-lg lg:block ${styles.dot}`}
                  />

                  {isCurrent && (
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-orange-400/30" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-13 w-13 items-center justify-center rounded-2xl ${styles.icon}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-sm font-black text-slate-600">
                      {step.number}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <h3 className="text-xl font-black">{step.title}</h3>

                    {isCompleted && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    )}

                    {isCurrent && (
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-400" />
                      </span>
                    )}
                  </div>

                  <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}
                    >
                      {step.status}
                    </span>

                    <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-10 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:grid-cols-3"
        >
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 transition hover:border-white/10 hover:bg-black/30"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-1 text-xl font-black">{item.value}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-[32px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-white/[0.04] to-orange-500/10 p-7 sm:p-9"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                <House className="h-8 w-8" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-black">
                    Renovation Complete
                  </h3>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                    Target achieved
                  </span>
                </div>

                <p className="mt-2 max-w-2xl leading-7 text-slate-400">
                  Complete the roadmap and transform your home into a more
                  comfortable, efficient and valuable property.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/[0.06] p-4 text-center">
                <Zap className="mx-auto h-5 w-5 text-orange-400" />
                <p className="mt-2 text-xs text-slate-400">Energy label</p>
                <p className="mt-1 text-xl font-black">B</p>
              </div>

              <div className="rounded-2xl bg-white/[0.06] p-4 text-center">
                <Leaf className="mx-auto h-5 w-5 text-emerald-400" />
                <p className="mt-2 text-xs text-slate-400">CO₂ reduction</p>
                <p className="mt-1 text-xl font-black">32%</p>
              </div>

              <div className="rounded-2xl bg-white/[0.06] p-4 text-center">
                <TrendingUp className="mx-auto h-5 w-5 text-violet-400" />
                <p className="mt-2 text-xs text-slate-400">Annual saving</p>
                <p className="mt-1 text-xl font-black">€890</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}