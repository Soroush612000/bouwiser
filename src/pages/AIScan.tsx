import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Flame,
  Goal,
  Home,
  ImagePlus,
  Leaf,
  LoaderCircle,
  MapPin,
  Ruler,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Upload,
  WandSparkles,
  Zap,
} from "lucide-react";

type PropertyType =
  | "Detached house"
  | "Semi-detached house"
  | "Terraced house"
  | "Apartment";

type GoalType =
  | "Lower energy bills"
  | "Improve comfort"
  | "Increase home value"
  | "Install solar panels"
  | "Install a heat pump"
  | "Improve insulation";

interface PropertyForm {
  address: string;
  city: string;
  postalCode: string;
  propertyType: PropertyType | "";
  yearBuilt: string;
  floorArea: string;
  energyLabel: string;
  gasUsage: string;
  electricityUsage: string;
  goals: GoalType[];
}

const steps = [
  {
    id: 1,
    title: "Property",
    description: "Basic details",
    icon: Home,
  },
  {
    id: 2,
    title: "Photos",
    description: "Home images",
    icon: ImagePlus,
  },
  {
    id: 3,
    title: "Energy",
    description: "Usage profile",
    icon: Zap,
  },
  {
    id: 4,
    title: "Goals",
    description: "Your priorities",
    icon: Goal,
  },
  {
    id: 5,
    title: "Analysis",
    description: "AI assessment",
    icon: Bot,
  },
];

const propertyTypes: {
  label: PropertyType;
  icon: typeof Home;
}[] = [
  { label: "Detached house", icon: Home },
  { label: "Semi-detached house", icon: Building2 },
  { label: "Terraced house", icon: Building2 },
  { label: "Apartment", icon: Building2 },
];

const photoCategories = [
  "Front facade",
  "Back facade",
  "Roof",
  "Windows",
  "Heating system",
  "Meter cupboard",
];

const renovationGoals: {
  label: GoalType;
  icon: typeof Leaf;
  description: string;
}[] = [
  {
    label: "Lower energy bills",
    icon: Zap,
    description: "Reduce monthly gas and electricity costs.",
  },
  {
    label: "Improve comfort",
    icon: Home,
    description: "Create a warmer and more comfortable home.",
  },
  {
    label: "Increase home value",
    icon: Building2,
    description: "Improve long-term property value.",
  },
  {
    label: "Install solar panels",
    icon: SunMedium,
    description: "Generate renewable electricity at home.",
  },
  {
    label: "Install a heat pump",
    icon: Flame,
    description: "Upgrade to efficient low-carbon heating.",
  },
  {
    label: "Improve insulation",
    icon: Ruler,
    description: "Reduce heat loss through roof, walls and floor.",
  },
];

const analysisItems = [
  "Reviewing property information",
  "Analysing energy performance",
  "Checking insulation opportunities",
  "Estimating solar potential",
  "Calculating available subsidies",
  "Preparing renovation recommendations",
];

