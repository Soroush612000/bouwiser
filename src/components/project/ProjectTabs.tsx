import {
  Bot,
  Calculator,
  Camera,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  ReceiptText,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs = [
  {
    value: "Overview",
    labelKey: "projectTabs.overview",
    icon: LayoutDashboard,
  },
  {
    value: "AI Report",
    labelKey: "projectTabs.aiReport",
    icon: Bot,
  },
  {
    value: "Photos",
    labelKey: "projectTabs.photos",
    icon: Camera,
  },
  {
    value: "Documents",
    labelKey: "projectTabs.documents",
    icon: FileText,
  },
  {
    value: "Quotes",
    labelKey: "projectTabs.quotes",
    icon: ReceiptText,
  },
  {
    value: "Tasks",
    labelKey: "projectTabs.tasks",
    icon: ClipboardCheck,
  },
  {
    value: "Budget",
    labelKey: "projectTabs.budget",
    icon: Calculator,
  },
];

export default function ProjectTabs({
  activeTab,
  onChange,
}: ProjectTabsProps) {
  const { t } = useTranslation();

  return (
    <section className="overflow-x-auto rounded-[22px] border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>
    </section>
  );
}