import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import PropertySidebar from './PropertySidebar';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer';

interface RentalFormData {
  propertyFor: string;
  expectedRent: string;
  rentNegotiable: boolean;
  expectedDeposit: string;
  monthlyMaintenance: string;
  availableFrom: string;
  preferredTenants: string[];
  furnishing: string;
  parking: string;
  description: string;
}

export default function RentalD() {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState<RentalFormData>({
    propertyFor: '',
    expectedRent: '',
    rentNegotiable: false,
    expectedDeposit: '',
    monthlyMaintenance: '',
    availableFrom: '',
    preferredTenants: [],
    furnishing: '',
    parking: '',
    description: '',
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('rentalDetails');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('rentalDetails', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'preferredTenants' && e.target instanceof HTMLInputElement) {
      const isChecked = e.target.checked;
      setFormData(prev => {
        const updated = isChecked
          ? [...prev.preferredTenants, value]
          : prev.preferredTenants.filter(v => v !== value);
        return { ...prev, preferredTenants: updated };
      });
    } else if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const isChecked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: isChecked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.propertyFor || !formData.expectedRent || !formData.expectedDeposit || !formData.availableFrom) {
      alert('Please fill all required fields marked with *');
      return;
    }

    console.log('Submitted Rental Details:', formData);
    alert('Rental details saved successfully!');
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
        <div className="container-fluid">
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
                    <h4>Rental Details</h4>
                    <div className="submit-section">
                      <div className="row">

                        <div className="form-group col-md-12">
                          <label className="mb-2 d-block">Property available for</label>
                          {['Rent', 'Lease'].map(option => (
                            <div className="form-check form-check-inline" key={option}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="propertyFor"
                                value={option}
                                checked={formData.propertyFor === option}
                                onChange={handleChange}
                              />
                              <label className="form-check-label">{`Only ${option}`}</label>
                            </div>
                          ))}
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Expected Rent *</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            name="expectedRent"
                            value={formData.expectedRent}
                            onChange={handleChange}
                          />
                          <div className="form-check mt-1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rentNegotiable"
                              name="rentNegotiable"
                              checked={formData.rentNegotiable}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="rentNegotiable">
                              Rent Negotiable
                            </label>
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Expected Deposit *</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            name="expectedDeposit"
                            value={formData.expectedDeposit}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Monthly Maintenance</label>
                          <select
                            className="form-control"
                            name="monthlyMaintenance"
                            value={formData.monthlyMaintenance}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="0">0</option>
                            <option value="500">₹500</option>
                            <option value="1000">₹1000</option>
                            <option value="2000">₹2000</option>
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Available From *</label>
                          <input
                            type="date"
                            className="form-control"
                            name="availableFrom"
                            value={formData.availableFrom}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <label className="mb-2 d-block">Preferred Tenants *</label>
                          {['Anyone', 'Family', 'Bachelor Female', 'Bachelor Male', 'Company'].map(tenant => (
                            <div className="form-check form-check-inline" key={tenant}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={tenant}
                                name="preferredTenants"
                                value={tenant}
                                checked={formData.preferredTenants.includes(tenant)}
                                onChange={handleChange}
                              />
                              <label className="form-check-label" htmlFor={tenant}>
                                {tenant}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Furnishing *</label>
                          <select
                            className="form-control"
                            name="furnishing"
                            value={formData.furnishing}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Semi Furnished">Semi Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label className="mb-2">Parking *</label>
                          <select
                            className="form-control"
                            name="parking"
                            value={formData.parking}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="Both">Both</option>
                            <option value="None">None</option>
                          </select>
                        </div>

                        <div className="form-group col-md-12">
                          <label className="mb-2">Description</label>
                          <textarea
                            className="form-control"
                            name="description"
                            placeholder="Write a few lines about your property..."
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-submit">
                    <div className="submit-section">
                      <div className="row">
                        <div className="form-group col-lg-12 col-md-12 text-center">
                          <button className="btn btn-secondary px-4 me-3 rounded" type="button">
                            Back
                          </button>
                          <button className="btn btn-primary px-4 rounded" type="submit">
                            Save & Continue
                          </button>
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
  );
}
