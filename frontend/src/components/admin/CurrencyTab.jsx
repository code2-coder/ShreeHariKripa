import React, { useState, useEffect } from "react";
import { Coins, Plus, Trash2, Save, HelpCircle, User, Calendar, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import api from "../../api/axios";

const CURRENCY_METADATA = {
  INR: { name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  AUD: { name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
  USD: { name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  EUR: { name: "Euro", flag: "🇪🇺", symbol: "€" },
  GBP: { name: "British Pound", flag: "🇬🇧", symbol: "£" },
  AED: { name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  CAD: { name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
  NZD: { name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  SGD: { name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  CHF: { name: "Swiss Franc", flag: "🇨🇭", symbol: "Fr" },
  JPY: { name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  CNY: { name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
};

export function CurrencyTab() {
  const [settings, setSettings] = useState(null);
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Add currency state
  const [newCode, setNewCode] = useState("");
  const [newRate, setNewRate] = useState("");

  const fetchCurrencySettings = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/currency-settings");
      if (data.success && data.settings) {
        setSettings(data.settings);
        setRates(data.settings.rates || {});
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load currency configurations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencySettings();
  }, []);

  const handleRateChange = (code, value) => {
    setRates((prev) => ({
      ...prev,
      [code]: value,
    }));
  };

  const handleDeleteCurrency = (code) => {
    if (code === "INR") {
      toast.error("Base currency INR cannot be deleted");
      return;
    }
    setRates((prev) => {
      const updated = { ...prev };
      delete updated[code];
      return updated;
    });
  };

  const handleAddCurrency = () => {
    if (!newCode) {
      toast.error("Please select or enter a currency code");
      return;
    }
    const cleanCode = newCode.toUpperCase().trim();
    if (cleanCode.length !== 3) {
      toast.error("Currency code must be exactly 3 letters");
      return;
    }

    if (rates[cleanCode] !== undefined) {
      toast.error(`Currency ${cleanCode} is already in the list`);
      return;
    }

    const rateNum = Number(newRate);
    if (Number.isNaN(rateNum) || rateNum <= 0) {
      toast.error("Initial exchange rate must be a number greater than 0");
      return;
    }

    setRates((prev) => ({
      ...prev,
      [cleanCode]: rateNum,
    }));

    setNewCode("");
    setNewRate("");
    toast.success(`Added ${cleanCode} to active currencies`);
  };

  const handleSave = async () => {
    // Validate rates
    const keys = Object.keys(rates);
    for (const key of keys) {
      const rateNum = Number(rates[key]);
      if (Number.isNaN(rateNum) || rateNum <= 0) {
        toast.error(`Invalid exchange rate for ${key}. Must be greater than 0`);
        return;
      }
    }

    setIsSaving(true);
    try {
      const { data } = await api.put("/currency-settings", { rates });
      if (data.success) {
        setSettings(data.settings);
        setRates(data.settings.rates || {});
        toast.success("Currency settings saved successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save currency settings");
    } finally {
      setIsSaving(false);
    }
  };

  // Get available currencies for dropdown
  const availableCodes = Object.keys(CURRENCY_METADATA).filter(
    (code) => rates[code] === undefined
  );

  return (
    <div className="space-y-8 select-none">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-stone-100 pb-6">
        <div>
          <h2 className="text-2xl font-serif text-[#0A0204] tracking-tight">Currency Exchange Settings</h2>
          <p className="text-xs text-stone-500 font-light mt-1">Configure manual exchange rates relative to INR for global storefront checkout.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Dynamic Exchange Rates Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
            
            {/* Header info */}
            <div className="p-6 border-b border-stone-100 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#B8934E]/15 p-2 rounded-xl text-[#B8934E]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Exchange Rates Directory</h3>
                  <p className="text-[10px] text-stone-500 font-light uppercase tracking-wider mt-0.5">Base currency: INR (₹1.0000)</p>
                </div>
              </div>
              
              {settings && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-stone-400 font-light">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#B8934E]" />
                    By: {settings.updatedBy}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B8934E]" />
                    On: {new Date(settings.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Rates Form */}
            {isLoading ? (
              <div className="p-16 text-center">
                <div className="w-8 h-8 border-2 border-stone-200 border-t-[#B8934E] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xs text-stone-400 font-light">Loading exchange configuration...</p>
              </div>
            ) : (
              <div className="p-6 md:p-8 space-y-4">
                {Object.keys(rates).map((code) => {
                  const meta = CURRENCY_METADATA[code] || { name: "International Currency", flag: "🌐", symbol: code };
                  const isBase = code === "INR";
                  
                  return (
                    <div 
                      key={code} 
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4.5 border rounded-2xl gap-4 transition-all duration-200 ${
                        isBase 
                          ? "bg-stone-50/60 border-stone-200/60 text-stone-400" 
                          : "bg-white border-stone-100 hover:border-stone-200/80 text-stone-850"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl drop-shadow-sm leading-none">{meta.flag}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm tracking-wide text-stone-900">{code}</span>
                            <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-500">{meta.symbol}</span>
                            {isBase && (
                              <span className="text-[8px] bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                Base
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-450 font-light mt-0.5">{meta.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 self-end sm:self-auto">
                        <div className="flex items-center gap-1.5 focus-within:text-[#B8934E]">
                          <span className="text-xs text-stone-400 font-medium">1 INR =</span>
                          <input
                            type="number"
                            step="0.000001"
                            value={rates[code]}
                            disabled={isBase}
                            onChange={(e) => handleRateChange(code, e.target.value)}
                            className={`w-36 px-3.5 py-2 border rounded-xl text-xs font-bold focus:outline-none transition-all ${
                              isBase 
                                ? "bg-stone-100 border-stone-200/50 cursor-not-allowed text-stone-400 font-mono" 
                                : "bg-stone-50/50 hover:bg-stone-50 border-stone-200 focus:border-[#B8934E] focus:ring-4 focus:ring-[#B8934E]/10 text-stone-950"
                            }`}
                          />
                        </div>
                        
                        {!isBase && (
                          <button
                            onClick={() => handleDeleteCurrency(code)}
                            className="p-2 rounded-xl text-stone-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title={`Delete ${code}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Info Note */}
                <div className="bg-[#FAF8F5] border border-[#B8934E]/15 rounded-2xl p-5 flex gap-4 text-stone-600 shadow-sm mt-4">
                  <HelpCircle className="w-5 h-5 text-[#B8934E]/60 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-stone-850">Currency Formula</h5>
                    <p className="text-[11px] font-light leading-relaxed text-stone-500">
                      Product prices in MongoDB remain strictly in INR (e.g. ₹10,000.00). Changing AUD from 0.0165 to 0.02 makes a ₹10,000 product display as A$200.00 live on the store.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="border-t border-stone-100 px-6 py-5 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={fetchCurrencySettings}
                disabled={isLoading || isSaving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-stone-200 hover:border-stone-900 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 transition-all bg-white hover:bg-stone-50 active:scale-[0.98] shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Changes
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || isSaving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#B8934E] hover:bg-[#A37F3F] active:scale-[0.98] disabled:bg-stone-300 rounded-xl text-xs font-bold text-white tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:shadow-[#B8934E]/20 animate-none"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Exchange Rates
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Add New Currency Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-serif font-bold text-[#0A0204] border-b border-stone-50 pb-2">
              ➕ Add New Currency
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Select Currency Code</label>
                <select
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-stone-50/50 hover:bg-stone-50/80 border border-stone-200 focus:border-[#B8934E] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-[#B8934E]/10 transition-all text-stone-850"
                >
                  <option value="">Choose currency...</option>
                  {availableCodes.map((code) => {
                    const meta = CURRENCY_METADATA[code];
                    return (
                      <option key={code} value={code}>
                        {meta.flag} {code} - {meta.name}
                      </option>
                    );
                  })}
                  <option value="custom_code">Other (Enter custom ISO...)</option>
                </select>
              </div>

              {newCode === "custom_code" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono">Custom 3-Letter Code (e.g. CAD)</label>
                  <input
                    type="text"
                    maxLength="3"
                    placeholder="Enter ISO code..."
                    onChange={(e) => setNewCode(e.target.value.toUpperCase().slice(0, 3))}
                    className="w-full bg-stone-50/50 hover:bg-stone-50/80 border border-stone-200 focus:border-[#B8934E] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-[#B8934E]/10 transition-all text-stone-900 font-bold uppercase tracking-widest"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Exchange Rate (1 INR = ?)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  placeholder="e.g. 0.0165"
                  className="w-full bg-stone-50/50 hover:bg-stone-50/80 border border-stone-200 focus:border-[#B8934E] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-[#B8934E]/10 transition-all text-stone-900 font-bold"
                />
              </div>

              <button
                onClick={handleAddCurrency}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-stone-900 hover:bg-stone-850 active:scale-[0.98] text-xs font-semibold text-white rounded-xl transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Active List
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
