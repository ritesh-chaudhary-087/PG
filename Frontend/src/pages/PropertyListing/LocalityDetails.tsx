import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertySidebar from '../PropertyListing/PropertySidebar'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer'
import { postLocalityData } from "../../Api/Common_Api";

export default function LocalityDetails() {
   const [show, setShow] = useState<boolean>(false);
  
    const [formData, setFormData] = useState({
      city: '',
    locality: '',
    landmark: '',
    mapSearch: '',
    });
  
    // ✅ handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    // ✅ handle submit
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // ✅ read token
    if (!token) {
      alert("You must log in first!");
      return;
    }
      try {
        // token should come from your login/auth context/localStorage
        const token = localStorage.getItem("token") || "";
        const res = await postLocalityData(formData, token);
        alert("Locality added successfully!");
  
        console.log("Saved Locality:", res.data);
  
        // reset form
        setFormData({
            city: '',
    locality: '',
    landmark: '',
    mapSearch: '',
        });
      } catch (error) {
    console.error("Error adding locality:", JSON.stringify(error, null, 2));
  }
  
    };
  

  return (
    <>
     <Navbar transparent={false} />
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="ipt-title">Welcome!</h2>
              <span className="ipn-subtitle">Welcome To Your Account</span>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="filter_search_opt">
                <Link to="#" className="btn btn-dark full-width mb-4" onClick={() => setShow(!show)}>
                  Dashboard Navigation<i className="fa-solid fa-bars ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-12">
              <PropertySidebar show={show} setShow={setShow} />
            </div>

            <div className="col-lg-9 col-md-12">
              <div className="dashboard-wraper">
                <form onSubmit={handleSubmit}>
                  <div className="form-submit">
                    <h4>Locality Details</h4>
                    <div className="submit-section">
                      <div className="row">

                        {/* City */}
                        <div className="form-group col-md-6 position-relative">
                          <label className="mb-2">City *</label>
                          <select
                            className="form-control pr-5"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select City</option>
                            <option value="Pune">Pune</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Nashik">Nashik</option>
                            <option value="Nagpur">Nagpur</option>
                            <option value="Aurangabad">Aurangabad</option>
                          </select>
                          <i
                            className="fa fa-chevron-down position-absolute"
                            style={{
                              top: '60%',
                              right: '25px',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#999',
                            }}
                          ></i>
                        </div>

                        {/* Locality - Text Input */}
                        <div className="form-group col-md-6">
                          <label className="mb-2">Locality *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="locality"
                            value={formData.locality}
                            onChange={handleChange}
                            placeholder="Enter Locality"
                            required
                          />
                        </div>

                        {/* Landmark - Text Input */}
                        <div className="form-group col-md-6">
                          <label className="mb-2">Landmark / Street *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Enter Landmark / Street"
                            required
                          />
                        </div>

                        {/* Map Search */}
                        <div className="form-group col-md-12">
                          <label className="mb-2 d-block">
                            <i className="fa fa-map-marker-alt me-2 text-primary"></i>Mark Locality on Map
                          </label>
                          <small className="d-block mb-2 text-muted">
                            Set property location by using search box and move the map
                          </small>
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="mapSearch"
                            value={formData.mapSearch}
                            onChange={handleChange}
                            placeholder="Search your society or nearest landmark"
                          />
                          <div style={{ height: '300px', width: '100%' }}>
                            <iframe
                              title="map"
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.084610122781!2d73.85094547518599!3d18.56231316723896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07db0e73cd7%3A0x6813bdb6d211f27f!2sNarayan%20Peth%2C%20Pune%2C%20Maharashtra%20411030!5e0!3m2!1sen!2sin!4v1719999999999"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                    <div className="form-submit">
                    <div className="submit-section">
                      <div className="row">
                        <div className="form-group col-lg-12 col-md-12 text-center">
                          <button className="btn btn-secondary px-4 me-3 rounded" type="button">Back</button>
                          <button className="btn btn-primary px-4 rounded" type="submit">Save & Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
