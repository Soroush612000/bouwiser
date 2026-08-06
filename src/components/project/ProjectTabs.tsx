import {
  Bot,
  Calculator,
  Camera,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  ReceiptText,
} from "lucide-react";

interface ProjectTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs = [
  {
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    label: "AI Report",
    icon: Bot,
  },
  {
    label: "Photos",
    icon: Camera,
  },
  {
    label: "Documents",
    icon: FileText,
  },
  {
    label: "Quotes",
    icon: ReceiptText,
  },
  {
    label: "Tasks",
    icon: ClipboardCheck,
  },
  {
    label: "Budget",
    icon: Calculator,
  },
];

export default function ProjectTabs({
  activeTab,
  onChange,
}: ProjectTabsProps) {
  return (
    <section className="overflow-x-auto rounded-[22px] border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onChange(tab.label)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}