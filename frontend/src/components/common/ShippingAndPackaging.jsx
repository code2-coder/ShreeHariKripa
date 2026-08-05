import React, { useState, useEffect } from 'react';
import { Package, Gift, Truck, CheckCircle2, Info } from 'lucide-react';
import { getPackagingOptions, getShippingOptions } from '../../api/shippingService';
import { useCurrency } from '../../context/CurrencyContext';
import { formatPrice } from '../../utils/currencyUtils';

/**
 * PackagingSelector Component
 * Allow users to select packaging option (Standard or Exquisite)
 */
export const PackagingSelector = ({
    country = '',
    onSelect = null,
    selectedOption = 'standard',
    className = '',
}) => {
    const { currency, rates } = useCurrency();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await getPackagingOptions(country);
                setOptions(data || []);
            } catch (error) {
                console.error('Error loading packaging options:', error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [country]);

    useEffect(() => {
        if (!loading && options.length > 0 && onSelect) {
            const selected = options.find((opt) => opt.id === selectedOption) || options[0];
            onSelect(selected);
        }
    }, [loading, options, selectedOption, onSelect]);

    const handleChange = (optionId) => {
        if (onSelect) {
            const selected = options.find((opt) => opt.id === optionId);
            onSelect(selected);
        }
    };

    if (loading) {
        return (
            <div className={`animate-pulse space-y-4 ${className}`}>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-40 bg-gray-100 rounded-2xl border border-gray-200"></div>
                    <div className="h-40 bg-gray-100 rounded-2xl border border-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 flex items-center gap-2 font-sans">
                <Gift className="w-4 h-4 text-[#B8934E]" strokeWidth={2} />
                Select Packaging
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    return (
                        <label
                            key={option.id}
                            className={`relative flex flex-col p-5 border rounded-2xl cursor-pointer transition-all duration-300 group
                                ${isSelected 
                                    ? 'border-[#B8934E] bg-[#FAF9F6] ring-1 ring-[#B8934E]/20 shadow-sm scale-[1.005]' 
                                    : 'border-neutral-200 bg-white hover:border-[#B8934E]/30 hover:bg-[#FCFAF8]'}`}
                        >
                            <input
                                type="radio"
                                name="packaging"
                                value={option.id}
                                checked={isSelected}
                                onChange={() => handleChange(option.id)}
                                className="hidden"
                            />
                            {isSelected && (
                                <div className="absolute top-4 right-4 text-[#B8934E] animate-fade-in">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-[#B8934E]/10 text-[#B8934E]' : 'bg-[#FCFAF8] text-neutral-400 group-hover:bg-[#B8934E]/10 group-hover:text-[#B8934E]'}`}>
                                    {option.id === 'premium' ? (
                                        <Gift className="w-5 h-5" />
                                    ) : (
                                        <Package className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="font-sans font-bold text-sm uppercase tracking-wider text-neutral-800">{option.name}</div>
                            </div>
                            {option.description && (
                                <div className="text-xs text-neutral-450 font-sans font-semibold flex-1 mb-4 leading-relaxed">{option.description}</div>
                            )}
                            <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between font-sans">
                                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Price</span>
                                {option.price > 0 ? (
                                    <div className="font-bold text-sm text-[#B8934E] font-sans">+{formatPrice(option.price, currency, rates, "AUD")}</div>
                                ) : (
                                    <div className="text-[9px] font-bold text-emerald-750 uppercase tracking-wider bg-emerald-100/60 px-2.5 py-0.5 rounded-md">Included</div>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * ShippingMethodSelector Component
 * Allow users to select shipping method (Standard or Express)
 */
export const ShippingMethodSelector = ({
    country = 'Australia',
    orderTotal = 0,
    onSelect = null,
    selectedMethod = 'standard',
    className = '',
}) => {
    const { currency, rates } = useCurrency();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await getShippingOptions(country, orderTotal);
                setOptions(data.options || []);
            } catch (error) {
                console.error('Error loading shipping options:', error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        if (country && orderTotal > 0) {
            setLoading(true);
            fetchOptions();
        } else {
            setOptions([]);
            setLoading(false);
        }
    }, [country, orderTotal]);

    useEffect(() => {
        if (!loading && options.length > 0 && onSelect) {
            const selected = options.find((opt) => opt.id === selectedMethod) || options[0];
            onSelect(selected);
        }
    }, [loading, options, selectedMethod, onSelect]);

    const handleChange = (optionId) => {
        if (onSelect) {
            const selected = options.find((opt) => opt.id === optionId);
            onSelect(selected);
        }
    };

    if (!country || orderTotal <= 0) {
        return (
            <div className={`p-8 border border-dashed border-neutral-300 rounded-2xl bg-[#FCFAF8] text-center flex flex-col items-center justify-center ${className}`}>
                <Info className="w-8 h-8 text-neutral-400 mb-3" />
                <p className="text-xs text-neutral-500 font-semibold max-w-sm font-sans leading-relaxed">Add items to your cart and select a delivery address to view available shipping options.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={`animate-pulse space-y-4 ${className}`}>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                    <div className="h-24 bg-gray-100 rounded-xl border border-gray-200"></div>
                    <div className="h-24 bg-gray-100 rounded-xl border border-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 flex items-center gap-2 font-sans">
                <Truck className="w-4 h-4 text-[#B8934E]" strokeWidth={2} />
                Shipping Method
            </h3>
            
            {options[0]?.freeThreshold && country.toLowerCase() === 'australia' && (
                <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs font-semibold text-emerald-800 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free standard shipping on orders over <strong className="font-bold">{formatPrice(options[0].freeThreshold, currency, rates, "AUD")}</strong></span>
                </div>
            )}

            <div className="space-y-3">
                {options.map((option) => {
                    const isSelected = selectedMethod === option.id;
                    return (
                        <label
                            key={option.id}
                            className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all duration-300
                                ${isSelected 
                                    ? 'border-[#B8934E] bg-[#FAF9F6] ring-1 ring-[#B8934E]/20 shadow-sm scale-[1.005]' 
                                    : 'border-neutral-200 bg-white hover:border-[#B8934E]/30 hover:bg-[#FCFAF8]'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`flex flex-shrink-0 items-center justify-center w-5 h-5 rounded-full border transition-colors
                                    ${isSelected ? 'border-[#B8934E] bg-white' : 'border-neutral-300'}`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-[#B8934E] rounded-full"></div>}
                                </div>
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={option.id}
                                    checked={isSelected}
                                    onChange={() => handleChange(option.id)}
                                    className="hidden"
                                />
                                <div className="flex flex-col justify-center font-sans">
                                    <div className="font-sans font-bold text-sm uppercase tracking-wider text-neutral-800">{option.name}</div>
                                    <div className="text-xs text-neutral-450 mt-1 font-semibold leading-normal">{option.description}</div>
                                    {option.deliveryDays && (
                                        <div className="mt-2.5">
                                            <span className="text-[9px] font-bold text-[#800000] bg-red-50 border border-[#800000]/15 px-2.5 py-0.5 rounded-md">
                                                Est: {option.deliveryDays}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-right pl-4 font-sans">
                                {option.isFree ? (
                                    <div className="text-[9px] font-bold text-emerald-750 uppercase tracking-wider bg-emerald-100/60 px-2.5 py-0.5 rounded-md font-sans">Free</div>
                                ) : (
                                    <div className="text-sm font-bold text-neutral-900 font-sans">{formatPrice(option.price, currency, rates, "AUD")}</div>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * OrderSummary Component
 * Display price breakdown with items, tax, shipping, and packaging
 */
export const OrderSummary = ({
    itemsPrice = 0,
    taxAmount = 0,
    shippingAmount = 0,
    packagingAmount = 0,
    className = '',
    showBreakdown = true,
}) => {
    const { currency, rates } = useCurrency();
    const totalAmount = itemsPrice + taxAmount + shippingAmount + packagingAmount;

    return (
        <div className={`bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl p-6 md:p-7 space-y-6 ${className}`}>
            <h3 className="text-sm font-sans font-bold text-neutral-800 border-b border-neutral-100 pb-4">Order Summary</h3>

            {showBreakdown && (
                <div className="space-y-4 text-xs font-sans">
                    <div className="flex justify-between items-center text-neutral-600">
                        <span className="font-semibold text-neutral-550 font-sans">Subtotal</span>
                        <span className="font-bold text-neutral-900 text-sm font-sans">{formatPrice(itemsPrice, currency, rates, currency)}</span>
                    </div>

                    {taxAmount > 0 && (
                        <div className="flex justify-between items-center text-neutral-600">
                            <span className="font-semibold text-neutral-550 font-sans">Estimated Tax (10%)</span>
                            <span className="font-bold text-neutral-900 text-sm font-sans">{formatPrice(taxAmount, currency, rates, currency)}</span>
                        </div>
                    )}

                    {shippingAmount > 0 ? (
                        <div className="flex justify-between items-center text-neutral-600 font-sans">
                            <span className="font-semibold text-neutral-550 font-sans">Shipping</span>
                            <span className="font-bold text-neutral-900 text-sm font-sans">{formatPrice(shippingAmount, currency, rates, currency)}</span>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center text-neutral-600 font-sans">
                            <span className="font-semibold text-neutral-550 font-sans">Shipping</span>
                            <span className="font-bold text-emerald-700 uppercase text-[10px] tracking-wider bg-emerald-150/60 px-2 py-0.5 rounded">Free</span>
                        </div>
                    )}

                    {packagingAmount > 0 && (
                        <div className="flex justify-between items-center text-neutral-600">
                            <span className="font-semibold text-neutral-550 font-sans">Premium Packaging</span>
                            <span className="font-bold text-amber-700 text-sm font-sans">+{formatPrice(packagingAmount, currency, rates, currency)}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="border-t border-neutral-100 pt-5 mt-5">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="block text-xs font-bold text-neutral-450 uppercase tracking-wider mb-0.5 font-sans">Total</span>
                        <span className="text-[10px] text-neutral-400 font-semibold font-sans">Including all taxes</span>
                    </div>
                    <span className="text-2xl font-sans font-extrabold text-neutral-900 tracking-tight">{formatPrice(totalAmount, currency, rates, currency)}</span>
                </div>
            </div>
        </div>
    );
};

/**
 * PackagingInfo Component
 * Display packaging information on product pages
 */
export const PackagingInfo = ({
    text = 'Every piece arrives in our signature Shreeharikripa presentation sachet.',
    showIcon = true,
    className = '',
}) => {
    return (
        <div className={`flex items-start gap-4 p-5 bg-[#FCFAF8] border border-neutral-200/60 rounded-2xl ${className} font-sans`}>
            {showIcon && (
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-neutral-100 flex-shrink-0">
                    <Gift className="w-5 h-5 text-amber-600" />
                </div>
            )}
            <p className="text-xs font-semibold text-neutral-500 leading-relaxed pt-1">{text}</p>
        </div>
    );
};

export default PackagingSelector;
