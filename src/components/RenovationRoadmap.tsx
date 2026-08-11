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
import { useTranslation } from "react-i18next";

type StepStatus = "completed" | "current" | "next";

function getStatusStyles(status: StepStatus) {
  if (status === "completed") {
    return {
      card: "border-emerald-200 bg-emerald-50/40",
      icon: "bg-emerald-50 text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    };
  }

  if (status === "current") {
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
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("roadmap.steps.homeProfile.title"),
      description: t("roadmap.steps.homeProfile.description"),
      icon: Home,
      status: "completed" as StepStatus,
    },
    {
      number: "02",
      title: t("roadmap.steps.aiAnalysis.title"),
      description: t("roadmap.steps.aiAnalysis.description"),
      icon: Bot,
      status: "completed" as StepStatus,
    },
    {
      number: "03",
      title: t("roadmap.steps.recommendations.title"),
      description: t("roadmap.steps.recommendations.description"),
      icon: Sparkles,
      status: "current" as StepStatus,
    },
    {
      number: "04",
      title: t("roadmap.steps.costEstimate.title"),
      description: t("roadmap.steps.costEstimate.description"),
      icon: Euro,
      status: "next" as StepStatus,
    },
    {
      number: "05",
      title: t("roadmap.steps.compareProducts.title"),
      description: t("roadmap.steps.compareProducts.description"),
      icon: ClipboardCheck,
      status: "next" as StepStatus,
    },
    {
      number: "06",
      title: t("roadmap.steps.planRenovation.title"),
      description: t("roadmap.steps.planRenovation.description"),
      icon: CalendarDays,
      status: "next" as StepStatus,
    },
  ];

  const summaryItems = [
    {
      label: t("roadmap.summary.subsidy"),
      value: "€2,400",
      icon: Coins,
    },
    {
      label: t("roadmap.summary.annualSavings"),
      value: "€890",
      icon: TrendingUp,
    },
    {
      label: t("roadmap.summary.payback"),
      value: t("roadmap.summary.paybackValue"),
      icon: CalendarDays,
    },
  ];

  const statusText = (status: StepStatus) => {
    if (status === "completed") {
      return t("roadmap.status.completed");
    }

    if (status === "current") {
      return t("roadmap.status.current");
    }

    return t("roadmap.status.next");
  };

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
            {t("roadmap.label")}
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            {t("roadmap.titleLine1")}
            <br />
            {t("roadmap.titleLine2")}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t("roadmap.description")}
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
              {t("roadmap.exampleJourney")}
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
              const isCompleted = step.status === "completed";
              const isCurrent = step.status === "current";

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
                      {statusText(step.status)}
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
                  {t("roadmap.completion.title")}
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  <Check className="h-3.5 w-3.5" />
                  {t("roadmap.completion.targetAchieved")}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {t("roadmap.completion.description")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Zap className="h-4 w-4 text-orange-400" />
                <p className="mt-2 text-xs text-slate-400">
                  {t("roadmap.completion.energyLabel")}
                </p>
                <p className="mt-1 font-bold">B</p>
              </div>

              <div>
                <Leaf className="h-4 w-4 text-emerald-400" />
                <p className="mt-2 text-xs text-slate-400">
                  {t("roadmap.completion.co2Reduction")}
                </p>
                <p className="mt-1 font-bold">32%</p>
              </div>

              <div>
                <TrendingUp className="h-4 w-4 text-violet-400" />
                <p className="mt-2 text-xs text-slate-400">
                  {t("roadmap.completion.annualSaving")}
                </p>
                <p className="mt-1 font-bold">€890</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}