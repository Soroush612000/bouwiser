import {
  BadgeEuro,
  BellRing,
  Bot,
  ChevronRight,
  FileText,
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { supabase } from "@/utils/supabase";

interface DashboardSidebarProps {
  activeItem: string;
  onSelect: (item: string) => void;
  mobile?: boolean;
  onNavigate?: () => void;
  userName?: string;
  userInitial?: string;
}

const menuItems = [
  {
    id: "dashboard",
    labelKey: "dashboardSidebar.menu.dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "projects",
    labelKey: "dashboardSidebar.menu.projects",
    icon: FolderKanban,
    path: "/projects",
    badge: "3",
  },
  {
    id: "my-home",
    labelKey: "dashboardSidebar.menu.myHome",
    icon: Home,
  },
  {
    id: "ai-assistant",
    labelKey: "dashboardSidebar.menu.aiAssistant",
    icon: Bot,
    badge: "AI",
  },
  {
    id: "products",
    labelKey: "dashboardSidebar.menu.products",
    icon: ShoppingBag,
  },
  {
    id: "contractors",
    labelKey: "dashboardSidebar.menu.contractors",
    icon: Users,
  },
  {
    id: "reports",
    labelKey: "dashboardSidebar.menu.reports",
    icon: FileText,
  },
];

export default function DashboardSidebar({
  activeItem,
  onSelect,
  mobile = false,
  onNavigate,
  userName = "Homeowner",
  userInitial = "H",
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (itemId: string, path?: string) => {
    onSelect(itemId);

    if (path) {
      navigate(path);
    }

    onNavigate?.();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigate?.();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`relative h-screen w-[292px] shrink-0 overflow-hidden border-r border-white/10 bg-slate-950 text-white ${
        mobile ? "flex" : "sticky top-0 hidden lg:flex"
      }`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative flex h-full w-full flex-col">
        {/* Fixed top */}
        <div className="shrink-0 px-5 pt-5">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              onNavigate?.();
            }}
            className="group flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/[0.04]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
              <Zap className="h-6 w-6 text-white" />
            </div>

            <div className="min-w-0">
              <p className="text-xl font-black tracking-[-0.03em] text-white">
                Bouwiser
              </p>

              <p className="truncate text-xs text-slate-500">
                {t("dashboardSidebar.smartPlatform")}
              </p>
            </div>
          </button>

          <div className="mt-7 flex items-center justify-between px-3">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              {t("dashboardSidebar.workspace")}
            </p>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-white"
              aria-label={t("dashboardSidebar.notifications")}
            >
              <BellRing className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable middle */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          <nav className="mt-3 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigate(item.id, item.path)}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3.5 py-3 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-item"
                      className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-white"
                    />
                  )}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/[0.04] text-slate-500 group-hover:bg-white/[0.08] group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  <span className="flex-1 text-left">{t(item.labelKey)}</span>

                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.badge === "AI"
                            ? "bg-violet-500/15 text-violet-300"
                            : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {!item.badge && (
                    <ChevronRight
                      className={`h-4 w-4 transition-all ${
                        isActive
                          ? "translate-x-0 text-white/80"
                          : "-translate-x-1 text-slate-700 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* {t("dashboardSidebar.aiScore.title")} */}
          <motion.div
            whileHover={{ y: -3 }}
            className="relative mt-6 overflow-hidden rounded-[26px] border border-orange-400/20 bg-gradient-to-br from-orange-500/15 via-white/[0.05] to-violet-500/10 p-5"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-500/15 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-300">
                  <Sparkles className="h-4 w-4" />

                  <p className="text-[11px] font-black uppercase tracking-[0.16em]">
                    {t("dashboardSidebar.aiScore.title")}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-400">
                  {t("dashboardSidebar.aiScore.high")}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-black tracking-[-0.05em]">
                    87%
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {t("dashboardSidebar.aiScore.confidence")}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                  <Bot className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "87%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400"
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {t("dashboardSidebar.aiScore.description")}
              </p>

              <button
                type="button"
                onClick={() => handleNavigate("ai-assistant")}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                {t("dashboardSidebar.aiScore.viewReport")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Secondary menu */}
          <div className="mt-4 space-y-1">
            <button
              type="button"
              onClick={() => handleNavigate("subsidies")}
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                <BadgeEuro className="h-[18px] w-[18px]" />
              </div>

              <span className="flex-1 text-left">{t("dashboardSidebar.subsidies")}</span>

              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                €4,350
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("settings")}
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                <Settings className="h-[18px] w-[18px]" />
              </div>

              <span className="flex-1 text-left">{t("dashboardSidebar.settings")}</span>
            </button>
          </div>
        </div>

        {/* Fixed bottom */}
        <div className="shrink-0 border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 font-black text-white shadow-lg shadow-orange-500/20">
              {userInitial}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-white">
                {userName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {t("dashboardSidebar.homeowner")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("settings")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-white"
              aria-label={t("dashboardSidebar.openProfileSettings")}
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
            {t("dashboardSidebar.logout")}
          </button>
        </div>
      </div>
    </aside>
  );
}