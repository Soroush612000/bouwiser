import {
  ArrowRight,
  Check,
  GitCompareArrows,
  Search,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductComparison() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const products = [
    {
      name: t("productComparison.roofInsulation"),
      category: t("productComparison.insulation"),
      performance: t("productComparison.high"),
      price: t("productComparison.roofPrice"),
      detail: t("productComparison.roofDetail"),
      tag: t("productComparison.popular"),
    },
    {
      name: t("productComparison.glazing"),
      category: t("productComparison.windows"),
      performance: t("productComparison.high"),
      price: t("productComparison.glazingPrice"),
      detail: t("productComparison.glazingDetail"),
      tag: null,
    },
    {
      name: t("productComparison.heatPump"),
      category: t("productComparison.heating"),
      performance: t("productComparison.veryHigh"),
      price: t("productComparison.heatPumpPrice"),
      detail: t("productComparison.heatPumpDetail"),
      tag: t("productComparison.energyUpgrade"),
    },
  ];

  const offers = [
    {
      store: "Hornbach",
      price: "€17.95 / m²",
      stock: t("productComparison.inStock"),
      best: true,
    },
    {
      store: "GAMMA",
      price: "€19.20 / m²",
      stock: t("productComparison.inStock"),
      best: false,
    },
    {
      store: "Praxis",
      price: "€20.10 / m²",
      stock: t("productComparison.lowStock"),
      best: false,
    },
    {
      store: "Karwei",
      price: "€19.65 / m²",
      stock: t("productComparison.inStock"),
      best: false,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a90f35]">
              <GitCompareArrows className="h-4 w-4" />
              {t("productComparison.label")}
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-[46px]">
              {t("productComparison.titleLine1")}
              <br />
              {t("productComparison.titleLine2")}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              {t("productComparison.description")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="group inline-flex items-center text-sm font-medium text-slate-700 transition hover:text-[#a90f35]"
          >
            {t("productComparison.browseAll")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-9 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder={t("productComparison.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
          />
        </div>

        {/* Product cards */}
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <button
              type="button"
              key={product.name}
              onClick={() => navigate("/products")}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-slate-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    {product.name}
                  </h3>
                </div>

                {product.tag && (
                  <span className="text-xs font-medium text-[#a90f35]">
                    {product.tag}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {product.detail}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    {t("productComparison.energyImpact")}
                  </span>

                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <Check className="h-4 w-4" />
                    {product.performance}
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("productComparison.indicativePrice")}
                    </p>

                    <p className="mt-1 font-semibold text-slate-950">
                      {product.price}
                    </p>
                  </div>

                  <span className="inline-flex items-center text-sm font-medium text-slate-700 group-hover:text-[#a90f35]">
                    {t("productComparison.compare")}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Retailer comparison */}
        <div className="mt-12 grid gap-10 border-t border-slate-200 pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

          {/* Left */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a90f35]">
              <Store className="h-4 w-4" />
              {t("productComparison.retailerPrices")}
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              {t("productComparison.retailerTitleLine1")}
              <br />
              {t("productComparison.retailerTitleLine2")}
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {t("productComparison.retailerDescription")}
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="group mt-6 inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-[#a90f35]"
            >
              {t("productComparison.exploreProducts")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {t("productComparison.exampleComparison")}
              </p>

              <p className="mt-1 font-semibold text-slate-950">
                {t("productComparison.roofInsulation")}
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {offers.map((offer) => (
                <div
                  key={offer.store}
                  className="grid grid-cols-[1fr_auto] items-center gap-5 px-6 py-4 sm:grid-cols-[1fr_0.7fr_auto]"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">
                      {offer.store}
                    </span>

                    {offer.best && (
                      <span className="text-xs font-medium text-emerald-700">
                        {t("productComparison.bestPrice")}
                      </span>
                    )}
                  </div>

                  <span className="hidden text-sm text-slate-500 sm:block">
                    {offer.stock}
                  </span>

                  <span className="font-semibold text-slate-950">
                    {offer.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-6 py-3">
              <p className="text-xs text-slate-400">
                {t("productComparison.exampleNote")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}