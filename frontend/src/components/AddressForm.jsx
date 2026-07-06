import React, { useState, useEffect } from 'react';
import { MapPin, Save, X, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import api from '../api/axios';
import { State, City } from 'country-state-city';

export const AddressForm = ({ initialData, onSave, onCancel }) => {
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
      country: 'India',
      isDefault: false,
    }
  );

  const getCountryCode = (countryName) => {
    if (countryName === 'Australia') return 'AU';
    return 'IN'; // default to India
  };

  const [countryCode, setCountryCode] = useState(getCountryCode(initialData?.country || 'India'));
  const [stateCode, setStateCode] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isIndiaAddress && serviceability && !serviceability.isServiceable) {
      toast.error("Please enter a serviceable pincode.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-3 text-gray-400" />
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Address Label
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
              placeholder="Home, Office..."
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mobile Number *
            </label>
            <input
              type="text"
              name="phoneNo"
              required
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
              placeholder="+1234567890"
            />
          </div>

          {/* Alt Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alternate Number
            </label>
            <input
              type="text"
              name="altPhoneNo"
              value={formData.altPhoneNo}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
              placeholder="Secondary contact"
            />
          </div>

          {/* Address Line */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
              placeholder="Flat, House no., Building, Apartment"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Country *
            </label>
            <select
              name="country"
              required
              value={countryCode}
              onChange={handleCountryChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm cursor-pointer"
            >
              <option value="IN">India</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              State / Province *
            </label>
            <select
              name="state"
              required
              value={stateCode}
              onChange={handleStateChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              City *
            </label>
            <select
              name="city"
              required
              value={formData.city}
              onChange={handleCityChange}
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ZIP / Postal Code *
            </label>
            <input
              type="text"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              maxLength={isIndiaAddress ? 6 : 4}
              className={`w-full bg-white border px-4 py-3 rounded-lg outline-none transition-all text-sm ${serviceability && !serviceability.isServiceable
                ? 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900'
                }`}
              placeholder={isIndiaAddress ? "6-digit Pincode" : "Postal Code"}
            />
            {/* Serviceability Feedback */}
            <div className="mt-2 h-4">
              {isChecking && (
                <div className="flex items-center text-xs text-blue-600">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Verifying pincode...
                </div>
              )}
              {!isChecking && serviceability && serviceability.isServiceable && (
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Delivery available to this pincode
                </div>
              )}
              {!isChecking && serviceability && !serviceability.isServiceable && (
                <div className="flex items-center text-xs text-red-600">
                  <XCircle className="w-3 h-3 mr-1" />
                  Delivery not available for this pincode
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Set as Default Checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer group mt-6 pt-2">
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.isDefault
              ? 'bg-gray-900 border-gray-900'
              : 'bg-white border-gray-300 group-hover:border-gray-400'
              }`}
          >
            {formData.isDefault && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
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
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Set as default address</span>
        </label>

        <div className="pt-6 flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium text-sm py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={serviceability && !serviceability.isServiceable}
            className="flex-[2] bg-gray-900 hover:bg-black text-white font-medium text-sm py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>Save Address</span>
          </button>
        </div>
      </form>
    </div>
  );
};
