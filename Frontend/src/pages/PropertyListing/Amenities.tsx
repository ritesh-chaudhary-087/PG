import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import PropertySidebar from './PropertySidebar';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer';

export default function Amenities() {
  const [show, setShow] = useState<boolean>(false);

  const initialData = {
    bathrooms: 0,
    balcony: 0,
    waterSupply: '',
    petAllowed: '',
    gym: '',
    nonVegAllowed: '',
    gatedSecurity: '',
    showBy: '',
    condition: '',
    phone: '',
    similarUnits: '',
    amenities: [] as string[],
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const stored = sessionStorage.getItem('amenities_data');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('amenities_data', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const input = e.target as HTMLInputElement;
    const checked = input.checked;

    if (name === 'amenities') {
      setFormData((prev) => {
        const updatedAmenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value);
        return { ...prev, amenities: updatedAmenities };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleOptionClick = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const increment = (field: 'bathrooms' | 'balcony') => {
    setFormData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const decrement = (field: 'bathrooms' | 'balcony') => {
    setFormData((prev) => ({ ...prev, [field]: Math.max(prev[field] - 1, 0) }));
  };

  const handleSubmit = () => {
    alert('Data saved!');
    sessionStorage.setItem('amenities_data', JSON.stringify(formData));
  };

  const amenitiesList = [
    'Lift', 'Air Conditioner', 'Intercom', 'Children Play Area', 'Servant Room', 'Gas Pipeline',
    'Rain Water Harvesting', 'House Keeping', 'Visitor Parking', 'Internet Services', 'Club House',
    'Swimming Pool', 'Fire Safety', 'Shopping Center', 'Park', 'Sewage Treatment Plant', 'Power Backup'
  ];

  const icons: Record<string, string> = {
    'Lift': 'fa-elevator',
    'Air Conditioner': 'fa-wind',
    'Intercom': 'fa-phone-volume',
    'Children Play Area': 'fa-child',
    'Servant Room': 'fa-bed',
    'Gas Pipeline': 'fa-gas-pump',
    'Rain Water Harvesting': 'fa-cloud-rain',
    'House Keeping': 'fa-broom',
    'Visitor Parking': 'fa-parking',
    'Internet Services': 'fa-wifi',
    'Club House': 'fa-building',
    'Swimming Pool': 'fa-water-ladder',
    'Fire Safety': 'fa-fire-extinguisher',
    'Shopping Center': 'fa-store',
    'Park': 'fa-tree',
    'Sewage Treatment Plant': 'fa-recycle',
    'Power Backup': 'fa-battery-full'
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
                <div className="form-submit">
                  <div className="submit-section">
                    <div className="row g-3">
                      {/* Bathrooms & Balcony */}
                      {['bathrooms', 'balcony'].map((field) => (
                        <div className="form-group col-md-3" key={field}>
                          <label className="mb-2 text-capitalize">{field}*</label>
                          <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-light" onClick={() => decrement(field as any)}>-</button>
                            <span>{formData[field as keyof typeof formData]}</span>
                            <button className="btn btn-light" onClick={() => increment(field as any)}>+</button>
                          </div>
                        </div>
                      ))}

                      {/* Water Supply */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">Water Supply</label>
                        <select className="form-select" name="waterSupply" value={formData.waterSupply} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="corporation">Corporation</option>
                          <option value="borewell">Borewell</option>
                        </select>
                      </div>

                      {/* Toggle Options */}
                      {[
                        ['petAllowed', 'Pet Allowed'],
                        ['gym', 'Gym'],
                        ['nonVegAllowed', 'Non-Veg Allowed'],
                        ['gatedSecurity', 'Gated Security'],
                        ['similarUnits', 'More Similar Units']
                      ].map(([key, label]) => (
                        <div className="form-group col-md-3" key={key}>
                          <label className="mb-2">{label}*</label>
                          <div className="btn-group w-100">
                            {['No', 'Yes'].map((val) => (
                              <button
                                key={val}
                                type="button"
                                className={`btn btn-outline-secondary ${formData[key as keyof typeof formData] === val ? 'active' : ''}`}
                                onClick={() => handleOptionClick(key as any, val)}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Who will show the property? */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">Who will show the property?*</label>
                        <select className="form-select" name="showBy" value={formData.showBy} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Owner">Owner</option>
                          <option value="Agent">Agent</option>
                        </select>
                      </div>

                      {/* Property Condition */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">Current Property Condition?</label>
                        <select className="form-select" name="condition" value={formData.condition} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="New">New</option>
                          <option value="Old">Old</option>
                        </select>
                      </div>

                      {/* Phone Number */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">Secondary Number</label>
                        <div className="input-group">
                          <span className="input-group-text">+91</span>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Secondary Number"
                          />
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="col-md-12 mt-4">
                        <h5 className="mb-3">Select the available amenities</h5>
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                          {amenitiesList.map((amenity, index) => (
                            <div className="col" key={index}>
                              <div className="form-check d-flex align-items-center gap-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`amenity-${index}`}
                                  name="amenities"
                                  value={amenity}
                                  checked={formData.amenities.includes(amenity)}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label d-flex align-items-center gap-2" htmlFor={`amenity-${index}`}>
                                  <i className={`fa ${icons[amenity]} text-primary`}></i>
                                  {amenity}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="form-group col-lg-12 col-md-12 text-center mt-4">
                        <button className="btn btn-secondary px-4 me-3 rounded" type="button">Back</button>
                        <button className="btn btn-primary px-4 rounded" type="button" onClick={handleSubmit}>Save & Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
