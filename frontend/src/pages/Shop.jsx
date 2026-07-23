import { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from "react";
import { useSearchParams, Link } from "react-router";
import { Header } from "../components/layout/Header";
import { ProductCard } from "../components/ProductCard";
import { useCategory } from "../context/CategoryContext";
import { useCurrency } from "../context/CurrencyContext";
import { SUPPORTED_CURRENCIES } from "../utils/currencyUtils";
import { useSEO } from "../hooks/useSEO";
import api from "../api/axios";
import {
  Filter, X, ChevronDown, ChevronRight, Search,
  Check, SlidersHorizontal, ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = lazy(() =>
  import("../components/layout/Footer").then(m => ({ default: m.Footer }))
);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PRICE_RANGES_BASE = [
  { value: 5000, type: 'under' },
  { value: 10000, type: 'under' },
  { value: 15000, type: 'under' },
  { value: 20000, type: 'under' },
  { value: 25000, type: 'under' },
  { value: 25000, type: 'above' },
];

const SORT_OPTIONS = [
  { label: "Featured",           value: "featured"    },
  { label: "Newest",             value: "newest"      },
  { label: "Price: Low to High", value: "price_asc"   },
  { label: "Price: High to Low", value: "price_desc"  },
  { label: "Best Selling",       value: "best_seller" },
  { label: "Highest Rated",      value: "rating"      },
  { label: "A – Z",             value: "name_asc"    },
  { label: "Z – A",             value: "name_desc"   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Small sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Single checkbox row with optional count badge */
const CheckboxRow = ({ label, checked, onChange, count, disabled }) => (
  <label
    className={`flex items-center justify-between group py-1.5 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <div className="flex items-center gap-3">
      <div
        onClick={disabled ? undefined : onChange}
        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors flex-shrink-0
          ${checked ? "bg-obsidian border-obsidian" : "border-gray-300 group-hover:border-obsidian"}`}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
      <span className={`text-[13px] tracking-wide leading-tight ${checked ? "text-obsidian font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}>
        {label}
      </span>
    </div>
    {count !== undefined && (
      <span className="text-[11px] text-gray-400 font-medium tabular-nums">{count}</span>
    )}
  </label>
);

/** Filter section with collapsible header */
const FilterBlock = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between mb-0 group"
      >
        <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-obsidian">{title}</h3>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-0.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Loading skeleton card */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[4/5] bg-gray-100" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-100 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar content — shared between desktop and mobile drawer
// ─────────────────────────────────────────────────────────────────────────────

const SidebarContent = ({
  activeFilters, updateFilter, toggleArrayFilter,
  categories, filterOptions, priceRanges,
  searchInput, onSearchChange,
}) => {
  const { categoryCounts = [], materials = [], stoneTypes = [], colors = [] } = filterOptions;

  // Build a map of categoryId → count
  const countMap = useMemo(() => {
    const m = {};
    categoryCounts.forEach(c => { if (c._id) m[c._id.toString()] = c.count; });
    return m;
  }, [categoryCounts]);

  // Selected price range (compare min+max together)
  const selectedPriceIdx = priceRanges.findIndex(
    r => r.min === activeFilters.priceGte && r.max === activeFilters.priceLte
  );

  const handlePriceToggle = (range, idx) => {
    if (selectedPriceIdx === idx) {
      // Deselect
      updateFilter("price[gte]", "");
      updateFilter("price[lte]", "");
    } else {
      updateFilter("price[gte]", range.min);
      updateFilter("price[lte]", range.max);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Search */}
      <div className="py-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full bg-gray-50 border border-transparent focus:border-obsidian/30 focus:ring-0 text-[13px] rounded-xl py-2.5 pl-9 pr-4 transition-all outline-none"
          />
          {searchInput && (
            <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-gray-400 hover:text-obsidian" />
            </button>
          )}
        </div>
      </div>

      {/* Collections */}
      <FilterBlock title="Collections">
        {categories.filter(c => !c.parentCategory).map(cat => {
          const count = countMap[cat._id?.toString()] ?? 0;
          const isActive = activeFilters.category.includes(cat._id?.toString() || cat.name);
          return (
            <CheckboxRow
              key={cat._id}
              label={cat.name}
              checked={isActive}
              count={count}
              disabled={count === 0 && !isActive}
              onChange={() => toggleArrayFilter("category", cat._id?.toString())}
            />
          );
        })}
      </FilterBlock>

      {/* Price */}
      <FilterBlock title="Price Range">
        {priceRanges.map((range, i) => (
          <label key={i} className="flex items-center gap-3 py-1.5 cursor-pointer group">
            <div
              onClick={() => handlePriceToggle(range, i)}
              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0
                ${selectedPriceIdx === i ? "border-obsidian" : "border-gray-300 group-hover:border-obsidian"}`}
            >
              {selectedPriceIdx === i && <div className="w-2 h-2 rounded-full bg-obsidian" />}
            </div>
            <span className={`text-[13px] tracking-wide ${selectedPriceIdx === i ? "text-obsidian font-semibold" : "text-gray-600"}`}>
              {range.label}
            </span>
          </label>
        ))}
      </FilterBlock>

      {/* Material */}
      {materials.length > 0 && (
        <FilterBlock title="Material">
          {materials.map(m => (
            <CheckboxRow
              key={m}
              label={m}
              checked={activeFilters.materials.includes(m)}
              onChange={() => toggleArrayFilter("materials", m)}
            />
          ))}
        </FilterBlock>
      )}

      {/* Stone Type */}
      {stoneTypes.length > 0 && (
        <FilterBlock title="Stone Type">
          {stoneTypes.map(s => (
            <CheckboxRow
              key={s}
              label={s}
              checked={activeFilters.stoneTypes.includes(s)}
              onChange={() => toggleArrayFilter("stoneTypes", s)}
            />
          ))}
        </FilterBlock>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <FilterBlock title="Color">
          {colors.map(c => (
            <label key={c} className="flex items-center gap-3 py-1.5 cursor-pointer group">
              <div
                onClick={() => toggleArrayFilter("colors", c)}
                className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors flex-shrink-0
                  ${activeFilters.colors.includes(c) ? "bg-obsidian border-obsidian" : "border-gray-300 group-hover:border-obsidian"}`}
              >
                {activeFilters.colors.includes(c) && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className={`text-[13px] tracking-wide ${activeFilters.colors.includes(c) ? "text-obsidian font-semibold" : "text-gray-600"}`}>
                {c}
              </span>
            </label>
          ))}
        </FilterBlock>
      )}

      {/* In Stock */}
      <div className="pt-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => updateFilter("inStock", activeFilters.inStock ? "" : "true")}
            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors flex-shrink-0
              ${activeFilters.inStock ? "bg-obsidian border-obsidian" : "border-gray-300 group-hover:border-obsidian"}`}
          >
            {activeFilters.inStock && <Check className="w-2.5 h-2.5 text-white" />}
          </div>
          <span className={`text-[13px] font-semibold tracking-wide ${activeFilters.inStock ? "text-obsidian" : "text-gray-700"}`}>
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Shop component
// ─────────────────────────────────────────────────────────────────────────────

export function Shop() {
  useSEO(
    "Shop All Collections | Shree Hari Kripa",
    "Browse our complete collection of handcrafted deity jewellery — filter by collection, price, material, stone type and more."
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategory();
  const { currency, getFormattedPrice } = useCurrency();
  const currencySymbol = SUPPORTED_CURRENCIES[currency]?.symbol || "₹";

  const priceRanges = useMemo(() => {
    return PRICE_RANGES_BASE.map(range => {
      const formatted = getFormattedPrice(range.value).replace(/\.00$/, '');
      if (range.type === 'under') {
        return { label: `Under ${formatted}`, min: "", max: String(range.value) };
      } else {
        return { label: `Above ${formatted}`, min: String(range.value), max: "" };
      }
    });
  }, [getFormattedPrice]);

  // ── State ────────────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ materials: [], stoneTypes: [], colors: [], categoryCounts: [] });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  // Local search input (debounced before hitting URL)
  const [searchInput, setSearchInput] = useState(() => searchParams.get("keyword") || "");
  const searchDebounceRef = useRef(null);
  const LIMIT = 1000;

  // ── Derived filter state from URL ─────────────────────────────────────────
  const activeFilters = useMemo(() => ({
    keyword:    searchParams.get("keyword") || "",
    category:   searchParams.get("category") ? searchParams.get("category").split(",") : [],
    materials:  searchParams.get("materials") ? searchParams.get("materials").split(",") : [],
    colors:     searchParams.get("colors") ? searchParams.get("colors").split(",") : [],
    stoneTypes: searchParams.get("stoneTypes") ? searchParams.get("stoneTypes").split(",") : [],
    priceGte:   searchParams.get("price[gte]") || "",
    priceLte:   searchParams.get("price[lte]") || "",
    sort:       searchParams.get("sort") || "price_asc",
    inStock:    searchParams.get("inStock") === "true",
  }), [searchParams]);

  // Sync local search input when URL changes externally (e.g. browser back)
  useEffect(() => {
    setSearchInput(activeFilters.keyword);
  }, [activeFilters.keyword]);

  // ── Fetch filter options (once) ───────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products/filter-options");
        setFilterOptions({
          materials:      data.materials      || [],
          stoneTypes:     data.stoneTypes     || [],
          colors:         data.colors         || [],
          categoryCounts: data.categoryCounts || [],
        });
      } catch (e) {
        console.error("Failed to load filter options:", e);
      }
    })();
  }, []);

  // ── Fetch products ────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async (targetPage = 1) => {
    const isFirstPage = targetPage === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams();
      params.set("limit", LIMIT);
      params.set("page", targetPage);

      if (activeFilters.keyword)            params.set("keyword", activeFilters.keyword);
      // Send category ObjectIds — sidebar now stores _id strings
      if (activeFilters.category.length > 0) params.set("category", activeFilters.category.join(","));
      if (activeFilters.priceGte)           params.set("price[gte]", activeFilters.priceGte);
      if (activeFilters.priceLte)           params.set("price[lte]", activeFilters.priceLte);
      if (activeFilters.materials.length > 0)  params.set("materials", activeFilters.materials.join(","));
      if (activeFilters.colors.length > 0)     params.set("colors",    activeFilters.colors.join(","));
      if (activeFilters.stoneTypes.length > 0) params.set("stoneTypes", activeFilters.stoneTypes.join(","));
      if (activeFilters.inStock)            params.set("inStock", "true");
      params.set("sort", activeFilters.sort);

      const { data } = await api.get(`/products?${params.toString()}`);
      const incoming = data.products || [];

      if (isFirstPage) {
        setProducts(incoming);
      } else {
        setProducts(prev => [...prev, ...incoming]);
      }

      setTotalResults(data.totalProducts ?? 0);
      setHasMore(incoming.length >= LIMIT && (targetPage * LIMIT) < (data.totalProducts ?? 0));
    } catch (error) {
      console.error("Error fetching shop products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeFilters]);

  // Re-fetch when filters change (reset to page 1)
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  }, [page, fetchProducts]);

  // ── URL helpers ───────────────────────────────────────────────────────────
  const updateFilter = useCallback((key, value) => {
    const newParams = new window.URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const toggleArrayFilter = useCallback((key, item) => {
    const current = [...activeFilters[key]];
    const idx = current.indexOf(item);
    if (idx === -1) current.push(item);
    else current.splice(idx, 1);

    const newParams = new window.URLSearchParams(searchParams);
    if (current.length > 0) newParams.set(key, current.join(","));
    else newParams.delete(key);
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
  }, [activeFilters, searchParams, setSearchParams]);

  const clearAllFilters = useCallback(() => {
    setSearchParams({});
    setSearchInput("");
    setIsMobileDrawerOpen(false);
  }, [setSearchParams]);

  // ── Debounced search ──────────────────────────────────────────────────────
  const handleSearchChange = useCallback((value) => {
    setSearchInput(value);
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      updateFilter("keyword", value);
    }, 350);
  }, [updateFilter]);

  // ── Active chips ──────────────────────────────────────────────────────────
  const activeChips = useMemo(() => {
    const chips = [];
    if (activeFilters.keyword) chips.push({ key: "keyword", label: `"${activeFilters.keyword}"` });

    activeFilters.category.forEach(id => {
      const cat = categories.find(c => c._id?.toString() === id);
      chips.push({ key: "category", val: id, label: cat ? cat.name : id });
    });

    activeFilters.materials.forEach(m => chips.push({ key: "materials", val: m, label: m }));
    activeFilters.stoneTypes.forEach(s => chips.push({ key: "stoneTypes", val: s, label: s }));
    activeFilters.colors.forEach(c => chips.push({ key: "colors", val: c, label: c }));

    if (activeFilters.priceGte || activeFilters.priceLte) {
      const matched = priceRanges.find(r => r.min === activeFilters.priceGte && r.max === activeFilters.priceLte);
      
      const formatFallback = (val) => val ? getFormattedPrice(Number(val)).replace(/\.00$/, '') : "";
      
      chips.push({
        key: "price",
        label: matched ? matched.label : `${activeFilters.priceGte ? formatFallback(activeFilters.priceGte) : "0"} – ${activeFilters.priceLte ? formatFallback(activeFilters.priceLte) : "Max"}`,
      });
    }

    if (activeFilters.inStock) chips.push({ key: "inStock", label: "In Stock" });
    return chips;
  }, [activeFilters, categories]);

  const removeChip = useCallback((chip) => {
    if (chip.key === "price") {
      const p = new window.URLSearchParams(searchParams);
      p.delete("price[gte]");
      p.delete("price[lte]");
      setSearchParams(p, { replace: true });
    } else if (chip.val !== undefined) {
      toggleArrayFilter(chip.key, chip.val);
    } else {
      updateFilter(chip.key, "");
      if (chip.key === "keyword") setSearchInput("");
    }
  }, [searchParams, setSearchParams, toggleArrayFilter, updateFilter]);

  const sidebarProps = {
    activeFilters, updateFilter, toggleArrayFilter,
    categories, filterOptions, priceRanges,
    searchInput, onSearchChange: handleSearchChange,
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/40 flex flex-col">
      <Header />

      {/* Page Header */}
      <div className="pt-[100px] md:pt-[130px] pb-5 px-4 md:px-8 bg-white border-b border-gray-100">
        <div className="max-w-[90rem] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-3">
              <Link to="/" className="hover:text-obsidian transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="text-obsidian">Shop</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif text-obsidian tracking-wide">The Collection</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium pb-1">
            {loading ? "Searching…" : `${totalResults.toLocaleString()} ${totalResults === 1 ? "piece" : "pieces"} found`}
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Desktop Sidebar ────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0">
            <div className="sticky top-[140px] bg-white rounded-3xl border border-gray-100 px-5 py-4 shadow-sm overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-black text-obsidian flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                </h2>
                {activeChips.length > 0 && (
                  <button onClick={clearAllFilters} className="text-[10px] font-bold text-gray-400 hover:text-obsidian uppercase tracking-wider transition-colors">
                    Clear All
                  </button>
                )}
              </div>
              <SidebarContent {...sidebarProps} />
            </div>
          </aside>

          {/* ── Main content ────────────────────────────────────────────────── */}
          <div className="flex-1 w-full min-w-0">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              {/* Mobile filter button */}
              <button
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-full text-xs font-bold text-obsidian shadow-sm hover:border-obsidian transition-colors"
                onClick={() => setIsMobileDrawerOpen(true)}
              >
                <Filter className="w-3.5 h-3.5" />
                Filters {activeChips.length > 0 && <span className="ml-0.5 bg-obsidian text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">{activeChips.length}</span>}
              </button>

              {/* Sort dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setIsSortOpen(o => !o)}
                  className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-full text-xs font-bold text-obsidian shadow-sm hover:border-obsidian transition-colors"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {SORT_OPTIONS.find(o => o.value === activeFilters.sort)?.label || "Price: Low to High"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-20"
                      >
                        {SORT_OPTIONS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => { updateFilter("sort", opt.value); setIsSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] transition-colors
                              ${activeFilters.sort === opt.value
                                ? "bg-gray-50 text-obsidian font-bold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-obsidian font-medium"}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active chips */}
            <AnimatePresence>
              {activeChips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap items-center gap-2 mb-6"
                >
                  {activeChips.map((chip, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3.5 py-1.5 bg-obsidian/5 border border-obsidian/15 rounded-full text-[12px] font-semibold text-obsidian"
                    >
                      {chip.label}
                      <button
                        onClick={() => removeChip(chip)}
                        className="ml-2 text-obsidian/40 hover:text-obsidian transition-colors"
                        aria-label={`Remove ${chip.label} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-[12px] font-bold text-gray-400 hover:text-obsidian underline underline-offset-2 transition-colors ml-1"
                  >
                    Clear All
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length > 0 ? (
              <>
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
                  <AnimatePresence mode="popLayout">
                    {products.map((product, idx) => (
                      <motion.div
                        layout
                        key={product._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: (idx % LIMIT) * 0.04 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More */}
                {hasMore && (
                  <div className="mt-14 flex flex-col items-center gap-3 pb-10">
                    <p className="text-[12px] text-gray-400 font-medium">
                      Showing {products.length} of {totalResults.toLocaleString()}
                    </p>
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3.5 bg-obsidian text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-black hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                      {loadingMore ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Loading…
                        </>
                      ) : "Load More"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 p-16 text-center max-w-lg mx-auto rounded-3xl shadow-sm mt-8"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-2xl font-serif text-obsidian mb-3">No pieces found</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
                  We couldn&apos;t find any items matching your filters. Try broadening your search.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-obsidian text-white font-bold text-[11px] uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-black transition-all"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="h-20 bg-obsidian" />}>
        <Footer />
      </Suspense>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-obsidian/40 backdrop-blur-sm z-[100] lg:hidden"
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[300px] h-[100dvh] bg-white shadow-2xl z-[101] flex flex-col lg:hidden"
            >
              <div className="p-5 flex justify-between items-center border-b border-gray-100">
                <h2 className="font-black text-[11px] uppercase tracking-widest text-obsidian flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                </h2>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 text-gray-400 hover:text-obsidian transition-colors bg-gray-50 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-3 custom-scrollbar">
                <SidebarContent {...sidebarProps} />
              </div>

              <div className="p-4 border-t border-gray-100 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 bg-gray-50 text-gray-600 font-bold py-3 text-[11px] uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-[2] bg-obsidian text-white font-bold py-3 text-[11px] uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
                >
                  View {totalResults.toLocaleString()} Items
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
