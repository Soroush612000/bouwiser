import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowUpDown,
  Check,
  ExternalLink,
  Filter,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { supabase } from "@/utils/supabase";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Subcategory = {
  id: number;
  name: string;
  slug: string;
  category_id: number;
};

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
  last_checked_at: string | null;
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
  slug: string | null;
  brand: string | null;
  description: string | null;
  image_url: string | null;
  material: string | null;
  color: string | null;
  rating: number | null;
  review_count: number | null;
  sustainability_score: number | null;
  quality_score: number | null;
  product_categories: Category | null;
  product_subcategories: Subcategory | null;
  product_offers: Offer[];
  product_specifications: Specification[];
};

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating-high"
  | "name";

const COMPARE_STORAGE_KEY = "bouwiser_compare_products";

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function lowestOffer(product: Product) {
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

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") ?? "",
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "",
  );

  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subcategory") ?? "",
  );

  const [selectedStore, setSelectedStore] = useState(
    searchParams.get("store") ?? "",
  );

  const [sortBy, setSortBy] =
    useState<SortOption>("featured");

  const [compareIds, setCompareIds] =
    useState<number[]>(readCompareIds);

  /*
  --------------------------------------------------
  LOAD MARKETPLACE DATA
  --------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadMarketplace = async () => {
      setLoading(true);
      setLoadError("");

      const [
        productsResult,
        categoriesResult,
        subcategoriesResult,
        storesResult,
      ] = await Promise.all([
        supabase
          .from("products")
          .select(`
            id,
            name,
            slug,
            brand,
            description,
            image_url,
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
              slug,
              category_id
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
              last_checked_at,
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
          .order("name"),

        supabase
          .from("product_categories")
          .select("id,name,slug")
          .order("name"),

        supabase
          .from("product_subcategories")
          .select("id,name,slug,category_id")
          .order("name"),

        supabase
          .from("stores")
          .select("id,name,slug")
          .order("name"),
      ]);

      if (!mounted) {
        return;
      }

      const error =
        productsResult.error ||
        categoriesResult.error ||
        subcategoriesResult.error ||
        storesResult.error;

      if (error) {
        console.error(
          "Could not load Bouwiser marketplace:",
          error,
        );

        setLoadError(
          "We could not load the product marketplace.",
        );

        setLoading(false);
        return;
      }

      setProducts(
        (productsResult.data ?? []) as unknown as Product[],
      );

      setCategories(
        (categoriesResult.data ?? []) as Category[],
      );

      setSubcategories(
        (subcategoriesResult.data ?? []) as Subcategory[],
      );

      setStores(
        (storesResult.data ?? []) as Store[],
      );

      setLoading(false);
    };

    void loadMarketplace();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  --------------------------------------------------
  COMPARE STORAGE
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
  URL FILTER STATE
  --------------------------------------------------
  */

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (selectedSubcategory) {
      params.set("subcategory", selectedSubcategory);
    }

    if (selectedStore) {
      params.set("store", selectedStore);
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedStore,
    setSearchParams,
  ]);

  /*
  --------------------------------------------------
  SUBCATEGORIES
  --------------------------------------------------
  */

  const visibleSubcategories = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    const category = categories.find(
      (item) => item.slug === selectedCategory,
    );

    if (!category) {
      return [];
    }

    return subcategories.filter(
      (item) => item.category_id === category.id,
    );
  }, [
    categories,
    selectedCategory,
    subcategories,
  ]);

  /*
  --------------------------------------------------
  PRODUCT FILTERING + SORTING
  --------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const offerStores =
        product.product_offers
          ?.map((offer) => offer.stores?.slug)
          .filter(Boolean) ?? [];

      const searchableValues = [
        product.name,
        product.brand,
        product.material,
        product.color,
        product.product_categories?.name,
        product.product_subcategories?.name,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query),
        );

      const matchesCategory =
        !selectedCategory ||
        product.product_categories?.slug ===
          selectedCategory;

      const matchesSubcategory =
        !selectedSubcategory ||
        product.product_subcategories?.slug ===
          selectedSubcategory;

      const matchesStore =
        !selectedStore ||
        offerStores.includes(selectedStore);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesStore
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "rating-high") {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }

      const aOffer = lowestOffer(a);
      const bOffer = lowestOffer(b);

      const aPrice = aOffer
        ? aOffer.price_per_unit ?? aOffer.price
        : Number.POSITIVE_INFINITY;

      const bPrice = bOffer
        ? bOffer.price_per_unit ?? bOffer.price
        : Number.POSITIVE_INFINITY;

      if (sortBy === "price-low") {
        return aPrice - bPrice;
      }

      if (sortBy === "price-high") {
        return bPrice - aPrice;
      }

      return a.id - b.id;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedStore,
    sortBy,
  ]);

  /*
  --------------------------------------------------
  COMPARE
  --------------------------------------------------
  */

  const toggleCompare = (productId: number) => {
    setCompareIds((current) => {
      if (current.includes(productId)) {
        return current.filter(
          (id) => id !== productId,
        );
      }

      if (current.length >= 4) {
        return current;
      }

      return [...current, productId];
    });
  };

  const compareProducts = products.filter(
    (product) =>
      compareIds.includes(product.id),
  );

  /*
  --------------------------------------------------
  FILTER HELPERS
  --------------------------------------------------
  */

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedStore("");
    setSortBy("featured");
  };

  const hasFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(selectedCategory) ||
    Boolean(selectedSubcategory) ||
    Boolean(selectedStore);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* ==================================================
            PAGE INTRO
        ================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-9 lg:px-8 lg:py-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a90f35]">
                Products
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[46px]">
                Find and compare
                <br className="hidden sm:block" />
                building products.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Search renovation products, compare
                specifications and retailer prices, then
                continue to the store when you are ready.
              </p>

              {/* Search */}
              <div className="relative mt-7 max-w-2xl">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  strokeWidth={1.8}
                />

                <input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search products, brands or materials..."
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            MARKETPLACE
        ================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-9">
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">

            {/* ==================================================
                FILTERS
            ================================================== */}

            <aside className="h-fit lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    className="h-4 w-4 text-slate-500"
                    strokeWidth={1.8}
                  />

                  <h2 className="text-sm font-semibold text-slate-900">
                    Filters
                  </h2>
                </div>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-slate-400 transition hover:text-[#a90f35]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-5 space-y-5">
                {/* CATEGORY */}

                <label className="block">
                  <span className="text-xs font-medium text-slate-500">
                    Category
                  </span>

                  <select
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(
                        event.target.value,
                      );

                      setSelectedSubcategory("");
                    }}
                    className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                  >
                    <option value="">
                      All categories
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.slug}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                {/* SUBCATEGORY */}

                <label className="block">
                  <span className="text-xs font-medium text-slate-500">
                    Subcategory
                  </span>

                  <select
                    value={selectedSubcategory}
                    disabled={!selectedCategory}
                    onChange={(event) =>
                      setSelectedSubcategory(
                        event.target.value,
                      )
                    }
                    className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">
                      {selectedCategory
                        ? "All subcategories"
                        : "Select a category first"}
                    </option>

                    {visibleSubcategories.map(
                      (subcategory) => (
                        <option
                          key={subcategory.id}
                          value={subcategory.slug}
                        >
                          {subcategory.name}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                {/* RETAILER */}

                <label className="block">
                  <span className="text-xs font-medium text-slate-500">
                    Retailer
                  </span>

                  <select
                    value={selectedStore}
                    onChange={(event) =>
                      setSelectedStore(
                        event.target.value,
                      )
                    }
                    className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                  >
                    <option value="">
                      All retailers
                    </option>

                    {stores.map((store) => (
                      <option
                        key={store.id}
                        value={store.slug}
                      >
                        {store.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </aside>

            {/* ==================================================
                PRODUCT AREA
            ================================================== */}

            <div className="min-w-0">

              {/* RESULTS / SORT */}

              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Compare product information and retailer
                    offers.
                  </p>
                </div>

                <label className="flex items-center gap-2 self-start sm:self-auto">
                  <ArrowUpDown
                    className="h-4 w-4 text-slate-400"
                    strokeWidth={1.8}
                  />

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value as SortOption,
                      )
                    }
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-slate-400"
                  >
                    <option value="featured">
                      Featured
                    </option>

                    <option value="price-low">
                      Lowest price
                    </option>

                    <option value="price-high">
                      Highest price
                    </option>

                    <option value="rating-high">
                      Highest rating
                    </option>

                    <option value="name">
                      Product name
                    </option>
                  </select>
                </label>
              </div>

              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading && (
                <div className="py-24 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading products...
                  </p>
                </div>
              )}

              {/* ==================================================
                  ERROR
              ================================================== */}

              {!loading && loadError && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
                  <p className="font-semibold text-red-900">
                    Products could not be loaded
                  </p>

                  <p className="mt-2 text-sm text-red-700">
                    {loadError}
                  </p>
                </div>
              )}

              {/* ==================================================
                  EMPTY
              ================================================== */}

              {!loading &&
                !loadError &&
                filteredProducts.length === 0 && (
                  <div className="py-20 text-center">
                    <Filter
                      className="mx-auto h-7 w-7 text-slate-300"
                      strokeWidth={1.7}
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      No matching products
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-5 text-sm font-semibold text-[#a90f35]"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

              {/* ==================================================
                  PRODUCT GRID
              ================================================== */}

              {!loading &&
                !loadError &&
                filteredProducts.length > 0 && (
                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => {
                      const bestOffer =
                        lowestOffer(product);

                      const isSelected =
                        compareIds.includes(product.id);

                      const firstSpecification =
                        product
                          .product_specifications?.[0];

                      return (
                        <article
                          key={product.id}
                          className="group flex min-h-[440px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:border-slate-300 hover:shadow-sm"
                        >
                          {/* PRODUCT IMAGE */}

                          <div className="flex h-36 items-center justify-center border-b border-slate-100 bg-slate-50 p-5">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="max-h-28 max-w-full object-contain transition duration-200 group-hover:scale-[1.02]"
                              />
                            ) : (
                              <ShoppingCart
                                className="h-9 w-9 text-slate-300"
                                strokeWidth={1.4}
                              />
                            )}
                          </div>

                          {/* PRODUCT CONTENT */}

                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a90f35]">
                                  {product
                                    .product_subcategories
                                    ?.name ??
                                    product
                                      .product_categories
                                      ?.name ??
                                    "Building product"}
                                </p>

                                <h2 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-slate-950">
                                  {product.name}
                                </h2>

                                {product.brand && (
                                  <p className="mt-1 truncate text-sm text-slate-400">
                                    {product.brand}
                                  </p>
                                )}
                              </div>

                              {product.rating !== null && (
                                <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500">
                                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                                  {Number(
                                    product.rating,
                                  ).toFixed(1)}
                                </div>
                              )}
                            </div>

                            {/* PRICE */}

                            <div className="mt-5 border-t border-slate-100 pt-4">
                              {bestOffer ? (
                                <div className="flex items-end justify-between gap-4">
                                  <div>
                                    <p className="text-xs text-slate-400">
                                      From
                                    </p>

                                    <p className="mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-950">
                                      {formatEuro(
                                        bestOffer.price_per_unit ??
                                          bestOffer.price,
                                      )}

                                      {bestOffer.price_per_unit &&
                                        bestOffer.price_unit && (
                                          <span className="ml-1 text-xs font-normal text-slate-400">
                                            /{" "}
                                            {
                                              bestOffer.price_unit
                                            }
                                          </span>
                                        )}
                                    </p>
                                  </div>

                                  <span className="max-w-[90px] truncate text-right text-xs font-medium text-slate-500">
                                    {bestOffer.stores
                                      ?.name ?? "Retailer"}
                                  </span>
                                </div>
                              ) : (
                                <p className="text-sm text-slate-400">
                                  No current retailer offer
                                </p>
                              )}
                            </div>

                            {/* ESSENTIAL SPECIFICATIONS */}

                            {(product.material ||
                              firstSpecification) && (
                              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                                {product.material && (
                                  <div className="flex items-start justify-between gap-4 text-xs">
                                    <span className="text-slate-400">
                                      Material
                                    </span>

                                    <span className="max-w-[55%] text-right font-medium text-slate-600">
                                      {product.material}
                                    </span>
                                  </div>
                                )}

                                {firstSpecification && (
                                  <div className="flex items-start justify-between gap-4 text-xs">
                                    <span className="text-slate-400">
                                      {
                                        firstSpecification.specification_name
                                      }
                                    </span>

                                    <span className="max-w-[55%] text-right font-medium text-slate-600">
                                      {
                                        firstSpecification.specification_value
                                      }

                                      {firstSpecification.specification_unit
                                        ? ` ${firstSpecification.specification_unit}`
                                        : ""}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* ACTIONS */}

                            <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleCompare(
                                    product.id,
                                  )
                                }
                                className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                                  isSelected
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-950 text-white hover:bg-[#a90f35]"
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    Selected
                                  </>
                                ) : (
                                  "Compare"
                                )}
                              </button>

                              {bestOffer?.product_url ? (
                                <a
                                  href={
                                    bestOffer.product_url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                                >
                                  Visit store

                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="h-10 cursor-not-allowed rounded-lg border border-slate-200 px-3 text-xs text-slate-300"
                                >
                                  No offer
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          COMPARE BAR
      ================================================== */}

      {compareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {compareIds.length}{" "}
                {compareIds.length === 1
                  ? "product"
                  : "products"}{" "}
                selected
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {compareProducts
                  .map((product) => product.name)
                  .join(" · ")}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCompareIds([])
                }
                className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>

              <button
                type="button"
                disabled={
                  compareIds.length < 2
                }
                onClick={() =>
                  navigate("/compare")
                }
                className="h-9 rounded-lg bg-white px-4 text-xs font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
              >
                Compare products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}