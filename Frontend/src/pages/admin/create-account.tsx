import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../Api/Common_Api';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    password: '',
    phone: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, city, password, phone, role } = formData;

    // validation
    if (!name || !email || !city || !password || !phone) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/api/auth/register`, {
        name,
        email,
        city,
        password,
        phone,
        role,
      });
       console.log(" Registration successful:", res.data); 
      setSuccess('Account created successfully!');
      setFormData({
        name: '',
        email: '',
        city: '',
        password: '',
        phone: '',
        role: 'user',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Create An Account</h2>
            </div>
          </div>
        </div>
      </div>

      <section className="gray-simple">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-9">
              <div className="card border-0 rounded-4 p-xl-4 p-lg-4 p-md-4 p-3">
                <div className="simple-form">
                  <div className="form-header text-center mb-5">
                    <div className="effco-logo mb-2">
                      <Link to="/" className="d-flex align-items-center justify-content-center">
                        {/* Your SVG or Logo here */}
                      </Link>
                    </div>
                    <h4 className="fs-2">Create Account</h4>
                  </div>

                  {/* Alert messages */}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group mb-3">
                          <label className="mb-2">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mb-3">
                        <div className="form-group">
                          <label className="mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mb-3">
                        <div className="form-group">
                          <label className="mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mb-3">
                        <div className="form-group">
                          <label className="mb-2">Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="*******"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mb-3">
                        <div className="form-group">
                          <label className="mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder="123 456 7890"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mb-3">
                        <div className="form-group">
                          <label className="mb-2">Signup As</label>
                          <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                          >
                            <option value="user">As a Customer</option>
                            <option value="agent">As an Agent</option>
                            <option value="agency">As an Agency</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary full-width fw-medium">
                        Create Account <i className="fa-solid fa-arrow-right-long ms-2"></i>
                      </button>
                    </div>
                  </form>

                  {/* Social login section */}
                  <div className="modal-divider"><span>Or SignUp via</span></div>
                  <div className="social-login mb-3">
                    <ul>
                      <li>
                        <Link to="#" className="btn connect-fb">
                          <i className="ti-facebook"></i>Facebook
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn connect-google">
                          <i className="ti-google"></i>Google+
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
