import {
    ArrowRight,
    CheckCircle2,
    PlayCircle,
    Sparkles,
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import heroImage from "@/assets/dutch-house.jpg";
  
  export default function Hero() {
    const navigate = useNavigate();
  
    return (
      <section className="relative isolate overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-orange-100/80 blur-3xl" />
          <div className="absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-slate-100 blur-3xl" />
  
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
  
        <div className="mx-auto grid min-h-[740px] max-w-7xl items-center gap-16 px-6 pb-20 pt-14 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-6 gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 font-semibold text-orange-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              AI-powered renovation guidance
            </Badge>
  
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[74px]">
              Renovate{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Smarter.
              </span>
  
              <br />
  
              Live{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Better.
              </span>
            </h1>
  
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Upload your home. Receive an AI renovation plan in minutes with
              energy insights, savings estimation and personalized
              recommendations.
            </p>
  
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={() => navigate("/ai-scan")}
                className="group h-13 rounded-full bg-orange-500 px-8 text-base font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/30"
              >
                Start Your Renovation Scan
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
  
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-13 rounded-full border-slate-300 bg-white px-8 text-base font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-slate-50"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                How It Works
              </Button>
            </div>
  
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-7">
              <div>
                <p className="text-2xl font-black text-slate-950">AI</p>
                <p className="mt-1 text-sm text-slate-500">Smart guidance</p>
              </div>
  
              <div>
                <p className="text-2xl font-black text-slate-950">A–G</p>
                <p className="mt-1 text-sm text-slate-500">Energy insights</p>
              </div>
  
              <div>
                <p className="text-2xl font-black text-slate-950">100%</p>
                <p className="mt-1 text-sm text-slate-500">Personalized</p>
              </div>
            </div>
  
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No technical knowledge needed
              </span>
  
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Results in a few minutes
              </span>
            </div>
          </div>
  
          <div className="relative">
            <div className="absolute inset-8 -z-10 rounded-[56px] bg-gradient-to-br from-orange-200/70 via-violet-100/50 to-slate-100 blur-3xl" />
  
            <div className="relative overflow-hidden rounded-[40px] border border-slate-200/80 bg-white/90 p-4 shadow-2xl backdrop-blur-md">
              <img
                src={heroImage}
                alt="Dutch detached house with Bouwiser renovation analysis"
                className="h-[460px] w-full rounded-[36px] object-cover transition duration-500 hover:scale-[1.02] sm:h-[560px]"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }