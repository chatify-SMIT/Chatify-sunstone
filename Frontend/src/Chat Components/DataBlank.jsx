import React, { useState } from 'react';
import chatify from '../chatify.png'

const DataBlank = () =>  {
  
  return (  
    <div className="d-flex flex-column justify-content-center alignitems center container">
   <div className=' d-flex justify-content-center align-items-center '><img src={chatify} className='w-25' alt="Logo" /></div>
   <div className='text-center fs-2'>Chatify for Windows</div>

    </div>
  );
};

export default DataBlank;




