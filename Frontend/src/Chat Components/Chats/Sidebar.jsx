import { useState,useEffect } from 'react';
import React from 'react';
import '../../css/Sidebar.css';
import { SideBar } from '../../helper/helper';

/*
const MobileSidebar = ({ users, activeUserId, onSelectUser }) => {
  return (
      <div className="chats">
        {users.map((user) => (
          <div className={`chat ${user.selected ? 'selected' : ''}`} key={user.id}>
            <div className="profile-picture">
              <img src="https://picsum.photos/50" alt={user.name} />
            </div>
            <div className="chat-details">
              <div className="chat-name">{user.name}</div>
              <div className="last-message">{user.message}</div>
            </div>
            <div className={`${user.unread ? 'unread' : ''}`}>
                <div className="time top-0">{user.time}</div>
                <div className="d-flex   justify-content-end count-ht  mt-2"><span className={`${user.unread ? 'count' : 'counts'}`}>{user.count}</span></div>            
            </div>

          </div>
        ))}
      </div>
   
  );
};
*/
const NoResultsMessage = () => (
  <div className="d-flex justify-content-center align-items-center h-100">
    No results found.
  </div>
);

const Sidebar = ({ changeChat }) => {
  const [searchText, setSearchText] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await SideBar();
        const a = response.data;
        const usersData = Array.isArray(a)
          ? a
              .filter(item => item._id !== localStorage.getItem('username'))
              .map(item => ({
                id: item._id,
                name: item.userName,
                lastName: item.lastName,
                firstName: item.firstName,
               
              }))
          : [];
        setUsers(usersData);
     
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    
    changeChat(activeUserId);
  }, [activeUserId]);

  const filteredChats = users.filter(user =>
    (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = event => {
    setSearchText(event.target.value);
  };
  return (
    <div className="sidebar">
      <div className="search-bar">
        <div className="search-bar-top d-flex">
          <div className="w-75">
            <span className="fs-4 fw-bold text-dark">Chats</span>
          </div>

          <div className="px-3 py-2 rounded-3 edit">
            <i className="far fa-edit"></i>
          </div>
          <div className="px-3 py-2 rounded-3 edit">
            <i className="icon-options"></i>
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
            <div className={`chat ${user.id === activeUserId ? 'selected' : ''}`} key={user.id}   onClick={() => {
              setActiveUserId(user.id); 
            }}>

              <div className="profile-picture">
                <img src="https://picsum.photos/50" alt={user.name} />
              </div>
              <div className="chat-details">
                <div className="chat-name">{user.firstName} {user.lastName}</div>
                <div className="last-message">{user.message}</div>
              </div>
              <div className={`${user.unread ? 'unread' : ''}`}>
                <div className="time top-0">{user.time}</div>
                <div className="d-flex justify-content-end count-ht mt-2">
                  <span className={`${user.unread ? 'count' : 'counts'}`}>
                    {user.count}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export {Sidebar};
