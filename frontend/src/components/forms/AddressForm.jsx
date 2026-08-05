import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Save, X, Loader2, CheckCircle2, XCircle, Smartphone, Lock } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../api/axios';
import { State, City } from 'country-state-city';

export const AddressForm = ({ initialData, defaultCountry = 'India', onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: 'Home',
      fullName: '',
      phoneNo: '',
      altPhoneNo: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: defaultCountry,
      isDefault: false,
    }
  );

  const getCountryCode = (countryName) => {
    if (countryName === 'Australia') return 'AU';
    return 'IN'; // default to India
  };

  const [countryCode, setCountryCode] = useState(getCountryCode(initialData?.country || defaultCountry));
  const [stateCode, setStateCode] = useState('');

  // OTP Verification States
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (showOtpVerify && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtpVerify, timer]);

  useEffect(() => {
    if (initialData && initialData.state) {
      const states = State.getStatesOfCountry(countryCode);
      const foundState = states.find(s => s.name === initialData.state);
      if (foundState) {
        setStateCode(foundState.isoCode);
      }
    }
  }, [initialData, countryCode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setCountryCode(code);
    const countryName = code === 'IN' ? 'India' : 'Australia';

    setFormData(prev => ({
      ...prev,
      country: countryName,
      state: '',
      city: ''
    }));
    setStateCode('');
  };

  const handleStateChange = (e) => {
    const code = e.target.value;
    setStateCode(code);

    const states = State.getStatesOfCountry(countryCode);
    const stateName = states.find(s => s.isoCode === code)?.name || '';

    setFormData(prev => ({
      ...prev,
      state: stateName,
      city: ''
    }));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setFormData(prev => ({
      ...prev,
      city: cityName
    }));
  };

  const [serviceability, setServiceability] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const isIndiaAddress = formData.country === 'India';

  useEffect(() => {
    const checkPincode = async () => {
      if (isIndiaAddress && formData.zipCode && formData.zipCode.length === 6) {
        setIsChecking(true);
        try {
          const { data } = await api.get(`/delhivery/serviceability/${formData.zipCode}`);
          setServiceability(data.data);
        } catch (err) {
          console.error("Failed to check pincode", err);
          setServiceability(null);
        } finally {
          setIsChecking(false);
        }
      } else {
        setServiceability(null);
      }
    };

    // Add a small debounce
    const timeoutId = setTimeout(() => {
      checkPincode();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.zipCode, isIndiaAddress]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const pasteOtp = pasteData.split('');
      setOtp(pasteOtp);
      otpRefs.current[5]?.focus();
    }
  };

  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    try {
      await api.post("/me/addresses/send-email-otp", {});
      toast.success("Verification code sent to your email address");
      setShowOtpVerify(true);
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send verification code. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    try {
      await api.post("/me/addresses/send-email-otp", {});
      toast.success("Verification code resent successfully!");
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification code.");
    }
  };

  const handleVerifyAndSave = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP code.");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      await api.post("/me/addresses/verify-email-otp", { otp: otpCode });
      toast.success("Verification successful!");
      onSave(formData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isIndiaAddress && serviceability && !serviceability.isServiceable) {
      toast.error("Please enter a serviceable pincode.");
      return;
    }
    handleSendOtp();
  };

  if (showOtpVerify) {
    return (
      <div className="bg-white rounded-3xl border border-neutral-200/60 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 animate-fade-in">
        <div className="flex justify-between items-center mb-6 border-b border-neutral-150 pb-4">
          <h2 className="text-sm font-sans font-bold text-neutral-800 uppercase tracking-wider flex items-center">
            <Smartphone className="w-5 h-5 mr-3 text-[#B8934E]" strokeWidth={1.5} />
            Verify Email Address
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-2 text-neutral-400 hover:text-[#B8934E] bg-white hover:bg-neutral-50 rounded-full border border-neutral-150 transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center text-center space-y-6 font-sans">
          <div className="relative flex items-center justify-center w-16 h-16 bg-[#800000]/5 rounded-full border border-[#B8934E]/25 animate-pulse">
            <Lock className="w-6 h-6 text-[#800000]" strokeWidth={1.5} />
          </div>

          <div className="space-y-2 max-w-md">
            <p className="text-sm text-neutral-500 font-sans leading-relaxed font-medium">
              We have sent a 6-digit verification code to your registered email address
            </p>
            <p className="text-xs text-neutral-400 font-semibold italic">
              (Please enter the code to confirm and save your address)
            </p>
          </div>

          <form onSubmit={handleVerifyAndSave} className="w-full max-w-md space-y-8">
            <div className="flex justify-center gap-2 sm:gap-3.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  onPaste={handleOtpPaste}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold bg-[#FCFAF8] border border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-neutral-900"
                />
              ))}
            </div>

            <div className="flex flex-col items-center justify-center space-y-3.5">
              {timer > 0 ? (
                <p className="text-xs text-neutral-400 font-bold font-sans">
                  Resend code in <span className="font-semibold text-neutral-700">{timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-xs font-bold uppercase tracking-wider text-[#800000] hover:text-[#5C1A1B] transition-colors decoration-dotted hover:underline cursor-pointer font-sans"
                >
                  Resend Verification Code
                </button>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setShowOtpVerify(false)}
                className="flex-1 bg-white border border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-xs py-4 rounded-xl hover:bg-[#FCFAF8] hover:border-neutral-300 transition-all duration-300 cursor-pointer font-sans"
              >
                Back to Edit
              </button>
              <button
                type="submit"
                disabled={isVerifyingOtp}
                className="flex-[2] bg-gradient-to-r from-[#5C1A1B] to-[#800000] text-white border border-[#B8934E]/20 font-bold uppercase tracking-widest text-[11px] py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-400 disabled:border-neutral-250 disabled:cursor-not-allowed cursor-pointer font-sans"
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Verify & Save Address</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/60 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-6 border-b border-neutral-150 pb-4">
        <h2 className="text-sm font-sans font-bold text-neutral-805 uppercase tracking-wider flex items-center">
          <MapPin className="w-4 h-4 mr-2.5 text-[#B8934E]" strokeWidth={2} />
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-neutral-400 hover:text-[#B8934E] bg-white hover:bg-neutral-50 rounded-full border border-neutral-150 transition-colors shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800"
              placeholder="John Doe"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Address Label
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800"
              placeholder="Home, Office..."
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Mobile Number *
            </label>
            <input
              type="text"
              name="phoneNo"
              required
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800"
              placeholder="+1234567890"
            />
          </div>

          {/* Alt Phone Number */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Alternate Number
            </label>
            <input
              type="text"
              name="altPhoneNo"
              value={formData.altPhoneNo}
              onChange={handleChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800"
              placeholder="Secondary contact"
            />
          </div>

          {/* Address Line */}
          <div className="sm:col-span-2">
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800"
              placeholder="Flat, House no., Building, Apartment"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              Country *
            </label>
            <select
              name="country"
              required
              value={countryCode}
              onChange={handleCountryChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold font-sans text-neutral-800 cursor-pointer"
            >
              <option value="IN font-sans">India</option>
              <option value="AU font-sans">Australia</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              State / Province *
            </label>
            <select
              name="state"
              required
              value={stateCode}
              onChange={handleStateChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold font-sans text-neutral-800 cursor-pointer disabled:bg-neutral-50 disabled:text-neutral-400"
              disabled={!countryCode}
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(countryCode).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              City *
            </label>
            <select
              name="city"
              required
              value={formData.city}
              onChange={handleCityChange}
              className="w-full bg-[#FCFAF8] border border-neutral-200 hover:border-neutral-350 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white outline-none transition-all duration-300 text-xs font-semibold font-sans text-neutral-800 cursor-pointer disabled:bg-neutral-50 disabled:text-neutral-400"
              disabled={!stateCode}
            >
              <option value="">Select City</option>
              {City.getCitiesOfState(countryCode, stateCode).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-[9px] font-bold text-neutral-450 uppercase tracking-wider mb-1.5 font-sans">
              ZIP / Postal Code *
            </label>
            <input
              type="text"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              maxLength={isIndiaAddress ? 6 : 4}
              className={`w-full bg-[#FCFAF8] border px-4 py-3 rounded-xl outline-none transition-all duration-300 text-xs font-semibold placeholder:text-neutral-350 font-sans text-neutral-800 ${
                serviceability && !serviceability.isServiceable
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white'
                  : 'border-neutral-200 hover:border-neutral-350 focus:ring-2 focus:ring-[#B8934E]/15 focus:border-[#B8934E] focus:bg-white'
              }`}
              placeholder={isIndiaAddress ? "6-digit Pincode" : "Postal Code"}
            />
            {/* Serviceability Feedback */}
            <div className="mt-2 h-4">
              {isChecking && (
                <div className="flex items-center text-[10px] text-blue-600 font-sans font-bold uppercase tracking-wider animate-pulse">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin text-blue-600" />
                  Verifying pincode...
                </div>
              )}
              {!isChecking && serviceability && serviceability.isServiceable && (
                <div className="flex items-center text-[10px] text-emerald-700 font-sans font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                  Delivery available
                </div>
              )}
              {!isChecking && serviceability && !serviceability.isServiceable && (
                <div className="flex items-center text-[10px] text-red-650 font-sans font-bold uppercase tracking-wider">
                  <XCircle className="w-3 h-3 mr-1 text-red-500" />
                  Delivery not available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Set as Default Checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer group mt-6 pt-2 select-none">
          <div
            className={`w-4.5 h-4.5 rounded-lg border flex items-center justify-center transition-all duration-300 ${formData.isDefault
              ? 'bg-[#800000] border-[#800000] shadow-sm'
              : 'bg-white border-neutral-300 group-hover:border-[#B8934E]'
              }`}
          >
            {formData.isDefault && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            name="isDefault"
            className="hidden"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-450 group-hover:text-neutral-800 transition-colors font-sans">Set as default address</span>
        </label>

        <div className="pt-6 flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-white border border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider text-xs py-4 rounded-xl hover:bg-[#FCFAF8] hover:border-neutral-300 hover:text-neutral-800 transition-all duration-300 cursor-pointer font-sans"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={(serviceability && !serviceability.isServiceable) || isSendingOtp}
            className="flex-[2] bg-gradient-to-r from-[#5C1A1B] to-[#800000] text-white border border-[#B8934E]/20 font-bold uppercase tracking-widest text-[11px] py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed disabled:shadow-none disabled:-translate-y-0 cursor-pointer font-sans"
          >
            {isSendingOtp ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Sending Code...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Address</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
