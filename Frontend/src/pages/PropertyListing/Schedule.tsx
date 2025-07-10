import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import PropertySidebar from './PropertySidebar';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar/navbar';

interface ScheduleData {
  availability: string;
  startTime: string;
  startPeriod: 'AM' | 'PM';
  endTime: string;
  endPeriod: 'AM' | 'PM';
  availableAllDay: boolean;
}

export default function Schedule() {
  const [show, setShow] = useState(false);

  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    availability: '',
    startTime: '',
    startPeriod: 'AM',
    endTime: '',
    endPeriod: 'AM',
    availableAllDay: false,
  });

  // Load from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('schedule_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setScheduleData({
          availability: parsed.availability || '',
          startTime: parsed.startTime || '',
          startPeriod: parsed.startPeriod || 'AM',
          endTime: parsed.endTime || '',
          endPeriod: parsed.endPeriod || 'AM',
          availableAllDay: parsed.availableAllDay || false,
        });
      } catch (err) {
        console.error('Error parsing schedule data', err);
      }
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('schedule_data', JSON.stringify(scheduleData));
  }, [scheduleData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setScheduleData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvailabilitySelect = (value: string) => {
    setScheduleData(prev => ({ ...prev, availability: value }));
  };

  const handleSubmit = () => {
    alert('Schedule saved!');
  
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
                <div className="form-submit">
                  <div className="submit-section">
                    <div className="row">

                      {/* Availability Options */}
                      <div className="form-group col-md-12 mb-3">
                        <label className="mb-2">Availability</label>
                        <div className="d-flex gap-3 flex-wrap">
                          {['Mon-Sun', 'Mon-Fri', 'Sat,Sun'].map(option => (
                            <button
                              type="button"
                              key={option}
                              className={`btn ${scheduleData.availability === option ? 'btn-primary' : 'btn-outline-primary'}`}
                              onClick={() => handleAvailabilitySelect(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Start Time */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">Start Time</label>
                        <div className="input-group">
                          <input
                            type="time"
                            name="startTime"
                            value={scheduleData.startTime}
                            className="form-control"
                            onChange={handleChange}
                          />
                          <select
                            name="startPeriod"
                            value={scheduleData.startPeriod}
                            onChange={handleChange}
                            className="form-select"
                            style={{ maxWidth: '80px' }}
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>

                      {/* End Time */}
                      <div className="form-group col-md-6">
                        <label className="mb-2">End Time</label>
                        <div className="input-group">
                          <input
                            type="time"
                            name="endTime"
                            value={scheduleData.endTime}
                            className="form-control"
                            onChange={handleChange}
                          />
                          <select
                            name="endPeriod"
                            value={scheduleData.endPeriod}
                            onChange={handleChange}
                            className="form-select"
                            style={{ maxWidth: '80px' }}
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>

                      {/* All Day Checkbox */}
                      <div className="form-group col-md-12 mt-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="availableAllDay"
                            name="availableAllDay"
                            checked={scheduleData.availableAllDay}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="availableAllDay">
                            Available All Day
                          </label>
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
                        <button className="btn btn-secondary px-4 me-3 rounded" type="button">
                          Back
                        </button>
                        <button className="btn btn-primary px-4 rounded" type="button" onClick={handleSubmit}>
                          Finish Posting
                        </button>
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
