import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import api from '../api/axios';
import { toast } from 'sonner';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token || '';
  const email = location.state?.email || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength requirements state
  const [checks, setChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or expired session. Please start again.");
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  // Run password complexity checks on input change
  useEffect(() => {
    setChecks({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);

  // Calculate score/percentage
  const checkCount = Object.values(checks).filter(Boolean).length;
  const strengthPercentage = (checkCount / 5) * 100;
  
  // Get label and color for strength bar
  const getStrengthLabel = () => {
    if (password.length === 0) return { label: '', color: 'bg-stone-200' };
    if (checkCount <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (checkCount <= 4) return { label: 'Medium', color: 'bg-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrengthLabel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return toast.error("Session token is missing. Please start again.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (checkCount < 5) {
      return toast.error("Password does not meet all complexity requirements");
    }

    setLoading(true);
    try {
      await api.post('/reset-password', { token, password, confirmPassword });
      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-stone-900 tracking-tight">
            Create New Password
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            Choose a strong password to secure your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">Account</label>
              <div className="mt-1 px-4 py-3 border border-stone-100 bg-stone-50/60 text-stone-500 rounded-xl sm:text-sm font-medium">
                {email}
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">New Password</label>
              <div className="relative mt-1">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter new password"
                  className="block w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 sm:text-sm text-stone-900 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-stone-400 hover:text-stone-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Strength Bar */}
            {password.length > 0 && (
              <div className="space-y-1.5 px-0.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400 font-medium">Strength:</span>
                  <span className={`font-bold ${
                    strength.label === 'Weak' ? 'text-red-500' :
                    strength.label === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                  }`}>{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${strength.color}`} 
                    style={{ width: `${strengthPercentage}%` }}
                  ></div>
                </div>

                {/* Requirement Checkmarks */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2">
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${checks.length ? 'bg-emerald-500' : 'bg-stone-300'}`}></span>
                    <span className={checks.length ? 'text-stone-700 font-medium' : 'text-stone-400'}>8+ Characters</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${checks.upper ? 'bg-emerald-500' : 'bg-stone-300'}`}></span>
                    <span className={checks.upper ? 'text-stone-700 font-medium' : 'text-stone-400'}>Uppercase Letter</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${checks.lower ? 'bg-emerald-500' : 'bg-stone-300'}`}></span>
                    <span className={checks.lower ? 'text-stone-700 font-medium' : 'text-stone-400'}>Lowercase Letter</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${checks.number ? 'bg-emerald-500' : 'bg-stone-300'}`}></span>
                    <span className={checks.number ? 'text-stone-700 font-medium' : 'text-stone-400'}>At least one number</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${checks.special ? 'bg-emerald-500' : 'bg-stone-300'}`}></span>
                    <span className={checks.special ? 'text-stone-700 font-medium' : 'text-stone-400'}>Special Character</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Confirm New Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm password"
                className="mt-1 block w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 sm:text-sm text-stone-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || checkCount < 5 || password !== confirmPassword}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-600/10"
            >
              {loading ? 'Resetting Password...' : 'Save New Password'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <Link to="/login" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
              Cancel and return to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
