import React from 'react'
import { Link, useLocation } from 'react-router-dom'


interface SidebarProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PropertySidebar({ show, setShow }: SidebarProps) {
  const location = useLocation()
  const current = location.pathname

  return (
    <>
    <div
      className={`simple-sidebar sm-sidebar ${
        show ? 'd-block d-md-block' : 'd-none d-md-block'
      }`}
      id="filter_search"
    >
      <div className="search-sidebar_header d-flex justify-content-between align-items-center px-3 py-2">
        <h4 className="ssh_heading mb-0">Close Filter</h4>
        <button className="btn p-0" onClick={() => setShow(!show)}>
          <i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
        </button>
      </div>

      <div className="sidebar-widgets">
        <div className="dashboard-navbar">
          <div className="d-navigation">
            <ul>
              <li className={current === "/propertyD" ? "active" : ""}>
                <Link to="/propertyD">
                 <i className="fa-solid fa-house"></i> Property Details
                </Link>
              </li>
              <li className={current === "/localityD" ? "active" : ""}>
                <Link to="/localityD">
                 <i className="fa-solid fa-location-dot"></i> Locality Details
                </Link>
              </li>
              <li className={current === "/rentalD" ? "active" : ""}>
                <Link to="/rentalD">
                  <i className="fa-solid fa-building-circle-check"></i> Rental Details
                </Link>
              </li>
              <li className={current === "/amenities" ? "active" : ""}>
                <Link to="/amenities">
                  <i className="fa-solid fa-building me-2"></i> Amenities
                </Link>
              </li>
              <li className={current === "/gallery" ? "active" : ""}>
                <Link to="/gallery">
                  <i className="fa-solid fa-camera"></i> Gallery
                </Link>
              </li>
              <li className={current === "/schedule" ? "active" : ""}>
                <Link to="/schedule">
                <i className="fa-solid fa-calendar-days"></i> Schedule
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
