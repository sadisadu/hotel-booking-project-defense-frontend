
import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import MyBookings from './MyBookings';
import MyProfile from './MyProfile';

function ProfileScreen() {

  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if (!user) {
      window.location.href = "/login"
    }
  }, [])

  return (
    <>
      <Tabs defaultActiveKey='1' centered className='p-4'
      >
        <TabPane tab="Profile" key="1">
          <MyProfile data={user} />
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <MyBookings data={user} />
        </TabPane>
      </Tabs>
    </>
  )
}

export default ProfileScreen