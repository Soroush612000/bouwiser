import { ArrowRight, BadgeEuro, Gauge, Leaf, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const measures = [
  { title: "Roof insulation", impact: "High", saving: "€310/year", result: "D → C" },
  { title: "Triple glazing", impact: "High", saving: "€220/year", result: "C → B" },
  { title: "Hybrid heat pump", impact: "Medium", saving: "€290/year", result: "B potential" },
];

export default function Energy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                <Zap className="h-4 w-4" /> Energy improvement
              </div>
              <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">Improve your home’s energy performance</h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">Explore renovation measures that can reduce energy use, improve comfort and support a better energy label.</p>
              <button type="button" onClick={() => navigate("/ai-scan")} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">
                Analyse My Home <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><Gauge className="h-7 w-7 text-orange-500" /><p className="mt-5 text-sm font-bold text-slate-500">Current example</p><p className="mt-2 text-4xl font-black">Label D</p><p className="mt-3 text-sm leading-6 text-slate-500">Bouwiser evaluates the current profile before recommending upgrades.</p></article>
            <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><Leaf className="h-7 w-7 text-emerald-500" /><p className="mt-5 text-sm font-bold text-slate-500">Improvement potential</p><p className="mt-2 text-4xl font-black">Label B</p><p className="mt-3 text-sm leading-6 text-slate-500">Measures are prioritized by impact, indicative cost and sustainability.</p></article>
            <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><BadgeEuro className="h-7 w-7 text-violet-500" /><p className="mt-5 text-sm font-bold text-slate-500">Indicative saving</p><p className="mt-2 text-4xl font-black">€980/year</p><p className="mt-3 text-sm leading-6 text-slate-500">Prototype estimate; later versions will calculate this from live project data.</p></article>
          </div>

          <div className="mx-auto mt-10 max-w-7xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black">Example renovation measures</h2>
            <div className="mt-7 grid gap-4">
              {measures.map((measure) => (
                <div key={measure.title} className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-4 sm:items-center">
                  <p className="font-black">{measure.title}</p><p className="text-sm text-slate-500">Impact: {measure.impact}</p><p className="text-sm font-bold text-emerald-600">{measure.saving}</p><p className="text-sm font-bold text-orange-600">{measure.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
