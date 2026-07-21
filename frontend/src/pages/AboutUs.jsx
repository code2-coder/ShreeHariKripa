import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Heart, Package, Globe, Star } from 'lucide-react';

const whyChooseUs = [
  {
    emoji: "✨",
    icon: Sparkles,
    title: "Premium Handcrafted Jewellery",
    desc: "Every ornament is lovingly handcrafted by skilled artisans, ensuring each piece is unique, elegant, and worthy of your beloved Deities.",
  },
  {
    emoji: "🪷",
    icon: Heart,
    title: "Temple-Inspired Designs",
    desc: "Our designs are rooted in ancient temple art and timeless Indian traditions, bringing authentic sacredness to your home shrine.",
  },
  {
    emoji: "💎",
    icon: Star,
    title: "High-Quality Materials",
    desc: "We carefully select fine-quality materials and work with artisans who honour the spiritual significance of every ornament they create.",
  },
  {
    emoji: "🎁",
    icon: Package,
    title: "Beautifully Packaged with Care",
    desc: "Every order is packed with respect and gratitude, carrying our heartfelt prayer that it brings blessings and divine grace to your home.",
  },
  {
    emoji: "🌏",
    icon: Globe,
    title: "Worldwide Shipping",
    desc: "We proudly ship across India, Australia, and worldwide so that devotees everywhere can adorn their Deities with our creations.",
  },
  {
    emoji: "🙏",
    icon: ShieldCheck,
    title: "Made with Devotion",
    desc: "Crafted with love for Laddu Gopal, Radha Krishna, Mata Rani, Ram Darbaar, Gaur Nitai, and all beloved forms of the Divine.",
  },
];

