import {
  ChevronDown,
  Globe2,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [productsOpen, setProductsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLanguage = i18n.language?.startsWith("en") ? "en" : "nl";

  const changeLanguage = (language: "nl" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("bouwiser_language", language);
    setLanguageOpen(false);
    setMobileOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const linkStyle =
    "whitespace-nowrap px-1 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950";

  const mobileLinkStyle =
    "block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950";

  return (
    <>
      <header className="relative z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="shrink-0"
          >
            <div>
              <p className="text-[22px] font-bold tracking-[-0.03em] text-slate-950">
                BOU
                <span className="text-[#a90f35]">W</span>
                ISER
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Smart Renovation Platform
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-4 min-[1400px]:flex 2xl:gap-6">
            <Link className={linkStyle} to="/">
              {t("nav.home")}
            </Link>

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`${linkStyle} flex items-center gap-1`}
                onClick={() => navigate("/products")}
              >
                {t("nav.marketplace")}
                <ChevronDown
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />
              </button>

              {productsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
                    <Link
                      to="/products"
                      className="block rounded-lg p-3 transition hover:bg-slate-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {t("products.browseTitle")}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {t("products.browseDescription")}
                      </p>
                    </Link>

                    <div className="my-3 border-t border-slate-100" />

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {[
                        ["products.categories.insulation", "Insulation"],
                        ["products.categories.windows", "Windows"],
                        ["products.categories.flooring", "Flooring"],
                        ["products.categories.heating", "Heating"],
                        ["products.categories.solar", "Solar"],
                        ["products.categories.materials", "Materials"],
                      ].map(([translationKey, item]) => (
                        <Link
                          key={item}
                          to="/products"
                          className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                        >
                          {t(translationKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link className={linkStyle} to="/compare">
              {t("nav.compare")}
            </Link>

            <Link className={linkStyle} to="/energy">
              {t("nav.energy")}
            </Link>

            <Link className={linkStyle} to="/ai">
              {t("nav.aiAssistant")}
            </Link>

            <Link className={linkStyle} to="/hub">
              {t("nav.partners")}
            </Link>

            <Link className={linkStyle} to="/about">
              {t("nav.about")}
            </Link>

            <Link className={linkStyle} to="/contact">
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Desktop right side */}
          <div className="hidden shrink-0 items-center gap-2 min-[1400px]:flex">
            {/* Language */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setLanguageOpen((value) => !value)
                }
                className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <Globe2
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                {currentLanguage.toUpperCase()}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => changeLanguage("nl")}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {t("common.dutch")}
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {t("common.english")}
                  </button>
                </div>
              )}
            </div>

            <LoginModal />

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
            >
              {t("nav.startScan")}
            </button>
          </div>

          {/* Mobile / laptop menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 min-[1400px]:hidden"
            aria-label="Open navigation menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile / laptop menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white min-[1400px]:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <nav className="grid gap-1 sm:grid-cols-2">
                <Link
                  className={mobileLinkStyle}
                  to="/"
                  onClick={closeMobileMenu}
                >
                  {t("nav.home")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/products"
                  onClick={closeMobileMenu}
                >
                  {t("nav.marketplace")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/compare"
                  onClick={closeMobileMenu}
                >
                  {t("nav.compare")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/energy"
                  onClick={closeMobileMenu}
                >
                  {t("nav.energy")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/ai"
                  onClick={closeMobileMenu}
                >
                  {t("nav.aiAssistant")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/hub"
                  onClick={closeMobileMenu}
                >
                  {t("nav.partners")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/about"
                  onClick={closeMobileMenu}
                >
                  {t("nav.about")}
                </Link>

                <Link
                  className={mobileLinkStyle}
                  to="/contact"
                  onClick={closeMobileMenu}
                >
                  {t("nav.contact")}
                </Link>
              </nav>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="mb-4 flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-slate-500" />

                  <button
                    type="button"
                    onClick={() => changeLanguage("nl")}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      currentLanguage === "nl"
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    NL
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      currentLanguage === "en"
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    EN
                  </button>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <LoginModal />

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/ai-scan");
                    }}
                    className="h-12 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
                  >
                    {t("nav.startScan")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Product comparison strip */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-3 overflow-hidden px-4 text-xs sm:px-6 lg:px-8">
          <span className="shrink-0 font-semibold text-slate-700">
            {t("comparison.title")}
          </span>

          <span className="hidden truncate text-slate-500 md:inline">
            {t("comparison.description")}
          </span>

          <Link
            to="/products"
            className="shrink-0 whitespace-nowrap font-semibold text-[#a90f35] transition hover:text-slate-950"
          >
            {t("comparison.action")} →
          </Link>
        </div>
      </div>
    </>
  );
}