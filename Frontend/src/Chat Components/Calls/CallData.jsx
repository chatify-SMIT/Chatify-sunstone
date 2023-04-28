import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Call from '../Mini Components/call'
import VideoCall from '../Mini Components/VideoCall';

const CallData = ({users, userId, AllCalls }) =>  {
    console.log(users,userId,AllCalls)
  const userCalls = AllCalls.filter(call => call.userId === userId);
  const userData = users.filter(user => user.id === userId);

  return (  
    <div className="chat-window">
      <h4 className="p-3">Call Info</h4> 
      <Card className='mx-4'>
      <Card.Header className='bg-light d-flex'>  
              <div className="profile-picture">
                <img src="https://picsum.photos/50"  />
              </div>
              <div className="chat-details">
                <div className="chat-name">{userData[0].name}</div>
                <div className="last-message">hi it me</div>
              </div>
              <div className='d-flex justify-content-end align-items-center'>
              <VideoCall />
         <Call />
              </div>
        </Card.Header>
      <Card.Body className='bg-light'>
      {userCalls.map((x, index) => (
        <div key={index} className='mb-4'>
          <Card.Title>
        {x.time}
        </Card.Title>
        <Card.Text>
          <div className='d-flex w-100'>
            <div className='d-flex justify-content-start align-items-center w-50'>Incomming voice call at 11:20</div>
            <div className='d-flex justify-content-end align-items-center w-50'> {x.period}</div>
          </div>
        </Card.Text>
        </div>
      ))}
      
       
      </Card.Body>
    </Card>

    </div>
  );
};

export default CallData;




