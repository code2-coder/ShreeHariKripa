import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import api from "../api/axios";

export function Orders() {
  const { user } = useAuth();
  const { getFormattedPrice } = useCurrency();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/me/orders");
        // Backend returns "orders" with totalAmount, orderStatus, orderItems
        // We map them to the format expected by the UI
        const ordersList = data.data?.orders || data.orders || [];
        const mappedOrders = ordersList.map(o => ({
          id: o._id,
          createdAt: o.createdAt,
          deliveredAt: o.deliveredAt,
          status: o.orderStatus.toLowerCase(),
          total: o.totalAmount,
          trackingId: o.trackingId,
          trackingUrl: o.trackingUrl,
          awbNumber: o.awbNumber,
          courierName: o.courierName,
          shippingInfo: o.shippingInfo,
          items: o.orderItems.map(item => ({
            id: item._id,
            product: { 
              id: item.product, 
              name: item.name, 
              image: item.image, 
              price: item.price 
            },
            quantity: item.quantity,
            size: item.size,
            returnActive: item.returnActive
          }))
        }));
        setOrders(mappedOrders.reverse());
      } catch (error) {
        console.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    const verifyStripeAndFetch = async () => {
      const sessionId = searchParams.get("session_id");
      const stripeSuccess = searchParams.get("stripe_success");

      if (stripeSuccess === "true" && sessionId) {
        try {
          const orderData = JSON.parse(localStorage.getItem("stripeOrderPayload"));
          if (!orderData) {
             toast.error("Order data not found. Please contact support.");
             return;
          }
          await api.post("/payment/stripe/verify", { sessionId, orderData });
          localStorage.removeItem("stripeOrderPayload");
          clearCart();
          toast.success("Payment successful! Order placed.");
          setSearchParams({});
        } catch (err) {
          toast.error("Error verifying payment");
        }
      }
      
      await fetchOrders();
    };

    verifyStripeAndFetch();
  }, [user, navigate, searchParams, setSearchParams, clearCart]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  const getReturnInfo = (order, item) => {
    if (item.returnActive) {
      return { 
        hasReturn: true, 
        returnId: item.returnActive._id || item.returnActive, 
        status: item.returnActive.status,
        returnType: item.returnActive.returnType,
        refundAmount: item.returnActive.refundAmount,
        eligible: false
      };
    }

    if (order.status !== 'delivered') {
      return { eligible: false, message: "Returns available after delivery", hasReturn: false };
    }
    
    // Calculate eligibility
    const deliveryDate = order.deliveredAt ? new Date(order.deliveredAt) : new Date(order.createdAt);
    if (!order.deliveredAt) {
      deliveryDate.setDate(deliveryDate.getDate() + 3); // Approx delivery if no deliveredAt
    }
    
    const expiryDate = new Date(deliveryDate);
    expiryDate.setDate(expiryDate.getDate() + 7); // 7-day return policy
    
    const now = new Date();
    if (now > expiryDate) {
      return { eligible: false, message: "Return window closed", hasReturn: false };
    }
    
    const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return { eligible: true, message: `${daysLeft} days left to return`, hasReturn: false };
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Decorative luxury gradient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FAF9F6] rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 opacity-80"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#B8934E]/5 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/3 opacity-60"></div>

      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 pt-[160px] lg:pt-[180px] relative z-10 animate-fade-in">
        <div className="mb-12 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif text-[#0B0F19] font-light tracking-wide">My Orders</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-3 flex items-center gap-2 font-sans">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8934E]"></span>
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} In History
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#FAF9F6] rounded-[2rem] border border-[#800000]/10 p-12 sm:p-20 text-center flex flex-col items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDA7A5]/20 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8934E]/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative mb-8 mt-4">
              <div className="absolute inset-0 bg-[#B8934E]/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-24 h-24 rounded-full bg-white shadow-xl border border-[#B8934E]/20 flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                <Package className="w-10 h-10 text-[#B8934E]" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D0D18] mb-4 relative z-10">No Orders Yet</h2>
            <p className="text-[#5C1A1B]/70 mb-10 max-w-lg text-[15px] sm:text-[16px] leading-relaxed relative z-10 font-medium">
              You haven't placed any orders yet. Explore our exquisite range of jewelry to find your perfect statement piece.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="relative z-10 bg-gradient-to-r from-[#5C1A1B] to-[#800000] text-white text-[12px] uppercase tracking-widest font-bold px-10 py-4 rounded-full hover:shadow-[0_15px_30px_rgba(128,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              Discover Our Collection
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              return (
              <div key={order.id} className="bg-white rounded-3xl border border-[#B8934E]/15 shadow-[0_10px_35px_-10px_rgba(184,147,78,0.06)] hover:shadow-[0_15px_45px_-15px_rgba(184,147,78,0.1)] transition-all duration-300 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100 bg-[#FAF9F6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-sans font-bold text-obsidian text-base uppercase tracking-wider">Order {order.id.slice(-8).toUpperCase()}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 border w-fit font-sans ${
                          order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          order.status === 'shipped' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs font-sans font-medium mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 font-sans">Total Amount</p>
                    <p className="font-sans font-black text-obsidian text-xl leading-none">{getFormattedPrice(order.total)}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-[#FAF9F6]/40 border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <h4 className="text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-3 font-sans">
                        Delivery Address
                      </h4>
                      <p className="text-xs text-gray-550 leading-relaxed font-sans font-medium">
                        <span className="font-bold text-obsidian text-sm block mb-1.5">{order.shippingInfo?.fullName || "Not Provided"}</span>
                        {order.shippingInfo?.address}, {order.shippingInfo?.city} <br/>
                        {order.shippingInfo?.country} - {order.shippingInfo?.zipCode} <br/>
                        <span className="mt-2.5 block text-gray-400 font-sans">
                          Phone: <span className="font-bold text-obsidian">{order.shippingInfo?.phoneNo}</span>
                          {order.shippingInfo?.altPhoneNo && <span> | Alt: <span className="font-bold text-obsidian">{order.shippingInfo?.altPhoneNo}</span></span>}
                        </span>
                      </p>
                    </div>
                    
                    {order.trackingId ? (
                      <div className="bg-gradient-to-br from-[#2D0D18] via-[#5C1A1B] to-[#800000] border border-[#B8934E]/25 rounded-2xl p-5 shadow-md flex flex-col justify-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8934E]/10 rounded-full blur-[40px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                        <div className="flex items-center gap-2 mb-3 relative z-10 font-sans">
                          <Truck className="w-4 h-4 text-[#B8934E]" strokeWidth={1.5} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8934E]">Live Tracking</span>
                        </div>
                        <div className="mb-3 space-y-2 relative z-10 font-sans">
                          {order.courierName && (
                            <div>
                              <p className="text-[9px] font-bold text-gray-350 uppercase tracking-wider mb-0.5">Courier Provider</p>
                              <p className="text-white font-semibold text-sm">{order.courierName}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-[9px] font-bold text-gray-350 uppercase tracking-wider mb-0.5">Tracking Number</p>
                            <p className="text-white font-mono font-black text-base">{order.trackingId}</p>
                          </div>
                          {order.awbNumber && (
                            <div>
                              <p className="text-[9px] font-bold text-gray-350 uppercase tracking-wider mb-0.5">AWB Number</p>
                              <p className="text-white font-mono font-medium text-xs">{order.awbNumber}</p>
                            </div>
                          )}
                        </div>
                        {order.trackingUrl ? (
                          <button 
                            onClick={() => window.open(order.trackingUrl, '_blank')}
                            className="relative overflow-hidden flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 mt-1 cursor-pointer z-10 group/track"
                          >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/track:animate-shine"></span>
                            <Truck className="w-4 h-4" />
                            <span>Track Package</span>
                          </button>
                        ) : (
                          <p className="text-[10px] text-gray-350 mt-1 relative z-10 font-sans font-medium">Use the tracking number on your courier's website.</p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-55/40 border border-gray-100 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
                         <Clock className="w-5 h-5 text-gray-400 mb-2 animate-pulse" />
                         <p className="text-xs text-gray-500 font-sans font-semibold max-w-[250px] leading-relaxed">Tracking information will be available once your order ships.</p>
                      </div>
                    )}
                  </div>

                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2 font-sans">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => {
                      const returnInfo = getReturnInfo(order, item);
                      return (
                      <div
                        key={`${item.product.id}-${idx}`}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl border border-gray-100 hover:border-[#B8934E]/25 hover:bg-[#FAF9F6]/25 transition-all duration-300 group/item"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF9F6] border border-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 group-hover/item:border-[#B8934E]/10 transition-colors shadow-sm">
                          <img
                            src={item.product.image || "https://placehold.co/200x200?text=No+Image"}
                            alt={item.product.name}
                            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-[#0B0F19] text-base leading-snug hover:text-[#800000] transition-colors">{item.product.name}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-450 mb-3 font-sans font-medium">
                            {item.size && (
                              <span>Size: <span className="font-semibold text-obsidian bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-[10px]">{item.size}</span></span>
                            )}
                            <span>Qty: <span className="font-semibold text-obsidian">{item.quantity}</span></span>
                          </div>
                          
                          {/* RETURN UI INLINE WITH PRODUCT */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {returnInfo.hasReturn ? (
                              <>
                                <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border font-sans ${
                                  returnInfo.status === 'Refund Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                  returnInfo.status === 'Replacement Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  returnInfo.status === 'Exchange Completed' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                                  returnInfo.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                  'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                  {returnInfo.status} ({returnInfo.returnType})
                                </span>
                                
                                {returnInfo.status === 'Refund Completed' && returnInfo.refundAmount > 0 && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-200 font-sans">
                                    Refunded: {getFormattedPrice(returnInfo.refundAmount)}
                                  </span>
                                )}

                                <span className="text-[10px] font-bold text-gray-400 font-mono">
                                  ID: {returnInfo.returnId.slice(-6).toUpperCase()}
                                </span>

                                <button 
                                  onClick={() => navigate(`/account/returns/${returnInfo.returnId}`)}
                                  className="ml-auto sm:ml-0 text-[10px] font-bold uppercase tracking-wider text-[#800000] hover:text-[#5C1A1B] underline underline-offset-2 transition-colors cursor-pointer font-sans"
                                >
                                  View Details
                                </button>
                              </>
                            ) : returnInfo.eligible ? (
                              <>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 font-sans">{returnInfo.message}</span>
                                <button 
                                  onClick={() => navigate(`/orders/${order.id}/return?item=${item.id}`)}
                                  className="ml-auto sm:ml-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#5C1A1B] to-[#800000] border border-[#B8934E]/25 hover:shadow-md transition-all rounded-lg cursor-pointer font-sans"
                                >
                                  Request Return
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md font-sans">
                                {returnInfo.message}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-left sm:text-right shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 flex sm:block justify-between items-center">
                          <p className="text-xs text-gray-400 sm:mt-1 block sm:hidden font-sans font-medium">
                            {getFormattedPrice(item.product.price)} × {item.quantity}
                          </p>
                          <div>
                             <p className="font-sans font-bold text-obsidian text-right text-[15px]">
                               {getFormattedPrice(item.product.price * item.quantity)}
                             </p>
                             <p className="text-[10px] text-gray-400 mt-1.5 hidden sm:block text-right font-sans font-semibold uppercase tracking-wider">
                               {getFormattedPrice(item.product.price)} each
                             </p>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>

                </div>
              </div>
            )})}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
