import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../pages/config/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../../../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password/:token', {
      state: {
        email,
        otp
      }
    });
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <form className="forgot-form" onSubmit={otpSent ? handleOtpSubmit : handleRequestOtp}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={otpSent}
          />

          {otpSent && (
            <input
              type="text"
              className="forgot-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          )}

          <button type="submit" className="forgot-button">
            {otpSent ? 'Continue' : 'Send OTP'}
          </button>
        </form>
        <p className="forgot-back" onClick={() => navigate('/login')}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;