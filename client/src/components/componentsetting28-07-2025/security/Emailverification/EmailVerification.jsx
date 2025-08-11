import React, { useState } from 'react';
import "../Emailverification/EmailVerification.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from 'axios';
import BASE_URL from '../../../../pages/config/config';

const EmailVerification = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        newEmail: "",
        otp: ""
    });

    const [otpSent, setOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async () => {
        try {
            await axios.post(`${BASE_URL}/api/email/send-otp`, {
                newEmail: form.newEmail
            });
            alert("OTP sent to new email.");
            setOtpSent(true);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to send OTP");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem("user"))
            const currentEmail = userData.email;
            const res = await axios.post(`${BASE_URL}/api/email/verify-otp`, {
                ...form,
                currentEmail
            });
            alert(res.data.message);
            localStorage.setItem("currentEmail", form.newEmail); // update localStorage
            setForm({ newEmail: "", otp: "" });
            setOtpSent(false);
            onClose();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to verify OTP");
        }
    };

    if (!isOpen) return null;

    return (
        <div className='verifymodal-overlay'>
            <div className="verifymodal-box">
                <div className="verifymodal-header">
                    <h3>Update Email</h3>
                    <button className='verfiyclose-btn' onClick={onClose}>x</button>
                </div>

                <form onSubmit={handleVerifyOtp} className='verifymodal-form'>
                    <label>
                        New Email
                        <input
                            type="email"
                            name="newEmail"
                            value={form.newEmail}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="button" className="verifysend-btn" onClick={handleSendOtp} disabled={!form.newEmail}>
                        Send OTP
                    </button>
                            <label>
                                OTP
                                <div className="verifyotp-field">
                                    <input
                                        type={showOtp ? "text" : "password"}
                                        name="otp"
                                        value={form.otp}
                                        onChange={handleChange}
                                required
                                disabled={!otpSent}
                                    />
                                    <span
                                        className="toggle-otp"
                                        onClick={() => setShowOtp(prev => !prev)}
                                        style={{ position: 'absolute', marginLeft: '-30px' }}
                                    >
                                        {showOtp ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </span>
                                </div>
                            </label>

                            <div className="verifymodal-actions">
                                <button type="button" className='verifycancel-btn' onClick={onClose}>Cancel</button>
                                <button type="submit" className='verifysave-btn' disabled={!otpSent}>Save Changes</button>
                            </div>
                </form>
            </div>
        </div>
    );
};  

export default EmailVerification;
