import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../pages/config/config';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
const [step, setStep] = useState(1);
const [otp, setOtp] = useState('');
const [newPassword, setNewPassword] = useState('');

const handleRequestOtp = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
    toast.success('OTP sent to your email');
    setStep(2);
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to send OTP');
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${BASE_URL}/api/user/verify-otp-reset`, {
      email,
      otp,
      newPassword
    });
    alert('Password reset successfully!');
  } catch (err) {
    alert(err.response?.data?.message || 'OTP verification failed');
  }
};


return (
  <div className="form-container">
    {step === 1 ? (
      <form onSubmit={handleRequestOtp}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    ) : (
      <form onSubmit={handleVerifyOtp}>
        <h2>Enter OTP and Reset Password</h2>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    )}
  </div>
);

}

export default ForgotPassword;