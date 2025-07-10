import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import PropertySidebar from './PropertySidebar'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar/navbar'

export default function Gallery() {
  const [show, setShow] = useState<boolean>(false)
  const [photos, setPhotos] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedPhotos = sessionStorage.getItem('gallery_photos')
    const savedVideos = sessionStorage.getItem('gallery_videos')
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos))
    if (savedVideos) setVideos(JSON.parse(savedVideos))
  }, [])

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('gallery_photos', JSON.stringify(photos))
    sessionStorage.setItem('gallery_videos', JSON.stringify(videos))
  }, [photos, videos])

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(Array.from(e.target.files))
    }
  }
 
  const handleSave = () => {
  if (photos.length === 0 && videos.length === 0) {
    alert("Please upload at least one photo or video before continuing.")
    return
  }

  sessionStorage.setItem('gallery_photos', JSON.stringify(photos))
  sessionStorage.setItem('gallery_videos', JSON.stringify(videos))

  alert("Gallery saved successfully!")

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
            <div className="col-lg-3 col-md-12">
              <PropertySidebar show={show} setShow={setShow} />
              <Link
                to="#"
                className="btn btn-dark full-width mb-4 d-block d-md-none"
                onClick={() => setShow(!show)}
              >
                Dashboard Navigation <i className="fa-solid fa-bars ms-2"></i>
              </Link>
            </div>

            <div className="col-lg-9 col-md-12">
              <div className="dashboard-wraper">
                <h4>Upload Photos and Videos</h4>

                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-success">
                    <i className="fa-solid fa-upload me-2"></i> Upload through phone
                  </button>
                </div>

                {/* Photo Upload */}
                <div className="card p-3 text-center mb-4">
                  <i className="fa-solid fa-camera fa-2x mb-3 text-muted"></i>
                  <h6 className="fw-bold">Add photos to get 5X more responses.</h6>
                  <p className="text-muted small">90% tenants contact on properties with photos.</p>
                  
                  <label className="btn btn-success">
                    Add Photos
                    <input type="file" multiple accept="image/*" onChange={handlePhotoChange} hidden />
                  </label>

                  {/* Show selected photo names */}
                  {photos.length > 0 && (
                    <ul className="mt-3 text-start small">
                      {photos.map((file, i) => (
                        <li key={i}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* OR Line */}
                <div className="text-center my-4">
                  <hr />
                  <span className="position-relative px-3 bg-white text-muted">OR</span>
                </div>

             
                {/* Video Upload */}
                <div className="card p-3 text-center mb-4">
                  <i className="fa-solid fa-video fa-2x mb-3 text-muted"></i>
                  <h6 className="fw-bold">Add Videos to get 5X more responses.</h6>
                  <p className="text-muted small">90% tenants contact on properties with videos.</p>

                  <label className="btn btn-success">
                    Add Videos
                    <input type="file" multiple accept="video/*" onChange={handleVideoChange} hidden />
                  </label>

                  {/* Show selected video names */}
                  {videos.length > 0 && (
                    <ul className="mt-3 text-start small">
                      {videos.map((file, i) => (
                        <li key={i}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="form-submit">
                  <div className="submit-section">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12 text-center">
                        <button className="btn btn-secondary px-4 me-3 rounded" type="button">Back</button>
                        <button className="btn btn-primary px-4 rounded" type="submit" onClick={handleSave}>Save & Continue</button>
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
  )
}
