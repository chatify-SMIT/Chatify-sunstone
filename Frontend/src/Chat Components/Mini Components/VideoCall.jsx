
import chatify from '../../chatify.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';




function VideoCall() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Mic, setMic] = useState(false);
  const mike = () => {
      setMic(!Mic);
    };
  return (
    <>
      <div className="headico px-lg-3 py-lg-2 mx-lg-2 mx-2 " onClick={handleShow}> <i className="la la-video-camera fs-2"></i></div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <img className='logo' src={chatify} alt="Chatify" />
            <strong className='mx-3'>Santhosh</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "500px" }}>
        <img className="calllogo  fs-4 p-2"src="https://picsum.photos/50"  alt="avatar" />
            <strong>Santhosh</strong><strong>Ringing..</strong>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="callbtn btn btn-light text-light bg-primary" onClick={mike}>
            <FontAwesomeIcon icon={Mic ? faMicrophone : faMicrophoneSlash} />
            </Button>
            <button className="callbtn btn btn-light text-light bg-warning" type="button"><i className="fas fa-phone" ></i></button>
            <button className="callbtn btn btn-light text-light bg-danger" type="button"><i className="fas fa-phone" style={{ transform: 'rotate(-132deg)' }} ></i></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VideoCall;
