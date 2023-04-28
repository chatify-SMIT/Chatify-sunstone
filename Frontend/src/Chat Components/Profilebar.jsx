import React from 'react';
import '../css/Profilebar.css';
import {  useLocation , Link } from "react-router-dom";
import Settings from './Settings/Settings';

const Profilebar = () => {
  const location = useLocation();
    return (
      <div className="sidebars d-flex flex-column position-relative">
        <div className="top-icons position-absolute d-flex flex-column  mt-5 align-items-center justify-content-around">
        <Link to="/chatify" className={`mt-3 ${location.pathname === '/chatify' ? 'active' : ''}`}>  <i className=' icon-bubble picon p-2 fs-4 text-dark'></i></Link>
        <Link to="calls"  className={`mt-3 ${location.pathname === '/calls' ? 'active' : ''}`}>   <i className=' la la-phone picon p-2 fs-4 text-dark'></i></Link>
        <Link to="status"  className={`mt-3 ${location.pathname === '/status' ? 'active' : ''}`}> 
            <i className=' la  la-circle-o picon p-2 fs-4 text-dark'></i></Link>
        </div>
        <div className="bottom-icon position-absolute d-flex flex-column  mb-5 align-items-center justify-content-center">
        <Settings />
     
        </div>
      </div>
    );
  };
  
  export default Profilebar;
