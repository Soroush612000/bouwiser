import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  Trash2,
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

interface UploadedPhoto {
  category: string;
  path: string;
  fileName: string;
  previewUrl?: string;
}

interface ScanRecommendation {
  goal: GoalType;
  score: number;
  estimatedAnnualSaving: number;
  productCategory: "Insulation" | "Heating" | "Solar";
}

const steps = [
  { id: 1, titleKey: "aiScan.steps.property.title", descriptionKey: "aiScan.steps.property.description", icon: Home },
  { id: 2, titleKey: "aiScan.steps.photos.title", descriptionKey: "aiScan.steps.photos.description", icon: ImagePlus },
  { id: 3, titleKey: "aiScan.steps.energy.title", descriptionKey: "aiScan.steps.energy.description", icon: Zap },
  { id: 4, titleKey: "aiScan.steps.goals.title", descriptionKey: "aiScan.steps.goals.description", icon: Goal },
  { id: 5, titleKey: "aiScan.steps.analysis.title", descriptionKey: "aiScan.steps.analysis.description", icon: Bot },
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
  { value: "Front facade", key: "aiScan.photoCategories.frontFacade" },
  { value: "Back facade", key: "aiScan.photoCategories.backFacade" },
  { value: "Roof", key: "aiScan.photoCategories.roof" },
  { value: "Windows", key: "aiScan.photoCategories.windows" },
  { value: "Heating system", key: "aiScan.photoCategories.heatingSystem" },
  { value: "Meter cupboard", key: "aiScan.photoCategories.meterCupboard" },
];

const renovationGoals: {
  label: GoalType;
  icon: typeof Leaf;
  titleKey: string;
  descriptionKey: string;
}[] = [
  {
    label: "Lower energy bills",
    icon: Zap,
    titleKey: "aiScan.goals.lowerBills.title",
    descriptionKey: "aiScan.goals.lowerBills.description",
  },
  {
    label: "Improve comfort",
    icon: Home,
    titleKey: "aiScan.goals.comfort.title",
    descriptionKey: "aiScan.goals.comfort.description",
  },
  {
    label: "Increase home value",
    icon: Building2,
    titleKey: "aiScan.goals.homeValue.title",
    descriptionKey: "aiScan.goals.homeValue.description",
  },
  {
    label: "Install solar panels",
    icon: SunMedium,
    titleKey: "aiScan.goals.solar.title",
    descriptionKey: "aiScan.goals.solar.description",
  },
  {
    label: "Install a heat pump",
    icon: Flame,
    titleKey: "aiScan.goals.heatPump.title",
    descriptionKey: "aiScan.goals.heatPump.description",
  },
  {
    label: "Improve insulation",
    icon: Ruler,
    titleKey: "aiScan.goals.insulation.title",
    descriptionKey: "aiScan.goals.insulation.description",
  },
];

const analysisItems = [
  "aiScan.analysisItems.property",
  "aiScan.analysisItems.energy",
  "aiScan.analysisItems.insulation",
  "aiScan.analysisItems.solar",
  "aiScan.analysisItems.subsidies",
  "aiScan.analysisItems.recommendations",
];

