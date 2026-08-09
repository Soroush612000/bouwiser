import {
  ArrowRight,
  Check,
  GitCompareArrows,
  Search,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Roof insulation",
    category: "Insulation",
    performance: "High",
    price: "From €18 / m²",
    detail: "Reduce heat loss through the roof.",
    tag: "Popular",
  },
  {
    name: "HR++ glazing",
    category: "Windows",
    performance: "High",
    price: "From €140 / m²",
    detail: "Improve insulation and indoor comfort.",
    tag: null,
  },
  {
    name: "Hybrid heat pump",
    category: "Heating",
    performance: "Very high",
    price: "From €4,500",
    detail: "Reduce gas use with your existing boiler.",
    tag: "Energy upgrade",
  },
];

const offers = [
  {
    store: "Hornbach",
    price: "€17.95 / m²",
    stock: "In stock",
    best: true,
  },
  {
    store: "GAMMA",
    price: "€19.20 / m²",
    stock: "In stock",
    best: false,
  },
  {
    store: "Praxis",
    price: "€20.10 / m²",
    stock: "Low stock",
    best: false,
  },
  {
    store: "Karwei",
    price: "€19.65 / m²",
    stock: "In stock",
    best: false,
  },
];

export default function ProductComparison() {
  const navigate = useNavigate();

  return (
    <section className="border-t border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#a90f35]">
              <GitCompareArrows className="h-4 w-4" />
              Product comparison
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-[46px]">
              Compare products.
              <br />
              Find the best offer.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Compare renovation products, technical information and retailer
              prices before you decide what to buy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="group inline-flex items-center text-sm font-medium text-slate-700 transition hover:text-[#a90f35]"
          >
            Browse all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-9 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search insulation, windows, heating..."
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
                  <span className="text-slate-500">Energy impact</span>

                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <Check className="h-4 w-4" />
                    {product.performance}
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Indicative price</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {product.price}
                    </p>
                  </div>

                  <span className="inline-flex items-center text-sm font-medium text-slate-700 group-hover:text-[#a90f35]">
                    Compare
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
              Retailer prices
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              One product.
              <br />
              Different prices.
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-600">
              See where a product is available and compare retailer prices
              before continuing to the store.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="group mt-6 inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-[#a90f35]"
            >
              Explore products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Example comparison
              </p>

              <p className="mt-1 font-semibold text-slate-950">
                Roof insulation
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
                        Best price
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
                Example view. Live offers are loaded from the Bouwiser product
                database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}