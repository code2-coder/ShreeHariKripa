import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import api from '../api/axios';
import { toast } from 'sonner';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60s cooldown for resend
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  // Focus first input on load
  useEffect(() => {
    if (!email) {
      toast.error("Please enter your email to proceed");
      navigate('/forgot-password');
      return;
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [email, navigate]);

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle value change
  const handleChange = (index, value) => {
    // Only allow numeric input
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get only the last character typed
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Focus previous input and clear it
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      return toast.error("Please enter the complete 6-digit verification code");
    }

    setLoading(true);
    try {
      const response = await api.post('/verify-otp', { email, otp: otpCode });
      toast.success(response.data?.message || 'OTP verified successfully!');
      
      const token = response.data?.token;
      setTimeout(() => {
        navigate('/reset-password', { state: { email, token } });
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      await api.post('/resend-otp', { email });
      toast.success('A new verification code has been sent to your email!');
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      setCanResend(false);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-stone-900 tracking-tight font-sans">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-stone-500">
            We sent a 6-digit verification code to <span className="font-semibold text-stone-700">{email}</span>.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="flex justify-center space-x-2 sm:space-x-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-stone-50/50 text-stone-800 transition-all font-mono"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-sm px-1">
            <span className="text-stone-400 font-medium">
              {!canResend ? `Resend code in ${timer}s` : 'Did not receive code?'}
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || loading}
              className={`font-semibold transition-colors focus:outline-none ${
                canResend 
                  ? 'text-indigo-600 hover:text-indigo-700 active:text-indigo-800' 
                  : 'text-stone-300 cursor-not-allowed'
              }`}
            >
              Resend OTP
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/10"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/forgot-password" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
              Back to forgot password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
