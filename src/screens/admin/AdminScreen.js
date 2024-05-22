import { Tabs } from "antd";
import React, { useEffect } from "react";
import { TabPane } from "react-bootstrap";
import AdminBookings from "./AdminBookings";
import AdminRooms from "./AdminRooms";
import AdminUsers from "./AdminUsers";
import AdminAddRooms from "./AdminAddRooms";

function AdminScreen() {

  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem("currentUser"))?.isAdmin) {
  //     window.location.href = "/login"
  //   }
  // }, [])

  return (
    <div className="m-3 mt-3 bs">
      <h2 className="text-center ">Admin Panel</h2>
      <Tabs defaultActiveKey="1" centered className="p-4">
        <TabPane tab="Bookings" key="1">
          <AdminBookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <AdminRooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AdminAddRooms />
        </TabPane>
        <TabPane tab="Users" key="4">
          <AdminUsers />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
