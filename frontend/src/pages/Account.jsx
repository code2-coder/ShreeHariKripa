import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { 
   User, Mail, Shield, Package, ShoppingCart, 
   Edit3, Save, X, Phone, MapPin, LogOut, 
   ChevronRight, Camera, Map, RotateCcw
} from "lucide-react";
import { toast } from "sonner";
import api from "../api/axios";
import { useSEO } from "../hooks/useSEO";

export function Account() {
   const { user, logout, setUser } = useAuth();
   const navigate = useNavigate();
   useSEO("Account Center", "Manage your customer details, shipping addresses, or review your order history.");

   const [isEditing, setIsEditing] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [profileForm, setProfileForm] = useState({
      name: "", email: "", phoneNumber: "", altPhoneNumber: "", street: "", landmark: "", city: "", state: "", pinCode: ""
   });

   useEffect(() => {
      if (!user) {
         navigate("/login");
      } else {
         resetForm();
      }
   }, [user, navigate]);

   const resetForm = () => {
      setProfileForm({
         name: user?.name || "",
         email: user?.email || "",
         phoneNumber: user?.phoneNumber || "",
         altPhoneNumber: user?.altPhoneNumber || "",
         street: (user?.address && typeof user.address === 'object') ? (user.address.street || "") : (user?.address || ""),
         landmark: (user?.address && typeof user.address === 'object') ? (user.address.landmark || "") : "",
         city: (user?.address && typeof user.address === 'object') ? (user.address.city || "") : "",
         state: (user?.address && typeof user.address === 'object') ? (user.address.state || "") : "",
         pinCode: (user?.address && typeof user.address === 'object') ? (user.address.pinCode || "") : ""
      });
   };

   if (!user) return null;

   const handleUpdateProfile = async () => {
      if (!profileForm.name || !profileForm.email) return toast.error("Name and Email cannot be empty.");
      if (profileForm.phoneNumber && profileForm.phoneNumber.length > 15) return toast.error("Primary phone number cannot exceed 15 characters.");
      if (profileForm.altPhoneNumber && profileForm.altPhoneNumber.length > 15) return toast.error("Alternate phone number cannot exceed 15 characters.");
      if (profileForm.pinCode && !/^\d{3,10}$/.test(profileForm.pinCode)) return toast.error("Pin code should be numeric and 3-10 digits.");
      
      try {
         setIsSaving(true);
         const payload = {
            ...profileForm,
            address: {
               street: profileForm.street,
               landmark: profileForm.landmark,
               city: profileForm.city,
               state: profileForm.state,
               pinCode: profileForm.pinCode
            }
         };
         const { data } = await api.put("/me/update", payload);
         setUser(data.user);
         toast.success("Profile updated successfully!");
         setIsEditing(false);
      } catch (error) {
         toast.error(error.response?.data?.message || "Failed to update profile");
      } finally {
         setIsSaving(false);
      }
   };

   // Helper for Input Field with Premium Styling
   const InputField = ({ label, icon: Icon, value, onChange, placeholder, type = "text" }) => (
      <div className="flex flex-col gap-2">
         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
         <div className="relative group">
            {Icon && (
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B8934E] transition-colors duration-300">
                  <Icon className="w-4 h-4" />
               </div>
            )}
            <input 
               type={type}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               className={`w-full bg-white/50 border border-gray-200/80 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-[#B8934E]/5 focus:border-[#B8934E] hover:border-gray-300 shadow-sm font-medium ${Icon ? 'pl-11' : ''}`}
            />
         </div>
      </div>
   );

   // Helper for Display Field with Premium Styling
   const DisplayField = ({ label, icon: Icon, value }) => (
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9F6]/30 border border-[#B8934E]/5 hover:border-[#B8934E]/20 hover:bg-[#FAF9F6]/80 hover:shadow-sm transition-all duration-500 group">
         <div className="p-3 bg-white text-[#B8934E] rounded-xl shadow-[0_4px_10px_rgba(184,147,78,0.08)] border border-gray-100/60 group-hover:scale-105 transition-all duration-500">
            <Icon className="w-4 h-4" />
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-[9px] font-extrabold tracking-[0.18em] text-gray-400 uppercase mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{value || <span className="text-gray-300 font-normal italic">Not provided</span>}</p>
         </div>
      </div>
   );

   const navItems = [
      { id: "profile", label: "My Profile", icon: User, active: true, desc: "Personal settings" },
      { id: "orders", label: "My Orders", icon: Package, onClick: () => navigate("/orders"), desc: "View & track orders" },
      { id: "returns", label: "My Returns", icon: RotateCcw, onClick: () => navigate("/account/returns"), desc: "View return requests" },
      { id: "cart", label: "Shopping Cart", icon: ShoppingCart, onClick: () => navigate("/cart"), desc: "Checkout items" },
      ...(user.role === "admin" ? [{ id: "admin", label: "Admin Panel", icon: Shield, onClick: () => navigate("/admin"), desc: "Store management" }] : [])
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#FAF9F6] to-[#E8D5DA]/15 flex flex-col font-sans relative">
         {/* Decorative background blurs */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#B8934E]/5 blur-[120px]"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#800000]/5 blur-[150px]"></div>
         </div>

         <Header />

         <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 pt-[160px] lg:pt-[180px] relative z-10">
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Sidebar Navigation */}
               <div className="lg:w-80 flex-shrink-0 flex flex-col gap-6">
                  {/* User Card */}
                  <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.04)] border border-white/80 flex flex-col items-center text-center relative overflow-hidden group">
                     <div className="relative mb-5">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#B8934E] via-[#E8D0A5] to-[#B8934E] p-0.5 shadow-lg relative group/avatar">
                           <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center overflow-hidden relative">
                              <span className="text-4xl font-serif italic text-[#E8D0A5] select-none">
                                 {user.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                 <Camera className="w-6 h-6 text-white" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <h2 className="text-xl font-bold text-[#2D0D18]">{user.name}</h2>
                     <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                     
                     <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B8934E]/10 text-[#B8934E] text-[10px] font-bold uppercase tracking-widest border border-[#B8934E]/15">
                        <Shield className="w-3.5 h-3.5" strokeWidth={2.5} /> {user.role}
                     </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="bg-white/70 backdrop-blur-md p-4 rounded-3xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.04)] border border-white/80 flex flex-col gap-2">
                     {navItems.map((item) => (
                        <button 
                           key={item.id}
                           onClick={item.onClick}
                           className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all duration-305 group ${item.active ? 'bg-gradient-to-r from-[#800000] to-[#5C0000] text-white shadow-lg shadow-[#800000]/15' : 'hover:bg-[#FAF9F6]/80 text-gray-700'}`}
                        >
                           <div className={`p-2 rounded-xl transition-all duration-300 ${item.active ? 'bg-[#9A1C1C]/40 text-[#FAF9F6] border border-[#B8934E]/25' : 'bg-white text-gray-500 shadow-sm border border-gray-100 group-hover:text-[#800000] group-hover:border-[#B8934E]/30 group-hover:shadow-sm'}`}>
                              <item.icon className="w-4.5 h-4.5" strokeWidth={item.active ? 2.5 : 2} />
                           </div>
                           <div className="flex-1 text-left">
                              <p className={`font-bold text-[13.5px] ${item.active ? 'text-white' : 'text-[#2D0D18] group-hover:text-[#800000] transition-colors'}`}>{item.label}</p>
                              <p className={`text-[11px] mt-0.5 ${item.active ? 'text-pink-100/70' : 'text-gray-400'}`}>{item.desc}</p>
                           </div>
                           {!item.active && <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#800000] transition-all group-hover:translate-x-1" />}
                        </button>
                     ))}

                     <div className="h-px bg-gray-100 my-2 mx-2"></div>
                     
                     <button 
                        onClick={logout}
                        className="flex items-center gap-4 w-full p-3 rounded-2xl transition-all duration-300 hover:bg-red-50/50 group"
                     >
                        <div className="p-2 rounded-xl bg-white text-red-500 shadow-sm border border-red-100 group-hover:bg-red-100 transition-colors">
                           <LogOut className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 text-left">
                           <p className="font-bold text-[13.5px] text-red-600 group-hover:text-red-700">Sign Out</p>
                           <p className="text-[11px] mt-0.5 text-red-400">End your session</p>
                        </div>
                     </button>
                  </div>
               </div>

               {/* Main Content Area */}
               <div className="flex-1 flex flex-col">
                  <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.05)] border border-white/80 overflow-hidden flex-1 relative">
                     
                     {/* Header */}
                     <div className="px-6 sm:px-10 py-8 border-b border-gray-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                           <h1 className="text-2xl font-serif text-[#2D0D18] tracking-wide">Profile Settings</h1>
                           <p className="text-sm text-gray-500 mt-1">Manage your personal information and delivery addresses.</p>
                        </div>
                        
                        {!isEditing ? (
                           <button 
                              onClick={() => setIsEditing(true)} 
                              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#800000] hover:bg-[#6C0000] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-[#800000]/10"
                           >
                              <Edit3 className="w-4 h-4" /> Edit Profile
                           </button>
                        ) : (
                           <div className="flex items-center gap-3">
                              <button 
                                 onClick={() => { setIsEditing(false); resetForm(); }} 
                                 className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300"
                              >
                                 <X className="w-4 h-4" /> Cancel
                              </button>
                              <button 
                                 onClick={handleUpdateProfile}
                                 disabled={isSaving}
                                 className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#800000] hover:bg-[#6C0000] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                 {isSaving ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 ) : (
                                    <><Save className="w-4 h-4" /> Save Changes</>
                                 )}
                              </button>
                           </div>
                        )}
                     </div>

                     {/* Content Body */}
                     <div className="p-6 sm:px-10 sm:py-10 animate-in fade-in duration-500">
                        {isEditing ? (
                           <div className="space-y-10">
                              {/* Form Section 1 */}
                              <div>
                                 <h3 className="text-sm font-bold text-[#2D0D18] mb-6 flex items-center gap-2 uppercase tracking-widest text-[11px]">
                                    <User className="w-4.5 h-4.5 text-[#B8934E]" /> Personal Information
                                 </h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                    <InputField label="Full Name" icon={User} value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="John Doe" />
                                    <InputField label="Email Address" icon={Mail} value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} placeholder="john@example.com" type="email" />
                                    <InputField label="Primary Phone" icon={Phone} value={profileForm.phoneNumber} onChange={e => setProfileForm({ ...profileForm, phoneNumber: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                                    <InputField label="Alternate Phone" icon={Phone} value={profileForm.altPhoneNumber} onChange={e => setProfileForm({ ...profileForm, altPhoneNumber: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                                 </div>
                              </div>

                              <div className="h-px w-full bg-gray-100"></div>

                              {/* Form Section 2 */}
                              <div>
                                 <h3 className="text-sm font-bold text-[#2D0D18] mb-6 flex items-center gap-2 uppercase tracking-widest text-[11px]">
                                    <MapPin className="w-4.5 h-4.5 text-[#B8934E]" /> Default Shipping Address
                                 </h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                    <div className="md:col-span-2">
                                       <InputField label="Street Address" icon={Map} value={profileForm.street} onChange={e => setProfileForm({ ...profileForm, street: e.target.value })} placeholder="123 Main St, Apt 4B" />
                                    </div>
                                    <InputField label="Landmark" icon={MapPin} value={profileForm.landmark} onChange={e => setProfileForm({ ...profileForm, landmark: e.target.value })} placeholder="Near Central Park" />
                                    <InputField label="City" icon={MapPin} value={profileForm.city} onChange={e => setProfileForm({ ...profileForm, city: e.target.value })} placeholder="New York" />
                                    <InputField label="State" icon={MapPin} value={profileForm.state} onChange={e => setProfileForm({ ...profileForm, state: e.target.value })} placeholder="NY" />
                                    <InputField label="Pin / Zip Code" icon={MapPin} value={profileForm.pinCode} onChange={e => setProfileForm({ ...profileForm, pinCode: e.target.value })} placeholder="10001" />
                                 </div>
                              </div>
                           </div>
                        ) : (
                           <div className="space-y-10">
                              {/* View Section 1 */}
                              <div>
                                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D0D18] mb-6 border-b border-[#B8934E]/10 pb-2">
                                    Basic Information
                                 </h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DisplayField label="Full Name" icon={User} value={profileForm.name} />
                                    <DisplayField label="Email Address" icon={Mail} value={profileForm.email} />
                                    <DisplayField label="Primary Phone" icon={Phone} value={profileForm.phoneNumber} />
                                    <DisplayField label="Alternate Phone" icon={Phone} value={profileForm.altPhoneNumber} />
                                 </div>
                              </div>

                              {/* View Section 2 */}
                              <div>
                                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D0D18] mb-6 border-b border-[#B8934E]/10 pb-2">
                                    Shipping Address
                                 </h3>
                                 <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6]/30 border border-[#B8934E]/5 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8934E]/5 rounded-full blur-3xl group-hover:bg-[#B8934E]/10 transition-colors duration-500 -mr-16 -mt-16 pointer-events-none"></div>
                                    {(profileForm.street || profileForm.city || profileForm.state || profileForm.pinCode || profileForm.landmark) ? (
                                       <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                                          <div className="w-12 h-12 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center border border-gray-100 shrink-0 text-[#B8934E]">
                                             <MapPin className="w-5 h-5" />
                                          </div>
                                          <div>
                                             <p className="font-bold text-[#2D0D18] text-base mb-1.5">{profileForm.name}</p>
                                             <p className="text-gray-600 text-sm leading-relaxed max-w-md font-medium">
                                                {profileForm.street && <>{profileForm.street}<br/></>}
                                                {profileForm.landmark && <><span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Landmark:</span> {profileForm.landmark}<br/></>}
                                                <span className="text-gray-800">{[profileForm.city, profileForm.state, profileForm.pinCode].filter(Boolean).join(", ")}</span>
                                             </p>
                                          </div>
                                       </div>
                                    ) : (
                                       <div className="relative z-10 text-center py-8">
                                          <div className="w-16 h-16 mx-auto bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-[#B8934E] mb-4">
                                             <Map className="w-7 h-7" />
                                          </div>
                                          <p className="text-[#2D0D18] font-bold mb-1">No default shipping address found</p>
                                          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Add your shipping details for a faster, one-click checkout experience.</p>
                                          <button 
                                             onClick={() => setIsEditing(true)} 
                                             className="px-6 py-2.5 bg-white border border-[#B8934E]/20 text-[#B8934E] hover:bg-[#FAF9F6] hover:border-[#B8934E] hover:shadow-md shadow-sm rounded-xl text-sm font-semibold transition-all duration-300"
                                          >
                                             Add Address
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               
            </div>
         </main>

         <Footer />
      </div>
   );
}
