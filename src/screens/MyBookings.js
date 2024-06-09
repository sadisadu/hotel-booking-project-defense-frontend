import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'
import { Tag, Divider } from 'antd'
function MyBookings({ data }) {

  const userid = data._id

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchuserBookings = async () => {
      try {
        setLoading(true)
        const bookings = await axios.post("http://localhost:7700/api/bookings/getbookings", { userid: userid })
        setBookings(bookings.data)
        console.log(bookings.data)
        setLoading(false)

      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error from mybookings ${error}`,
          icon: "error",
        });
        setLoading(false)
      }
    }
    fetchuserBookings()
  }, [])

  const handleCancelBooking = (bookingid, roomid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post("http://localhost:7700/api/bookings/cancelBooking", { bookingid, roomid })
            Swal.fire({
              title: "Canceled!",
              text: "Booking has been Canceled.",
              icon: "success",
            });
            window.location.reload()
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from handleCancel booking ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  }

  // handleChekout
  const handleCheckout = (bookingid, roomid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Chekout!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post("http://localhost:7700/api/bookings/checkout", { bookingid, roomid })
            Swal.fire({
              title: "Checkout Successful !!! ",
              icon: "success",
            });
            window.location.reload()
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from handleCheckout  ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  }

  // handle refund
  const handleReqRefund = (bookingid, roomid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request for Refund!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.post(
              "http://localhost:7700/api/bookings/refundBooking",
              { bookingid, roomid }
            );
            Swal.fire({
              title: "Requested!",
              text: "Request for Refund has been sent.",
              icon: "success",
            });
            window.location.reload();
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from Refund booking ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  };


  return (
    <div>
      <div className="row">

        {loading ? (
          <Loader />
        ) : (
          <div className="col-md-6 ">
            {[...bookings].reverse().map((booking) => (
              <div className="bs">
                <h1>{booking?.room}</h1>
                <p>
                  <b>Booking ID:</b> {booking?._id}
                </p>
                <p>
                  <b>CheckIn:</b> {booking?.fromdate}
                </p>
                <p>
                  <b>Checkout:</b> {booking?.todate}
                </p>
                <p>
                  <b>Total Amount:</b> {booking?.totalamount}
                </p>
                <p>
                  <b>Status:</b>
                  {booking?.status === "booked" ? (
                    <b className="pl-2" style={{ color: "green" }}>
                      CONFIRMED
                    </b>
                  ) : (
                    <b className="pl-2 text-red-600 uppercase">
                      {booking?.status}
                    </b>
                  )}
                </p>
                {/* cancel booking part */}
                <div className="text-right">
                  {booking?.status === "booked" && (
                    <button
                      className="cancelBtn"
                      onClick={() => {
                        handleCancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

                {/* checkout booking part */}
                <div className="text-right mt-2">
                  {booking?.status === "booked" && (
                    <button
                      className="bg-sky-600 p-2 rounded-[10px] text-white uppercase"
                      onClick={() => {
                        handleCheckout(booking._id, booking.roomid);
                      }}
                    >
                      Checkout
                    </button>
                  )}
                </div>
                {/* refund part */}
                <div>
                  <div className="text-left">
                    {booking?.status !== "booked" && booking?.status !== "checkout" && booking?.reqRefund === false && booking?.isRefunded === false && (
                      <button
                        className="refundBtn"
                        onClick={() => {
                          handleReqRefund(booking._id, booking.roomid);
                        }}
                      >
                        Request Refund
                      </button>
                    )}
                  </div>
                  <div className="text-left">
                    {booking?.reqRefund === true && booking?.isRefunded === false && (
                      <button className="TrefundBtn">
                        Refund Request has been sent
                      </button>
                    )}
                  </div>
                  <div className="text-left">
                    {booking?.isRefunded === true && (
                      <button className="TrefundBtn">
                        Refund has been made
                      </button>
                    )}
                  </div>
                  <div >
                    {booking?.isRefunded === true && (
                      <div className="TrefundBtn">Refunded Amount : {(booking?.totalamount) - (booking?.totalamount * 30) / 100}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;

