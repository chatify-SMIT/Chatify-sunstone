import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import Chat from './Chat';
import DataBlank from '../DataBlank';
import { getUsername, SideBar, getMessage } from '../../helper/helper';

function ChatBox() {
  const [currentChat, setCurrentChat] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [sender, setSender] = useState('');
  const socket = useRef();
  useEffect(() => {
    setSender(localStorage.getItem('username'));
  }, []);


  useEffect(() => {
    if (sender && currentChat) {
      getMessage({ from: sender, to: currentChat })
        .then((response) => {
          const userMessages = response.data.map((message) => {
            return {
              content: message.content,
              time: message.time,
              sent: message.sent,
            };
          });
          setUserMessages(userMessages);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentChat, sender]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="d-flex w-100">
      <Sidebar changeChat={handleChatChange} />
      {currentChat ? (
        <Chat
          sender={sender}
          receiver={currentChat}
          userMessages={userMessages}
         
        />
      ) : (
        <DataBlank />
      )}
    </div>
  );
}

export default ChatBox;
