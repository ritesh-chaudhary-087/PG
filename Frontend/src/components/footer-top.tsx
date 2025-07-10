import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterTop({bg}:{bg:any}) {
  return (
        <section className={`call-to-act-wrap ${bg}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 text-center m-auto">
                        
                        <div className="call-to-act  text-center">
                            <div className="call-to-act-head">
                                <h3>Find Property</h3>
                                <span>Select from thousands of options, without brokerage.</span>
                            </div>
                            <Link to="/grid-layout-with-sidebar" className="btn btn-call-to-act">Find Now</Link>
                        </div>
                    </div>

                   <div className="col-lg-2 text-center m-auto">
                    <div className="vertical-line"></div>
                   </div>

                    <div className="col-lg-5 text-center m-auto">
                        <div className="call-to-act text-center">
                            <div className="call-to-act-head ">
                                <h3 >List Your Property</h3>
                                <span >Add Property For Free. Without any brokerage.</span>
                            </div>
                              <Link to="/PropertyListing" className="btn m-auto btn-call-to-act">Free Posting</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
  )
}