export default function AIScan() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<
    "saved" | "saving" | "unsaved" | "local"
  >("saved");
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

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

  const parseNumericValue = (value: string) => {
    const normalized = value
      .replace(/\s/g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");

    if (!normalized) return null;

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const calculateAnalysis = () => {
    const area = parseNumericValue(form.floorArea) ?? 100;
    const gas = parseNumericValue(form.gasUsage) ?? 0;
    const electricity = parseNumericValue(form.electricityUsage) ?? 0;
    const year = parseNumericValue(form.yearBuilt) ?? 1990;

    const labelOrder = ["G", "F", "E", "D", "C", "B", "A"];
    const currentLabel = labelOrder.includes(form.energyLabel)
      ? form.energyLabel
      : "D";
    const currentIndex = labelOrder.indexOf(currentLabel);

    let improvementPoints = 0;
    let annualSaving = 0;

    if (form.goals.includes("Improve insulation")) {
      improvementPoints += 1.2;
      annualSaving += Math.max(180, Math.min(420, area * 2.1));
    }

    if (form.goals.includes("Install a heat pump")) {
      improvementPoints += 1.1;
      annualSaving += Math.max(220, Math.min(520, gas * 0.22));
    }

    if (form.goals.includes("Install solar panels")) {
      improvementPoints += 0.9;
      annualSaving += Math.max(180, Math.min(650, electricity * 0.14));
    }

    if (form.goals.includes("Lower energy bills")) {
      improvementPoints += 0.4;
      annualSaving += Math.max(80, Math.min(220, (gas + electricity / 10) * 0.06));
    }

    if (year < 1980) improvementPoints += 0.5;
    else if (year < 2000) improvementPoints += 0.25;

    const labelGain = Math.max(1, Math.min(3, Math.round(improvementPoints)));
    const targetIndex = Math.min(labelOrder.length - 1, currentIndex + labelGain);
    const targetEnergyLabel = labelOrder[targetIndex];

    if (annualSaving === 0) {
      annualSaving = Math.max(
        180,
        Math.min(780, gas * 0.12 + electricity * 0.06 + area * 1.1),
      );
    }

    const co2Reduction = Math.round(
      Math.max(
        8,
        Math.min(
          45,
          10 +
            labelGain * 6 +
            (gas > 1200 ? 5 : 0) +
            (form.goals.includes("Install solar panels") ? 5 : 0),
        ),
      ),
    );

    const completenessScore =
      [form.address, form.city, form.postalCode, form.propertyType, form.yearBuilt, form.floorArea, form.energyLabel]
        .filter(Boolean).length * 8 +
      (form.gasUsage ? 8 : 0) +
      (form.electricityUsage ? 8 : 0) +
      Math.min(12, form.goals.length * 3) +
      Math.min(12, uploadedPhotos.length * 2);

    const confidence = Math.max(62, Math.min(94, 55 + completenessScore));

    return {
      confidence: Math.round(confidence),
      targetEnergyLabel,
      annualSaving: Math.round(annualSaving / 10) * 10,
      co2Reduction,
    };
  };

  const getRecommendationProductsUrl = (
    recommendation: ScanRecommendation,
  ) => {
    if (recommendation.productCategory === "Insulation") {
      return "/products?category=insulation";
    }

    if (recommendation.productCategory === "Solar") {
      return "/products?category=solar-energy";
    }

    return "/products?category=heating-cooling";
  };

  const buildRecommendations = (): ScanRecommendation[] => {
    const area = parseNumericValue(form.floorArea) ?? 100;
    const gas = parseNumericValue(form.gasUsage) ?? 0;
    const electricity = parseNumericValue(form.electricityUsage) ?? 0;
    const year = parseNumericValue(form.yearBuilt) ?? 1990;

    const weakEnergyLabel = ["D", "E", "F", "G"].includes(form.energyLabel);

    const recommendations: ScanRecommendation[] = [
      {
        goal: "Improve insulation",
        productCategory: "Insulation",
        score:
          20 +
          (year < 2000 ? 35 : 0) +
          (weakEnergyLabel ? 20 : 0) +
          (form.goals.includes("Improve insulation") ? 45 : 0) +
          (form.goals.includes("Improve comfort") ? 15 : 0) +
          (form.goals.includes("Lower energy bills") ? 10 : 0),
        estimatedAnnualSaving: Math.round(
          Math.max(180, Math.min(420, area * 2.1)),
        ),
      },
      {
        goal: "Install a heat pump",
        productCategory: "Heating",
        score:
          15 +
          (gas > 1200 ? 30 : gas > 700 ? 18 : 0) +
          (form.goals.includes("Install a heat pump") ? 45 : 0) +
          (form.goals.includes("Lower energy bills") ? 12 : 0) +
          (form.goals.includes("Improve comfort") ? 8 : 0),
        estimatedAnnualSaving: Math.round(
          Math.max(220, Math.min(520, gas > 0 ? gas * 0.22 : 260)),
        ),
      },
      {
        goal: "Install solar panels",
        productCategory: "Solar",
        score:
          15 +
          (electricity > 3000 ? 30 : electricity > 1800 ? 18 : 0) +
          (form.goals.includes("Install solar panels") ? 45 : 0) +
          (form.goals.includes("Lower energy bills") ? 12 : 0) +
          (form.goals.includes("Increase home value") ? 8 : 0),
        estimatedAnnualSaving: Math.round(
          Math.max(
            180,
            Math.min(650, electricity > 0 ? electricity * 0.14 : 240),
          ),
        ),
      },
    ];

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const scanRecommendations = useMemo(
    () => buildRecommendations(),
    [form],
  );

  const analysisResult = useMemo(
    () => calculateAnalysis(),
    [form, uploadedPhotos],
  );

  const projectNameFromForm = () =>
    form.address || form.city
      ? `${form.address || "Home"} - ${form.city || ""}`.trim()
      : "My Renovation Project";

  const saveLocalDraft = (
    step: number,
    scanStatus: "in_progress" | "completed",
  ) => {
    const localDraft = {
      projectId,
      currentStep: step,
      form,
      uploadedPhotos: uploadedPhotos.map(({ category, path, fileName }) => ({
        category,
        path,
        fileName,
      })),
      scanStatus,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem("bouwiser_scan_draft", JSON.stringify(localDraft));
  };

  const applySavedProject = (project: any) => {
    const savedGoals = String(project.renovation_goal ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item): item is GoalType =>
        renovationGoals.some((goal) => goal.label === item),
      );

    setProjectId(project.id ?? null);
    setCurrentStep(
      Math.min(5, Math.max(1, Number(project.scan_step) || 1)),
    );
    setUploadedPhotos(
      Array.isArray(project.photo_categories)
        ? project.photo_categories
            .map((item: unknown) => {
              if (typeof item === "string") {
                return {
                  category: item,
                  path: "",
                  fileName: "",
                } satisfies UploadedPhoto;
              }

              if (
                item &&
                typeof item === "object" &&
                "category" in item &&
                typeof (item as { category?: unknown }).category === "string"
              ) {
                const photo = item as {
                  category: string;
                  path?: unknown;
                  fileName?: unknown;
                };

                return {
                  category: photo.category,
                  path: typeof photo.path === "string" ? photo.path : "",
                  fileName:
                    typeof photo.fileName === "string" ? photo.fileName : "",
                } satisfies UploadedPhoto;
              }

              return null;
            })
            .filter((item: UploadedPhoto | null): item is UploadedPhoto => item !== null)
        : [],
    );

    setForm({
      address: project.street_address ?? "",
      city: project.city ?? "",
      postalCode: project.postal_code ?? "",
      propertyType: propertyTypes.some(
        (item) => item.label === project.property_type,
      )
        ? project.property_type
        : "",
      yearBuilt: project.construction_year
        ? String(project.construction_year)
        : "",
      floorArea: project.floor_area ? String(project.floor_area) : "",
      energyLabel: project.current_energy_label ?? "",
      gasUsage:
        project.annual_gas_usage !== null &&
        project.annual_gas_usage !== undefined
          ? String(project.annual_gas_usage)
          : "",
      electricityUsage:
        project.annual_electricity_usage !== null &&
        project.annual_electricity_usage !== undefined
          ? String(project.annual_electricity_usage)
          : "",
      goals: savedGoals,
    });

    if (project.scan_status === "completed") {
      setAnalysisStarted(true);
      setAnalysisComplete(true);
      setAnalysisProgress(100);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadDraft = async () => {
      setIsLoadingDraft(true);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (user) {
        const storedProjectId = localStorage.getItem(
          "bouwiser_active_scan_project_id",
        );

        if (storedProjectId) {
          const { data } = await supabase
            .from("Projects")
            .select("*")
            .eq("id", storedProjectId)
            .eq("user_id", user.id)
            .maybeSingle();

          if (!cancelled && data) {
            applySavedProject(data);
            setSaveState("saved");
            setIsLoadingDraft(false);
            return;
          }
        }

        const { data } = await supabase
          .from("Projects")
          .select("*")
          .eq("user_id", user.id)
          .eq("scan_status", "in_progress")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!cancelled && data) {
          applySavedProject(data);
          localStorage.setItem(
            "bouwiser_active_scan_project_id",
            String(data.id),
          );
          setSaveState("saved");
          setIsLoadingDraft(false);
          return;
        }
      }

      const localDraft = localStorage.getItem("bouwiser_scan_draft");

      if (!cancelled && localDraft) {
        try {
          const parsed = JSON.parse(localDraft);

          if (parsed?.scanStatus === "in_progress") {
            setCurrentStep(
              Math.min(5, Math.max(1, Number(parsed.currentStep) || 1)),
            );
            setUploadedPhotos(
              Array.isArray(parsed.uploadedPhotos)
                ? parsed.uploadedPhotos
                    .map((item: unknown) => {
                      if (typeof item === "string") {
                        return {
                          category: item,
                          path: "",
                          fileName: "",
                        } satisfies UploadedPhoto;
                      }

                      if (
                        item &&
                        typeof item === "object" &&
                        "category" in item &&
                        typeof (item as { category?: unknown }).category ===
                          "string"
                      ) {
                        const photo = item as {
                          category: string;
                          path?: unknown;
                          fileName?: unknown;
                        };

                        return {
                          category: photo.category,
                          path: typeof photo.path === "string" ? photo.path : "",
                          fileName:
                            typeof photo.fileName === "string"
                              ? photo.fileName
                              : "",
                        } satisfies UploadedPhoto;
                      }

                      return null;
                    })
                    .filter((item: UploadedPhoto | null): item is UploadedPhoto => item !== null)
                : [],
            );

            if (parsed.form) {
              setForm((previous) => ({
                ...previous,
                ...parsed.form,
              }));
            }

            setSaveState("local");
          }
        } catch (error) {
          console.error("Could not restore the local AI Scan draft:", error);
        }
      }

      if (!cancelled) {
        setIsLoadingDraft(false);
      }
    };

    void loadDraft();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = <Key extends keyof PropertyForm>(
    field: Key,
    value: PropertyForm[Key],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setSaveState("unsaved");
  };

  const toggleGoal = (goal: GoalType) => {
    setForm((previous) => ({
      ...previous,
      goals: previous.goals.includes(goal)
        ? previous.goals.filter((item) => item !== goal)
        : [...previous.goals, goal],
    }));
    setSaveState("unsaved");
  };

  const handlePhotoUpload = async (
    category: string,
    file: File | undefined,
  ) => {
    if (!file || uploadingCategory) return;

    setPhotoError(null);

    if (!file.type.startsWith("image/")) {
      setPhotoError(t("aiScan.errors.chooseImage"));
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setPhotoError(t("aiScan.errors.imageTooLarge"));
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;

    if (userError || !user) {
      setPhotoError(t("aiScan.errors.signInForPhotos"));
      return;
    }

    setUploadingCategory(category);

    try {
      const safeCategory = category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const uniqueName = `${safeCategory}-${Date.now()}.${extension}`;

      // First folder is always the authenticated user id, matching the Storage RLS policy.
      const storagePath = `${user.id}/${projectId ?? "draft"}/${uniqueName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-photos")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const previewUrl = URL.createObjectURL(file);

      setUploadedPhotos((previous) => [
        ...previous.filter((photo) => photo.category !== category),
        {
          category,
          path: storagePath,
          fileName: file.name,
          previewUrl,
        },
      ]);
      setSaveState("unsaved");
    } catch (error) {
      console.error("Could not upload project photo:", error);
      setPhotoError(
        error instanceof Error
          ? error.message
          : t("aiScan.errors.uploadFailed"),
      );
    } finally {
      setUploadingCategory(null);
    }
  };

  const handlePhotoRemove = async (
    category: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const photo = uploadedPhotos.find(
      (item) => item.category === category,
    );

    if (!photo) return;

    setPhotoError(null);

    try {
      if (photo.path) {
        const { error } = await supabase.storage
          .from("project-photos")
          .remove([photo.path]);

        if (error) throw error;
      }

      if (photo.previewUrl) {
        URL.revokeObjectURL(photo.previewUrl);
      }

      setUploadedPhotos((previous) =>
        previous.filter((item) => item.category !== category),
      );

      setSaveState("unsaved");
    } catch (error) {
      console.error("Could not remove project photo:", error);

      setPhotoError(
        error instanceof Error
          ? error.message
          : t("aiScan.errors.removeFailed"),
      );
    }
  };

  const persistScan = async ({
    step,
    scanStatus = "in_progress",
    finalAnalysis = false,
  }: {
    step: number;
    scanStatus?: "in_progress" | "completed";
    finalAnalysis?: boolean;
  }) => {
    setSaveState("saving");
    saveLocalDraft(step, scanStatus);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;

    if (userError || !user) {
      setSaveState("local");
      return {
        success: true,
        savedToAccount: false,
      };
    }

    const constructionYear = parseNumericValue(form.yearBuilt);
    const floorArea = parseNumericValue(form.floorArea);
    const gasUsage = parseNumericValue(form.gasUsage);
    const electricityUsage = parseNumericValue(form.electricityUsage);

    const analysis = calculateAnalysis();

    const payload = {
      project_name: projectNameFromForm(),
      property_type: form.propertyType || null,
      construction_year:
        constructionYear === null ? null : Math.round(constructionYear),
      postal_code: form.postalCode || null,
      city: form.city || null,
      floor_area: floorArea === null ? null : Math.round(floorArea),
      current_energy_label: form.energyLabel || null,
      annual_energy_cost: null,
      heating_type: null,
      renovation_goal:
        form.goals.length > 0 ? form.goals.join(", ") : null,
      budget: null,
      street_address: form.address || null,
      annual_gas_usage: gasUsage,
      annual_electricity_usage: electricityUsage,
      scan_step: step,
      scan_status: scanStatus,
      updated_at: new Date().toISOString(),
      photo_categories: uploadedPhotos.map(({ category, path, fileName }) => ({
        category,
        path,
        fileName,
      })),
      status: finalAnalysis
        ? "AI analysis completed"
        : "AI Home Scan in progress",
      target_energy_label: finalAnalysis ? analysis.targetEnergyLabel : null,
      annual_saving: finalAnalysis ? analysis.annualSaving : null,
      ai_score: finalAnalysis ? analysis.confidence : null,
      co2_reduction: finalAnalysis ? analysis.co2Reduction : null,
      progress: finalAnalysis
        ? 100
        : Math.round(((step - 1) / (steps.length - 1)) * 100),
      next_action: finalAnalysis
        ? "Review AI renovation recommendations"
        : "Continue AI Home Scan",
      roi: null,
    };

    if (projectId) {
      const { error } = await supabase
        .from("Projects")
        .update(payload)
        .eq("id", projectId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Could not update AI Scan:", error);
        setSaveState("unsaved");
        window.alert(
          t("aiScan.errors.syncFailed"),
        );
        return {
          success: false,
          savedToAccount: false,
        };
      }
    } else {
      const { data, error } = await supabase
        .from("Projects")
        .insert({
          ...payload,
          user_id: user.id,
        })
        .select("id")
        .single();

      if (error || !data) {
        console.error("Could not create AI Scan project:", error);
        setSaveState("unsaved");
        window.alert(
          t("aiScan.errors.syncFailed"),
        );
        return {
          success: false,
          savedToAccount: false,
        };
      }

      setProjectId(data.id);
      localStorage.setItem(
        "bouwiser_active_scan_project_id",
        String(data.id),
      );
    }

    if (finalAnalysis) {
      const latestScan = {
        id: projectId,
        createdAt: new Date().toISOString(),
        projectName: projectNameFromForm(),
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
        uploadedPhotos: uploadedPhotos.map(
          ({ category, path, fileName }) => ({
            category,
            path,
            fileName,
          }),
        ),
        analysis: {
          confidence: analysis.confidence,
          targetEnergyLabel: analysis.targetEnergyLabel,
          annualSaving: analysis.annualSaving,
          co2Reduction: analysis.co2Reduction,
        },
        recommendations: scanRecommendations,
        status: "AI analysis completed",
        progress: 100,
      };

      localStorage.setItem(
        "bouwiser_latest_scan",
        JSON.stringify(latestScan),
      );
      localStorage.removeItem("bouwiser_scan_draft");
      localStorage.removeItem("bouwiser_active_scan_project_id");
    }

    setSaveState("saved");

    return {
      success: true,
      savedToAccount: true,
    };
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (
        !form.address.trim() ||
        !form.city.trim() ||
        !form.postalCode.trim() ||
        !form.propertyType ||
        !form.yearBuilt.trim() ||
        !form.floorArea.trim()
      ) {
        window.alert(
          "Please complete all required property information before continuing.",
        );
        return false;
      }

      const year = parseNumericValue(form.yearBuilt);
      const area = parseNumericValue(form.floorArea);

      if (!year || year < 1800 || year > new Date().getFullYear()) {
        window.alert("Please enter a valid construction year.");
        return false;
      }

      if (!area || area <= 0 || area > 2000) {
        window.alert("Please enter a valid floor area.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!form.energyLabel) {
        window.alert("Please select the current energy label.");
        return false;
      }
    }

    if (currentStep === 4) {
      if (form.goals.length === 0) {
        window.alert("Please select at least one renovation goal.");
        return false;
      }
    }

    return true;
  };

  const goNext = async () => {
    if (currentStep >= 5 || saveState === "saving") return;

    if (!validateCurrentStep()) return;

    const nextStep = currentStep + 1;
    await persistScan({
      step: nextStep,
      scanStatus: "in_progress",
    });

    setCurrentStep(nextStep);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
      return;
    }

    navigate("/");
  };

  const handleSaveAndExit = async () => {
    if (saveState === "saving") return;

    const result = await persistScan({
      step: currentStep,
      scanStatus: "in_progress",
    });

    if (result.savedToAccount) {
      navigate("/dashboard");
      return;
    }

    window.alert(
      t("aiScan.localSaveNotice"),
    );
    navigate("/");
  };

  const saveScanProject = async () => {
    const result = await persistScan({
      step: 5,
      scanStatus: "completed",
      finalAnalysis: true,
    });

    return result.savedToAccount;
  };

  const startAnalysis = async () => {
    if (analysisStarted) return;

    await persistScan({
      step: 5,
      scanStatus: "in_progress",
    });

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
              <p className="text-xs font-medium text-slate-500">{t("aiScan.name")}</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-bold sm:flex ${
                saveState === "unsaved"
                  ? "bg-amber-50 text-amber-700"
                  : saveState === "saving"
                    ? "bg-blue-50 text-blue-700"
                    : saveState === "local"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-emerald-50 text-emerald-700"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              {saveState === "unsaved"
                ? t("aiScan.save.unsaved")
                : saveState === "saving"
                  ? t("aiScan.save.saving")
                  : saveState === "local"
                    ? t("aiScan.save.local")
                    : t("aiScan.save.saved")}
            </div>

            <button
              type="button"
              onClick={handleSaveAndExit}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-600"
            >
              {t("aiScan.saveAndExit")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-6 py-8 lg:px-10 lg:py-10">
        {isLoadingDraft && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-600 shadow-sm">
            <LoaderCircle className="h-5 w-5 animate-spin text-orange-500" />
            {t("aiScan.loadingDraft")}
          </div>
        )}
        <section className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-white/95 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1fr_290px]">
            <div className="p-7 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">
                <Sparkles className="h-4 w-4" />
                {t("aiScan.hero.badge")}
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                {t("aiScan.hero.title")}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                {t("aiScan.hero.description")}
              </p>
            </div>

            <div className="relative overflow-hidden bg-slate-950 p-7 text-white lg:p-8">
              <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-semibold text-slate-400">
                  {t("aiScan.overallProgress")}
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
                  {t("aiScan.stepOf", { current: currentStep, total: steps.length })}
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
                        <p className="text-sm font-black">{t(step.titleKey)}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {t(step.descriptionKey)}
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
                    eyebrow={t("aiScan.stepLabels.step1")}
                    title={t("aiScan.property.title")}
                    description={t("aiScan.property.description")}
                  />

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <InputField
                      label={t("aiScan.property.streetAddress")}
                      placeholder="Laan van Meerdervoort 120"
                      icon={MapPin}
                      value={form.address}
                      onChange={(value) => updateField("address", value)}
                    />

                    <InputField
                      label={t("aiScan.property.city")}
                      placeholder={t("aiScan.property.cityPlaceholder")}
                      icon={MapPin}
                      value={form.city}
                      onChange={(value) => updateField("city", value)}
                    />

                    <InputField
                      label={t("aiScan.property.postalCode")}
                      placeholder="2517 AN"
                      icon={MapPin}
                      value={form.postalCode}
                      onChange={(value) => updateField("postalCode", value)}
                    />

                    <InputField
                      label={t("aiScan.property.yearBuilt")}
                      placeholder="1998"
                      icon={Building2}
                      value={form.yearBuilt}
                      onChange={(value) => updateField("yearBuilt", value)}
                    />

                    <InputField
                      label={t("aiScan.property.floorArea")}
                      placeholder="164 m²"
                      icon={Ruler}
                      value={form.floorArea}
                      onChange={(value) => updateField("floorArea", value)}
                    />
                  </div>

                  <div className="mt-9">
                    <p className="text-sm font-black text-slate-900">
                      {t("aiScan.property.propertyType")}
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

                            <p className="mt-4 font-black">{t(`aiScan.propertyTypes.${type.label}`)}</p>
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
                    eyebrow={t("aiScan.stepLabels.step2")}
                    title={t("aiScan.photos.title")}
                    description={t("aiScan.photos.description")}
                  />

                  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {photoCategories.map(({ value: category, key: categoryKey }) => {
                      const photo = uploadedPhotos.find(
                        (item) => item.category === category,
                      );
                      const isUploading = uploadingCategory === category;
                      const inputId = `photo-${category
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`;

                      return (
                        <label
                          key={category}
                          htmlFor={inputId}
                          className={`group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[26px] border-2 border-dashed p-6 text-center transition-all duration-300 ${
                            photo
                              ? "border-emerald-400 bg-emerald-50"
                              : "border-slate-200 bg-slate-50 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50"
                          }`}
                        >
                          {photo?.previewUrl && (
                            <img
                              src={photo.previewUrl}
                              alt={category}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}

                          {photo?.previewUrl && (
                            <div className="absolute inset-0 bg-slate-950/45" />
                          )}

                          {photo && (
                            <button
                              type="button"
                              onClick={(event) =>
                                void handlePhotoRemove(category, event)
                              }
                              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-red-500 shadow-lg transition hover:bg-red-500 hover:text-white"
                              title={t("aiScan.photos.removePhoto")}
                              aria-label={`Remove ${category} photo`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}

                          <input
                            id={inputId}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                            className="sr-only"
                            disabled={Boolean(uploadingCategory)}
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              void handlePhotoUpload(category, file);
                              event.currentTarget.value = "";
                            }}
                          />

                          <div className="relative z-10">
                            <div
                              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${
                                photo
                                  ? "bg-emerald-500 text-white"
                                  : "bg-white text-orange-500"
                              }`}
                            >
                              {isUploading ? (
                                <LoaderCircle className="h-7 w-7 animate-spin" />
                              ) : photo ? (
                                <CheckCircle2 className="h-7 w-7" />
                              ) : (
                                <Upload className="h-7 w-7" />
                              )}
                            </div>

                            <p
                              className={`mt-4 font-black ${
                                photo?.previewUrl ? "text-white" : ""
                              }`}
                            >
                              {t(categoryKey)}
                            </p>

                            <p
                              className={`mt-2 text-sm ${
                                photo?.previewUrl
                                  ? "text-white/90"
                                  : "text-slate-500"
                              }`}
                            >
                              {isUploading
                                ? t("aiScan.photos.uploading")
                                : photo
                                  ? t("aiScan.photos.uploadedReplace")
                                  : t("aiScan.photos.choosePhoto")}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {photoError && (
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                      {photoError}
                    </div>
                  )}

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    {t("aiScan.photos.privacy")}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <SectionHeader
                    icon={Zap}
                    eyebrow={t("aiScan.stepLabels.step3")}
                    title={t("aiScan.energy.title")}
                    description={t("aiScan.energy.description")}
                  />

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-black text-slate-900">
                        {t("aiScan.energy.currentLabel")}
                      </span>

                      <select
                        value={form.energyLabel}
                        onChange={(event) =>
                          updateField("energyLabel", event.target.value)
                        }
                        className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      >
                        <option value="">{t("aiScan.energy.selectLabel")}</option>

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
                      label={t("aiScan.energy.annualGas")}
                      placeholder="1,250 m³"
                      icon={Flame}
                      value={form.gasUsage}
                      onChange={(value) => updateField("gasUsage", value)}
                    />

                    <InputField
                      label={t("aiScan.energy.annualElectricity")}
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
                          {t("aiScan.energy.billTitle")}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {t("aiScan.energy.billDescription")}
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
                    eyebrow={t("aiScan.stepLabels.step4")}
                    title={t("aiScan.goalsSection.title")}
                    description={t("aiScan.goalsSection.description")}
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

                          <p className="mt-5 font-black">{t(goal.titleKey)}</p>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {t(goal.descriptionKey)}
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
                          ? t("aiScan.analysis.analysingTitle")
                          : t("aiScan.analysis.readyTitle")}
                      </h2>

                      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
                        {t("aiScan.analysis.description")}
                      </p>

                      {analysisStarted && (
                        <>
                          <div className="mx-auto mt-8 max-w-xl">
                            <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-600">
                                {t("aiScan.analysis.progress")}
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
                                    {t(item)}
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
                          {t("aiScan.analysis.start")}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mx-auto max-w-5xl py-5 text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-emerald-500 text-white shadow-xl shadow-emerald-500/25">
                        <CheckCircle2 className="h-11 w-11" />
                      </div>

                      <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                        {t("aiScan.results.complete")}
                      </p>

                      <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
                        {t("aiScan.results.title")}
                      </h2>

                      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
                        {t("aiScan.results.description")}
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ResultCard
                          label={t("aiScan.results.confidence")}
                          value={`${analysisResult.confidence}%`}
                          icon={Bot}
                        />
                        <ResultCard
                          label={t("aiScan.results.targetLabel")}
                          value={analysisResult.targetEnergyLabel}
                          icon={Zap}
                        />
                        <ResultCard
                          label={t("aiScan.results.annualSaving")}
                          value={new Intl.NumberFormat(i18n.language?.startsWith("en") ? "en-NL" : "nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(analysisResult.annualSaving)}
                          icon={CircleDollarSign}
                        />
                        <ResultCard
                          label={t("aiScan.results.co2Reduction")}
                          value={`${analysisResult.co2Reduction}%`}
                          icon={Leaf}
                        />
                      </div>

                      <div className="mt-10 text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                            <Sparkles className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-500">
                              {t("aiScan.analysisItems.recommendations")}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-3">
                          {scanRecommendations.map((recommendation, index) => {
                            const goal = renovationGoals.find(
                              (item) => item.label === recommendation.goal,
                            );
                            const Icon = goal?.icon ?? Sparkles;

                            return (
                              <article
                                key={recommendation.goal}
                                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                                    <Icon className="h-5 w-5" />
                                  </div>

                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-sm font-black text-orange-600">
                                    {index + 1}
                                  </span>
                                </div>

                                <h3 className="mt-5 text-lg font-black text-slate-950">
                                  {goal ? t(goal.titleKey) : recommendation.goal}
                                </h3>

                                {goal && (
                                  <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {t(goal.descriptionKey)}
                                  </p>
                                )}

                                <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
                                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                    {t("aiScan.results.annualSaving")}
                                  </p>
                                  <p className="mt-1 text-xl font-black text-emerald-950">
                                    {new Intl.NumberFormat(
                                      i18n.language?.startsWith("en")
                                        ? "en-NL"
                                        : "nl-NL",
                                      {
                                        style: "currency",
                                        currency: "EUR",
                                        maximumFractionDigits: 0,
                                      },
                                    ).format(recommendation.estimatedAnnualSaving)}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => navigate(getRecommendationProductsUrl(recommendation))}
                                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                                >
                                  {t("nav.marketplace")}
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              </article>
                            );
                          })}
                        </div>
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
                        {t("aiScan.results.viewDashboard")}
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
                {t("aiScan.back")}
              </button>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                {t("aiScan.continue")}
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