import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../pages/config/config.js';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../styles/ResetPasswords.css"

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/verify-otp-reset`, {
        email,
        otp,
        newPassword,
      });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>
        <form className="reset-form" onSubmit={handleReset}>
          <input
            type="password"
            className="reset-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="reset-input"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        <p className="reset-back" onClick={() => navigate('/login')}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
