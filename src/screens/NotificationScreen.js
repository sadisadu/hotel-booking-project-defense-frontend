

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationScreen({data}) {
  const [notifications, setNotifications] = useState([]);
  console.log("{data}",data)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:7700/api/bookings/notifications`);
        console.log("notifications",response.data)
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
        {notifications.filter((notification)=> notification?.userid === data?._id).map((notification, index) => (
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
