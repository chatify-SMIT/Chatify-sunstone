import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import '../css/Title.css';
import chatify from '../chatify.png';
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate()
  const handleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const userLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <div className="title d-flex flex-row">
      <div className="w-50 d-flex flex-row align-items-center justify-content-start">
        <img className="logo" src={chatify} alt="Chatify" />
        <span className="px-2 fs-5 fw-semibold">Chatify</span>
      </div>
      <div className="w-50 d-flex flex-row align-items-center justify-content-end">
        <div className="titleico py-3 d-flex justify-content-center align-items-center px-3 mx-1 my-2" onClick={handleFullscreen}>
          <FontAwesomeIcon icon={isFullscreen ? faWindowMaximize : faWindowRestore} />
        </div>
        <div className="titleico py-3 d-flex justify-content-center align-items-center px-3 my-2" onClick={userLogout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </div>
      </div>
    </div>
  );
};

export default Headers;
