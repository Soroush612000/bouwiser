import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Info,
  Scale,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { supabase } from "@/utils/supabase";

type Store = {
  id: number;
  name: string;
  slug: string;
};

type Offer = {
  id: number;
  price: number;
  price_per_unit: number | null;
  price_unit: string | null;
  old_price: number | null;
  currency: string;
  product_url: string;
  availability: string | null;
  stores: Store | null;
};

type Specification = {
  id: number;
  specification_name: string;
  specification_value: string;
  specification_unit: string | null;
};

type Product = {
  id: number;
  name: string;
  brand: string | null;
  material: string | null;
  color: string | null;
  rating: number | null;
  review_count: number | null;
  sustainability_score: number | null;
  quality_score: number | null;

  product_categories: {
    id: number;
    name: string;
    slug: string;
  } | null;

  product_subcategories: {
    id: number;
    name: string;
    slug: string;
  } | null;

  product_offers: Offer[];
  product_specifications: Specification[];
};

const COMPARE_STORAGE_KEY = "bouwiser_compare_products";

function formatEuro(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function bestOffer(product: Product) {
  if (!product.product_offers?.length) {
    return null;
  }

  return [...product.product_offers].sort(
    (a, b) =>
      (a.price_per_unit ?? a.price) -
      (b.price_per_unit ?? b.price),
  )[0];
}

function readCompareIds() {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
          .map(Number)
          .filter((value) => Number.isFinite(value))
      : [];
  } catch {
    return [];
  }
}

