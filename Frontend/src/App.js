import './App.css';
import ChatBox from './Chat Components/Chats/Chatbox'
import CallBox from './Chat Components/Calls/Callbox'
import StatusBox from './Chat Components/Status/Statusbox'
import Login from './Login/Login';
import SignUp from './Login/Register';
import Root from './Chat Components/root'
import Forgotpassword from './Login/Forgotpassword';
import Home from './Login/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Chat Components/Chats/Main';
import Page404 from './404';
import AuthorizeUser from './helper/auth';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Login />} />
        <Route path="resetpassword" element={<Forgotpassword />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
        <Route path="/chatify" element={<AuthorizeUser><Main /></AuthorizeUser>} >
          <Route path="/chatify" element={<ChatBox />} />
          <Route path="calls" element={<CallBox />} />
          <Route path="status" element={<StatusBox />} />
        </Route>
     

      </Route>
    </Routes>
  </BrowserRouter>


  );
}




export default App;
