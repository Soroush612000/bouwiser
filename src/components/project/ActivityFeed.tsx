import {
  Bot,
  CheckCircle2,
  FileText,
  ReceiptText,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type {
  ProjectActivity,
  ProjectData,
} from "../../data/project";

interface ActivityFeedProps {
  project: ProjectData;
}

function getActivityStyle(type: ProjectActivity["type"]) {
  if (type === "AI") {
    return {
      icon: Bot,
      iconStyle: "bg-violet-100 text-violet-600",
      badgeStyle: "bg-violet-50 text-violet-700",
    };
  }

  if (type === "Document") {
    return {
      icon: FileText,
      iconStyle: "bg-blue-100 text-blue-600",
      badgeStyle: "bg-blue-50 text-blue-700",
    };
  }

  if (type === "Quote") {
    return {
      icon: ReceiptText,
      iconStyle: "bg-orange-100 text-orange-600",
      badgeStyle: "bg-orange-50 text-orange-700",
    };
  }

  return {
    icon: CheckCircle2,
    iconStyle: "bg-emerald-100 text-emerald-600",
    badgeStyle: "bg-emerald-50 text-emerald-700",
  };
}

export default function ActivityFeed({
  project,
}: ActivityFeedProps) {
  const { t } = useTranslation();

  const translateKnownValue = (value: string) => {
    const knownValues: Record<string, string> = {
      AI: t("activityFeed.types.ai"),
      Document: t("activityFeed.types.document"),
      Quote: t("activityFeed.types.quote"),
      Task: t("activityFeed.types.task"),

      "AI report updated": t("activityFeed.items.aiReportUpdated.title"),
      "The highest-priority renovation measure was updated.":
        t("activityFeed.items.aiReportUpdated.description"),

      "Document uploaded": t("activityFeed.items.documentUploaded.title"),
      "The existing energy-label certificate was added.":
        t("activityFeed.items.documentUploaded.description"),

      "Quotation received": t("activityFeed.items.quoteReceived.title"),
      "A contractor submitted a new quotation.":
        t("activityFeed.items.quoteReceived.description"),

      "Task completed": t("activityFeed.items.taskCompleted.title"),
      "The latest property photos were reviewed.":
        t("activityFeed.items.taskCompleted.description"),

      "18 minutes ago": t("activityFeed.times.minutes18"),
      "2 hours ago": t("activityFeed.times.hours2"),
      Yesterday: t("activityFeed.times.yesterday"),
      "2 days ago": t("activityFeed.times.days2"),
    };

    return knownValues[value] ?? value;
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
          {t("activityFeed.eyebrow")}
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
          {t("activityFeed.title")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {t("activityFeed.description")}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {project.activities.map((activity) => {
          const activityStyle = getActivityStyle(activity.type);
          const Icon = activityStyle.icon;

          return (
            <article
              key={activity.id}
              className="group flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${activityStyle.iconStyle}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-black text-slate-950">
                        {translateKnownValue(activity.title)}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${activityStyle.badgeStyle}`}
                      >
                        {translateKnownValue(activity.type)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {translateKnownValue(activity.description)}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-slate-400">
                    {translateKnownValue(activity.time)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
      >
        {t("activityFeed.viewAll")}
      </button>
    </section>
  );
}