export default function Compare() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const numberLocale =
    i18n.language?.startsWith("en") ? "en-NL" : "nl-NL";

  const taxonomyLabel = (
    slug: string | null | undefined,
    fallback: string | null | undefined,
  ) => {
    if (!slug) {
      return fallback ?? "";
    }

    return t(`taxonomy.${slug}`, {
      defaultValue: fallback ?? slug,
    });
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [compareIds, setCompareIds] =
    useState<number[]>(readCompareIds);

  /*
  --------------------------------------------------
  LOAD SELECTED PRODUCTS
  --------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setLoadError("");

      if (compareIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          brand,
          material,
          color,
          rating,
          review_count,
          sustainability_score,
          quality_score,
          product_categories (
            id,
            name,
            slug
          ),
          product_subcategories (
            id,
            name,
            slug
          ),
          product_offers (
            id,
            price,
            price_per_unit,
            price_unit,
            old_price,
            currency,
            product_url,
            availability,
            stores (
              id,
              name,
              slug
            )
          ),
          product_specifications (
            id,
            specification_name,
            specification_value,
            specification_unit
          )
        `)
        .in("id", compareIds);

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Could not load comparison products:",
          error,
        );

        setLoadError("comparePage.loadErrorMessage");

        setLoading(false);
        return;
      }

      const rows =
        (data ?? []) as unknown as Product[];

      rows.sort(
        (a, b) =>
          compareIds.indexOf(a.id) -
          compareIds.indexOf(b.id),
      );

      setProducts(rows);
      setLoading(false);
    };

    void loadProducts();

    return () => {
      mounted = false;
    };
  }, [compareIds]);

  /*
  --------------------------------------------------
  SAVE COMPARE SELECTION
  --------------------------------------------------
  */

  useEffect(() => {
    localStorage.setItem(
      COMPARE_STORAGE_KEY,
      JSON.stringify(compareIds),
    );
  }, [compareIds]);

  /*
  --------------------------------------------------
  SPECIFICATION ROWS
  --------------------------------------------------
  */

  const specificationNames = useMemo(() => {
    const names = new Set<string>();

    products.forEach((product) => {
      product.product_specifications?.forEach(
        (specification) => {
          names.add(
            specification.specification_name,
          );
        },
      );
    });

    return Array.from(names);
  }, [products]);

  /*
  --------------------------------------------------
  LOWEST PRICE
  --------------------------------------------------
  */

  const productPriceValues = products
    .map((product) => {
      const offer = bestOffer(product);

      return offer
        ? offer.price_per_unit ?? offer.price
        : null;
    })
    .filter(
      (value): value is number =>
        value !== null,
    );

  const lowestPrice =
    productPriceValues.length > 0
      ? Math.min(...productPriceValues)
      : null;

  /*
  --------------------------------------------------
  ACTIONS
  --------------------------------------------------
  */

  const removeProduct = (productId: number) => {
    setCompareIds((current) =>
      current.filter(
        (id) => id !== productId,
      ),
    );
  };

  const clearComparison = () => {
    setCompareIds([]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* ==================================================
            HEADER
        ================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-9 lg:px-8 lg:py-10">

            <button
              type="button"
              onClick={() =>
                navigate("/products")
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#a90f35]"
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              {t("comparePage.backToProducts")}
            </button>

            <div className="mt-7 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                <Scale
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                {t("comparePage.eyebrow")}
              </div>

              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[46px]">
                {t("comparePage.titleLine1")}
                <br className="hidden sm:block" />
                {t("comparePage.titleLine2")}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {t("comparePage.description")}
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">

          {/* LOADING */}

          {loading && (
            <div className="py-24 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

              <p className="mt-4 text-sm text-slate-500">
                {t("comparePage.loading")}
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loading && loadError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="font-semibold text-red-900">
                {t("comparePage.loadErrorTitle")}
              </p>

              <p className="mt-2 text-sm text-red-700">
                {t(loadError)}
              </p>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !loadError &&
            products.length === 0 && (
              <div className="mx-auto max-w-xl py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <ShoppingBag
                    className="h-5 w-5 text-slate-400"
                    strokeWidth={1.7}
                  />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-950">
                  {t("comparePage.noProductsSelected")}
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  {t("comparePage.noProductsDescription")}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/products")
                  }
                  className="mt-6 h-11 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[#a90f35]"
                >
                  {t("comparePage.browseProducts")}
                </button>
              </div>
            )}

          {/* ==================================================
              COMPARISON
          ================================================== */}

          {!loading &&
            !loadError &&
            products.length > 0 && (
              <>
                {/* TOOLBAR */}

                <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t("comparePage.selectedCount", {
                        count: products.length,
                      })}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {t("comparePage.maxFour")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/products")
                      }
                      className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
                    >
                      {t("comparePage.addProduct")}
                    </button>

                    <button
                      type="button"
                      onClick={clearComparison}
                      className="text-sm font-medium text-slate-400 transition hover:text-red-600"
                    >
                      {t("comparePage.clearComparison")}
                    </button>
                  </div>
                </div>

                {/* ONE PRODUCT MESSAGE */}

                {products.length === 1 && (
                  <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                    <Info
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                      strokeWidth={1.8}
                    />

                    <p className="text-sm leading-6 text-amber-900">
                      {t("comparePage.selectOneMore")}
                    </p>
                  </div>
                )}

                {/* ==================================================
                    COMPARISON TABLE
                ================================================== */}

                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse">

                      {/* PRODUCT HEADERS */}

                      <thead>
                        <tr>
                          <th className="w-48 border-b border-r border-slate-200 bg-slate-50 px-5 py-5 text-left align-bottom">
                            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                              {t("comparePage.comparison")}
                            </span>
                          </th>

                          {products.map(
                            (product) => (
                              <th
                                key={product.id}
                                className="min-w-[240px] border-b border-r border-slate-200 bg-white px-5 py-5 text-left align-top last:border-r-0"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a90f35]">
                                      {product.product_subcategories
                                        ? taxonomyLabel(
                                            product.product_subcategories.slug,
                                            product.product_subcategories.name,
                                          )
                                        : product.product_categories
                                          ? taxonomyLabel(
                                              product.product_categories.slug,
                                              product.product_categories.name,
                                            )
                                          : t("comparePage.product")}
                                    </p>

                                    <h2 className="mt-2 text-base font-semibold leading-6 text-slate-950">
                                      {product.name}
                                    </h2>

                                    <p className="mt-1 text-sm font-normal text-slate-400">
                                      {product.brand ||
                                        t("comparePage.brandNotSpecified")}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeProduct(
                                        product.id,
                                      )
                                    }
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600"
                                    aria-label={t("comparePage.removeProduct")}
                                  >
                                    <Trash2
                                      className="h-4 w-4"
                                      strokeWidth={1.7}
                                    />
                                  </button>
                                </div>
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {/* ==========================================
                            PRICE
                        ========================================== */}

                        <tr>
                          <td className="border-b border-r border-slate-200 bg-slate-50 px-5 py-5 text-sm font-medium text-slate-600">
                            {t("comparePage.bestPrice")}
                          </td>

                          {products.map(
                            (product) => {
                              const offer =
                                bestOffer(product);

                              const comparablePrice =
                                offer
                                  ? offer.price_per_unit ??
                                    offer.price
                                  : null;

                              const isLowest =
                                comparablePrice !==
                                  null &&
                                lowestPrice !== null &&
                                comparablePrice ===
                                  lowestPrice;

                              return (
                                <td
                                  key={product.id}
                                  className={`border-b border-r border-slate-200 px-5 py-5 last:border-r-0 ${
                                    isLowest
                                      ? "bg-emerald-50/60"
                                      : ""
                                  }`}
                                >
                                  {offer ? (
                                    <>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
                                          {formatEuro(
                                            comparablePrice!,
                                            numberLocale,
                                          )}
                                        </span>

                                        {isLowest &&
                                          products.length >
                                            1 && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                                              <Check className="h-3 w-3" />
                                              {t("comparePage.lowest")}
                                            </span>
                                          )}
                                      </div>

                                      {offer.price_per_unit &&
                                        offer.price_unit && (
                                          <p className="mt-1 text-xs text-slate-400">
                                            {t("comparePage.per")}{" "}
                                            {
                                              offer.price_unit
                                            }{" "}
                                            · {t("comparePage.package")}{" "}
                                            {formatEuro(
                                              offer.price,
                                              numberLocale,
                                            )}
                                          </p>
                                        )}

                                      <p className="mt-2 text-xs font-medium text-slate-500">
                                        {offer.stores
                                          ?.name ??
                                          t("comparePage.retailer")}
                                      </p>
                                    </>
                                  ) : (
                                    <span className="text-sm text-slate-400">
                                      {t("comparePage.noOffer")}
                                    </span>
                                  )}
                                </td>
                              );
                            },
                          )}
                        </tr>

                        {/* ==========================================
                            RATING
                        ========================================== */}

                        <tr>
                          <td className="border-b border-r border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                            {t("comparePage.rating")}
                          </td>

                          {products.map(
                            (product) => (
                              <td
                                key={product.id}
                                className="border-b border-r border-slate-200 px-5 py-4 last:border-r-0"
                              >
                                {product.rating !==
                                null ? (
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                                    <span className="text-sm font-semibold text-slate-800">
                                      {Number(
                                        product.rating,
                                      ).toFixed(1)}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                      (
                                      {product.review_count ??
                                        0}
                                      )
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-slate-400">
                                    {t("comparePage.notAvailable")}
                                  </span>
                                )}
                              </td>
                            ),
                          )}
                        </tr>

                        {/* ==========================================
                            MATERIAL
                        ========================================== */}

                        <tr>
                          <td className="border-b border-r border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                            {t("comparePage.material")}
                          </td>

                          {products.map(
                            (product) => (
                              <td
                                key={product.id}
                                className="border-b border-r border-slate-200 px-5 py-4 text-sm text-slate-700 last:border-r-0"
                              >
                                {product.material ||
                                  t("comparePage.notSpecified")}
                              </td>
                            ),
                          )}
                        </tr>

                        {/* ==========================================
                            COLOUR
                        ========================================== */}

                        <tr>
                          <td className="border-b border-r border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                            {t("comparePage.colour")}
                          </td>

                          {products.map(
                            (product) => (
                              <td
                                key={product.id}
                                className="border-b border-r border-slate-200 px-5 py-4 text-sm text-slate-700 last:border-r-0"
                              >
                                {product.color ||
                                  t("comparePage.notSpecified")}
                              </td>
                            ),
                          )}
                        </tr>

                        {/* ==========================================
                            DYNAMIC SPECIFICATIONS
                        ========================================== */}

                        {specificationNames.map(
                          (specificationName) => (
                            <tr
                              key={
                                specificationName
                              }
                            >
                              <td className="border-b border-r border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                                {specificationName}
                              </td>

                              {products.map(
                                (product) => {
                                  const specification =
                                    product.product_specifications?.find(
                                      (item) =>
                                        item.specification_name ===
                                        specificationName,
                                    );

                                  return (
                                    <td
                                      key={
                                        product.id
                                      }
                                      className="border-b border-r border-slate-200 px-5 py-4 text-sm text-slate-700 last:border-r-0"
                                    >
                                      {specification ? (
                                        <>
                                          {
                                            specification.specification_value
                                          }

                                          {specification.specification_unit
                                            ? ` ${specification.specification_unit}`
                                            : ""}
                                        </>
                                      ) : (
                                        <span className="text-slate-300">
                                          —
                                        </span>
                                      )}
                                    </td>
                                  );
                                },
                              )}
                            </tr>
                          ),
                        )}

                        {/* ==========================================
                            RETAILER CTA
                        ========================================== */}

                        <tr>
                          <td className="border-r border-slate-200 bg-slate-50 px-5 py-5 text-sm font-medium text-slate-600">
                            {t("comparePage.retailer")}
                          </td>

                          {products.map(
                            (product) => {
                              const offer =
                                bestOffer(product);

                              return (
                                <td
                                  key={product.id}
                                  className="border-r border-slate-200 px-5 py-5 last:border-r-0"
                                >
                                  {offer?.product_url ? (
                                    <a
                                      href={
                                        offer.product_url
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-semibold text-white transition hover:bg-[#a90f35]"
                                    >
                                      {t("comparePage.visit")}{" "}
                                      {offer.stores
                                        ?.name ??
                                        t("comparePage.store")}

                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                  ) : (
                                    <span className="text-sm text-slate-400">
                                      {t("comparePage.noCurrentOffer")}
                                    </span>
                                  )}
                                </td>
                              );
                            },
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ==================================================
                    INFORMATION NOTE
                ================================================== */}

                <div className="mt-6 flex items-start gap-3 border-t border-slate-200 pt-6">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {t("comparePage.aboutTitle")}
                    </p>

                    <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-500">
                      {t("comparePage.aboutDescription")}
                    </p>
                  </div>
                </div>
              </>
            )}
        </section>
      </main>
    </div>
  );
}