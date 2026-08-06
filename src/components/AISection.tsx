import {
    ArrowRight,
    Camera,
    CheckCircle2,
    Sparkles,
    Upload,
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  
  const analysisItems = [
    "Energy Label Prediction",
    "Solar Panel Potential",
    "Heat Pump Recommendation",
    "Insulation Advice",
    "Estimated Renovation Cost",
    "Return on Investment",
    "Available Subsidies",
  ];
  
  export default function AISection() {
    return (
      <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-28">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
        <div className="absolute right-[-100px] bottom-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />
  
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
              <Sparkles className="h-4 w-4" />
              AI Home Scan
            </div>
  
            <h2 className="mt-6 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
              Let AI inspect your home
            </h2>
  
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Upload a few photos of your property and receive a personalized
              renovation analysis, energy insights, cost estimates, and a clear
              improvement roadmap within minutes.
            </p>
          </div>
  
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="relative rounded-[28px] border border-dashed border-orange-300 bg-white p-8 shadow-sm sm:p-10">
              <div className="absolute right-6 top-6 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                Step 1
              </div>
  
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                <Upload className="h-8 w-8 text-orange-600" />
              </div>
  
              <h3 className="mt-8 text-2xl font-black text-slate-950">
                Upload your home
              </h3>
  
              <p className="mt-3 max-w-md leading-7 text-slate-600">
                Add exterior, roof, window, heating system, and insulation photos.
                Bouwiser will organize and analyze them automatically.
              </p>
  
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <Camera className="mx-auto h-9 w-9 text-slate-400" />
  
                <p className="mt-4 font-semibold text-slate-800">
                  Drag and drop your photos here
                </p>
  
                <p className="mt-1 text-sm text-slate-500">
                  PNG, JPG or WEBP
                </p>
              </div>
  
              <Button className="mt-8 h-12 w-full rounded-xl bg-orange-500 text-base text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">
                <Camera className="mr-2 h-5 w-5" />
                Start AI Scan
              </Button>
  
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  No technical knowledge needed
                </div>
  
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Results in a few minutes
                </div>
              </div>
            </div>
  
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                    <Sparkles className="h-5 w-5 text-orange-600" />
                  </div>
  
                  <div>
                    <p className="font-bold text-slate-950">
                      AI Analysis Preview
                    </p>
                    <p className="text-sm text-slate-500">
                      Personalized for your property
                    </p>
                  </div>
                </div>
  
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Smart analysis
                </div>
              </div>
  
              <div className="mt-8 space-y-3">
                {analysisItems.map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-orange-200 hover:bg-orange-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-500 shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>
  
                      <span className="font-medium text-slate-800">
                        {item}
                      </span>
                    </div>
  
                    <ArrowRight className="h-4 w-4 text-orange-500 transition group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
  
              <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
                <p className="text-sm text-slate-300">
                  Example recommendation
                </p>
  
                <p className="mt-2 text-xl font-bold">
                  Improve energy label from D to B
                </p>
  
                <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-2xl font-black">€890</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Annual savings
                    </p>
                  </div>
  
                  <div>
                    <p className="text-2xl font-black">32%</p>
                    <p className="mt-1 text-xs text-slate-400">
                      CO₂ reduction
                    </p>
                  </div>
  
                  <div>
                    <p className="text-2xl font-black">6 yrs</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Payback period
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