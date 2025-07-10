import React from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import bg from '../../assets/img/city-banner.png'
import map from '../../assets/img/pin.svg'

import Navbar from '../../components/navbar/navbar'
import HowItsWork from '../../components/how-its-work';
import BestLoctionOne from '../../components/best-loction-one';
import ClientOne from '../../components/client-one';
import PricingOne from '../../components/Pricing';
import FooterTop from '../../components/footer-top';
import Footer from '../../components/footer';
import GridPropertyOne from '../../components/grid-property-one';
import ExplorePropertyOne from '../../components/explore-property-one';
import PropertyType from '../../components/property-type';
import AppDownload from '../../components/app-download';
import FormTwo from '../../components/form-two'

export default function Index() {
   
    const minprice = [
        { value: '1', label: '$500' },
        { value: '1', label: '$1000' },
        { value: '1', label: '$1500' },
        { value: '1', label: '$2000' },
        { value: '1', label: '$3000' },
    ];
    const maxprice = [
        { value: '1', label: '$1000' },
        { value: '1', label: '$1500' },
        { value: '1', label: '$2000' },
        { value: '1', label: '$3000' },
        { value: '1', label: '$3000' },
    ];

    const propertyType = [
        { value: '1', label: 'Rental' },
        { value: '1', label: 'Villas' },
        { value: '1', label: 'Offices' },
        { value: '1', label: 'Condos' },
        { value: '1', label: 'Studios' },
    ]
    const rooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
    ]
    const loction = [
        { value: '1', label: 'Los Angeles, CA' },
        { value: '1', label: 'New York City, NY' },
        { value: '1', label: 'Chicago, IL' },
        { value: '1', label: 'Houston, TX' },
        { value: '1', label: 'Philadelphia, PA' },
        { value: '1', label: 'San Antonio, TX' },
        { value: '1', label: 'San Jose, CA' },
    ]

  return (
    <>
        <Navbar transparent={false}/>

        <div className="image-cover hero-banner" style={{backgroundImage:`url(${bg})`, backgroundColor:'#eff6ff', backgroundRepeat:'no-repeat'}}>
               <div className="container">
                   <div className="row justify-content-center">
                       <div className="col-lg-9 col-md-11 col-sm-12">
                           <div className="inner-banner-text text-center">
                               <p className="d-inline-flex sm-small text-light rounded-5 px-2 py-1 bg-info align-items-center">We just launched our service in New York, United States<span className="sm-small px-2 rounded-5 bg-white text-dark ms-2">New</span></p>
                               <h2 className='mt-3 mb-4'>Find <span className="text-primary">Real Properties</span> at Cheapest Price in california</h2>
                               <p className="small">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores occaecati cupiditate quas molestias excepturi</p>
                           </div>
                           <FormTwo/>
                       </div>
                   </div>
               </div>
           </div>

        <section>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-7 col-md-10">
                                <div className="sec-heading text-center">
                                    <h2>Choose Property Type</h2>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                                </div>
                            </div>
                        </div>
                        <PropertyType/>
                    </div>
                </section>
                <div className="clearfix"></div>

        <section className='bg-gray'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10 text-center">
                            <div className="sec-heading center">
                                <h2>Explore Properties in Best Places</h2>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                            </div>
                        </div>
                    </div>
                    <ExplorePropertyOne/>
                </div>	
        </section>

        <section>
            <HowItsWork/>
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Explore Recent properties</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                
                <GridPropertyOne border={false}/>
                
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                        <Link to="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded ">Browse More Properties</Link>
                    </div>
                </div>
            </div>	
        </section>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Find Best Locations</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <BestLoctionOne/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                        <Link to="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded">Browse More Locations</Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="gray-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10 text-center">
                            <div className="sec-heading center">
                                <h2>Good Reviews by Customers</h2>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                            </div>
                        </div>
                    </div>
                    <ClientOne/>
                </div>
            </section>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>See our packages</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <PricingOne/>
            </div>	
        </section>
        <AppDownload/>
        <FooterTop bg="theme-bg"/>
        <Footer/>
    </>
  )
}
