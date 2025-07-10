import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertySidebar from './PropertySidebar'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar/navbar'

export default function PropertyListing() {
  const [show, setShow] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    apartmentType: '',
    apartmentName: '',
    bhkType: '',
    noOfFloors: '',
    propertyAge: '',
    facing: '',
    buildUpArea: '500 Sq.ft',
  })

  useEffect(() => {
    const savedData = sessionStorage.getItem('propertyFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)
    sessionStorage.setItem('propertyFormData', JSON.stringify(updatedForm))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('propertyFormData', JSON.stringify(formData))
    alert('Data saved to session storage!')
  }

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
                  <h4>Property Details</h4>
                  <div className="submit-section">
                    <div className="row">

                      <div className="form-group col-md-6 position-relative">
                        <label>Apartment Type *</label>
                        <select className="form-control pr-4" name="apartmentType" value={formData.apartmentType} onChange={handleChange}>
                          <option value="">Select Type</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Independent House/Villa">Independent House/Villa</option>
                          <option value="Gated Community Villa">Gated Community Villa</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6 position-relative">
                        <label>Apartment Name *</label>
                        <select className="form-control pr-5" name="apartmentName" value={formData.apartmentName} onChange={handleChange}>
                          <option value="">Select Apartment</option>
                          <option value="Carlo Residency">Carlo Residency</option>
                          <option value="Skyline Heights">Skyline Heights</option>
                          <option value="Sunshine Villas">Sunshine Villas</option>
                          <option value="Green Valley">Green Valley</option>
                          <option value="Maple Residency">Maple Residency</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6 position-relative">
                        <label>BHK Type *</label>
                        <select className="form-control pr-5" name="bhkType" value={formData.bhkType} onChange={handleChange}>
                          <option value="">Select BHK Type</option>
                          <option value="1 RK">1 RK</option>
                          <option value="1 BHK">1 BHK</option>
                          <option value="2 BHK">2 BHK</option>
                          <option value="3 BHK">3 BHK</option>
                          <option value="4 BHK">4 BHK</option>
                          <option value="5+ BHK">5+ BHK</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6 position-relative">
                        <label>No. Of Floors *</label>
                        <select className="form-control pr-5" name="noOfFloors" value={formData.noOfFloors} onChange={handleChange}>
                          <option value="">Select Floor</option>
                          <option value="ground only">Ground Only</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6 position-relative">
                        <label>Propery Age *</label>
                        <select className="form-control pr-5" name="propertyAge" value={formData.propertyAge} onChange={handleChange}>
                          <option value="">Select Age</option>
                          <option value="less year">less than a year</option>
                          <option value="1-3 year">1 to 3 year</option>
                          <option value="3-5 year">3 to 5 year</option>
                          <option value="5-10 year">5 to 10 year</option>
                          <option value="10+ year">more than 10 year</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6 position-relative">
                        <label>Facing *</label>
                        <select className="form-control pr-5" name="facing" value={formData.facing} onChange={handleChange}>
                          <option value="">Select Facing</option>
                          <option value="north">North</option>
                          <option value="south">South</option>
                          <option value="east">East</option>
                          <option value="west">West</option>
                          <option value="north-east">North-East</option>
                          <option value="south-east">South-East</option>
                          <option value="north-west">North-west</option>
                          <option value="south-west">South West</option>
                        </select>
                        <i className="fa fa-chevron-down position-absolute" style={{ top: '60%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#999' }}></i>
                      </div>

                      <div className="form-group col-md-6">
                        <label>Build Up Area *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="buildUpArea"
                          value={formData.buildUpArea}
                          onChange={handleChange}
                        />
                      </div>

                    </div>
                  </div>
                </div>

                <div className="form-submit">
                  <div className="submit-section">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12 text-center">
                        <button className="btn btn-primary px-5 rounded" type="submit">Save & Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form></div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
