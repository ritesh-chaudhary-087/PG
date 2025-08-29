
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Api/Common_Api';

interface Props {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOtp = async () => {
    setError('');
    setMessage('');
    try {
      const res = await axios.post(`${baseURL}/api/auth/forgot-password`, { email });
      setOtpSent(true);
      setMessage(res.data.message || 'OTP sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const resetPassword = async () => {
    setError('');
    setMessage('');
    try {
      const res = await axios.post(`${baseURL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message || 'Password reset successfully!');
      setOtpSent(false);
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: '#0000008a' }}>
      <div className="modal-dialog modal-dialog-centered login-pop-form">
        <div className="modal-content">
          <span className="mod-close p-3" onClick={onClose} style={{ cursor: 'pointer' }}>
            <span className="svg-icon text-primary svg-icon-2hx">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"></rect>
                                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"></rect>
                                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"></rect>
                                </svg>
                            </span>
          </span>
          <div className="modal-body">
            <h4 className="modal-header-title mb-3">Forgot Password</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            {!otpSent ? (
              <>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button onClick={sendOtp} className="btn btn-primary w-100">
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <div className="form-group mb-3">
                  <label>OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button onClick={resetPassword} className="btn btn-success w-100">
                  Reset Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
