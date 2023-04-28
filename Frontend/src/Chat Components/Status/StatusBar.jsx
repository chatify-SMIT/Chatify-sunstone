import { useState } from 'react';
import React from 'react';
import '../../css/Sidebar.css';


const NoResultsMessage = () => (
  <div className="d-flex justify-content-center align-items-center h-100">
    No results found.
  </div>
);



const StatusBar = ({ users, activeUserId, onSelectUser }) => {
  const [searchText, setSearchText] = useState('');
  const filteredChats = users.filter(
    (user) => user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="sidebar">
      <div className="search-bar">
        <div className="search-bar-top d-flex">
          <div className="w-75 ">
            <span className="fs-4 fw-bold text-dark">Status</span>
          </div>

      
        </div>
        <div className="mt-2">
          <input
            type="search"
            placeholder="Search or start a new chat"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="chats">
        {filteredChats.length === 0 ? (
          <NoResultsMessage />
        ) : (
          filteredChats.map((user) => (
            <div className={`chat ${user.id === activeUserId ? 'selected' : ''}`} key={user.id}    onClick={() => onSelectUser(user.id)}>
              <div className="profile-picture">
                <img src="https://picsum.photos/50" alt={user.name} />
              </div>
              <div className="chat-details">
                <div className="chat-name">{user.name}</div>
                <div className="time ">{user.time}</div>
              </div>
               
             
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StatusBar;
