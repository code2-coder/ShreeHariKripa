import { Link, useNavigate } from "react-router";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Gem,
  Grid,
  ChevronDown,
  X,
  Loader2,
  Menu,
  Heart,
  Mic,
  Camera,
  Package,
  ChevronRight,
  ChevronLeft,
  Globe,
  MapPin,
  Star,
  Sparkles,
  History,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCategory } from "../context/CategoryContext";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { useCurrency } from '../context/CurrencyContext';
import { SUPPORTED_CURRENCIES } from '../utils/currencyUtils';
import { DropdownMenu } from "../ui/DropdownMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { getFormattedPrice, currency, setCurrency, settings } = useCurrency();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { categories } = useCategory();
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isCollectionsVisible, setIsCollectionsVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'collections', 'price', 'occasion', null
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);
  const lastScrollY = useRef(0);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const saveToHistory = (query) => {
    if (!query.trim()) return;
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > 50) {
            if (currentScrollY > lastScrollY.current) {
               setIsCollectionsVisible(false); // scrolling down
            } else if (currentScrollY < lastScrollY.current) {
               setIsCollectionsVisible(true); // scrolling up
            }
          } else {
            setIsCollectionsVisible(true); // Always show at the very top
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SEARCH_PLACEHOLDERS = [
    "Search for collections...",
    "Search for jewellery...",
    "Search for designs..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const searchRef = useRef(null);
  const fileInputRef = useRef(null);
  const hiddenImageRef = useRef(null);
  const categoryRef = useRef(null);
  const horizontalNavRef = useRef(null);

  const scrollNav = (direction) => {
    if (horizontalNavRef.current) {
      const scrollAmount = 300;
      horizontalNavRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };


  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // Debounced Live Search — triggers from first character
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 1) {
        try {
          setIsSearching(true);
          const { data } = await api.get(`/products?keyword=${encodeURIComponent(searchQuery)}&limit=6`);
          setLiveResults(data.products || []);
          setShowSearchDropdown(true);
        } catch (err) {
          console.error("Live search failed", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setLiveResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const safeCategories = categories || [];
    const parents = safeCategories.filter(c => !c.parentCategory);
    if (parents.length > 0 && !activeCategory) {
      setActiveCategory(parents[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryHover = async (categoryName) => {
    setActiveDropdown(categoryName);
    if (categoryProducts[categoryName]) return; // Already fetched
    
    const cat = categories?.find(c => c.name === categoryName);
    if (!cat) return;

    setLoadingCategory(categoryName);
    try {
      const { data } = await api.get(`/products?category=${cat._id}&limit=5`);
      setCategoryProducts(prev => ({ ...prev, [categoryName]: data.products }));
    } catch (err) {
      console.error("Error fetching category products:", err);
    } finally {
      setLoadingCategory(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToHistory(searchQuery);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchDropdown(false);
    }
  };

  const startVoiceSearch = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Voice search is not supported in your browser. Please try Chrome.");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Microphone active. Please speak now...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
          toast.success(`Heard: "${transcript}"`);
          saveToHistory(transcript);
          navigate(`/shop?search=${encodeURIComponent(transcript)}`);
          setShowSearchDropdown(false);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          toast.error("Microphone access denied. Please allow mic permissions in your browser address bar.");
        } else if (event.error === 'no-speech') {
          toast.error("No speech detected. Please try again.");
        } else if (event.error === 'network') {
          toast.error("Network error. Voice recognition requires an internet connection.");
        } else {
          toast.error(`Voice error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Voice setup error:", err);
      toast.error("Could not start voice search.");
      setIsListening(false);
    }
  };

  const handlePictureSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("AI is analyzing your image...");

    try {
      // Create object URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);

      // Load image into hidden image element
      const img = hiddenImageRef.current;
      img.src = imageUrl;

      // Wait for image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      toast.loading("Running visual matching engine...", { id: toastId });

      const mobilenet = await import('@tensorflow-models/mobilenet');
      const tf = await import('@tensorflow/tfjs');
      await tf.ready();
      const model = await mobilenet.load({ version: 2, alpha: 1.0 });

      // Get the mathematical visual fingerprint (embedding vector)
      const activation = model.infer(img, true);
      const embeddingData = Array.from(activation.dataSync());

      toast.loading("Searching database for visual matches...", { id: toastId });

      const { data } = await api.post('/products/visual-search', { embedding: embeddingData });

      if (data.success && data.products && data.products.length > 0) {
        toast.success(`Found ${data.products.length} visual matches!`, { id: toastId });
        navigate('/visual-search', { state: { results: data.products } });
      } else {
        toast.error("No visual matches found in our database.", { id: toastId });
      }

      // Cleanup
      URL.revokeObjectURL(imageUrl);
      e.target.value = null;
    } catch (error) {
      console.error("Visual search error:", error);
      toast.error("An error occurred during visual search.", { id: toastId });
      e.target.value = null;
    }
  };

  const searchDropdownContent = showSearchDropdown && (
    <div className="absolute top-full left-0 w-full mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
      {isSearching ? (
        <div className="py-2">
          <div className="px-5 py-2 text-[10px] font-bold uppercase text-black tracking-[0.2em] mb-1">
            Suggestions
          </div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center px-5 py-2.5 animate-pulse border-b border-gray-50 last:border-0">
              <div className="w-9 h-9 rounded-lg bg-gray-100 mr-3 flex-shrink-0"></div>
              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : liveResults.length > 0 ? (
        <div className="py-2">
          <div className="px-5 py-3 text-xs font-semibold uppercase text-gray-900 tracking-widest mb-1 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-300"></span>
            Top Suggestions
          </div>
          {liveResults.map(product => {
            const variantPrice = product.variants?.[0]?.sizes?.[0]?.price || product.sizes?.[0]?.price;
            const displayPrice = variantPrice !== undefined ? variantPrice : product.price;

            return (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              onClick={() => setShowSearchDropdown(false)}
              className="flex items-center px-6 py-3 hover:bg-gray-50 transition-all duration-300 group border-b border-gray-50 last:border-0"
            >
              <div className="w-14 h-14 rounded-md overflow-hidden border border-gray-100 mr-4 flex-shrink-0 bg-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                {/* Fixed duplicate title bug by removing redundant alt text */}
                <img
                  src={product.images?.[0]?.url || product.image || "/placeholder.jpg"}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[14px] font-medium text-gray-900 truncate group-hover:text-obsidian transition-colors leading-tight">
                  {(() => {
                     if (!searchQuery) return product.name;
                     const parts = product.name.split(new RegExp(`(${searchQuery})`, 'gi'));
                     return parts.map((part, i) =>
                       part.toLowerCase() === searchQuery.toLowerCase()
                         ? <span key={i} className="font-bold underline decoration-gray-300 underline-offset-4">{part}</span>
                         : part
                     );
                  })()}
                </span>
                {displayPrice && (
                  <span className="text-xs text-gray-500 mt-1 font-medium">{getFormattedPrice(displayPrice)}</span>
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-2 shadow-sm">
                <ArrowUpRight className="w-4 h-4 text-gray-600" />
              </div>
            </Link>
          )})}
          <div className="px-5 mt-2 pb-2">
            <button
              onClick={handleSearch}
              className="w-full py-3.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-obsidian transition-colors rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>View all results for "{searchQuery}"</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : searchQuery.trim().length >= 1 ? (
        <div className="p-10 text-center bg-gray-50/50">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
            <Search className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-1">No products found</p>
          <p className="text-xs text-gray-400 font-medium max-w-[200px] mx-auto leading-relaxed">Try checking your spelling or using different keywords</p>
        </div>
      ) : (
        <div className="py-2 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {/* ── Recent Searches ── */}
          {searchHistory.length > 0 && (
            <div className="px-5 pt-4 pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Recent
                </span>
                <button
                  onClick={clearHistory}
                  type="button"
                  className="text-[10px] font-semibold text-black hover:text-black/60 transition-colors tracking-wide"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-col">
                {searchHistory.map((query, idx) => (
                  <Link
                    key={idx}
                    to={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={() => { setShowSearchDropdown(false); setSearchQuery(query); saveToHistory(query); }}
                    className="flex items-center justify-between py-2 px-1 group transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <History className="w-3.5 h-3.5 text-black/30 group-hover:text-black transition-colors flex-shrink-0" />
                      <span className="text-[13px] text-black group-hover:text-black transition-colors font-medium">{query}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black/30 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          {searchHistory.length > 0 && (
            <div className="mx-5 border-t border-gray-100 my-1" />
          )}

          {/* ── Collections ── */}
          <div className="px-5 pt-3 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black block mb-2">
              Collections
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {(categories || []).filter(c => !c.parentCategory).map((cat) => (
                <Link
                  key={cat._id}
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setShowSearchDropdown(false)}
                  className="flex items-center gap-2 py-2 px-1 group transition-colors rounded-lg hover:bg-gray-50"
                >
                  <span className="w-1 h-3.5 rounded-full bg-black/20 group-hover:bg-black transition-colors flex-shrink-0" />
                  <span className="text-[13px] font-medium text-black group-hover:text-black transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col">
      {/* Top Announcement Bar Removed per request */}
      
      <header className="bg-white/95 backdrop-blur-2xl border-b border-gray-100 transition-colors duration-500 font-sans w-full">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-24 relative">
          
          {/* Middle Mobile Delivery Badge (Centered) */}
          <div className="lg:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center pointer-events-auto">
            <Select 
              value={currency === 'INR' ? 'India' : 'Australia'} 
              onValueChange={(val) => setCurrency(val === 'India' ? 'INR' : (settings?.australiaCurrency || 'AUD'))}
            >
              <SelectTrigger className="flex items-center bg-transparent border-none border-transparent hover:border-transparent p-0 transition-all duration-500 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none outline-none w-auto h-auto cursor-pointer group/delivery shadow-none hover:shadow-none bg-none">
                <SelectValue>
                  <div className="flex items-center gap-1.5 relative z-10">
                    <MapPin className="w-[36px] h-[36px] text-pink-700 flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex flex-col items-start justify-center gap-0 text-left">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                        Delivery in
                      </span>
                      <div className="flex items-center gap-1.5 mt-[1px]">
                        <div className="w-4 h-4 rounded-[3px] overflow-hidden shadow-sm flex-shrink-0 group-hover/delivery:scale-105 transition-transform duration-300">
                          <img src={currency === 'INR' ? '/india.webp' : '/aus.webp'} alt={currency} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-black text-obsidian uppercase tracking-wider group-hover/delivery:text-[#B8934E] transition-colors leading-none mt-[1px]">
                          {currency === 'INR' ? 'India' : 'Australia'}
                        </span>
                      </div>
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="center" className="bg-white/95 backdrop-blur-2xl border-[#B8934E]/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(184,147,78,0.15)] overflow-hidden p-1 min-w-[140px] z-[120]">
                <div className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 border-b border-gray-50 text-center">Delivery in</div>
                {settings?.isIndiaEnabled !== false && (
                  <SelectItem value="India" className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 hover:text-obsidian rounded-xl transition-all duration-300 py-2 px-3 data-[state=checked]:bg-[#FAF9F6] data-[state=checked]:text-[#B8934E] group/item mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md overflow-hidden drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                        <img src="/india.webp" alt="India" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-gray-700 group-hover/item:text-obsidian transition-colors text-xs uppercase tracking-wider leading-tight">India</span>
                        <span className="text-[9px] text-gray-400 font-medium">INR (₹)</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
                {settings?.isAustraliaEnabled !== false && (
                  <SelectItem value="Australia" className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 hover:text-obsidian rounded-xl transition-all duration-300 py-2 px-3 data-[state=checked]:bg-[#FAF9F6] data-[state=checked]:text-[#B8934E] group/item mb-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md overflow-hidden drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                        <img src="/aus.webp" alt="Australia" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-gray-700 group-hover/item:text-obsidian transition-colors text-xs uppercase tracking-wider leading-tight">Australia</span>
                        <span className="text-[9px] text-gray-400 font-medium">{settings?.australiaCurrency || 'AUD'}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 md:space-x-10">
            <Link to="/" className="flex items-center space-x-2 group relative z-[70]">
              <div className="flex items-center">
                <img src="/logo_jew.png" alt="Shreeharikripa Logo" className="h-14 md:h-16 lg:h-20 w-auto object-contain rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 bg-white/50 transition-all duration-300 group-hover:opacity-90 group-hover:shadow-md" />
              </div>
            </Link>

            {/* Delivery badge removed per request */}

            {/* Categories Dropdown Trigger */}
            <div className="hidden" ref={categoryRef}>
              <button
                className="flex items-center space-x-1.5 text-obsidian text-[10px] font-bold uppercase tracking-[0.15em] px-2 hover:text-[#B8934E] transition-colors duration-300"
                onClick={() => setShowCategories(!showCategories)}
              >
                <span>Collections</span>
              </button>

              {/* Full-Width Luxury Mega Menu */}
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-[80px] md:top-[96px] left-0 w-full z-40"
                  >
                    <div className="bg-white/95 backdrop-blur-3xl border-t border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] w-full">
                      <div className="max-w-[1800px] mx-auto flex h-[70vh] min-h-[450px] max-h-[700px]">
                        
                        {/* Left Column: Primary Categories (Dark Mode for High Contrast) */}
                        <div className="w-1/4 py-12 px-8 xl:px-16 border-r border-obsidian/10 flex flex-col bg-obsidian overflow-y-auto custom-scrollbar shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)] z-10">
                          <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-[#B8934E] text-[9px] font-bold uppercase tracking-[0.3em] mb-10 drop-shadow-sm px-4 flex-shrink-0"
                          >
                            Explore By
                          </motion.span>
                          <div className="flex flex-col gap-6 pb-8">
                            {(categories || []).filter(c => !c.parentCategory).map((parent, index) => (
                              <motion.div
                                key={parent._id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (index * 0.05), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <Link
                                  to={`/shop?category=${encodeURIComponent(parent.name)}`}
                              onMouseEnter={() => setActiveCategory(parent._id)}
                              onClick={() => setShowCategories(false)}
                              className={`group flex items-center transition-all duration-500 origin-left ${activeCategory === parent._id ? 'scale-105' : 'hover:scale-105'}`}
                            >
                              <div className="flex items-center gap-6">
                                <div className={`w-1 h-8 rounded-r-full transition-all duration-500 ${activeCategory === parent._id ? 'bg-[#B8934E] shadow-[0_0_20px_rgba(184,147,78,0.8)]' : 'bg-transparent group-hover:bg-white/30'}`}></div>
                                <span className={`text-3xl xl:text-4xl font-serif tracking-wide transition-colors duration-500 ${activeCategory === parent._id ? 'text-[#B8934E] font-normal drop-shadow-md' : 'text-gray-500 font-light group-hover:text-white'}`}>
                                  {parent.name}
                                </span>
                              </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Middle Column: Subcategories */}
                        <div className="w-2/5 py-12 px-16 xl:px-24 flex flex-col bg-[#FAF9F6] relative overflow-y-auto custom-scrollbar overflow-x-hidden">
                          {/* Subtle Background Watermark */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 0.04, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-multiply"
                          >
                             <span className="text-[180px] xl:text-[240px] font-serif italic whitespace-nowrap text-[#B8934E] tracking-tighter">
                                {(categories || []).find(c => c._id === activeCategory)?.name || ""}
                             </span>
                          </motion.div>

                        {activeCategory ? (
                          <div className="animate-in fade-in duration-700 relative z-10 flex flex-col h-full">
                            <div className="flex flex-col mb-12 flex-shrink-0">
                              <h3 className="text-[#B8934E] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                                The {(categories || []).find(c => c._id === activeCategory)?.name} Edit
                              </h3>
                              <p className="text-sm text-gray-500 font-serif italic max-w-md leading-relaxed">
                                {(() => {
                                  const name = ((categories || []).find(c => c._id === activeCategory)?.name || "").toLowerCase();
                                  if (name.includes("ring")) return "Symbols of eternal promise and boundless devotion, crafted to catch the light of a thousand moments.";
                                  if (name.includes("necklace") || name.includes("pendant")) return "Drape yourself in liquid light. Masterpieces designed to rest elegantly close to the heart.";
                                  if (name.includes("earring")) return "Symphonies of brilliance that frame the face with unparalleled radiance and delicate motion.";
                                  if (name.includes("bracelet") || name.includes("bangle")) return "A delicate embrace of gold and diamonds, moving with extraordinary grace at your every gesture.";
                                  if (name.includes("bridal") || name.includes("wedding")) return "The ultimate celebration of love. Heirloom pieces designed for your most unforgettable day.";
                                  return "An exquisite curation of masterful design, where timeless tradition seamlessly meets modern brilliance.";
                                })()}
                              </p>
                            </div>
                            
                              <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="grid grid-cols-2 gap-x-16 gap-y-8 pb-8 flex-1"
                              >
                                {(categories || []).filter(sub => sub.parentCategory === activeCategory).length > 0 ? (
                                  (categories || []).filter(sub => sub.parentCategory === activeCategory).map((sub, idx) => (
                                    <motion.div
                                      key={sub._id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.4 + (idx * 0.05), duration: 0.4 }}
                                    >
                                      <Link
                                        to={`/shop?category=${encodeURIComponent(sub.name)}`}
                                      onClick={() => setShowCategories(false)}
                                      className="group flex flex-col py-2"
                                    >
                                      <div className="flex items-center gap-4">
                                        <span className="w-4 h-[1px] bg-gray-300 group-hover:bg-[#B8934E] group-hover:w-8 transition-all duration-500"></span>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-700 group-hover:text-[#B8934E] transition-colors duration-300">
                                          {sub.name}
                                        </span>
                                      </div>
                                      </Link>
                                    </motion.div>
                                  ))
                                ) : (
                                <div className="col-span-2">
                                  <p className="text-sm text-gray-400 mb-6 font-light">Discover the complete range of masterfully crafted pieces.</p>
                                  <Link
                                    to={`/shop?category=${encodeURIComponent((categories || []).find(c => c._id === activeCategory)?.name || "")}`}
                                    onClick={() => setShowCategories(false)}
                                    className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-obsidian group hover:text-[#B8934E] transition-colors"
                                  >
                                    <span>View Entire Collection</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                                  </Link>
                                </div>
                              )}
                            </motion.div>
                            
                            {(categories || []).filter(sub => sub.parentCategory === activeCategory).length > 0 && (
                               <div className="mt-8 pt-8 border-t border-gray-100 flex-shrink-0">
                                  <Link
                                    to={`/shop?category=${encodeURIComponent((categories || []).find(c => c._id === activeCategory)?.name || "")}`}
                                    onClick={() => setShowCategories(false)}
                                    className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-obsidian group hover:text-[#B8934E] transition-colors"
                                  >
                                    <span>View All {(categories || []).find(c => c._id === activeCategory)?.name}</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                                  </Link>
                               </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center opacity-50">
                            <span className="text-gray-400 text-sm tracking-widest uppercase">Select a collection</span>
                          </div>
                        )}
                      </div>

                        {/* Right Column: Visual Showcase */}
                        <div className="w-[35%] bg-obsidian relative overflow-hidden group/showcase">
                          <AnimatePresence mode="wait">
                            {activeCategory && (categories || []).find(c => c._id === activeCategory)?.image?.url ? (
                              <motion.div 
                                key={`img-${activeCategory}`}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                              >
                                 <img 
                                   src={(categories || []).find(c => c._id === activeCategory)?.image?.url} 
                                   alt={(categories || []).find(c => c._id === activeCategory)?.name} 
                                   className="w-full h-full object-cover transition-transform duration-[15s] group-hover/showcase:scale-110 opacity-80"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"></div>
                                 <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute bottom-16 left-16 right-16"
                                 >
                                   <p className="text-[#B8934E] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Featured Collection</p>
                                   <h4 className="text-4xl sm:text-5xl font-serif italic text-white font-light tracking-wide drop-shadow-2xl">{(categories || []).find(c => c._id === activeCategory)?.name}</h4>
                                 </motion.div>
                              </motion.div>
                            ) : (
                              <motion.div 
                                key="fallback"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-obsidian to-black"
                              >
                                 <Gem className="w-16 h-16 text-[#B8934E] opacity-30 mb-6" strokeWidth={1} />
                                 <p className="text-[#B8934E] text-[10px] font-bold uppercase tracking-[0.3em]">Curated Excellence</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-4 lg:mx-6 hidden md:block" ref={searchRef}>
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=""
                className="w-full px-5 py-2 pl-11 pr-24 text-sm rounded border-2 border-[#800000] bg-gray-50/50 hover:bg-white hover:border-[#800000] focus:bg-white focus:outline-none focus:border-[#800000] focus:ring-0 transition-all duration-500 font-medium text-obsidian shadow-sm focus:shadow-md relative z-10"
              />
              
              {!searchQuery && (
                <div className="absolute inset-y-0 left-11 right-24 pointer-events-none overflow-hidden z-20">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ y: "50%", opacity: 0 }}
                      animate={{ y: "-50%", opacity: 1 }}
                      exit={{ y: "-150%", opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 text-gray-400 text-sm font-medium whitespace-nowrap"
                    >
                      {SEARCH_PLACEHOLDERS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}

              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-500 z-30 pointer-events-none" />

              <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-1.5 z-30">
                {isSearching ? (
                  <Loader2 className="text-obsidian w-5 h-5 animate-spin" />
                ) : searchQuery ? (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setShowSearchDropdown(false); }}
                    className="text-gray-400 hover:text-obsidian transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={startVoiceSearch}
                  className={`p-1 transition-all duration-300 ${isListening ? 'text-red-500 animate-pulse' : 'text-[#5C0000] hover:scale-110 drop-shadow-sm'}`}
                  title="Voice Search"
                >
                  <Mic className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 text-[#5C0000] hover:scale-110 transition-all duration-300 drop-shadow-sm"
                  title="Visual Search"
                >
                  <Camera className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePictureSearch}
                  className="hidden"
                />
                <img ref={hiddenImageRef} className="hidden" alt="hidden preview" crossOrigin="anonymous" />
              </div>

              {/* Search Suggestions Dropdown */}
              {searchDropdownContent}
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-4 lg:space-x-6 ml-auto flex-shrink-0">
            
            {/* Delivery & Currency Selects */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              
              <Select 
                value={currency === 'INR' ? 'India' : 'Australia'} 
                onValueChange={(val) => setCurrency(val === 'India' ? 'INR' : (settings?.australiaCurrency || 'AUD'))}
              >
                <SelectTrigger className="flex items-center bg-transparent border-none border-transparent hover:border-transparent p-0 transition-all duration-500 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none outline-none w-auto h-auto cursor-pointer group/delivery shadow-none hover:shadow-none bg-none">
                  <SelectValue>
                    <div className="flex items-center gap-1.5 relative z-10">
                      <MapPin className="w-[40px] h-[40px] text-pink-700 flex-shrink-0" strokeWidth={1.5} />
                      <div className="hidden sm:flex flex-col items-start justify-center gap-0">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                          Delivery in
                        </span>
                        <div className="flex items-center gap-1.5 mt-[2px]">
                          <div className="w-4 h-4 rounded-[3px] overflow-hidden shadow-sm flex-shrink-0 group-hover/delivery:scale-105 transition-transform duration-300">
                            <img src={currency === 'INR' ? '/india.webp' : '/aus.webp'} alt={currency} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[13px] font-black text-obsidian uppercase tracking-wider group-hover/delivery:text-[#B8934E] transition-colors leading-none mt-[1px]">
                            {currency === 'INR' ? 'India' : 'Australia'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="end" className="bg-white/95 backdrop-blur-2xl border-[#B8934E]/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(184,147,78,0.15)] overflow-hidden p-1 min-w-[140px] z-[120]">
                  <div className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 border-b border-gray-50">Delivery in</div>
                  {settings?.isIndiaEnabled !== false && (
                    <SelectItem value="India" className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 hover:text-obsidian rounded-xl transition-all duration-300 py-2 px-3 data-[state=checked]:bg-[#FAF9F6] data-[state=checked]:text-[#B8934E] group/item mb-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md overflow-hidden drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                          <img src="/india.webp" alt="India" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-gray-700 group-hover/item:text-obsidian transition-colors text-xs uppercase tracking-wider">India (INR)</span>
                      </div>
                    </SelectItem>
                  )}
                  {settings?.isAustraliaEnabled !== false && (
                    <SelectItem value="Australia" className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 hover:text-obsidian rounded-xl transition-all duration-300 py-2 px-3 data-[state=checked]:bg-[#FAF9F6] data-[state=checked]:text-[#B8934E] group/item mb-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md overflow-hidden drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                          <img src="/aus.webp" alt="Australia" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-gray-700 group-hover/item:text-obsidian transition-colors text-xs uppercase tracking-wider">Australia ({settings?.australiaCurrency || 'AUD'})</span>
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

            </div>

            {/* Vertical Divider for larger screens */}
            <div className="hidden xl:block w-px h-6 bg-gray-200"></div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Toggle (Mobile) - Hidden since we now have full search bar at bottom */}
              {/* <button className="md:hidden p-1.5 text-gray-600 hover:text-obsidian transition-colors" onClick={() => setIsMobileMenuOpen(true)}> <Search className="w-4 h-4" /> </button> */}

              {/* Desktop/Tablet icons (Hidden on mobile) */}
              <Link
                to="/wishlist"
                title="Wishlist"
                className="relative hidden md:flex items-center justify-center p-2 text-[#5C0000] transition-colors duration-300 group"
              >
                <Heart className="w-[22px] h-[22px] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 transform translate-x-1/2 -translate-y-1/2 bg-[#B8934E] text-white font-bold text-[8.5px] rounded-full min-w-[15px] h-[15px] px-1 flex items-center justify-center shadow-sm border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link
                to="/cart"
                title="Shopping Cart"
                className="relative hidden md:flex items-center justify-center p-2 text-[#5C0000] transition-colors duration-300 group"
              >
                <ShoppingCart className="w-[22px] h-[22px] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 transform translate-x-1/2 -translate-y-1/2 bg-[#B8934E] text-white font-bold text-[8.5px] rounded-full min-w-[15px] h-[15px] px-1 flex items-center justify-center shadow-sm border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-2 pl-1 sm:pl-2 border-l border-transparent sm:border-gray-100">
                <DropdownMenu className="hidden md:block" />
                <button
                  className="lg:hidden p-2 text-gray-700 hover:text-obsidian relative z-[110] transition-transform"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {/* Animated Hamburger Icon */}
                  <div className="relative w-5 h-5 flex flex-col justify-center items-center group">
                    <span
                      className={`block absolute h-[1.5px] w-4 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45" : "-translate-y-1"
                        }`}
                    />
                    <span
                      className={`block absolute h-[1.5px] w-4 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    <span
                      className={`block absolute h-[1.5px] w-4 bg-current rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
                        }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar (Header Bottom) */}
        <div className="md:hidden w-full px-4 pb-3 pt-1 border-t border-transparent relative z-[90]">
          <form onSubmit={handleSearch} className="relative group w-full">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
              className="w-full px-5 py-2 pl-11 pr-24 text-sm rounded border-2 border-[#800000] bg-gray-50/50 hover:bg-white hover:border-[#800000] focus:bg-white focus:outline-none focus:border-[#800000] focus:ring-0 transition-all duration-500 font-medium text-obsidian shadow-sm focus:shadow-md relative z-10"
            />

            {!searchQuery && (
              <div className="absolute inset-y-0 left-11 right-24 pointer-events-none overflow-hidden z-20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIndex}
                    initial={{ y: "-150%", opacity: 0 }}
                    animate={{ y: "-50%", opacity: 1 }}
                    exit={{ y: "50%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute top-1/2 text-gray-400 text-sm font-medium whitespace-nowrap"
                  >
                    {SEARCH_PLACEHOLDERS[placeholderIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
            
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-20 pointer-events-none group-focus-within:text-[#800000] transition-colors duration-500" />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1 z-30">
              <button
                type="button"
                onClick={startVoiceSearch}
                className={`p-1.5 transition-all duration-300 ${isListening ? 'text-red-500 animate-pulse' : 'text-[#5C0000] hover:scale-110 drop-shadow-sm'}`}
              >
                <Mic className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-[#5C0000] hover:scale-110 transition-all duration-300 drop-shadow-sm"
              >
                <Camera className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
            {searchDropdownContent}
          </form>
        </div>
      </div>

      {/* Horizontal Luxury Navigation Bar */}
      <div 
        className="hidden lg:block w-full border-t border-b bg-white/95 backdrop-blur-md border-gray-100 relative shadow-sm z-40 transition-all duration-300"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="w-full max-w-[1800px] mx-auto overflow-visible relative">
          <div className="flex w-full relative group/nav">
            
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollNav('left')}
              className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent w-20 items-center justify-start pl-4 text-gray-400 hover:text-[#B8934E] transition-all duration-500 opacity-0 group-hover/nav:opacity-100 pointer-events-none group-hover/nav:pointer-events-auto"
            >
              <div className="bg-white rounded-full p-2 shadow-md border border-[#B8934E]/20 hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <ChevronLeft className="w-5 h-5 text-[#800000]" />
              </div>
            </button>

            {/* CATEGORIES NAV ITEMS */}
            <div 
              ref={horizontalNavRef}
              className="flex flex-nowrap overflow-x-auto items-center gap-x-8 xl:gap-x-12 px-6 sm:px-10 py-4 scrollbar-none w-full scroll-smooth"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {(categories || []).filter(c => !c.parentCategory).map((cat) => {
                const item = cat.name;
                return (
                <div 
                  key={cat._id}
                  onMouseEnter={() => handleCategoryHover(item)}
                  className="cursor-pointer group relative flex-shrink-0 py-1"
                >
                  <Link
                    to={`/shop?category=${encodeURIComponent(item)}`}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <span className="text-[#800000] text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[#B8934E] transition-colors duration-500 z-10">
                      {item}
                    </span>
                    {/* Animated Underline */}
                    <span className="absolute -bottom-1.5 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8934E] to-transparent group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100"></span>
                  </Link>
                </div>
              )})}
            </div>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollNav('right')}
              className="hidden md:flex absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-white via-white/90 to-transparent w-20 items-center justify-end pr-4 text-gray-400 hover:text-[#B8934E] transition-all duration-500 opacity-0 group-hover/nav:opacity-100 pointer-events-none group-hover/nav:pointer-events-auto"
            >
              <div className="bg-white rounded-full p-2 shadow-md border border-[#B8934E]/20 hover:scale-110 transition-transform duration-300 hover:shadow-lg">
                <ChevronRight className="w-5 h-5 text-[#800000]" />
              </div>
            </button>
          </div>

          {/* MEGA MENU DROPDOWN (Rendered once, outside of the hidden overflow container) */}
          <AnimatePresence mode="wait">
            {activeDropdown && (
              <motion.div
                key={activeDropdown}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-max min-w-[500px] xl:min-w-[700px] bg-white shadow-2xl border-t border-gray-100 rounded-b-xl z-[9999] overflow-hidden cursor-default pointer-events-auto"
              >
                
                <div className="px-8 py-10 relative z-10">
                  <h3 className="text-gray-900 text-sm font-bold uppercase tracking-widest mb-8 text-center flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-gray-200"></span>
                    Trending in {activeDropdown}
                    <span className="w-12 h-[1px] bg-gray-200"></span>
                  </h3>
                  
                  {loadingCategory === activeDropdown ? (
                    <div className="flex justify-center items-center py-12">
                       <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <div className="flex justify-center gap-8 xl:gap-10">
                      {(categoryProducts[activeDropdown] || []).map((prod, i) => {
                        const variantPrice = prod.variants?.[0]?.sizes?.[0]?.price || prod.sizes?.[0]?.price;
                        const displayPrice = variantPrice !== undefined ? variantPrice : prod.price;

                        return (
                        <motion.div key={prod._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}>
                          <Link to={`/product/${prod._id}`} className="group/prod flex flex-col items-center gap-4 w-32 xl:w-36 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                            <div className="w-32 h-32 xl:w-36 xl:h-36 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 group-hover/prod:shadow-lg transition-all duration-300 relative group-hover/prod:-translate-y-1">
                              {/* Removed redundant alt text to fix duplicate title bug on broken images */}
                              <img src={prod.images?.[0]?.url || "/placeholder.jpg"} alt="" className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500 ease-out" />
                            </div>
                            <div className="flex flex-col items-center px-2">
                              <span className="text-[13px] xl:text-[14px] font-medium text-gray-900 group-hover/prod:text-obsidian transition-colors duration-300 text-center line-clamp-2 leading-snug">{prod.name}</span>
                              <span className="text-sm text-gray-900 font-semibold mt-1.5">{getFormattedPrice(displayPrice)}</span>
                            </div>
                          </Link>
                        </motion.div>
                        );
                      })}
                      {(!categoryProducts[activeDropdown] || categoryProducts[activeDropdown].length === 0) && (
                        <div className="flex flex-col items-center justify-center py-8 opacity-50">
                          <p className="text-sm text-gray-500 italic">Curating exclusive pieces soon.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Content */}
          <div className="absolute top-0 right-0 w-[300px] sm:w-[350px] h-[100dvh] bg-white shadow-2xl animate-in slide-in-from-right duration-500 ease-out flex flex-col">
            <div className="p-8 flex justify-between items-center border-b border-gray-50/50">
              <span className="font-black text-2xl text-obsidian uppercase tracking-tighter">Menu</span>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {/* BRAND LOGO IN DRAWER */}
              <div className="pb-6 border-b border-gray-100 flex justify-center">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                  <img src="/logo_jew.png" alt="Shreeharikripa Logo" className="h-12 w-auto object-contain" />
                </Link>
              </div>

              {/* Mobile Search */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Search</p>
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2.5 pl-10 pr-20 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8934E]/20 focus:border-[#B8934E] transition-all duration-300 font-medium text-obsidian relative z-10"
                  />

                  {!searchQuery && (
                    <div className="absolute inset-y-0 left-10 right-20 pointer-events-none overflow-hidden z-20">
                      <AnimatePresence>
                        <motion.span
                          key={placeholderIndex}
                          initial={{ y: "-150%", opacity: 0 }}
                          animate={{ y: "-50%", opacity: 1 }}
                          exit={{ y: "50%", opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute top-1/2 text-gray-400 text-sm font-medium whitespace-nowrap"
                        >
                          {SEARCH_PLACEHOLDERS[placeholderIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1 z-30">
                    <button
                      type="button"
                      onClick={startVoiceSearch}
                      className={`p-1.5 transition-all duration-300 ${isListening ? 'text-red-500 animate-pulse' : 'text-[#5C0000] hover:scale-110 drop-shadow-sm'}`}
                    >
                      <Mic className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 text-[#5C0000] hover:scale-110 transition-all duration-300 drop-shadow-sm"
                    >
                      <Camera className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile Main Menu */}
              <div className="space-y-4 border-b border-gray-100 pb-6">
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Menu</p>
                <div className="flex flex-col gap-1">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity group"
                  >
                    <span className="text-gray-800 text-sm uppercase tracking-widest font-bold group-hover:text-obsidian transition-colors">Home</span>
                  </Link>

                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em]">Collections</p>
                <div className="grid grid-cols-1 gap-1">
                  {(categories || []).length > 0 ? (
                    (categories || []).filter(c => !c.parentCategory).map((cat, index) => (
                      <Link
                        key={cat._id}
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-center justify-between py-3 border-b border-gray-50 hover:border-gray-200 transition-all group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-gray-800 text-sm uppercase tracking-widest group-hover:text-obsidian transition-colors">{cat.name}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-obsidian transition-colors" />
                      </Link>
                    ))
                  ) : (
                    <div className="py-8 text-center border-y border-gray-100">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Account / User Section */}
              <div className="pt-8 border-t border-gray-200 space-y-4">
                <p className="text-[10px] font-black uppercase text-[#5C0000] tracking-[0.2em]">Account</p>
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to="/account"
                      className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-sm uppercase tracking-widest text-obsidian">{user.name}</span>
                      <User className="w-4 h-4 text-gray-400" />
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-sm uppercase tracking-widest text-obsidian">My Orders</span>
                      <Package className="w-4 h-4 text-gray-400" />
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-sm uppercase tracking-widest text-obsidian">Admin Dashboard</span>
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="pt-4">
                    <button
                      onClick={() => window.location.href = `${(import.meta.env.VITE_API_URL || 'https://shreeharikripa.onrender.com/api/v1').replace(/\/api\/v1\/?$/, '')}/api/v1/auth/google`} 
                      className="w-full flex items-center justify-center p-4 bg-obsidian text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-all space-x-3"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 bg-gray-50 text-center rounded-t-[40px] border-t border-gray-100">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">© 2024 Shreeharikripa Premium Jewellery</p>
            </div>
          </div>
        </div>
      )}
    </header>
    </div>
  );
}
