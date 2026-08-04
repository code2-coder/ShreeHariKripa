import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../api/axios';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    }

    setLoading(true);
    try {
      const response = await api.post('/forgot-password', { email });
      toast.success(response.data?.message || 'Password reset OTP sent to your email!');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-stone-900 tracking-tight">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            Enter your email address and we'll send you a 6-digit verification code to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 sm:text-sm text-stone-900 placeholder-stone-400 bg-stone-50/50"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/10"
            >
              {loading ? 'Sending...' : 'Send Verification OTP'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              Remember your password? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