const deities = [
  "Laddu Gopal", "Radha Krishna", "Bal Gopal",
  "Jagannath Baldev & Subhadra", "Ram Darbaar", "Gaur Nitai", "Mata Rani",
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#B8934E]/30 overflow-hidden">
      <Header />

      <main className="pb-0 pt-[120px] lg:pt-[140px]">

        {/* ── HERO SECTION ── */}
        <section className="relative w-full py-24 lg:py-36 flex items-center justify-center overflow-hidden bg-[#1A050A]">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://res.cloudinary.com/dg4pix57t/image/upload/v1782091008/shreeharikripa/products/va4itpnjtej851hy1fit.jpg"
              alt="Deity Jewellery Background"
              className="w-full h-full object-cover object-center filter brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A050A] via-[#1A050A]/70 to-[#1A050A]/20" />
          </motion.div>

          {/* Floating gold orbs */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[15%] w-72 h-72 bg-[#B8934E] rounded-full filter blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/4 left-[15%] w-72 h-72 bg-[#DDA7A5] rounded-full filter blur-[120px] pointer-events-none"
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B8934E]" />
              <span className="text-[#B8934E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em]">Shree Hari Kripa</span>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B8934E]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-6 leading-[1.08]"
            >
              Our <span className="text-[#DDA7A5] italic font-light">Story</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white/75 font-light leading-relaxed text-[16px] sm:text-[18px] max-w-2xl mx-auto tracking-wide"
            >
              Crafting timeless deity ornaments with devotion, tradition, and the finest Indian craftsmanship — for devotees around the world.
            </motion.p>
          </div>
        </section>

        {/* ── ABOUT / MISSION SECTION ── */}
        <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(45,13,24,0.18)] group aspect-[4/5] lg:aspect-auto lg:h-[640px]"
            >
              <img
                src="https://res.cloudinary.com/dg4pix57t/image/upload/v1782091008/shreeharikripa/products/va4itpnjtej851hy1fit.jpg"
                alt="Handcrafted Deity Jewellery"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0D18]/70 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 max-w-[260px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full bg-[#1A050A] flex items-center justify-center flex-shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-[#B8934E]" />
                  </motion.div>
                  <h4 className="text-[#2D0D18] font-serif text-[17px] font-bold leading-tight">Master Craftsmanship</h4>
                </div>
                <p className="text-[#5C1A1B]/70 text-[12px] leading-relaxed font-medium">
                  Preserving the ancient art of Indian deity jewellery making.
                </p>
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[1px] w-8 bg-[#B8934E]" />
                <span className="text-[#B8934E] text-[11px] font-bold uppercase tracking-[0.3em]">Welcome to Shree Hari Kripa</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-serif text-[#2D0D18] mb-8 leading-[1.12] tracking-tight">
                Adorning the <br />
                <span className="italic text-[#DDA7A5] font-light">Divine with Love</span>
              </h2>

              <div className="space-y-5 text-[#5C1A1B]/75 font-light text-[15.5px] sm:text-[16.5px] leading-loose">
                <p>
                  At Shree Hari Kripa, we believe that every ornament offered to the Divine is an expression of love, devotion, and reverence. Our mission is to provide beautifully handcrafted deity jewellery and traditional adornments that enhance the beauty of your beloved deities while preserving the rich heritage of Indian craftsmanship.
                </p>
                <p>
                  Inspired by timeless temple traditions, each piece in our collection is thoughtfully designed with elegance, purity, and meticulous attention to detail — from exquisite necklaces, crowns, earrings, and bangles to complete deity jewellery sets.
                </p>
                <p>
                  We are more than an online store — we are a family dedicated to serving devotees around the world, striving to offer exceptional craftsmanship, reliable service, and a seamless shopping experience for every occasion, from daily worship to Janmashtami, Radhashtami, Diwali, and other sacred festivals.
                </p>
              </div>

              {/* Deity tags */}
              <div className="mt-10">
                <p className="text-[#B8934E] text-[11px] font-bold uppercase tracking-widest mb-4">We Adorn</p>
                <div className="flex flex-wrap gap-2">
                  {deities.map((d) => (
                    <span
                      key={d}
                      className="px-4 py-1.5 bg-[#2D0D18]/5 border border-[#B8934E]/25 rounded-full text-[#2D0D18] text-[12.5px] font-medium tracking-wide"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY CHOOSE US SECTION ── */}
        <section className="bg-[#1A050A] py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Ambient glow blobs */}
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, -50, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#800000] rounded-full mix-blend-screen filter blur-[160px] opacity-[0.12] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#B8934E] rounded-full mix-blend-screen filter blur-[160px] opacity-[0.08] pointer-events-none"
          />

          <div className="max-w-[1300px] mx-auto relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#B8934E]" />
                <span className="text-[#B8934E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em]">Our Promise</span>
                <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#B8934E]" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-5">
                Why Choose <span className="italic text-[#DDA7A5] font-light">Us</span>
              </h2>
              <p className="text-white/60 font-light text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
                The devotion, quality, and care we bring to every single ornament we create.
              </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group relative bg-gradient-to-b from-[#2D0D18]/80 to-[#1A050A] p-8 lg:p-10 rounded-[2rem] border border-[#B8934E]/15 hover:border-[#B8934E]/45 transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Background watermark icon */}
                  <div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-700 pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    >
                      <item.icon className="w-28 h-28 text-white" />
                    </motion.div>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B8934E]/5 via-transparent to-transparent rounded-[2rem]" />
                  </div>

                  {/* Icon badge */}
                  <div className="relative w-14 h-14 bg-[#B8934E]/10 rounded-2xl border border-[#B8934E]/20 flex items-center justify-center mb-7 group-hover:bg-[#B8934E]/20 transition-colors duration-500">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className="absolute inset-0 rounded-2xl bg-[#B8934E]/15 filter blur-md"
                    />
                    <span className="text-2xl relative z-10">{item.emoji}</span>
                  </div>

                  <h3 className="text-[20px] lg:text-[22px] font-serif text-white mb-3 tracking-wide group-hover:text-[#DDA7A5] transition-colors duration-500 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-white/55 font-light text-[14.5px] leading-relaxed group-hover:text-white/75 transition-colors duration-500">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING DEVOTION BANNER ── */}
        <section className="py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#B8934E]" />
              <span className="text-[#B8934E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em]">With Devotion & Faith</span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#B8934E]" />
            </div>

            <p className="text-[#5C1A1B]/80 font-light text-[17px] sm:text-[19px] leading-loose italic font-serif max-w-2xl mx-auto mb-8">
              "Every order is packed with care, respect, and gratitude, carrying our heartfelt prayer that it brings blessings, happiness, and divine grace to your home."
            </p>

            <p className="text-[#B8934E] font-bold text-[14px] uppercase tracking-widest">
              — Shree Hari Kripa
            </p>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
