import React, { useState } from 'react';
import CallBar  from './CallBar';
import CallData from './CallData';
import DataBlank from '../DataBlank';
const Users = [
  {
    id: 1,
    name: 'maker Doe',
    avatar:'https://picsum.photos/50',
    type:'Outgoing',
    time:'13:00',
    period:"2min 7 seconds",
  },
  {
    id: 2,
    name: 'Jane Doe', 
    avatar:'https://picsum.photos/50',
    type:'Outgoing',
    time:'13:00',
    period:"2min 7 seconds",
  }
];
const AllCalls = [
  { userId: 1, type: 'in comming', time: '11:30 PM', period: "1 min" },
  { userId: 1, type: 'out going', time: '11:30 PM', period: "2 min" },
  { userId: 2, type: 'missed', time: '11:30 PM', period: "3 min" },
  { userId: 2, type: 'incommind', time: '11:30 PM', period: "4 min" },
];


function CallBox() {
  const [activeUserId, setActiveUserId] = useState(null);

  const handleSelectUser = userId => {
    setActiveUserId(userId);
  };

  return (<>
    <div className='d-flex w-100'>
      <CallBar users={Users} activeUserId={activeUserId} onSelectUser={handleSelectUser} />
      {activeUserId && (
     <CallData users={Users} userId={activeUserId} AllCalls={AllCalls} />

      )} {!activeUserId && <DataBlank/>}
    </div>

  </>);
}

export default CallBox;
