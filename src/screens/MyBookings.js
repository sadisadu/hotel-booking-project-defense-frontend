import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

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

  const handleCancelBooking = async (bookingid, roomid) => {
    try {
      setLoading(true)
      const result = await axios.post("http://localhost:7700/api/bookings/cancelBooking", { bookingid, roomid })
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: "Booking Cancelled !!",
        text: "Room cancelled Successfully !!",
      }).then(result => window.location.href = "/profile")
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `Error from handlecancelBooking ${error}`,
        icon: "error",
      });
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading ? (<Loader />) :
            (<>
              {bookings.map((booking) => (
                <div className='bs'>
                  <h1>{booking?.room}</h1>
                  <p><b>Booking ID:</b> {booking?._id}</p>
                  <p><b>CheckIn:</b> {booking?.fromdate}</p>
                  <p><b>Checkout:</b> {booking?.todate}</p>
                  <p><b>Total Amount:</b> {booking?.totalamount}</p>
                  <p><b>Status:</b>
                    {booking?.status === "booked" ?
                      (<b className='pl-2' style={{ color: "green", }}>CONFIRMED</b>)
                      :
                      (<b className='pl-2' style={{ color: "red" }}>CANCELLED</b>)}
                  </p>
                  <div className='text-right'>
                    <button className='cancelBtn' onClick={() => { handleCancelBooking(booking._id, booking.roomid) }}>Cancel Booking</button>
                  </div>
                </div>
              ))}
            </>)}
        </div>
      </div>
    </div>
  )
}

export default MyBookings