// import React from 'react'

// function NotificationScreen({ data }) {
//   return (
//     <div>
//       <h1 className='text-center'>NOTIFICATION</h1>
//       <div className="col-md-6  mt-20">
//         {data.map((notification, index) => (
//           <div key={index} className='flex gap-5'>
//             <p>{index + 1}</p>
//             <h1>{notification?.message}</h1>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default NotificationScreen

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:7700/api/notifications/getNotifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1 className='text-center'>NOTIFICATION</h1>
      <div className="col-md-6 mt-20">
        {notifications.map((notification, index) => (
          <div key={index} className='flex gap-5'>
            <p>{index + 1}</p>
            <h1>{notification.message}</h1>
            <p>{notification.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationScreen;