export default function AIScan() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const [form, setForm] = useState<PropertyForm>({
    address: "",
    city: "",
    postalCode: "",
    propertyType: "",
    yearBuilt: "",
    floorArea: "",
    energyLabel: "",
    gasUsage: "",
    electricityUsage: "",
    goals: [],
  });

  const progress = useMemo(
    () => Math.round(((currentStep - 1) / (steps.length - 1)) * 100),
    [currentStep],
  );

  const updateField = <Key extends keyof PropertyForm>(
    field: Key,
    value: PropertyForm[Key],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleGoal = (goal: GoalType) => {
    setForm((previous) => ({
      ...previous,
      goals: previous.goals.includes(goal)
        ? previous.goals.filter((item) => item !== goal)
        : [...previous.goals, goal],
    }));
  };

  const togglePhoto = (category: string) => {
    setUploadedPhotos((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category],
    );
  };

  const goNext = () => {
    if (currentStep < 5) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
      return;
    }

    navigate("/");
  };

  const saveScanProject = async () => {
    const projectName =
      form.address || form.city
        ? `${form.address || "Home"} - ${form.city || ""}`.trim()
        : "My Renovation Project";

    const scanProject = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      projectName,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      propertyType: form.propertyType,
      yearBuilt: form.yearBuilt,
      floorArea: form.floorArea,
      energyLabel: form.energyLabel,
      gasUsage: form.gasUsage,
      electricityUsage: form.electricityUsage,
      goals: form.goals,
      uploadedPhotos,
      analysis: {
        confidence: 87,
        targetEnergyLabel: "B",
        annualSaving: 980,
        co2Reduction: 31,
      },
      status: "AI analysis completed",
      progress: 100,
    };

    // Keep the current prototype flow working even if the database request fails.
    localStorage.setItem(
      "bouwiser_latest_scan",
      JSON.stringify(scanProject),
    );

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      console.error("Could not identify the signed-in user:", userError);
      window.alert(
        "Your scan is saved in this browser, but it could not be saved to your account. Please sign in again.",
      );
      return false;
    }

    const constructionYear = Number.parseInt(form.yearBuilt.replace(/[^\d]/g, ""), 10);
    const floorArea = Number.parseInt(form.floorArea.replace(/[^\d]/g, ""), 10);

    const { data: insertedProject, error: insertError } = await supabase
      .from("Projects")
      .insert({
        user_id: userData.user.id,
        project_name: projectName,
        property_type: form.propertyType || null,
        construction_year: Number.isNaN(constructionYear) ? null : constructionYear,
        postal_code: form.postalCode || null,
        city: form.city || null,
        floor_area: Number.isNaN(floorArea) ? null : floorArea,
        current_energy_label: form.energyLabel || null,
        annual_energy_cost: null,
        heating_type: null,
        renovation_goal: form.goals.length > 0 ? form.goals.join(", ") : null,
        budget: null,
        status: "AI analysis completed",
        target_energy_label: "B",
        annual_saving: 980,
        ai_score: 87,
        co2_reduction: 31,
        progress: 100,
        next_action: "Review AI renovation recommendations",
        roi: null,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("Could not save the project to Supabase:", insertError);
      window.alert(
        "Your scan is saved in this browser, but the database save failed. Please try again.",
      );
      return false;
    }

    const syncedScanProject = {
      ...scanProject,
      id: insertedProject.id,
      createdAt: insertedProject.created_at ?? scanProject.createdAt,
    };

    localStorage.setItem(
      "bouwiser_latest_scan",
      JSON.stringify(syncedScanProject),
    );

    return true;
  };

  const startAnalysis = () => {
    if (analysisStarted) return;

    setAnalysisStarted(true);
    setAnalysisProgress(0);

    let progressValue = 0;

    const interval = window.setInterval(() => {
      progressValue += 4;
      setAnalysisProgress(progressValue);

      if (progressValue >= 100) {
        window.clearInterval(interval);
        setAnalysisComplete(true);
      }
    }, 110);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7ed_0,_#f8fafc_42%,_#f8fafc_100%)] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 lg:px-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 group-hover:scale-105">
              <Zap className="h-6 w-6" />
            </div>

            <div className="text-left">
              <p className="text-xl font-black tracking-[-0.03em]">Bouwiser</p>
              <p className="text-xs font-medium text-slate-500">AI Home Scan</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:flex">
              <ShieldCheck className="h-4 w-4" />
              Progress saved
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-600"
            >
              Save and exit
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-6 py-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-white/95 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1fr_290px]">
            <div className="p-7 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
                <Sparkles className="h-4 w-4" />
                Personalized AI assessment
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Analyse your home in five simple steps
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                Tell us about your home, energy usage and renovation goals.
                Bouwiser will prepare a personalized improvement roadmap.
              </p>
            </div>

            <div className="relative overflow-hidden bg-slate-950 p-7 text-white lg:p-8">
              <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-semibold text-slate-400">
                  Overall progress
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-5xl font-black tracking-[-0.05em]">
                    {progress}%
                  </p>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400">
                    <WandSparkles className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-400"
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-5 lg:px-10">
            <div className="grid gap-3 sm:grid-cols-5">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id <= currentStep) {
                        setCurrentStep(step.id);
                      }
                    }}
                    className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-orange-300 bg-white shadow-lg shadow-orange-500/10"
                        : isCompleted
                          ? "border-emerald-200 bg-emerald-50/80"
                          : "border-slate-200 bg-white/80 hover:border-orange-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                          isActive
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                            : isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-black">{step.title}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[36px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="px-7 py-8 lg:px-12 lg:py-11"
            >
              {currentStep === 1 && (
                <div>
                  <SectionHeader
                    icon={Home}
                    eyebrow="Step 1"
                    title="Tell us about your property"
                    description="Provide the basic information needed to create your home profile."
                  />

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <InputField
                      label="Street address"
                      placeholder="Laan van Meerdervoort 120"
                      icon={MapPin}
                      value={form.address}
                      onChange={(value) => updateField("address", value)}
                    />

                    <InputField
                      label="City"
                      placeholder="The Hague"
                      icon={MapPin}
                      value={form.city}
                      onChange={(value) => updateField("city", value)}
                    />

                    <InputField
                      label="Postal code"
                      placeholder="2517 AN"
                      icon={MapPin}
                      value={form.postalCode}
                      onChange={(value) => updateField("postalCode", value)}
                    />

                    <InputField
                      label="Year built"
                      placeholder="1998"
                      icon={Building2}
                      value={form.yearBuilt}
                      onChange={(value) => updateField("yearBuilt", value)}
                    />

                    <InputField
                      label="Floor area"
                      placeholder="164 m²"
                      icon={Ruler}
                      value={form.floorArea}
                      onChange={(value) => updateField("floorArea", value)}
                    />
                  </div>

                  <div className="mt-9">
                    <p className="text-sm font-black text-slate-900">
                      Property type
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {propertyTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = form.propertyType === type.label;

                        return (
                          <button
                            key={type.label}
                            type="button"
                            onClick={() =>
                              updateField("propertyType", type.label)
                            }
                            className={`group rounded-[22px] border p-5 text-left transition-all duration-300 ${
                              isSelected
                                ? "border-orange-400 bg-orange-50 ring-4 ring-orange-100"
                                : "border-slate-200 bg-white hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                            }`}
                          >
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                isSelected
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500"
                              }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            <p className="mt-4 font-black">{type.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <SectionHeader
                    icon={ImagePlus}
                    eyebrow="Step 2"
                    title="Upload property photos"
                    description="Clear photos help the AI identify renovation opportunities more accurately."
                  />

                  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {photoCategories.map((category) => {
                      const isUploaded = uploadedPhotos.includes(category);

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => togglePhoto(category)}
                          className={`group flex min-h-52 flex-col items-center justify-center rounded-[26px] border-2 border-dashed p-6 text-center transition-all duration-300 ${
                            isUploaded
                              ? "border-emerald-400 bg-emerald-50"
                              : "border-slate-200 bg-slate-50 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50"
                          }`}
                        >
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${
                              isUploaded
                                ? "bg-emerald-500 text-white"
                                : "bg-white text-orange-500"
                            }`}
                          >
                            {isUploaded ? (
                              <CheckCircle2 className="h-7 w-7" />
                            ) : (
                              <Upload className="h-7 w-7" />
                            )}
                          </div>

                          <p className="mt-4 font-black">{category}</p>

                          <p className="mt-2 text-sm text-slate-500">
                            {isUploaded
                              ? "Photo uploaded"
                              : "Click to simulate upload"}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    Uploading real files will be enabled when the backend and
                    cloud storage are connected.
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <SectionHeader
                    icon={Zap}
                    eyebrow="Step 3"
                    title="Add your energy information"
                    description="Energy usage helps Bouwiser estimate savings and improvement potential."
                  />

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-black text-slate-900">
                        Current energy label
                      </span>

                      <select
                        value={form.energyLabel}
                        onChange={(event) =>
                          updateField("energyLabel", event.target.value)
                        }
                        className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      >
                        <option value="">Select energy label</option>

                        {[
                          "A+++",
                          "A++",
                          "A+",
                          "A",
                          "B",
                          "C",
                          "D",
                          "E",
                          "F",
                          "G",
                        ].map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <InputField
                      label="Annual gas usage"
                      placeholder="1,250 m³"
                      icon={Flame}
                      value={form.gasUsage}
                      onChange={(value) => updateField("gasUsage", value)}
                    />

                    <InputField
                      label="Annual electricity usage"
                      placeholder="3,200 kWh"
                      icon={Zap}
                      value={form.electricityUsage}
                      onChange={(value) =>
                        updateField("electricityUsage", value)
                      }
                    />
                  </div>

                  <div className="mt-8 rounded-[26px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                        <FileText className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="font-black">
                          Energy bill or certificate
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          You will later be able to upload an energy bill or
                          official energy-label certificate for a more accurate
                          analysis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <SectionHeader
                    icon={Goal}
                    eyebrow="Step 4"
                    title="What do you want to achieve?"
                    description="Select one or more renovation goals so the recommendations match your priorities."
                  />

                  <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {renovationGoals.map((goal) => {
                      const Icon = goal.icon;
                      const isSelected = form.goals.includes(goal.label);

                      return (
                        <button
                          key={goal.label}
                          type="button"
                          onClick={() => toggleGoal(goal.label)}
                          className={`rounded-[26px] border p-6 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-orange-400 bg-orange-50 ring-4 ring-orange-100"
                              : "border-slate-200 bg-white hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                isSelected
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            {isSelected && (
                              <CheckCircle2 className="h-6 w-6 text-orange-500" />
                            )}
                          </div>

                          <p className="mt-5 font-black">{goal.label}</p>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {goal.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  {!analysisComplete ? (
                    <div className="mx-auto max-w-4xl py-6 text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
                        {analysisStarted ? (
                          <LoaderCircle className="h-11 w-11 animate-spin text-orange-400" />
                        ) : (
                          <Bot className="h-11 w-11 text-orange-400" />
                        )}
                      </div>

                      <h2 className="mt-7 text-4xl font-black tracking-[-0.03em]">
                        {analysisStarted
                          ? "Bouwiser is analysing your home"
                          : "Ready to start your AI analysis"}
                      </h2>

                      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
                        Our AI will evaluate your property profile, energy usage,
                        photos and renovation objectives.
                      </p>

                      {analysisStarted && (
                        <>
                          <div className="mx-auto mt-8 max-w-xl">
                            <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-600">
                                Analysis progress
                              </span>

                              <span className="font-black text-orange-500">
                                {Math.min(analysisProgress, 100)}%
                              </span>
                            </div>

                            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                              <motion.div
                                animate={{
                                  width: `${Math.min(analysisProgress, 100)}%`,
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-500"
                              />
                            </div>
                          </div>

                          <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
                            {analysisItems.map((item, index) => {
                              const completed =
                                analysisProgress >=
                                ((index + 1) / analysisItems.length) * 100;

                              return (
                                <div
                                  key={item}
                                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                  <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                      completed
                                        ? "bg-emerald-100 text-emerald-600"
                                        : "bg-slate-100 text-slate-400"
                                    }`}
                                  >
                                    {completed ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <LoaderCircle className="h-4 w-4" />
                                    )}
                                  </div>

                                  <span className="text-sm font-bold">
                                    {item}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}

                      {!analysisStarted && (
                        <button
                          type="button"
                          onClick={startAnalysis}
                          className="mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 font-black text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                        >
                          <Sparkles className="h-5 w-5" />
                          Start AI Analysis
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mx-auto max-w-5xl py-5 text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-emerald-500 text-white shadow-xl shadow-emerald-500/25">
                        <CheckCircle2 className="h-11 w-11" />
                      </div>

                      <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                        Analysis complete
                      </p>

                      <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
                        Your AI renovation report is ready
                      </h2>

                      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
                        Bouwiser identified the most promising energy and
                        renovation opportunities for your home.
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ResultCard
                          label="AI confidence"
                          value="87%"
                          icon={Bot}
                        />
                        <ResultCard
                          label="Target energy label"
                          value="B"
                          icon={Zap}
                        />
                        <ResultCard
                          label="Annual saving"
                          value="€980"
                          icon={CircleDollarSign}
                        />
                        <ResultCard
                          label="CO₂ reduction"
                          value="31%"
                          icon={Leaf}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          const saved = await saveScanProject();

                          if (saved) {
                            navigate("/dashboard");
                          }
                        }}
                        className="mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-slate-950 px-9 font-black text-white shadow-xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
                      >
                        View My Renovation Dashboard
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {currentStep < 5 && (
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/80 px-7 py-5 lg:px-12">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

interface SectionHeaderProps {
  icon: typeof Home;
  eyebrow: string;
  title: string;
  description: string;
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600">
        <Icon className="h-7 w-7" />
      </div>

      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: typeof Home;
  value: string;
  onChange: (value: string) => void;
}

function InputField({
  label,
  placeholder,
  icon: Icon,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-900">{label}</span>

      <div className="relative mt-2">
        <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Bot;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 text-left shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}