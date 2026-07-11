import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { lazy, Suspense } from "react";
const Footer = lazy(() => import("../components/Footer").then(m => ({ default: m.Footer })));
import { BannerCarousel } from "../components/BannerCarousel";
import { AdPostersDisplay } from "../components/AdPostersDisplay";
import { ProductCard } from "../components/ProductCard";
import { TrustBanner } from "../components/TrustBanner";
import { Newsletter } from "../components/Newsletter";
import { Testimonials } from "../components/Testimonials";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { HeritageCollection } from "../components/HeritageCollection";
import { CuratedGallery } from "../components/CuratedGallery";
import { BestSellers } from "../components/BestSellers";

import { ChevronLeft, ChevronRight, Flower2 } from "lucide-react";
import api from "../api/axios";
import { useSEO } from "../hooks/useSEO";
import { useCategory } from "../context/CategoryContext";
import { shuffleArray } from "../utils/helpers";
import { motion, AnimatePresence } from "motion/react";

export function Home() {
  useSEO("Home", "Browse Shreeharikripa's expansive offering of highly-rated jewellery pieces, elegant necklaces, and premium diamond rings.");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  const [products, setProducts] = useState([]);
  const { categories: contextCategories } = useCategory();
  const [categories, setCategories] = useState([{ name: "All", _id: "all", parentCategory: null }]);
  const [banners, setBanners] = useState([]);
  const [adPosters, setAdPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const categoryScrollRef = useRef(null);
  const featuredSectionRefs = useRef({});

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollFeaturedSection = (key, direction) => {
    const container = featuredSectionRefs.current[key];
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Sync state if header navigation explicitly sets URL params
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else if (!searchParams.get("search")) {
      setSelectedCategory("All");
    }
    setShowAll(false); // Reset showAll on category/search change
    setProducts([]); // Clear products to force refresh
  }, [searchParams]);

  // Sync categories
  useEffect(() => {
    if (contextCategories && contextCategories.length > 0) {
      setCategories([{ name: "All", _id: "all", parentCategory: null }, ...contextCategories]);
    }
  }, [contextCategories]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const searchQuery = searchParams.get("search");
        // Limit 100 will fetch all products from the database
        let url = `/products?limit=100`;

        if (searchQuery) {
          url += `&keyword=${encodeURIComponent(searchQuery)}`;
        }

        // Add category filter if not "All"
        if (selectedCategory !== "All") {
          const targetCat = contextCategories?.find(c => c.name === selectedCategory);
          if (targetCat) {
            url += `&category=${targetCat._id}`;
          }
        }

        const { data } = await api.get(url);
        let newProducts = data.products || [];

        // Randomize the products pool
        newProducts = shuffleArray(newProducts);
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, selectedCategory, contextCategories]);

  useEffect(() => {
    const fetchBannersAndAds = async () => {
      try {
        const [bannersRes, adsRes] = await Promise.all([
          api.get("/banners"),
          api.get("/ad-posters")
        ]);
        setBanners(bannersRes.data.banners || []);
        setAdPosters(adsRes.data.adPosters || []);
      } catch (error) {
        console.error("Failed to fetch banners or ads:", error);
      }
    };
    fetchBannersAndAds();
  }, []);

  const featuredSectionGroups = [
    { title: "New Arrival", key: "new-arrival", products: [] },
    { title: "Best Seller", key: "best-seller", products: [] },
    { title: "Trending Product", key: "trending-product", products: [] },
  ];

  products.forEach((product) => {
    const target = featuredSectionGroups.find((group) => group.title === product.homeSection);
    if (target) {
      target.products.push(product);
    }
  });

  const visibleFeaturedSections = featuredSectionGroups.filter((section) => section.products.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100/50 to-[#800000]/10 relative overflow-hidden">
      {/* Decorative background elements for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-300/20 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#800000]/10 blur-3xl mix-blend-multiply"></div>
        <Flower2 className="absolute top-[20%] left-[-10%] w-96 h-96 text-pink-300/10 -rotate-45" strokeWidth={0.5} />
        <Flower2 className="absolute bottom-[10%] right-[-10%] w-[40rem] h-[40rem] text-[#800000]/5 rotate-45" strokeWidth={0.5} />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="max-w-[1600px] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[160px] lg:pt-[180px] w-full">
          <BannerCarousel banners={banners} />

          <div className="mt-2 sm:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-10 sm:mb-14 flex flex-col items-center justify-center"
            >
              <span className="text-[#800000] text-[9px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-2 sm:mb-3 opacity-80">Discover the Heritage</span>
              <h2 className="text-2xl sm:text-5xl font-serif text-obsidian font-light tracking-wide drop-shadow-sm px-4">
                Shree Hari Kripa <span className="italic text-[#800000] font-normal tracking-wider block sm:inline">Collections</span>
              </h2>
              <div className="flex items-center justify-center mt-6 gap-3">
                <div className="w-12 sm:w-24 h-[1.5px] bg-gradient-to-r from-transparent to-[#800000]/60"></div>
                <Flower2 className="text-[#800000] w-5 h-5 sm:w-6 sm:h-6 opacity-80" strokeWidth={1.5} />
                <div className="w-12 sm:w-24 h-[1.5px] bg-gradient-to-l from-transparent to-[#800000]/60"></div>
              </div>
            </motion.div>

            <div className="relative mb-8 sm:mb-16 group flex items-center justify-center">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 sm:-left-6 z-10 bg-white/90 backdrop-blur-md border border-gray-100 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-[#B8934E] shadow-sm hover:shadow-lg transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 hidden md:flex"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>

              <div
                ref={categoryScrollRef}
                className="flex space-x-8 sm:space-x-12 overflow-x-auto pb-8 pt-[10px] px-4 sm:px-8 scrollbar-none scroll-smooth w-full items-start"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {categories.filter(c => c._id === 'all' || !c.parentCategory).map((category, idx) => (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                    key={category._id}
                    onClick={() => {
                      if (category._id === 'all') navigate('/shop');
                      else navigate(`/shop?category=${encodeURIComponent(category.name)}`);
                    }}
                    className={`flex-shrink-0 flex flex-col items-center group transition-all duration-300 ${(selectedCategory === category.name || (selectedCategory !== "All" && categories.find(x => x.name === selectedCategory && x.parentCategory === category._id)))
                        ? "opacity-100 scale-105"
                        : "opacity-100 hover:opacity-100 hover:scale-105"
                      }`}
                  >
                    <div className={`relative w-24 h-32 sm:w-40 sm:h-52 mb-3 sm:mb-5 transition-all duration-500 overflow-hidden rounded-t-full rounded-b-2xl border-2 p-[2px] sm:p-[3px] ${(selectedCategory === category.name || (selectedCategory !== "All" && categories.find(x => x.name === selectedCategory && x.parentCategory === category._id)))
                        ? "border-[#800000] drop-shadow-md scale-105"
                        : "border-transparent group-hover:border-[#800000]/40 group-hover:drop-shadow-sm"
                      }`}>
                      {/* The Image Container */}
                      <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 shadow-inner relative flex items-center justify-center">
                        {category._id === 'all' ? (
                          <Flower2 className="text-[#800000] w-12 h-12 sm:w-16 sm:h-16 opacity-80" strokeWidth={1} />
                        ) : category.image?.url ? (
                          <>
                            <img
                              src={category.image.url.includes("cloudinary.com") ? category.image.url.replace("/upload/", "/upload/f_auto,q_auto,w_800/") : category.image.url}
                              alt={category.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="absolute inset-0 items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#EBE5D9]" style={{ display: 'none' }}>
                              <span className="text-[#800000]/50 font-light text-3xl sm:text-4xl font-serif">{category.name ? category.name[0] : ''}</span>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#EBE5D9]">
                            <span className="text-[#800000]/50 font-light text-3xl sm:text-4xl font-serif">{category.name ? category.name[0] : ''}</span>
                          </div>
                        )}
                        <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:animate-shine z-10 pointer-events-none"></div>
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold text-center tracking-widest uppercase transition-colors mt-1 ${(selectedCategory === category.name || (selectedCategory !== "All" && categories.find(x => x.name === selectedCategory && x.parentCategory === category._id)))
                        ? "text-[#800000]"
                        : "text-obsidian group-hover:text-[#800000]"
                      }`}>
                      {category.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 sm:-right-6 z-10 bg-white/90 backdrop-blur-md border border-gray-100 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-[#B8934E] shadow-sm hover:shadow-lg transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 hidden md:flex"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Subcategory Row (Conditional) */}
            {(() => {
              const activeCat = categories.find(c => c.name === selectedCategory);
              const parentId = activeCat?.parentCategory || (selectedCategory !== "All" ? activeCat?._id : null);
              const subs = categories.filter(sub => sub.parentCategory === parentId && parentId);

              if (subs.length > 0) return (
                <div className="flex justify-start sm:justify-center space-x-8 sm:space-x-12 overflow-x-auto pb-6 sm:pb-12 px-6 scrollbar-none -mt-6">
                  {subs.map((sub) => (
                    <button
                      key={sub._id}
                      onClick={() => setSelectedCategory(sub.name)}
                      className={`flex-shrink-0 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 relative py-2 ${selectedCategory === sub.name ? "text-obsidian" : "text-gray-400 hover:text-obsidian"
                        }`}
                    >
                      {sub.name}
                      {selectedCategory === sub.name && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-[#800000] transition-all duration-500"></span>
                      )}
                    </button>
                  ))}
                </div>
              );
              return null;
            })()}

            <div className="flex flex-col sm:flex-row sm:items-center mb-10 gap-4 sm:gap-6 w-full">
              <h3 className="text-2xl sm:text-3xl font-serif text-obsidian tracking-wide shrink-0">
                {searchParams.get("search")
                  ? `Results for "${searchParams.get("search")}"`
                  : (selectedCategory === "All" ? "All Collections" : selectedCategory)}
                <span className="block sm:inline sm:ml-4 mt-2 sm:mt-0 text-xs font-sans text-gray-500 font-bold tracking-[0.2em] uppercase sm:align-middle">
                  {products.length} {products.length === 1 ? 'piece' : 'pieces'} curated
                </span>
              </h3>
              <div className="h-[1px] w-full bg-gradient-to-r from-[#800000]/20 to-transparent mt-2 sm:mt-0"></div>
            </div>

            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {(showAll ? products : products.slice(0, 40)).map((product, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: (idx % 12) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    key={`${product._id || product.id}-${product.name}`}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}

            {!showAll && products.length > 40 && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-10 py-4 bg-transparent border border-obsidian text-[10px] uppercase tracking-[0.2em] font-bold rounded-none hover:bg-obsidian hover:text-white transition-all duration-500 flex items-center space-x-3"
                >
                  <span>Discover More Pieces</span>
                </button>
              </div>
            )}

            {visibleFeaturedSections.length > 0 && (
              <div className="mt-14 space-y-8">
                {visibleFeaturedSections.map((section) => (
                  <section key={section.key} className="rounded-[2rem] border border-[#f4e6ea] bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-[0_16px_45px_-20px_rgba(128,0,0,0.2)]">
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]">Featured</p>
                        <h4 className="text-xl sm:text-2xl font-serif text-obsidian">{section.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => scrollFeaturedSection(section.key, "left")}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0d9df] bg-white text-[#800000] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#800000] hover:text-white"
                          aria-label={`Scroll ${section.title} left`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollFeaturedSection(section.key, "right")}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0d9df] bg-white text-[#800000] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#800000] hover:text-white"
                          aria-label={`Scroll ${section.title} right`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={(el) => {
                        featuredSectionRefs.current[section.key] = el;
                      }}
                      className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
                    >
                      {section.products.slice(0, 8).map((product) => (
                        <div key={`${section.key}-${product._id || product.id}`} className="min-w-[220px] max-w-[220px] snap-start sm:min-w-[250px] sm:max-w-[250px]">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          <AdPostersDisplay adPosters={adPosters} />

          {/* Full Bleed Sections */}
          <CuratedGallery />
          <HeritageCollection />
          <BestSellers />
          <WhyChooseUs />
          <Testimonials />
          <Newsletter />
          <TrustBanner />

        </main>

        <Suspense fallback={<div className="h-20 bg-[#0b1121]"></div>}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
