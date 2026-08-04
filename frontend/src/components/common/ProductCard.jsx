import { ShoppingBag, Heart, Share2 } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../../store/slices/wishlistSlice";
import { useCurrency } from "../../context/CurrencyContext";
import { toast } from "sonner";
import { memo, useState } from "react";

export const ProductCard = memo(function ProductCard({ product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant] = useState(hasVariants ? product.variants[0] : null);

  const dispatch = useDispatch();
  const isWished = useSelector((state) => selectIsInWishlist(state, product._id || product.id));
  const { getFormattedPrice } = useCurrency();
  
  // Extract correct variant/size properties
  const variantSize = selectedVariant?.sizes?.[0] || product.sizes?.[0];
  const currentStock = variantSize ? variantSize.stock : product.stock;
  const currentPrice = variantSize?.price ?? product.price;
  const currentComparePrice = variantSize?.comparePrice ?? product.comparePrice;
  const currentSizeName = variantSize ? variantSize.size : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1, size: currentSizeName, price: currentPrice }));
    toast.success(`${product.name} ${currentSizeName ? `(${currentSizeName})` : ''} added to bag!`);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/product/${product._id || product.id}`;
    const text = `Check out this exquisite ${product.name} at Shreeharikripa!`;

    if (window.navigator.share) {
      try {
        await window.navigator.share({
          title: product.name,
          text: text,
          url: url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' \n\n' + url)}`;
      window.open(whatsappUrl, '_blank');
      toast.success("Opened WhatsApp to share!");
    }
  };

  const getImageUrl = () => {
    const originalUrl = (product.images && product.images[0]?.url) || product.image;
    if (originalUrl && originalUrl.includes("cloudinary.com")) {
      return originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_400/");
    }
    return originalUrl || "https://placehold.co/400x600?text=No+Image";
  };

  const getSecondaryImageUrl = () => {
    const originalUrl = product.images?.[1]?.url || product.images?.[1];
    if (originalUrl && originalUrl.includes("cloudinary.com")) {
      return originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_400/");
    }
    return originalUrl || null;
  };

  const getSrcSet = () => {
    const originalUrl = (product.images && product.images[0]?.url) || product.image;
    if (originalUrl && originalUrl.includes("cloudinary.com")) {
      return `${originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_400/")} 400w, 
              ${originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_600/")} 600w`;
    }
    return undefined;
  };

  const secondaryImage = getSecondaryImageUrl();
  const hasSecondaryImage = !!secondaryImage;

  // Premium specs calculation
  const getProductSpecs = () => {
    const specs = [];
    if (product.purity) specs.push(product.purity);
    if (product.metal || product.material) specs.push(product.metal || product.material);
    if (product.weight) specs.push(product.weight);
    return specs.join(" • ");
  };
  const productSpecs = getProductSpecs();

  // Discount calculation
  const discountPercent = currentComparePrice && currentComparePrice > currentPrice 
    ? Math.round(((currentComparePrice - currentPrice) / currentComparePrice) * 100) 
    : 0;

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-neutral-100/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(184,147,78,0.18),_0_1px_2px_rgba(184,147,78,0.05)] hover:border-amber-500/20 max-w-sm mx-auto overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
      
      {/* Premium Card Shimmer Shine effect */}
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[120%] skew-x-[-20deg] group-hover:translate-x-[120%] transition-transform duration-[1500ms] ease-out z-25 pointer-events-none" />

      {/* Image Container */}
      <Link 
        to={`/product/${product._id || product.id}`} 
        aria-label={`View ${product.name} details`} 
        className="block relative aspect-[4/5] bg-cream overflow-hidden cursor-pointer rounded-t-2xl z-0"
      >
        {/* Subtle Dark Gradient Overlay on Hover for Button Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Primary Image */}
        <img
          src={getImageUrl()}
          srcSet={getSrcSet()}
          sizes="(max-width: 640px) 100vw, 50vw"
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-700 ease-out scale-[1.01] ${
            hasSecondaryImage ? "md:group-hover:opacity-0 md:group-hover:scale-105" : "group-hover:scale-105"
          }`}
        />

        {/* Secondary Image (cross-fades on hover - Desktop Only) */}
        {hasSecondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} - alternate view`}
            loading="lazy"
            decoding="async"
            className="hidden md:block absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-0 scale-[1.01] group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Luxury Badges (Pills) */}
        <div className="absolute top-3.5 left-3.5 z-30 flex flex-col gap-1.5 pointer-events-none">
          {product.homeSection === "Best Seller" && (
            <span className="bg-gradient-to-r from-[#B8934E] to-[#D4AF37] text-white font-extrabold px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] rounded-full shadow-[0_2px_10px_rgba(184,147,78,0.3)] flex items-center gap-1 border border-[#B8934E]/30 backdrop-blur-md">
              ★ Best Seller
            </span>
          )}
          {product.homeSection === "New Arrival" && (
            <span className="bg-gradient-to-r from-[#800000] to-[#a00000] text-white font-extrabold px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] rounded-full shadow-[0_2px_10px_rgba(128,0,0,0.3)] flex items-center gap-1 border border-[#800000]/30 backdrop-blur-md">
              ✦ New Arrival
            </span>
          )}
          {product.homeSection === "Trending Product" && (
            <span className="bg-gradient-to-r from-[#DDA7A5] to-[#E5B5B3] text-[#2D0D18] font-extrabold px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] rounded-full shadow-[0_2px_10px_rgba(221,167,165,0.3)] flex items-center gap-1 border border-[#DDA7A5]/30 backdrop-blur-md">
              🔥 Trending
            </span>
          )}
          {product.handmade && (
            <span className="bg-amber-50/90 text-amber-800 border border-amber-500/20 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] rounded-full shadow-sm flex items-center gap-1">
              ✨ Handcrafted
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#800000]/95 text-white font-bold backdrop-blur-md px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
          {currentStock < 10 && currentStock > 0 && (
            <span className="text-[#800000] bg-white/95 border border-[#800000]/25 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] shadow-sm rounded-full">
              Limited Stock
            </span>
          )}
          {currentStock === 0 && (
            <span className="text-stone-500 bg-white/95 border border-stone-200/50 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] shadow-sm rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Glassmorphic Floating Quick Actions */}
        <div className="absolute top-3.5 right-3.5 z-30 flex flex-col gap-2 transition-all duration-300">
          <button
            onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               dispatch(toggleWishlist(product));
            }}
            aria-pressed={isWished}
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-9 h-9 bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 hover:text-[#800000] border border-neutral-200/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full transition-all duration-300 transform active:scale-90 hover:scale-105 flex items-center justify-center cursor-pointer"
          >
            <Heart className={`w-4 h-4 transition-transform duration-300 ${isWished ? "fill-red-600 text-red-600 scale-110" : "text-stone-700"}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share product"
            className="w-9 h-9 bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 hover:text-[#800000] border border-neutral-200/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Floating Quick Add Button (Sliding Glassmorphism - Desktop Only) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hidden md:block z-30 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="w-full py-3 bg-[#800000] hover:bg-[#600000] active:scale-98 disabled:bg-neutral-200 disabled:text-neutral-400 text-white rounded-xl shadow-[0_12px_24px_-8px_rgba(128,0,0,0.5)] font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{currentStock === 0 ? "Out of Stock" : "Add to Bag"}</span>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="pt-5 pb-5 px-4 md:px-5 flex flex-col flex-grow bg-white text-left">
        {/* Category / Collection Tag */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#800000] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
            {product.category?.name || "Collection"}
          </p>
        </div>
        
        {/* Product Title */}
        <Link to={`/product/${product._id || product.id}`} className="focus:outline-none w-full mb-1.5 block">
          <h3 className="font-serif text-neutral-900 hover:text-[#800000] text-sm md:text-base font-semibold leading-relaxed transition-colors duration-300 line-clamp-2 min-h-[2.5rem] tracking-wide">
            {product.name}
          </h3>
        </Link>

        {/* Extended Specs Metadata */}
        {productSpecs && (
          <p className="text-[11px] text-neutral-400 font-sans font-normal mb-2.5 tracking-wide truncate">
            {productSpecs}
          </p>
        )}

        {/* Ratings & Reviews Stars Display */}
        {product.ratings !== undefined && product.ratings > 0 ? (
          <div className="flex items-center gap-1.5 mb-3.5">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.ratings) ? "fill-current" : "text-stone-200"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-stone-400 font-semibold font-sans">
              ({product.numOfReviews || 0})
            </span>
          </div>
        ) : (
          <div className="h-3.5 mb-3.5" />
        )}

        {/* Price & Action Row */}
        <div className="mt-auto flex flex-col gap-3 w-full pt-3.5 border-t border-neutral-100/70">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-neutral-900 text-base md:text-[17px] font-bold tracking-wide font-sans">
                  {currentPrice != null ? getFormattedPrice(currentPrice) : "Price Unavailable"}
                </span>
                {discountPercent > 0 && (
                  <span className="text-neutral-400 text-xs line-through font-sans font-medium">
                    {getFormattedPrice(currentComparePrice)}
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider font-sans">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>
          
          {/* Mobile Add to Bag (Full-width text pill button for optimal tap targets) */}
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="md:hidden w-full py-2.5 bg-[#800000] hover:bg-[#600000] active:scale-[0.98] disabled:bg-neutral-100 disabled:text-neutral-400 text-white rounded-xl shadow-sm text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            aria-label="Add to bag"
          >
             <ShoppingBag className="w-3.5 h-3.5" />
             <span>{currentStock === 0 ? "Out of Stock" : "Add to Bag"}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

