import Login from './Login';
import Signup from './Register';
import '../css/Login.css';
import chatify from '../chatify.png';
import { Outlet} from "react-router-dom";


function Home() {
  return (
    <div className='w-100 d-lg-flex container mt-5 pt-lg-5'>
      <div className='w-100 h-100  d-lg-flex justify-content-center d-none titlehome  align-items-start'>
        <div className='d-flex justify-content-center h-100  fs-1 fw-bold align-items-center'>
          <img className='home_logo' src={chatify} alt='Chatify' />
          CHATIFY
        </div>
      </div>

      <div className='w-100 d-lg-none justify-content-center d-flex flex-column align-items-center'>
        <div className='d-flex justify-content-center h-100 fs-1 fw-bold align-items-center'>
          <img height={50} src={chatify} alt='Chatify' />
        </div>
        <div className='d-flex justify-content-center h-100 fs-1 fw-bold align-items-center'>
          CHATIFY
        </div>
      </div>
 
      <div className='w-100 d-flex justify-content-center mt-5  pt-lg-5 align-items-center'>
      <Outlet />
      </div>
    </div>
  );
}

export default Home;

