import React, { useState, useEffect } from 'react';
import Main from './Chats/Main';
import chatify from '../chatify.png'
function OpeningAnimation() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
    }, 1000);
  }, []);

  return (
    <div className="openlayout">
      {showLogo ? <img src={chatify} className='open' alt="Logo" /> : <Main />}
    </div>
  );
}


export default OpeningAnimation;
