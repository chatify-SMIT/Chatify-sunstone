import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button, Modal } from 'react-bootstrap';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [show, setShow] = useState(false);

  const startRecording = () => {
    Mp3Recorder.start()
      .then(() => {
        setIsRecording(true);
      })
      .catch((err) => console.error(err));
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
      })
      .catch((err) => console.log(err));
      setShow(true);
  };

  return (
    <div>
      {isRecording ? (
       <div className="headico py-lg-3 d-flex justify-content-center align-items-center px-lg-3 mx-2" onClick={stopRecording}>
 <i className="fas fa-stop-circle"></i>
</div>
      ) : (
 
<div className="headico py-lg-3 d-flex justify-content-center align-items-center px-lg-3 mx-2" onClick={startRecording}>
     <i className="icon-microphone "></i>
</div>
      )}
      {blobURL && (<>
              <Modal show={show} onHide={ () => setShow(false)}>
          
              <Modal.Body  className="d-flex flex-column justify-content-center align-items-center">
             <audio src={blobURL} controls="controls" />
              </Modal.Body>
            </Modal>
       </>
      )}
    </div>
  );
}

export default AudioRecorder;
