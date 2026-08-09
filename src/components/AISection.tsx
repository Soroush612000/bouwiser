import {
  ArrowRight,
  BarChart3,
  Bot,
  Camera,
  Euro,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AISection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">
              <Sparkles className="h-4 w-4" />
              AI Home Scan
            </div>

            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
              See what your home
              <br />
              could improve.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Add a few photos and basic information about your home.
              Bouwiser helps identify renovation opportunities and gives
              you a personalised starting point.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Energy and performance insights
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <Bot className="h-5 w-5 text-orange-500" />
                Renovation recommendations
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <Euro className="h-5 w-5 text-orange-500" />
                Indicative costs and savings
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="group mt-9 inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Start AI Home Scan
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Results are indicative and intended to support renovation
              planning and decision-making.
            </p>
          </div>

          {/* Right - simplified preview */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="rounded-[22px] bg-white p-6 sm:p-8">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Camera className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold text-slate-950">
                      Home analysis preview
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      Example Bouwiser guidance
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Example
                </span>
              </div>

              <div className="py-7">
                <p className="text-sm font-medium text-slate-500">
                  Renovation opportunity
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  Improve insulation before upgrading the heating system
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Based on the example home profile, improving roof and wall
                  insulation could reduce heat loss and improve the impact of
                  future heating upgrades.
                </p>
              </div>

              <div className="grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Energy impact
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    High
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Cost indication
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    Medium
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Priority
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    Recommended
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}