import { useState,useEffect } from 'react';
import Avatar from "react-avatar-edit";
import { Button, Modal } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getUserData } from '../../helper/helper';
import '../../css/security.css'
function Settings() {
    const [settings, setSettings] = useState(false);
    const [account, setAccount] = useState(false);
    const [accountImage, setaccountImage] = useState("https://th.bing.com/th/id/OIP.rr1IxqrICUZp0NVdweJXSAHaD3?w=281&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7");
    const userId = localStorage.getItem('username');
    const [receiverData, setReceiverData] = useState('');
    useEffect(() => {
      async function fetchData() {
        const { data } = await getUserData({ _id: userId });
          setReceiverData(data);
      }
      fetchData();
    }, [userId]);

    const accountClose = () => setAccount(false);
    const settingsShow = () => {setSettings(true);setAccount(false);}
    const settingsClose = () => setSettings(false);
    const accountShow = () => {setAccount(true);setSettings(false);}
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 


    const [viewaccount, setviewaccount] = useState(true);

    const [viewsettings, setviewsettings] = useState(false);

    const displayaccount = () => {setviewaccount(true);setviewsettings(false);}
    const displaypassword = () => {setviewsettings(true);setviewaccount(false);}


    function onClose() {
        setaccountImage(null);
    }
    function onCrop(pv) {
        setaccountImage(pv);
    }
    function onBeforeFileLoad(elem) {
      if (elem.target.files[0].size > 2000000) {
        alert("File is too big!");
        elem.target.value = "";
      }
    }


    return (
        <>
        <i className={`la la-gear picon fs-4 p-2 ${settings ? 'active' : ''} `} onClick={settingsShow}></i>
        <div className="d-flex align-items-center p-2 justify-content-center"  onClick={accountShow} >
            <img className="avatar  fs-4 p-2"src={receiverData.avatar}  alt="avatar" />
          </div>
  
        <Offcanvas className="settings " show={account} onHide={accountClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Account</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex '>
            <div className='d-flex flex-column w-25 '>
                <span className='m-1 py-1' onClick={displaypassword}>Account</span>
                <span className='m-1 py-1'  onClick={displayaccount}>password</span>
                </div>
            <div className={`d-flex flex-column  w-100  px-3 pb-3 ${viewaccount ? 'd-none':'d-flex'} `}>
        <div className={`d-flex justify-content-center  pb-3 align-items-center   `}><img src={accountImage} width={100} height={100} alt="Preview" onClick={handleShow} /></div>   
            <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"santhosh"} style={{borderStyle: "none"}} disabled/><input type="text" value={"santhosh"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-end my-1 p-2 align-items-center  '> <button type='submit' className='btn btn-primary'>Update</button></div>  
                 </div>          
                  <div className={`d-flex flex-column w-100  px-3 pb-3 ${viewsettings ? 'd-none':'d-flex'} `}>
                 <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                 <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                 <div className='d-flex justify-content-end my-1 p-2 align-items-center  '> <button type='submit' className='btn btn-primary'>Update</button></div>  
                        </div>
          </Offcanvas.Body>
        </Offcanvas>


      <Modal show={show} onHide={handleClose}>
        <Modal.Body  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "500px" }}>
        <Avatar onCrop={onCrop} height={500} width={500} onsClose={onClose} onBeforeFileLoad={onBeforeFileLoad}     src={null}/>

        </Modal.Body>

      </Modal>









        <Offcanvas className="settings" show={settings} onHide={settingsClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Settings</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex '>
            <div className='d-flex flex-column w-25 '>
                <span className='m-1 py-1' onClick={displaypassword}>Account</span>
                <span className='m-1 py-1'  onClick={displayaccount}>password</span>
                </div>
            <div className={`d-flex flex-column  w-100  px-3 pb-3 ${viewaccount ? 'd-none':'d-flex'} `}>
        <div className={`d-flex justify-content-center  pb-3 align-items-center   `}><img src={accountImage} width={100} height={100} alt="Preview" onClick={handleShow} /></div>   
            <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"santhosh"} style={{borderStyle: "none"}} disabled/><input type="text" value={"santhosh"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
              <div className='d-flex justify-content-end my-1 p-2 align-items-center  '> <button type='submit' className='btn btn-primary'>Update</button></div>  
                 </div>          
                  <div className={`d-flex flex-column w-100  px-3 pb-3 ${viewsettings ? 'd-none':'d-flex'} `}>
                 <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                 <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                <div className='d-flex justify-content-start my-1 p-2 align-items-center  '> <input type="text" value={"available"} style={{borderStyle: "none"}} disabled/><i className="icon-pencil"></i></div>  
                 <div className='d-flex justify-content-end my-1 p-2 align-items-center  '> <button type='submit' className='btn btn-primary'>Update</button></div>  
                        </div>
          </Offcanvas.Body>
        </Offcanvas>

















      </>
  );
}

export default Settings;
