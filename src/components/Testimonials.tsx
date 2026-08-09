import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Euro,
  Home,
  Leaf,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const examples = [
  {
    icon: Home,
    category: "Energy performance",
    title: "Improve the energy performance of your home",
    description:
      "Explore how insulation, glazing and heating upgrades could improve your home's overall energy performance.",
    insight: "Energy label improvement",
    value: "D → B",
  },
  {
    icon: Euro,
    category: "Costs & savings",
    title: "Understand the financial impact",
    description:
      "Compare indicative investment costs, available subsidies and potential energy savings before making a decision.",
    insight: "Potential yearly saving",
    value: "€890",
  },
  {
    icon: Leaf,
    category: "Sustainability",
    title: "Explore your renovation impact",
    description:
      "See how different renovation measures could reduce energy use and improve the environmental performance of your home.",
    insight: "Potential CO₂ reduction",
    value: "32%",
  },
];

const capabilities = [
  {
    icon: BarChart3,
    title: "Energy insights",
    text: "Understand where your home could perform better.",
  },
  {
    icon: Lightbulb,
    title: "Prioritised improvements",
    text: "Identify renovation measures worth considering first.",
  },
  {
    icon: Euro,
    title: "Cost indications",
    text: "Review indicative costs, savings and subsidy opportunities.",
  },
  {
    icon: CheckCircle2,
    title: "Clear next steps",
    text: "Turn renovation insights into a structured plan.",
  },
];

export default function Testimonials() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
            <Sparkles className="h-4 w-4" />
            Renovation insights
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Understand the impact
            <span className="block text-orange-500">
              before you renovate.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Bouwiser helps you explore renovation opportunities, compare
            potential outcomes and make more informed decisions for your home.
          </p>
        </motion.div>

        {/* Example cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {examples.map((example, index) => {
            const Icon = example.icon;

            return (
              <motion.article
                key={example.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-orange-200 hover:shadow-[0_28px_80px_rgba(15,23,42,0.10)]"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    Illustrative example
                  </span>
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
                  {example.category}
                </p>

                <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                  {example.title}
                </h3>

                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {example.description}
                </p>

                {/* Example result */}
                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    {example.insight}
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    {example.value}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Example only. Actual results depend on your property,
                    renovation measures and available data.
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* What Bouwiser provides */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-10 rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] sm:p-8"
        >
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
              What Bouwiser helps you evaluate
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-10 overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-r from-orange-50 via-white to-emerald-50 p-7 sm:p-9"
        >
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <TrendingUp className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  Ready to explore your home?
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  Start with the Bouwiser AI Home Scan to identify potential
                  renovation opportunities and create a clearer starting point
                  for your renovation journey.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="group inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 px-6 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Start AI Home Scan
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}