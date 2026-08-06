import {
    ArrowRight,
    BadgeCheck,
    Euro,
    Home,
    Leaf,
    MapPin,
    Quote,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
  } from "lucide-react";
  import { motion } from "framer-motion";
  
  const testimonials = [
    {
      name: "Sophie van Dijk",
      location: "Utrecht",
      role: "Homeowner",
      initials: "SD",
      quote:
        "Bouwiser helped us understand which improvements would have the biggest impact. We upgraded our insulation and heating system without exceeding our budget.",
      beforeLabel: "D",
      afterLabel: "B",
      annualSaving: "€920",
      co2Reduction: "31%",
      project: "Insulation & heat pump",
      featured: true,
    },
    {
      name: "Mark de Vries",
      location: "Eindhoven",
      role: "Homeowner",
      initials: "MV",
      quote:
        "The renovation roadmap made the whole process much easier. We could compare costs, subsidies and expected savings before making any decisions.",
      beforeLabel: "E",
      afterLabel: "B",
      annualSaving: "€1,140",
      co2Reduction: "38%",
      project: "Solar panels & roof insulation",
      featured: false,
    },
    {
      name: "Laura Jansen",
      location: "Rotterdam",
      role: "Property owner",
      initials: "LJ",
      quote:
        "I finally had one clear overview of the renovation options for my property. The recommendations were practical, transparent and easy to follow.",
      beforeLabel: "C",
      afterLabel: "A",
      annualSaving: "€760",
      co2Reduction: "27%",
      project: "Glass & ventilation",
      featured: false,
    },
  ];
  
  const trustStats = [
    {
      value: "4.9/5",
      label: "Average rating",
      icon: Star,
    },
    {
      value: "92%",
      label: "Would recommend",
      icon: BadgeCheck,
    },
    {
      value: "€890",
      label: "Average yearly saving",
      icon: Euro,
    },
    {
      value: "32%",
      label: "Average CO₂ reduction",
      icon: Leaf,
    },
  ];
  
  export default function Testimonials() {
    return (
      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl" />
  
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)",
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
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
              <Sparkles className="h-4 w-4" />
              Customer stories
            </div>
  
            <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Smarter renovation decisions,
              <span className="block text-orange-500">real results</span>
            </h2>
  
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              See how homeowners use Bouwiser to improve energy performance,
              reduce costs and renovate with greater confidence.
            </p>
          </motion.div>
  
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[30px] border p-7 transition-all duration-300 ${
                  testimonial.featured
                    ? "border-orange-200 bg-gradient-to-br from-orange-50 via-white to-white shadow-[0_30px_80px_rgba(249,115,22,0.12)]"
                    : "border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
                }`}
              >
                {testimonial.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                    Featured story
                  </div>
                )}
  
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-5 w-5 fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
  
                  <Quote className="h-9 w-9 text-orange-100 transition-colors group-hover:text-orange-200" />
                </div>
  
                <blockquote className="mt-7 min-h-[168px] text-lg font-medium leading-8 text-slate-700">
                  “{testimonial.quote}”
                </blockquote>
  
                <div className="mt-7 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        Energy improvement
                      </p>
  
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl font-black text-orange-600">
                          {testimonial.beforeLabel}
                        </div>
  
                        <ArrowRight className="h-5 w-5 text-slate-400" />
  
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl font-black text-emerald-600">
                          {testimonial.afterLabel}
                        </div>
                      </div>
                    </div>
  
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Annual saving</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        {testimonial.annualSaving}
                      </p>
                    </div>
                  </div>
  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-3">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs text-slate-500">
                          CO₂ reduction
                        </span>
                      </div>
  
                      <p className="mt-1 font-black text-slate-950">
                        {testimonial.co2Reduction}
                      </p>
                    </div>
  
                    <div className="rounded-xl bg-white p-3">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-violet-500" />
                        <span className="text-xs text-slate-500">Project</span>
                      </div>
  
                      <p className="mt-1 truncate text-sm font-bold text-slate-950">
                        {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
  
                <div className="mt-7 flex items-center gap-4 border-t border-slate-200 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-black text-white">
                    {testimonial.initials}
                  </div>
  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-950">
                        {testimonial.name}
                      </p>
  
                      <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    </div>
  
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <span>{testimonial.role}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
  
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="mt-10 grid gap-4 rounded-[30px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:grid-cols-2 lg:grid-cols-4"
          >
            {trustStats.map((stat) => {
              const Icon = stat.icon;
  
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Icon className="h-5 w-5" />
                  </div>
  
                  <div>
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="mt-10 overflow-hidden rounded-[30px] border border-orange-200 bg-gradient-to-r from-orange-50 via-white to-emerald-50 p-7 sm:p-9"
          >
            <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                  <TrendingUp className="h-7 w-7" />
                </div>
  
                <div>
                  <h3 className="text-2xl font-black text-slate-950">
                    Ready to improve your home?
                  </h3>
  
                  <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                    Start with a personalized AI home scan and discover your
                    renovation opportunities, potential savings and next best
                    actions.
                  </p>
                </div>
              </div>
  
              <button
                type="button"
                className="group inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 px-6 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Start Your Scan
  
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }