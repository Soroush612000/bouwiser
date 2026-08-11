import { ChevronDown, Globe2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [productsOpen, setProductsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const currentLanguage = i18n.language?.startsWith("en") ? "en" : "nl";

  const changeLanguage = (language: "nl" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("bouwiser_language", language);
    setLanguageOpen(false);
  };

  const linkStyle =
    "whitespace-nowrap px-1 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950";

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="shrink-0">
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

          {/* Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
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
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />
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

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">

            {/* Language */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setLanguageOpen((value) => !value)}
                className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <Globe2 className="h-4 w-4" strokeWidth={1.8} />
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
                    Nederlands
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            <LoginModal />

            <button
              type="button"
              onClick={() => navigate("/ai-scan")}
              className="hidden h-10 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-[#a90f35] xl:flex"
            >
              {t("nav.startScan")}
            </button>
          </div>
        </div>
      </header>

      {/* Product comparison strip */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-3 px-6 text-xs lg:px-8">
          <span className="font-semibold text-slate-700">
            {t("comparison.title")}
          </span>

          <span className="hidden text-slate-500 md:inline">
            {t("comparison.description")}
          </span>

          <Link
            to="/products"
            className="font-semibold text-[#a90f35] transition hover:text-slate-950"
          >
            {t("comparison.action")} →
          </Link>
        </div>
      </div>
    </>
  );
}