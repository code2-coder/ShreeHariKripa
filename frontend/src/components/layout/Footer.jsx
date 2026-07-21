import React from 'react';
import { Link } from 'react-router';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck,
  Award,
  Lock,
  Truck,
  Sparkles,
  Send,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCategory } from "../../context/CategoryContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { categories } = useCategory();

  return (
    <footer className="w-full bg-[#0A0204] font-sans pt-16 border-t border-[#B8934E]/20">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TRUST HIGHLIGHTS STRIP (Solid, High Contrast) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b border-[#2D0D18] mb-16">
           <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 group cursor-pointer text-center md:text-left">
             <div className="w-12 h-12 rounded-full bg-[#1A050A] flex items-center justify-center border border-[#B8934E]/30 group-hover:bg-[#B8934E] transition-colors duration-500">
                <Award className="w-6 h-6 text-[#B8934E] group-hover:text-[#0A0204] transition-colors duration-500" />
             </div>
             <span className="text-[#E5E5E5] font-serif tracking-wide text-[15px] group-hover:text-[#B8934E] transition-colors">Premium Quality</span>
           </div>
           
           <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 group cursor-pointer text-center md:text-left md:border-l md:border-[#2D0D18]">
             <div className="w-12 h-12 rounded-full bg-[#1A050A] flex items-center justify-center border border-[#B8934E]/30 group-hover:bg-[#B8934E] transition-colors duration-500">
                <ShieldCheck className="w-6 h-6 text-[#B8934E] group-hover:text-[#0A0204] transition-colors duration-500" />
             </div>
             <span className="text-[#E5E5E5] font-serif tracking-wide text-[15px] group-hover:text-[#B8934E] transition-colors">Certified Authentic</span>
           </div>

           <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 group cursor-pointer text-center md:text-left md:border-l md:border-[#2D0D18]">
             <div className="w-12 h-12 rounded-full bg-[#1A050A] flex items-center justify-center border border-[#B8934E]/30 group-hover:bg-[#B8934E] transition-colors duration-500">
                <Lock className="w-6 h-6 text-[#B8934E] group-hover:text-[#0A0204] transition-colors duration-500" />
             </div>
             <span className="text-[#E5E5E5] font-serif tracking-wide text-[15px] group-hover:text-[#B8934E] transition-colors">Secure Payments</span>
           </div>

           <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 group cursor-pointer text-center md:text-left md:border-l md:border-[#2D0D18]">
             <div className="w-12 h-12 rounded-full bg-[#1A050A] flex items-center justify-center border border-[#B8934E]/30 group-hover:bg-[#B8934E] transition-colors duration-500">
                <Truck className="w-6 h-6 text-[#B8934E] group-hover:text-[#0A0204] transition-colors duration-500" />
             </div>
             <span className="text-[#E5E5E5] font-serif tracking-wide text-[15px] group-hover:text-[#B8934E] transition-colors">Pan India Delivery</span>
           </div>
        </div>

        {/* MAIN FOOTER COLUMNS (4 Columns for better spacing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand Story & Contact */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-8 block">
               <div className="w-32 h-32 rounded-2xl bg-white border-2 border-[#B8934E] flex items-center justify-center shadow-lg overflow-hidden">
                 <img src="/logo_jew.png" alt="Shree Hari Kripa Jewellery" className="w-[85%] h-[85%] object-contain" />
               </div>
            </Link>
            <p className="text-[#A3A3A3] font-light text-[14px] leading-relaxed mb-8">
              Crafting timeless jewellery that beautifully blends tradition, elegance, and exceptional craftsmanship. Designed to celebrate life's most cherished moments.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4 text-[#E5E5E5] text-[14px] font-light">
                <MapPin className="w-5 h-5 text-[#B8934E] mt-0.5 shrink-0" />
                <span>Vrindavan, District Mathura Uttar Pradesh, India 281121</span>
              </li>
              <li className="flex items-start gap-4 text-[#E5E5E5] text-[14px] font-light">
                <Phone className="w-5 h-5 text-[#B8934E] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919152350955" className="hover:text-[#B8934E] transition-colors">India: +91 91523 50955</a>
                  <a href="tel:+61493600549" className="hover:text-[#B8934E] transition-colors">Australia: +61 493600549</a>
                </div>
              </li>

              <li className="flex items-center gap-4 text-[#E5E5E5] text-[14px] font-light">
                <Mail className="w-5 h-5 text-[#B8934E] shrink-0" />
                <a href="mailto:shreeharikripa1204@gmail.com" className="hover:text-[#B8934E] transition-colors">shreeharikripa1204@gmail.com</a>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#1A050A] flex items-center justify-center border border-[#B8934E]/30 hover:bg-[#B8934E] hover:text-[#0A0204] text-[#B8934E] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[20px] text-white mb-8 border-b border-[#2D0D18] pb-4">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop All', path: '/shop' },
                { name: 'New Arrivals', path: '/shop?sort=newest' },
                { name: 'Best Sellers', path: '/shop?sort=bestsellers' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[#A3A3A3] text-[14px] hover:text-[#B8934E] transition-colors duration-300 flex items-center group w-fit">
                    <ChevronRight className="w-4 h-4 text-[#B8934E] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                    <span className="font-light">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[20px] text-white mb-8 border-b border-[#2D0D18] pb-4">Support</h4>
            <ul className="space-y-4">
              {[
                { name: 'FAQs', path: '/faqs' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Return & Exchange Policy', path: '/return-policy' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Track Your Order', path: '/orders' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[#A3A3A3] text-[14px] hover:text-[#B8934E] transition-colors duration-300 flex items-center group w-fit">
                    <ChevronRight className="w-4 h-4 text-[#B8934E] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-2" />
                    <span className="font-light">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Featured Collections */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[20px] text-white mb-8 border-b border-[#2D0D18] pb-4">Collections</h4>
            <ul className="space-y-4">
              {(categories || [])
                .filter(c => !c.parentCategory)
                .map((cat) => (
                <li key={cat._id}>
                  <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} className="text-[#A3A3A3] text-[14px] hover:text-[#B8934E] transition-colors duration-300 flex items-center group gap-3 w-fit">
                    <span className="text-[10px] text-[#B8934E] opacity-70 group-hover:opacity-100 transition-all">✦</span>
                    <span className="font-light">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* NEWSLETTER SECTION (Solid Colors, No Blur) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="w-full bg-[#1A050A] rounded-3xl border border-[#B8934E]/30 p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
           <div className="md:w-1/2">
             <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">Stay Updated with New Collections</h3>
             <p className="text-[#A3A3A3] font-light text-[15px] leading-relaxed">
               Subscribe to receive exclusive launches, jewellery care tips, styling inspiration, special offers, and early access to new arrivals.
             </p>
           </div>
           <div className="md:w-1/2 w-full flex items-center">
              <div className="relative w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="w-full bg-white border-2 border-transparent focus:border-[#B8934E] rounded-full py-4 pl-6 pr-40 text-[#0A0204] placeholder-[#5C1A1B]/50 outline-none transition-all text-[14px] font-medium"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-[#B8934E] text-white px-8 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#800000] transition-colors flex items-center gap-2">
                   Subscribe <Send className="w-4 h-4" />
                </button>
              </div>
           </div>
        </motion.div>

        {/* BOTTOM FOOTER */}
        <div className="border-t border-[#2D0D18] py-8 flex flex-col items-center justify-center relative mt-8">
          
          <div className="flex items-center gap-3 mb-6 text-[#B8934E]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif italic text-[16px] tracking-wide text-[#E5E5E5]">
              Crafted with Tradition • Designed with Elegance • Trusted for Generations
            </span>
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>

          <p className="text-[#A3A3A3] text-[13px] font-light tracking-wide">
             © {currentYear} Shree Hari Kripa Jewellery. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
