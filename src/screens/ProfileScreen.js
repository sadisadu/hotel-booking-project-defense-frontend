
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import MyBookings from './MyBookings';
import MyProfile from './MyProfile';
import NotificationScreen from './NotificationScreen';
import axios from 'axios';

function ProfileScreen() {

  const user = JSON.parse(localStorage.getItem("currentUser"))
  const [notification, setNotification] = useState()

  useEffect(() => {
    if (!user) {
      window.location.href = "/login"
    }

    const fetchNotification = async () => {
      try {

        const response = await axios.get(`http://localhost:7700/api/bookings/notifications/${user?._id}`)
        console.log("i am notification", response.data)
        setNotification(response.data);
      } catch (error) {
        console.log(error)

      }
    }

    fetchNotification()

  }, [])

  return (
    <>
      <Tabs defaultActiveKey='1' centered className='p-4'
      >
        <TabPane tab="Profile" key="1">
          <MyProfile data={user} />
        </TabPane>
        <TabPane tab="Notification">
          <NotificationScreen data={notification} />
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <MyBookings data={user} />
        </TabPane>
      </Tabs>
    </>
  )
}

export default ProfileScreen