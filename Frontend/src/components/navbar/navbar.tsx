import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useRef } from "react";

import { FiChevronDown } from "react-icons/fi";
import { TiSocialGooglePlus, TiSocialFacebook } from "react-icons/ti";

import { navProperty } from "../../data/data";

import logo from "../../assets/img/logo.svg";
import users from "../../assets/img/svg/users.svg";
import addImg from "../../assets/img/svg/add.svg";
import bar from "../../assets/img/svg/bar.svg";
import loginImg from "../../assets/img/svg/login.svg";
import axios from "axios";
import { baseURL } from "../../Api/Common_Api";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function Navbar({ transparent }: { transparent: any }) {
  const [activeMenu, setActiveMenu] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setIsToggle] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [property, setProperty] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  let [scroll, setScroll] = useState<boolean>(false);

  const location = useLocation();
  const current = location.pathname;
  const navigate = useNavigate();

  // ✅ Menu hover handlers
  const handleMouseEnter = (menu: string, submenu?: string) => {
    setActiveMenu((prev) => ({
      ...prev,
      [menu]: {
        ...prev[menu],
        [submenu || "main"]: true,
      },
    }));
  };

  const handleMouseLeave = (menu: string, submenu?: string) => {
    setActiveMenu((prev) => ({
      ...prev,
      [menu]: {
        ...prev[menu],
        [submenu || "main"]: false,
      },
    }));
  };

  // ✅ Handle login
  const handleLogin = async () => {
    setLoginError("");
    setLoginSuccess("");

    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data; // 👈 backend should return this

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        setLoginSuccess("Login successful!");
        setEmail("");
        setPassword("");
        setLogin(false);
      } else {
        setLoginError("Invalid credentials.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setLoginError("Invalid email or password.");
        } else {
          setLoginError(
            `Error: ${error.response?.status} - ${error.response?.statusText}`
          );
        }
      } else {
        setLoginError("An unexpected error occurred.");
      }
    }
  };

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Fetch user info from backend (token based)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${baseURL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

 // ✅ Smooth scrolling with Lenis + navbar state
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // listen to scroll event
  lenis.on("scroll", ({ scroll }: { scroll: number }) => {
    setScroll(scroll > 50);
  });

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    lenis.destroy();
    window.removeEventListener("resize", handleResize);
  };
}, []);



  return (
    <>
        <div className={`header ${scroll ? 'header-fixed' : ''} ${transparent ? 'header-transparent dark' : 'header-light head-shadow'}`}>
            <div className="container">
                <nav id="navigation " className={windowWidth > 991 ? "navigation navigation-landscape" : "navigation navigation-portrait"}>
                    <div className="nav-header" style={{lineHeight:'0'}}>
                        <Link className="nav-brand text-logo" to="#">
                            <img src={logo} alt="" />
                            <h5 className="fs-3 fw-bold ms-1 my-0">Resido</h5>
                        </Link>
                        <div className="nav-toggle" onClick={()=>setIsToggle(!toggle)}></div>
                        <div className="mobile_nav">
                            <ul>
                                <li>
                                    <Link to="#" onClick={()=>setLogin(!login)}>
                                        <img src={users} alt="" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="submit-property" className="text-primary">
                                        <img src={addImg} alt="" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-primary"  onClick={()=>setProperty(!property)}>
                                        <img src={bar} alt="" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`nav-menus-wrapper  ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{transitionProperty:toggle ? 'none' : 'left'}}>
                        <span className="nav-menus-wrapper-close-button" onClick={()=>setIsToggle(!toggle)}>✕</span>
                        <ul className="nav-menu">
                        
                            <li className={`${['/'].includes(current) ? 'active' : ''} ${activeMenu['home']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('home')} onMouseLeave={() => handleMouseLeave('home')}><Link to="/">Home</Link> 
                            </li>

                             <li className={`${['/AboutPage'].includes(current) ? 'active' : ''} ${activeMenu['AboutPage']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('AboutPage')} onMouseLeave={() => handleMouseLeave('AboutPage')}><Link to="/aboutpage">About Us</Link> 
                            </li>
                            
                            <li className={` ${['/grid-layout-with-sidebar'].includes(current) ? 'active' : ''} ${activeMenu['grid-layout-with-sidebar']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('grid-layout-with-sidebar')} onMouseLeave={() => handleMouseLeave('grid-layout-with-sidebar')}><Link to="/grid-layout-with-sidebar">Listings</Link>  
                            </li>

                             <li className={` ${['/Pricing'].includes(current) ? 'active' : ''} ${activeMenu['Pricing']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('Pricing')} onMouseLeave={() => handleMouseLeave('Pricing')}><Link to="/Pricing">Pricing</Link>  
                            </li>
                            
                            <li className={`${['/single-property-1','/single-property-2','/single-property-3','/single-property-4','/agents','/agent-page','/add-agent','/edit-agent','/agencies','/agency-page','/dashboard','/create-account','/my-profile','/payment','/checkout','/my-property','/bookmark-list','change-password','/compare-property','/submit-property'].includes(current)?'active':''} ${activeMenu['feature']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('feature')} onMouseLeave={() => handleMouseLeave('feature')}><Link to="#">Features<FiChevronDown className="submenu-indicator"/></Link>
                                <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['feature']?.main ? 'block' : 'none', pointerEvents: activeMenu['feature']?.main ? 'auto' : 'none',}}>
                                    <li className={['/single-property-1','/single-property-2','/single-property-3','/single-property-4'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'single-property')} onMouseLeave={() => handleMouseLeave('listing', 'single-property')}><Link to="#">Single Property<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['single-property'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['single-property'] ? 'auto' : 'none',}}>
                                            <li><Link to="/single-property-1" className={current === '/single-property-1' ? 'active' : ''}>Single Property 1</Link></li>                                    
                                            <li><Link to="/single-property-2" className={current === '/single-property-2' ? 'active' : ''}>Single Property 2</Link></li>                                    
                                            <li><Link to="/single-property-3" className={current === '/single-property-3' ? 'active' : ''}>Single Property 3</Link></li> 
                                            <li><Link to="/single-property-4" className={current === '/single-property-4' ? 'active' : ''}>Single Property 4</Link></li> 												
                                        </ul>
                                    </li>
                                    <li className={['/agents','/agent-page','/add-agent'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'agent-list')} onMouseLeave={() => handleMouseLeave('listing', 'agent-list')}><Link to="#">Agents<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['agent-list'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['agent-list'] ? 'auto' : 'none',}}>
                                            <li><Link to="/agents" className={current === '/agents' ? 'active' : ''}>Agents List</Link></li>                                    
                                            <li><Link to="/agent-page" className={current === '/agent-page' ? 'active' : ''}>Agent Page</Link></li> 
                                            <li><Link to="/add-agent" className={current === '/add-agent' ? 'active' : ''}>Add Agent</Link></li>    
                                            <li><Link to="/edit-agent" className={current === '/edit-agent' ? 'active' : ''}>Edit Agent</Link></li>                                
                                        </ul>
                                    </li>
                                    <li className={['/agencies','/agency-page'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'agency-list')} onMouseLeave={() => handleMouseLeave('listing', 'agency-list')}><Link to="#">Agencies<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['agency-list'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['agency-list'] ? 'auto' : 'none',}}>
                                            <li><Link to="/agencies" className={current === '/agencies' ? 'active' : ''}>Agencies List</Link></li>                                    
                                            <li><Link to="/agency-page" className={current === '/agency-page' ? 'active' : ''}>Agency Page</Link></li> 
                                        </ul>
                                    </li>
                                    <li className={['/dashboard','/create-account','/payment','/checkout','/my-profile','/my-property','/bookmark-list','/change-password'].includes(current)?'active':''} onMouseEnter={() => handleMouseEnter('listing', 'account')} onMouseLeave={() => handleMouseLeave('listing', 'account')}><Link to="#">My Account<FiChevronDown className="submenu-indicator"/></Link>
                                        <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['listing']?.['account'] ? 'block' : 'none',pointerEvents: activeMenu['listing']?.['account'] ? 'auto' : 'none',}}>
                                            <li><Link to="/dashboard" className={current === '/dashboard' ? 'active' : ''}>User Dashboard</Link></li>
                                            <li><Link to="/create-account" className={current === '/create-account' ? 'active' : ''}>Create Account</Link></li>
                                            <li><Link to="/payment" className={current === '/payment' ? 'active' : ''}>Payment Confirmation</Link></li>
                                            <li><Link to="/checkout" className={current === '/checkout' ? 'active' : ''}>Checkout</Link></li>
                                            <li><Link to="/my-profile" className={current === '/my-profile' ? 'active' : ''}>My Profile</Link></li>                                    
                                            <li><Link to="/my-property" className={current === '/my-property' ? 'active' : ''}>Property List</Link></li>                                    
                                            <li><Link to="/bookmark-list" className={current === '/bookmark-list' ? 'active' : ''}>Bookmarked Listings</Link></li>                                    
                                            <li><Link to="/change-password" className={current === '/change-password' ? 'active' : ''}>Change Password</Link></li> 
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/compare-property" className={current === '/compare-property' ? 'active' : ''}>Compare Property</Link>                                
                                    </li>
                                    <li>
                                        <Link to="/submit-property" className={current === '/submit-property' ? 'active' : ''}>Submit Property</Link>                                
                                    </li>
                                </ul>
                            </li>
                            
                            <li className={`${['/about-us','/blog','/blog-detail','/component','/pricing','/faq','/404','/contact'].includes(current)?'active':''} ${activeMenu['pages']?.main ? 'show' : ''}`} onMouseEnter={() => handleMouseEnter('pages')} onMouseLeave={() => handleMouseLeave('pages')}><Link to="#">Pages<FiChevronDown className="submenu-indicator"/></Link>
                                <ul className="nav-dropdown nav-submenu" style={{display: activeMenu['pages']?.main ? 'block' : 'none', pointerEvents: activeMenu['pages']?.main ? 'auto' : 'none',}}>
                                    <li><Link to="/about-us" className={current === '/about-us' ? 'active' : ''}>About Us</Link></li>                                    
                                    <li><Link to="/blog" className={current === '/blog' ? 'active' : ''}>Blogs Page</Link></li>                                    
                                    <li><Link to="/blog-detail" className={current === '/blog-detail' ? 'active' : ''}>Blog Detail</Link></li>                                    
                                    <li><Link to="/component" className={current === '/component' ? 'active' : ''}>Shortcodes</Link></li> 
                                    <li><Link to="/pricing" className={current === '/pricing' ? 'active' : ''}>Pricing</Link></li>  
                                    <li><Link to="/faq" className={current === '/faq' ? 'active' : ''}>Faq</Link></li>  
                                    <li><Link to="/404" className={current === '/404' ? 'active' : ''}>Error Page</Link></li>
                                    <li><Link to="/contact" className={current === '/contact' ? 'active' : ''}>Contacts</Link></li>
                                </ul>
                            </li>
                            
                        </ul>
                        
                        <ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex">
                            
                            <li>
                                <Link to="#"  className="fw-medium text-muted-2" onClick={()=>setLogin(!login)}>
                                    <span className="svg-icon svg-icon-2hx me-1">
                                        <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor"/>
                                            <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor"/>
                                            <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    Hi, {user ? user.name : 'Guest'}

                                </Link>
                            </li>
                            <li className="add-listing">
                                <Link to="/PropertyListing" className="bg-primary">
                                    <img src={loginImg} alt="" className='me-1'/>Post Property
                                </Link>
                            </li>
                            <li>
                                <Link to="/PropertyListing" className="text-primary" onClick={()=>setProperty(!property)}>
                                    <span className="svg-icon svg-icon-2hx">
                                        <svg width="24" height="24" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect y="6" width="16" height="3" rx="1.5" fill="currentColor"/>
                                            <rect opacity="0.3" y="12" width="8" height="3" rx="1.5" fill="currentColor"/>
                                            <rect opacity="0.3" width="12" height="3" rx="1.5" fill="currentColor"/>
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-overlay-panel" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: toggle ?  'block' : 'none'}}></div>
                </nav>
            </div>
        </div>
        <div className="clearfix"></div>

        {login && 
            <div className="modal fade show" style={{display: 'block', backgroundColor:"#0000008a"}}>
                <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
                    <div className="modal-content" id="registermodal">
                        <span className="mod-close"  onClick={()=>setLogin(!login)}>
                            <span className="svg-icon text-primary svg-icon-2hx">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"></rect>
                                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"></rect>
                                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"></rect>
                                </svg>
                            </span>
                        </span>
                        <div className="modal-body">
                            <h4 className="modal-header-title">Log In</h4>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <span className="svg-icon text-primary svg-icon-2hx">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z" fill="currentColor"></path>
                                        <path opacity="0.3" d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                            </div>
                              <form onSubmit={(e) => e.preventDefault()}>
                                   <div className="form-floating mb-3">
                                       <input
                                           type="email"
                                           className="form-control"
                                           placeholder="name@example.com"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                       />
                                       <label>Email address</label>
                                   </div>
                           
                                   <div className="form-floating mb-3">
                                       <input
                                           type="password"
                                           className="form-control"
                                           placeholder="Password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                       />
                                       <label>Password</label>
                                   </div>
                           
                                   <div className="form-group mb-3">
                                       <div className="d-flex align-items-center justify-content-between">
                                           <div className="form-check form-check-inline">
                                               <input className="form-check-input" type="checkbox" id="save-pass" />
                                               <label className="form-check-label" htmlFor="save-pass">Save Password</label>
                                           </div>
                                           <Link to="#" className="link fw-medium" onClick={() => {
                                             setLogin(false);          // hide login modal
                                             setShowForgotModal(true); // show forgot password modal
                                            }}>
                                           Forgot Password?
                                          </Link>
                                       </div>
                                   </div>
                           
                                   {loginError && <div className="alert alert-danger py-2">{loginError}</div>}
                                   {loginSuccess && <div className="alert alert-success py-2">{loginSuccess}</div>}
                           
                                   <div className="form-group">
                                       <button
                                           type="button"
                                           className="btn btn-lg btn-primary fw-medium full-width rounded-2"
                                           onClick={handleLogin}
                                       >
                                           LogIn
                                       </button>
                                   </div>
                               </form>
                            <div className="modal-divider"><span>Or login via</span></div>
                            <div className="social-login mb-3">
                                <ul>
                                    <li><Link to="#" className="btn connect-fb"><TiSocialFacebook className="ti-facebook" style={{width:'25px' , height:'25px'}}/>Facebook</Link></li>
                                    <li><Link to="#" className="btn connect-google"><TiSocialGooglePlus  className="ti-google" style={{width:'25px' , height:'25px'}}/>Google+</Link></li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <p className="mt-4">Have't Any Account? <Link to="/create-account" className="link fw-medium">Acreate An Account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
           {showForgotModal && (<ForgotPasswordModal onClose={() => {
                 setShowForgotModal(false);
                 setLogin(true); // optional: show login modal again when closing forgot modal
}} />)}

        <div className={`offcanvas offcanvas-end  ${property ? 'show' : ''}`}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Compare & Selected Property</h5>
                <Link to="#" onClick={()=>setProperty(!property)}>
                    <span className="svg-icon text-primary svg-icon-2hx">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                        </svg>
                    </span>
                </Link>
            </div>
            <div className="offcanvas-body">
                <ul className="nav nav-pills sider_tab mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 1 ? 'active' : ''}`} onClick={()=>setActiveTab(1)}>Compare Property</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 2 ? 'active' : ''}`} onClick={()=>setActiveTab(2)}>Saved Property</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`}>
                        <div className="sidebar_featured_property">

                            {navProperty.slice(0,4).map((item,index)=>{
                                return(
                                    <div className="sides_list_property p-2" key={index}>
                                        <div className="sides_list_property_thumb">
                                            <img src={item.image} className="img-fluid" alt=""/>
                                        </div>
                                        <div className="sides_list_property_detail">
                                            <h4><Link to="/single-property-1">{item.title}</Link></h4>
                                            <span className="text-muted-2"><i className="fa-solid fa-location-dot"></i>{item.loction}</span>
                                            <div className="lists_property_price">
                                                <div className="lists_property_types">
                                                    {item.tag === 'For Sale' && <div className="property_types_vlix sale">For Sale</div>}
                                                    {item.tag === 'For Rent' && <div className="property_types_vlix">For Rent</div>}
                                                    {item.tag === 'For Buy' && <div className="property_types_vlix buy">For Buy</div>}
                                                    
                                                </div>
                                                <div className="lists_property_price_value">
                                                    <h4 className="text-primary">{item.value}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                            <div className="input-group">
                                <Link to="/compare-property" className="btn btn-light-primary fw-medium full-width">View & Compare</Link>
                            </div>
                        </div>	
                    </div>
                    <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`}>
                        <div className="sidebar_featured_property">
                            {navProperty.slice(4,8).map((item,index)=>{
                                return(
                                    <div className="sides_list_property p-2" key={index}>
                                        <div className="sides_list_property_thumb">
                                            <img src={item.image} className="img-fluid" alt=""/>
                                        </div>
                                        <div className="sides_list_property_detail">
                                            <h4><Link to="/single-property-1">{item.title}</Link></h4>
                                            <span className="text-muted-2"><i className="fa-solid fa-location-dot"></i>{item.loction}</span>
                                            <div className="lists_property_price">
                                                <div className="lists_property_types">
                                                    {item.tag === 'For Sale' && <div className="property_types_vlix sale">For Sale</div>}
                                                    {item.tag === 'For Rent' && <div className="property_types_vlix">For Rent</div>}
                                                    {item.tag === 'For Buy' && <div className="property_types_vlix buy">For Buy</div>}
                                                    
                                                </div>
                                                <div className="lists_property_price_value">
                                                    <h4 className="text-primary">{item.value}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="input-group">
                                <Link to="#" className="btn btn-light-primary fw-medium full-width">View & Compare</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
