import {
  Check,
  Circle,
  Clock3,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type {
  ProjectData,
  ProjectTimelineItem,
} from "../../data/project";

interface TimelineProps {
  project: ProjectData;
}

function getStatusStyles(
  status: ProjectTimelineItem["status"],
) {
  if (status === "Completed") {
    return {
      icon: "bg-emerald-500 text-white",
      line: "bg-emerald-300",
      badge: "bg-emerald-100 text-emerald-700",
      card: "border-emerald-200 bg-emerald-50/50",
    };
  }

  if (status === "Current") {
    return {
      icon: "bg-orange-500 text-white",
      line: "bg-slate-200",
      badge: "bg-orange-100 text-orange-700",
      card: "border-orange-200 bg-orange-50/60",
    };
  }

  return {
    icon: "bg-slate-100 text-slate-400",
    line: "bg-slate-200",
    badge: "bg-slate-100 text-slate-600",
    card: "border-slate-200 bg-slate-50/50",
  };
}

export default function Timeline({
  project,
}: TimelineProps) {
  const { t } = useTranslation();

  const translateKnownValue = (value: string) => {
    const knownValues: Record<string, string> = {
      Completed: t("timeline.status.completed"),
      Current: t("timeline.status.current"),
      Upcoming: t("timeline.status.upcoming"),

      "Photos uploaded": t("timeline.items.photosUploaded.title"),
      "AI analysis completed": t("timeline.items.aiAnalysisCompleted.title"),
      "Product comparison": t("timeline.items.productComparison.title"),
      "Request contractor quotes": t("timeline.items.requestQuotes.title"),
      Installation: t("timeline.items.installation.title"),

      "Exterior, roof and heating system photos added":
        t("timeline.items.photosUploaded.description"),
      "Energy performance and renovation options reviewed":
        t("timeline.items.aiAnalysisCompleted.description"),
      "Compare recommended renovation products":
        t("timeline.items.productComparison.description"),
      "Send the project scope to verified contractors":
        t("timeline.items.requestQuotes.description"),
      "Schedule and complete the selected renovation work":
        t("timeline.items.installation.description"),

      "12 July 2026": t("timeline.dates.july12"),
      "14 July 2026": t("timeline.dates.july14"),
      "Current step": t("timeline.dates.currentStep"),
     
    };

    return knownValues[value] ?? value;
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
          {t("timeline.eyebrow")}
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
          {t("timeline.title")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {t("timeline.description")}
        </p>
      </div>

      <div className="mt-8">
        {project.timeline.map((item, index) => {
          const styles = getStatusStyles(item.status);
          const isLast = index === project.timeline.length - 1;

          return (
            <div key={item.id} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm ${styles.icon}`}
                >
                  {item.status === "Completed" ? (
                    <Check className="h-5 w-5" />
                  ) : item.status === "Current" ? (
                    <Clock3 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>

                {!isLast && (
                  <div className={`h-full min-h-24 w-0.5 ${styles.line}`} />
                )}
              </div>

              <article
                className={`mb-6 flex-1 rounded-[24px] border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      {translateKnownValue(item.title)}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {translateKnownValue(item.description)}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}
                  >
                    {translateKnownValue(item.status)}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <Clock3 className="h-4 w-4" />
                  {translateKnownValue(item.date)}
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}