import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { motion } from 'motion/react';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, badge: cartCount },
    { name: 'Account', path: '/account', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-lg border border-neutral-100/60 rounded-[24px] shadow-[0_15px_30px_rgba(128,0,0,0.12),_0_5px_15px_rgba(0,0,0,0.04)] px-3 py-2 flex items-center justify-around h-[68px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className="relative flex flex-col items-center justify-center py-1.5 w-16 h-full transition-all duration-300 cursor-pointer"
            >
              {/* Highlight background pill sliding */}
              {isActive && (
                <motion.div 
                  layoutId="active-nav-glow" 
                  className="absolute inset-0 bg-[#800000]/8 rounded-2xl -z-10" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <div className="relative flex items-center justify-center">
                <Icon 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`w-[22px] h-[22px] transition-transform duration-300 ${isActive ? 'text-[#800000] scale-110' : 'text-neutral-500 group-hover:text-[#800000]'}`} 
                />
                
                {item.badge > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="absolute -top-2 -right-2.5 bg-[#800000] text-white text-[8px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white shadow-sm"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </div>
              
              <span className={`text-[9px] tracking-wider uppercase transition-all duration-300 mt-1 font-bold ${isActive ? 'text-[#800000]' : 'text-neutral-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
