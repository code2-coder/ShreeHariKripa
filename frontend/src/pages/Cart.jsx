import { useNavigate, Link } from "react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, CreditCard, Banknote, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { useSEO } from "../hooks/useSEO";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import { toast } from "sonner";
import api from "../api/axios";
import { AddressBook } from "../components/AddressBook";
import { AddressForm } from "../components/AddressForm";
import {
  ShippingMethodSelector,
  PackagingSelector,
} from "../components/ShippingAndPackaging";
import { convertPrice, DEFAULT_CURRENCY, formatPrice } from "../utils/currencyUtils";

const Footer = lazy(() => import("../components/Footer").then(m => ({ default: m.Footer })));

export function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { getFormattedPrice, currency, getConvertedPrice, rates, settings } = useCurrency();
  const navigate = useNavigate();

  useSEO("Secure Checkout | Shreeharikripa", `Complete your purchase securely. ${cart.length} luxury items waiting in your cart.`);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPackaging, setSelectedPackaging] = useState(null);

  // Serviceability State
  const [serviceability, setServiceability] = useState(null);
  const [isCheckingServiceability, setIsCheckingServiceability] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressView, setAddressView] = useState("book"); // "book", "add", "edit"
  const [addressToEdit, setAddressToEdit] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const { data } = await api.get("/me/addresses");
      setAddresses(data.addresses);
      if (data.addresses.length > 0 && !selectedAddressId) {
        const defaultAddr = data.addresses.find(a => a.isDefault);
        setSelectedAddressId(defaultAddr ? defaultAddr._id : data.addresses[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAddress = async (formData) => {
    try {
      if (addressView === "edit" && addressToEdit) {
        await api.put(`/me/addresses/${addressToEdit._id}`, formData);
        toast.success("Address updated successfully");
      } else {
        await api.post("/me/addresses", formData);
        toast.success("Address saved successfully");
      }
      setAddressView("book");
      setAddressToEdit(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/me/addresses/${id}`);
      toast.success("Address removed");
      if (selectedAddressId === id) setSelectedAddressId(null);
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to remove address");
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await api.put(`/me/addresses/${id}/default`);
      toast.success("Default address updated");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to set default address");
    }
  };

  const buildOrderPayload = () => {
    const selectedAddress = addresses.find(a => a._id === selectedAddressId);
    const itemsPrice = convertedCartTotal;
    const shippingAmount = displayShippingAmount;
    const packagingAmount = displayPackagingAmount;
    return {
      orderItems: cart.map(item => {
        const itemPrice = item.price !== undefined ? item.price : item.product.price;
        const price = currency === DEFAULT_CURRENCY
          ? itemPrice
          : Number(convertPrice(itemPrice, currency, rates, DEFAULT_CURRENCY).toFixed(2));

        return {
          product: item.product._id || item.product.id,
          name: item.product.name,
          price,
          size: item.size,
          quantity: item.quantity,
          image: (item.product.images && item.product.images[0]?.url) || item.product.image || "no-image"
        };
      }),
      shippingInfo: selectedAddress ? {
        fullName: selectedAddress.fullName,
        address: selectedAddress.address,
        city: selectedAddress.city,
        phoneNo: selectedAddress.phoneNo,
        altPhoneNo: selectedAddress.altPhoneNo,
        zipCode: selectedAddress.zipCode,
        country: selectedAddress.country
      } : null,
      paymentMethod,
      itemsPrice,
      taxAmount: 0,
      shippingAmount,
      packagingAmount,
      shippingMethod: selectedShipping?.id || "standard",
      packagingOption: selectedPackaging?.id || "standard",
      totalAmount: Number((itemsPrice + shippingAmount + packagingAmount).toFixed(2)),
      currency: currency
    };
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    const orderPayload = buildOrderPayload();
    try {
      setIsProcessing(true);

      if (paymentMethod === "Stripe" || paymentMethod === "Card") {
        localStorage.setItem("stripeOrderPayload", JSON.stringify(orderPayload));
        const { data } = await api.post("/payment/stripe/create-checkout-session", orderPayload);

        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Failed to get Stripe checkout URL");
          setIsProcessing(false);
        }
      } else if (paymentMethod === "COD") {
        await api.post("/orders/new", orderPayload);
        clearCart();
        toast.success("Order placed successfully via COD!");
        setIsProcessing(false);
        navigate("/orders");
      }
    } catch (error) {
      setIsProcessing(false);
      const errMsg = error.response?.data?.message || error.response?.data || error.message || "Unknown error";
      toast.error(`Checkout Failed: ${typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)}`);
      console.error("Full checkout error:", error);
    }
  };

  const getOptimizedImage = (product) => {
    const url = (product.images && product.images[0]?.url) || product.image;
    if (url && url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_200/");
    }
    return url || "https://placehold.co/200x200?text=No+Image";
  };

  const chosenAddress = addresses.find(a => a._id === selectedAddressId);
  const country = chosenAddress ? (chosenAddress.country || "").toLowerCase() : "";
  const isIndiaAddress = country === "india";
  const isIndiaEnabled = settings?.isIndiaEnabled !== false;
  const isAustraliaEnabled = settings?.isAustraliaEnabled !== false;
  const isDeliveryAvailable = (country === "india" && isIndiaEnabled) || 
                              (country === "australia" && isAustraliaEnabled) || 
                              !chosenAddress;
  const convertedCartTotal = getConvertedPrice(cartTotal);
  const cartTotalAUD = convertPrice(cartTotal, "AUD", rates, DEFAULT_CURRENCY);
  const displayShippingAmountAUD = selectedShipping?.price ?? 0;
  const displayPackagingAmountAUD = selectedPackaging?.price ?? 0;
  const displayShippingAmount = currency === "AUD"
    ? displayShippingAmountAUD
    : convertPrice(displayShippingAmountAUD, currency, rates, "AUD");
  const displayPackagingAmount = currency === "AUD"
    ? displayPackagingAmountAUD
    : convertPrice(displayPackagingAmountAUD, currency, rates, "AUD");
  const totalAmountWithExtras = convertedCartTotal + displayShippingAmount + displayPackagingAmount;
  const canShowShippingOptions = !!chosenAddress;

  // COD is only for India: header must be INR AND address must be India (or not yet selected)
  const isCODAvailable = currency === "INR" && (isIndiaAddress || !chosenAddress);

  // Auto-switch away from COD if Australia selected in header or non-India address
  useEffect(() => {
    if (paymentMethod === "COD" && !isCODAvailable) {
      setPaymentMethod("Stripe");
    }
  }, [isCODAvailable]);

  useEffect(() => {
    if (chosenAddress && isIndiaAddress && chosenAddress.zipCode) {
      checkPincodeServiceability(chosenAddress.zipCode);
    } else {
      setServiceability(null);
    }
  }, [chosenAddress, isIndiaAddress]);

  const checkPincodeServiceability = async (pincode) => {
    if (!isIndiaAddress || !pincode || pincode.length !== 6) {
      setServiceability(null);
      return;
    }

    try {
      setIsCheckingServiceability(true);
      const { data } = await api.get(`/delhivery/serviceability/${pincode}`);
      setServiceability(data.data);
    } catch (err) {
      console.error("Failed to check serviceability", err);
      // On error, we set it to null so we don't strictly block if API fails
      setServiceability(null);
    } finally {
      setIsCheckingServiceability(false);
    }
  };

  const isCheckoutDisabled =
    !user ||
    cart.length === 0 ||
    !selectedAddressId ||
    isProcessing ||
    !isDeliveryAvailable ||
    isCheckingServiceability ||
    (serviceability && !serviceability.isServiceable) ||
    (paymentMethod === "COD" && serviceability && !serviceability.cod) ||
    (paymentMethod === "COD" && !isCODAvailable);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-[160px] lg:pt-[180px] w-full">
        {/* Breadcrumb / Title */}
        <div className="mb-8 flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-bold">Secure Checkout</span>
        </div>

        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl lg:text-5xl font-serif text-obsidian font-light tracking-wide">Your Bag</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-4">
            {cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-[#FAF9F6] rounded-[2rem] border border-[#800000]/10 p-12 sm:p-20 text-center flex flex-col items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA7A5]/20 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8934E]/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative mb-8 mt-4">
                <div className="absolute inset-0 bg-[#B8934E]/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="w-24 h-24 rounded-full bg-white shadow-xl border border-[#B8934E]/20 flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                  <ShoppingBag className="w-10 h-10 text-[#B8934E]" strokeWidth={1.5} />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D0D18] mb-4 relative z-10">Your Bag is Empty</h2>
              <p className="text-[#5C1A1B]/70 mb-10 max-w-lg text-[15px] sm:text-[16px] leading-relaxed relative z-10 font-medium">
                Curate your unique collection. Explore our exquisite range of jewelry to find your perfect statement piece.
              </p>

              <Link
                to="/shop"
                className="relative z-10 bg-gradient-to-r from-[#5C1A1B] to-[#800000] text-white text-[12px] uppercase tracking-widest font-bold px-10 py-4 rounded-full hover:shadow-[0_15px_30px_rgba(128,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Discover Our Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.product._id || item.product.id}-${item.size || 'default'}`} className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:shadow-sm transition-shadow duration-300">
                    <Link to={`/product/${item.product._id || item.product.id}`} className="shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 aspect-square w-28 sm:w-32 flex items-center justify-center">
                      <img
                        src={getOptimizedImage(item.product)}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply p-2 hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div className="pr-4">
                          <Link to={`/product/${item.product._id || item.product.id}`} className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-2">
                            {item.product.name}
                          </Link>
                          {item.size && (
                            <p className="text-sm text-gray-500 mt-1">
                              Size: <span className="font-medium text-gray-900">{item.size}</span>
                            </p>
                          )}
                        </div>
                        <span className="text-xl font-medium text-gray-900 whitespace-nowrap">
                          {getFormattedPrice(item.price !== undefined ? item.price : item.product.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity((item.product._id || item.product.id), item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity((item.product._id || item.product.id), item.size, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart((item.product._id || item.product.id), item.size)}
                          className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors flex items-center space-x-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Details */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                {addressView === "book" ? (
                  <AddressBook
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelect={(addr) => setSelectedAddressId(addr._id)}
                    onAdd={() => {
                      setAddressToEdit(null);
                      setAddressView("add");
                    }}
                    onEdit={(addr) => {
                      setAddressToEdit(addr);
                      setAddressView("edit");
                    }}
                    onDelete={handleDeleteAddress}
                    onSetDefault={handleSetDefaultAddress}
                  />
                ) : (
                  <AddressForm
                    initialData={addressToEdit}
                    onSave={handleSaveAddress}
                    onCancel={() => {
                      setAddressView("book");
                      setAddressToEdit(null);
                    }}
                  />
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Payment */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 sticky top-28 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-sm font-medium text-gray-500">{cart.length} Items</span>
                </h2>

                <div className="space-y-6 mb-8">
                  {canShowShippingOptions && (
                    <div className="space-y-6">
                      <ShippingMethodSelector
                        country={chosenAddress?.country || "Australia"}
                        orderTotal={cartTotalAUD}
                        selectedMethod={selectedShipping?.id || "standard"}
                        onSelect={(option) => setSelectedShipping(option)}
                      />
                      <PackagingSelector
                        country={chosenAddress?.country || "Australia"}
                        selectedOption={selectedPackaging?.id || "standard"}
                        onSelect={(option) => setSelectedPackaging(option)}
                      />
                    </div>
                  )}

                  {!canShowShippingOptions && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                      Select a delivery address to view shipping and packaging options.
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{getFormattedPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      {selectedShipping ? (
                        selectedShipping.isFree
                          ? "FREE"
                          : formatPrice(displayShippingAmount, currency, rates, currency)
                      ) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Packaging</span>
                    <span className="font-medium text-gray-900">
                      {displayPackagingAmount > 0
                        ? formatPrice(displayPackagingAmount, currency, rates, currency)
                        : "Included"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Taxes</span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>

                  <div className="border-t border-gray-100 pt-5 mt-5">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900 block leading-none">
                          {formatPrice(totalAmountWithExtras, currency, rates, currency)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Including GST</p>
                      </div>
                    </div>
                  </div>
                </div>

                {chosenAddress && !isDeliveryAvailable && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                    Delivery only available to {[isIndiaEnabled && "India", isAustraliaEnabled && "Australia"].filter(Boolean).join(" and ") || "none at this time"}. Selected country: <span className="font-semibold">{chosenAddress.country}</span>
                  </div>
                )}

                {chosenAddress && isDeliveryAvailable && isCheckingServiceability && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 text-sm flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying delivery serviceability...</span>
                  </div>
                )}

                {chosenAddress && isDeliveryAvailable && !isCheckingServiceability && serviceability && !serviceability.isServiceable && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                    Sorry, delivery is currently not available to pincode <span className="font-semibold">{chosenAddress.zipCode}</span>.
                  </div>
                )}

                {chosenAddress && isDeliveryAvailable && !isCheckingServiceability && serviceability && serviceability.isServiceable && paymentMethod === "COD" && !serviceability.cod && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-lg text-orange-600 text-sm">
                    Cash on Delivery is not available for pincode <span className="font-semibold">{chosenAddress.zipCode}</span>. Please choose online payment.
                  </div>
                )}

                {/* Payment Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">

                    <label className={`relative flex items-center p-4 rounded-xl cursor-pointer border transition-all duration-200 ${paymentMethod === "Stripe" ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <input
                        type="radio"
                        value="Stripe"
                        checked={paymentMethod === "Stripe"}
                        onChange={() => setPaymentMethod("Stripe")}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-4 ${paymentMethod === "Stripe" ? "border-gray-900" : "border-gray-300"}`}>
                        {paymentMethod === "Stripe" && <div className="w-2 h-2 rounded-full bg-gray-900"></div>}
                      </div>
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-gray-900">Pay Online (Secure)</span>
                        <span className="block text-xs text-gray-500 mt-0.5">Credit/Debit Cards</span>
                      </div>
                      <CreditCard className={`w-5 h-5 ${paymentMethod === "Stripe" ? "text-gray-900" : "text-gray-400"}`} />
                    </label>

                    {/* COD — India only */}
                    {isCODAvailable && (
                      <label className={`relative flex items-center p-4 rounded-xl cursor-pointer border transition-all duration-200 ${paymentMethod === "COD" ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                        <input
                          type="radio"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-4 ${paymentMethod === "COD" ? "border-gray-900" : "border-gray-300"}`}>
                          {paymentMethod === "COD" && <div className="w-2 h-2 rounded-full bg-gray-900"></div>}
                        </div>
                        <div className="flex-1">
                          <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                          <span className="block text-xs text-gray-500 mt-0.5">Pay at your doorstep · India only</span>
                        </div>
                        <Banknote className={`w-5 h-5 ${paymentMethod === "COD" ? "text-gray-900" : "text-gray-400"}`} />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutDisabled}
                  className="w-full bg-gray-900 text-white rounded-xl font-medium text-sm py-4 hover:bg-black transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed mb-6"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span>{(paymentMethod === "Card" || paymentMethod === "Stripe") ? `Pay ${formatPrice(totalAmountWithExtras, currency, rates, currency)}` : `Place Order`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-gray-100 flex justify-center text-center">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Secure Checkout</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={<div className="h-20 bg-[#050b14]"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
