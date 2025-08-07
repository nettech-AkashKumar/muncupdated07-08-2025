import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../styles/login.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import MuncLogo from "../../../assets/img/logo/munclogotm.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../pages/config/config';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save user and token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // <-- Add this

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };


  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content authent-content">
            <form onSubmit={handleSubmit}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <img src={MuncLogo} alt="img" />
                </div>

                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4 className="fs-16">Access the Dreamspos panel using your email and passcode.</h4>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email <span className="text-danger"> *</span></label>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control border-end-0"
                      required
                    />
                    <span className="input-group-text border-start-0">
                      <MdOutlineEmail />
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password <span className="text-danger"> *</span></label>
                  <div className="pass-group input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pass-input form-control border-end-0"
                      required
                    />
                    <span
                      className="input-group-text border-start-0 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                </div>

                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div className="custom-control custom-checkbox">
                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1 fs-16 text-gray-6">
                          <input type="checkbox" className="form-control" />
                          <span className="checkmarks" />Remember me
                        </label>
                      </div>
                      <div className="text-end">
                        <Link to="/forgot-password" className="text-orange fs-16 fw-medium">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-login">
                  <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </div>

                <div className="signinform">
                  <h4>New on our platform?<Link to="/register" className="hover-a"> Create an account</Link></h4>
                </div>

                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © 2025 Kasper Infotech Pvt. Ltd.</p>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;