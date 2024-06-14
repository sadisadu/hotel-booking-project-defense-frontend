import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useReactToPrint } from "react-to-print";
import AllBookingsTablePrint from "../../utils/AllBookingsTablePrint";
import { GrEdit } from "react-icons/gr";
import { MdOutlineCancel, MdOutlineDeleteOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import AdminEditBookings from "./AdminEditBookings";
import { RxCross2 } from "react-icons/rx";

function AdminBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [number, setNumber] = useState(null);

  const adminBookingsRef = useRef();
  const print = useReactToPrint({
    content: () => adminBookingsRef.current,
    documentTitle: "AdminAllBookings",
  });

  useEffect(() => {
    const fetchAdminBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7700/api/bookings/getAllBookings"
        );
        setBookings(response.data);
        console.log("i am all bookings", response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error from adminbookings ${error}`,
          icon: "error",
        });
        setLoading(false);
      }
    };
    fetchAdminBookings();
  }, []);

  const handleCancel = (id, roomid) => {
    const bookingid = id;
    // console.log("I am bookingid", bookingid)
    // console.log("I am roomid", roomid)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post(
              "http://localhost:7700/api/bookings/admin/cancelBooking",
              { bookingid, roomid }
            );
            Swal.fire({
              title: "Booking Cancelled !!!",
              text: "Booking cancelled Successfully !!",
              icon: "success",
            });
            window.location.reload();
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from admin all rooms handleCancel ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  };

  // handle checkout
  const handleCheckout = (id, roomid) => {
    const bookingid = id;
    // console.log("I am bookingid", bookingid)
    // console.log("I am roomid", roomid)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post(
              "http://localhost:7700/api/bookings/admin/checkout",
              { bookingid, roomid }
            );
            Swal.fire({
              title: "Checked Out !!!",
              text: "Checkout Successful !!",
              icon: "success",
            });
            window.location.reload();
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from admin all rooms handleCheckout ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  };

  const handleRefund = (id, roomid) => {
    const bookingid = id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Refund it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post(
              "http://localhost:7700/api/bookings/admin/makeRefund",
              { bookingid, roomid }
            );
            Swal.fire({
              title: "Granted !!!",
              text: "Refund is Successfully !!",
              icon: "success",
            });
            window.location.reload();
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from admin refund ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>All Bookings Details</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* print button  */}
            <div className="w-full flex justify-end">
              <button
                onClick={print}
                className="text-white text-xl bg-green-600 hover:bg-green-700  px-4 py-2 rounded-[10px] outline-none mb-3"
              >
                Print
              </button>
            </div>
            {/* hidden table for printing */}
            <div className="hidden">
              <div ref={adminBookingsRef} className="table-responsive p-10">
                <div className="mt-10 mb-5">
                  <h1 className="text-center py-10">Hotel Booking Report</h1>
                  <p>Title: All Bookings</p>
                  <p>Date: {new Date().toLocaleString()}</p>
                </div>
                <AllBookingsTablePrint bookings={bookings} />
              </div>
            </div>

            {/* table to show */}
            <div className=" table-responsive">
              <table className=" table table-striped table-border ">
                <thead className="">
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Room</th>
                    <th>Amount</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Cancel</th>
                    <th>CheckOut</th>
                    <th>Checkin time</th>
                    <th>CheckOut time</th>
                    <th>Refund Amount</th>
                    <th>Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 &&
                    [...bookings].reverse().map((booking, index) => (
                      <tr key={index}>
                        <td>{booking?._id}</td>
                        <td>{booking?.userid}</td>
                        <td>{booking?.room}</td>
                        <td>{booking?.totalamount}</td>
                        <td>{booking?.fromdate}</td>
                        <td>{booking?.todate}</td>
                        <td>{booking?.status}</td>
                        <td className="flex gap-2">
                          {booking?.status === "booked" && (
                            <button
                              onClick={() => {
                                handleCancel(booking?._id, booking?.roomid);
                              }}
                              className="w-[35px h-[35px] px-2 rounded-full border flex justify-center  items-center bg-red-600  hover:bg-red-700 text-white  duration-300"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                        {/* Checkout part */}
                        <td className="">
                          {booking?.status === "booked" && (
                            <button
                              onClick={() => {
                                handleCheckout(booking?._id, booking?.roomid);
                              }}
                              className=" h-[35px] px-2 rounded-full  flex justify-center  items-center bg-sky-600  hover:bg-sky-700 text-white  duration-300"
                            >
                              Checkout
                            </button>
                          )}
                        </td>
                        <td>10 am</td>
                        <td>9 am</td>

                        {/* refund ammount part */}
                        <td>
                          {(booking?.status != "booked" && booking?.status != "checkout") && (
                            <div className='DcancelBtn'>
                              {booking?.totalamount - (booking?.totalamount * 30) / 100}
                            </div>
                          )}
                        </td>
                        {/* refund part */}
                        <td>
                          {((booking?.reqRefund === true && booking?.isRefunded === false) || (booking?.status != "booked" && booking?.status != "checkout" && booking?.isRefunded === false)) && (
                            <div>
                              <button
                                onClick={() => {
                                  handleRefund(booking?._id, booking?.roomid);
                                }}
                                className="cancelBtn"
                              >
                                Refund
                              </button>
                            </div>
                          )}
                          {booking?.isRefunded === true && (
                            <div>
                              <button
                                className="TrefundBtn"
                              >
                                Refunded
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* edit pop up */}
      {editPopup && (
        <div className="fixed left-0 bg-gray-700/80 z-10 top-0 w-full h-full ">
          <button
            onClick={() => setEditPopup(false)}
            className="text-red-500 absolute z-[1000] top-[200px] right-[500px]"
          >
            <AiFillCloseCircle size={40} />
          </button>
          {editPopup && (
            <AdminEditBookings
              bookingsData={bookings[number]}
              setEditPopup={setEditPopup}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AdminBookings;