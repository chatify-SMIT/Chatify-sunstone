import React from 'react';
import '../../css/Mobilebar.css';
const Mobilebar = () => {
    return (
      <div className=" d-flex flex-column bg-success mobileheader ">
         <div className=" mobileheader1 mt-2">
         <span className=" w-100 text-light d-flex justify-content-start mx-4 fs-3 fw-bold">Chatify</span>
<span className=" w-25 text-light d-flex justify-content-center fw-bold"><i className="fas fa-search"></i></span>
<span className=" w-25 text-light d-flex justify-content-center fw-bold"> <i className="icon-options-vertical"></i></span>
         </div>
         <div className=" mobileheader2">
<span className=" w-100 text-light d-flex justify-content-center fw-bold">Chats</span>
<span className=" w-100 text-light d-flex justify-content-center fw-bold">Status</span>
<span className=" w-100 text-light d-flex justify-content-center fw-bold">Calls</span>
         </div>
      </div>
    );
  };
  
  export default Mobilebar;
  