import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import api from '../api/axios';
import { toast } from 'sonner';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  useSEO("Verify Email", "Enter the OTP sent to your email to verify your Shreeharikripa account.");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to retrieve email from location state (passed from Register page)
  const initialEmail = location.state?.email || '';
  
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60); // 60s cooldown for resend
  
  const inputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP digit changes
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key press
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (pastedData.length === 6 && !isNaN(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const isVerifying = useRef(false);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    
    if (isVerifying.current) return;
    
    if (!email) {
      return toast.error("Please enter your email address");
    }
    
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    setLoading(true);
    isVerifying.current = true;
    try {
      const response = await api.post('/verify-email', { email, otp: otpValue });
      toast.success(response.data.message || 'Email verified successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed. Please try again.');
      isVerifying.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      return toast.error("Please enter your email address to resend OTP");
    }

    setResending(true);
    try {
      await api.post('/resend-verification', { email });
      toast.success('A new verification code has been sent to your email.');
      setTimer(60); // Reset timer
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    if (otp.every(digit => digit !== '') && email) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 selection:bg-stone-200 selection:text-stone-900">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-stone-100">
        
        {/* Back Link */}
        <div className="flex justify-between items-center">
          <Link to="/register" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Register
          </Link>
          <div className="bg-stone-100 p-2 rounded-xl">
            <img src="/logo_jew.png" alt="Shreeharikripa Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-stone-100 mb-4">
            <ShieldCheck className="h-6 w-6 text-stone-900" />
          </div>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight mb-2">
            Verify Your Email
          </h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            {email 
              ? `We have sent a 6-digit verification code to ${email}`
              : "Please enter your email and the verification code sent to your inbox."
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          
          {/* Email input field if not automatically provided in state */}
          {!initialEmail && (
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-stone-900 transition-colors"
                placeholder="Enter your email address"
              />
            </div>
          )}

          {/* OTP inputs */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-stone-700 text-center">Verification Code</label>
            <div className="flex justify-between gap-2 max-w-xs mx-auto" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  ref={(el) => (inputRefs.current[idx] = el)}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-stone-900 focus:bg-white transition-all outline-none"
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full bg-stone-900 text-white py-3.5 rounded-lg hover:bg-stone-800 transition-all font-medium tracking-wide flex justify-center items-center disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                "Verify Code"
              )}
            </button>

            {/* Resend Action */}
            <div className="text-center text-sm">
              <span className="text-stone-500">Didn't receive the code? </span>
              {timer > 0 ? (
                <span className="text-stone-400 font-medium">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="font-medium text-stone-900 hover:text-stone-700 underline focus:outline-none disabled:opacity-50"
                >
                  {resending ? 'Resending...' : 'Resend Code'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
