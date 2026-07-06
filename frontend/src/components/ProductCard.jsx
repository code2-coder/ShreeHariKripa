import { ShoppingBag, Heart, Share2 } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/CurrencyContext";
import { toast } from "sonner";
import { memo, useState } from "react";

export const ProductCard = memo(function ProductCard({ product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant] = useState(hasVariants ? product.variants[0] : null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getFormattedPrice } = useCurrency();

  const isWished = isInWishlist(product._id || product.id);
  
  // Extract correct variant properties
  const variantSize = selectedVariant?.sizes?.[0];
  const currentStock = variantSize ? variantSize.stock : product.stock;
  const currentPrice = variantSize?.price ?? product.price;
  const currentSizeName = variantSize ? variantSize.size : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, currentSizeName, currentPrice);
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

  const getSrcSet = () => {
    const originalUrl = (product.images && product.images[0]?.url) || product.image;
    if (originalUrl && originalUrl.includes("cloudinary.com")) {
      return `${originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_400/")} 400w, 
              ${originalUrl.replace("/upload/", "/upload/f_auto,q_auto,w_600/")} 600w`;
    }
    return undefined;
  };

  return (
    <div className="group relative flex flex-col h-full bg-white transition-all duration-500 hover:shadow-2xl max-w-sm mx-auto overflow-hidden">
      
      {/* Image Container */}
      <Link 
        to={`/product/${product._id || product.id}`} 
        aria-label={`View ${product.name} details`} 
        className="block relative aspect-[4/5] bg-gray-50 overflow-hidden cursor-pointer"
      >
        <img
          src={getImageUrl()}
          srcSet={getSrcSet()}
          sizes="(max-width: 640px) 100vw, 50vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />

        {/* Minimal Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {currentStock < 10 && currentStock > 0 && (
            <span className="text-obsidian bg-white/95 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Limited
            </span>
          )}
          {currentStock === 0 && (
            <span className="text-white bg-obsidian/95 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Actions overlay */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={(e) => {
               e.preventDefault();
               toggleWishlist(product);
            }}
            aria-pressed={isWished}
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            className="p-2.5 bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 group/btn"
          >
            <Heart className={`w-4 h-4 transition-colors duration-200 ${isWished ? "fill-red-500 text-red-500" : "text-gray-700 group-hover/btn:text-gray-900"}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share product"
            className="p-2.5 bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 group/btn"
          >
            <Share2 className="w-4 h-4 text-gray-700 group-hover/btn:text-gray-900 transition-colors duration-200" />
          </button>
        </div>
        
        {/* Quick Add Button Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hidden md:block z-20">
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="w-full py-4 bg-[#800000] backdrop-blur-sm text-white hover:bg-[#5a0000] font-semibold text-[10px] tracking-[0.2em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{currentStock === 0 ? "Out of Stock" : "Add to Bag"}</span>
          </button>
        </div>

      </Link>

      {/* Product Info */}
      <div className="pt-5 pb-6 px-4 flex flex-col flex-grow bg-white text-center">
        <p className="text-gray-400 text-[10px] mb-2 font-bold uppercase tracking-[0.25em]">
          {product.category?.name || "Collection"}
        </p>
        
        <Link to={`/product/${product._id || product.id}`} className="focus:outline-none w-full mb-3 inline-block">
          <h3 className="font-serif text-gray-900 text-[15px] md:text-base font-medium leading-snug hover:text-obsidian transition-colors line-clamp-2 px-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col items-center justify-center gap-3 w-full">
          <span className="text-obsidian font-semibold tracking-wide text-sm md:text-base">
            {currentPrice != null ? getFormattedPrice(currentPrice) : "Price Unavailable"}
          </span>
          
          {/* Mobile Add to Bag (since overlay is hidden on mobile) */}
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="md:hidden w-full py-3 bg-[#800000] text-white hover:bg-[#5a0000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-semibold text-[10px] tracking-[0.2em] uppercase rounded-sm"
            aria-label="Add to bag"
          >
             <ShoppingBag className="w-4 h-4" />
             <span>{currentStock === 0 ? "Out of Stock" : "Add to Bag"}</span>
          </button>
        </div>
      </div>
    </div>
  );
});
