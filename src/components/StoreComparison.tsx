import { ArrowRight, CheckCircle2, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    store: "Hornbach",
    price: "€11.95",
    stock: "In stock",
    delivery: "Tomorrow",
    best: true,
  },
  {
    store: "GAMMA",
    price: "€12.30",
    stock: "In stock",
    delivery: "2 days",
    best: false,
  },
  {
    store: "Praxis",
    price: "€13.15",
    stock: "Low stock",
    delivery: "Tomorrow",
    best: false,
  },
  {
    store: "Karwei",
    price: "€12.60",
    stock: "In stock",
    delivery: "3 days",
    best: false,
  },
];

export default function StoreComparison() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          
          {/* Left */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">
              <Store className="h-4 w-4" />
              Store comparison
            </div>

            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
              One product.
              <br />
              Different prices.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Compare retailer prices, availability and delivery options
              before you decide where to buy.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="group mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Explore products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right */}
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Example comparison
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-950">
                Interior wall paint · 10L
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {offers.map((offer) => (
                <div
                  key={offer.store}
                  className="grid grid-cols-[1fr_auto] items-center gap-6 px-6 py-5 sm:grid-cols-[1.1fr_0.7fr_0.8fr_auto]"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">
                        {offer.store}
                      </p>

                      {offer.best && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Best price
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-500 sm:hidden">
                      {offer.stock} · {offer.delivery}
                    </p>
                  </div>

                  <p className="hidden text-sm text-slate-600 sm:block">
                    {offer.stock}
                  </p>

                  <p className="hidden text-sm text-slate-600 sm:block">
                    {offer.delivery}
                  </p>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-slate-950">
                      {offer.price}
                    </p>

                    {offer.best && (
                      <CheckCircle2 className="ml-auto mt-1 h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
              <p className="text-xs leading-5 text-slate-500">
                Example data. Live retailer offers will be shown from the
                Bouwiser product database.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}