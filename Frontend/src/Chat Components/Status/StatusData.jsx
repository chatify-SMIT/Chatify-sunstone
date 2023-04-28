import React, { useState } from 'react';


const CallData = ({users, userId, AllCalls }) =>  {
    console.log(users,userId,AllCalls)
  const userCalls = AllCalls.filter(call => call.userId === userId);
  const userData = users.filter(user => user.id === userId);

  return (  
    <div className="chat-window">
<h4>Status Info</h4>
    </div>
  );
};

export default CallData;




