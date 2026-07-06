import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';
import { RefreshCcw, HandPlatter, AlertCircle } from 'lucide-react';

export function ReturnPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />
      
      <main className="flex-1 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full pt-[160px] lg:pt-[180px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-[#0A0204] mb-4">Return & Exchange</h1>
          <p className="text-[#5C1A1B]/70 font-light max-w-2xl mx-auto">
            Our commitment to your complete satisfaction and peace of mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-[#B8934E]/20 text-center shadow-sm">
            <RefreshCcw className="w-8 h-8 text-[#B8934E] mx-auto mb-4" />
            <h3 className="font-serif text-lg text-[#0A0204] mb-2">7-Day Returns</h3>
            <p className="text-sm text-gray-500 font-light">Eligible items can be returned within 7 days of delivery.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-[#B8934E]/20 text-center shadow-sm">
            <HandPlatter className="w-8 h-8 text-[#B8934E] mx-auto mb-4" />
            <h3 className="font-serif text-lg text-[#0A0204] mb-2">Lifetime Exchange</h3>
            <p className="text-sm text-gray-500 font-light">Upgrade your jewellery anytime with our lifetime exchange policy.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-[#B8934E]/20 text-center shadow-sm">
            <AlertCircle className="w-8 h-8 text-[#B8934E] mx-auto mb-4" />
            <h3 className="font-serif text-lg text-[#0A0204] mb-2">Non-Returnable</h3>
            <p className="text-sm text-gray-500 font-light">Customized and engraved pieces cannot be returned or exchanged.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#B8934E]/20 shadow-sm prose prose-stone max-w-none">
          <h2 className="font-serif text-2xl text-[#0A0204] mb-4">How to Initiate a Return</h2>
          <p className="text-gray-600 font-light mb-8 leading-relaxed">
            To initiate a return or exchange, please contact our support team at <strong>info@shreeharikripa.com</strong> within 7 days of receiving your order. We will arrange a complimentary secure pickup from your address. The item must be unused, in its original condition, and accompanied by the original invoice and Certificate of Authenticity.
          </p>

          <h2 className="font-serif text-2xl text-[#0A0204] mb-4">Quality Inspection</h2>
          <p className="text-gray-600 font-light mb-8 leading-relaxed">
            Upon receiving the returned item, our master craftsmen will conduct a thorough quality check. Once the item is verified to be in its original condition without any damage or alteration, we will process your refund or exchange within 3-5 business days.
          </p>

          <h2 className="font-serif text-2xl text-[#0A0204] mb-4">Lifetime Exchange Value</h2>
          <p className="text-gray-600 font-light leading-relaxed">
            We value your investment. Under our Lifetime Exchange Policy, you can exchange your Shree Hari Kripa jewellery for a new piece at 100% of the current prevailing market value of the metal and 80% of the diamond value, subject to our assessment.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
