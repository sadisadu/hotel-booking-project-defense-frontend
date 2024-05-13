import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';

function AdminBookings() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  useEffect(() => {

    const fetchAdminBookings = async () => {
      try {

        const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings")
        setBookings(response.data)
        console.log("i am all bookings", response.data)
        setLoading(false)
      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error from adminbookings ${error}`,
          icon: "error",
        });
        setLoading(false)
      }
    }
    fetchAdminBookings()
  }, [])



  return (
    <div className='row'>
      <div className="col-md-12">
        <h1>All Bookings</h1>
        {loading ? (<Loader />)
          :
          (
            <div className='table-responsive'>
              <table className='table table-striped table-border '>
                <thead className=''>
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Room</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 &&
                    bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking?._id}</td>
                        <td>{booking?.userid}</td>
                        <td>{booking?.room}</td>
                        <td>{booking?.fromdate}</td>
                        <td>{booking?.todate}</td>
                        <td>{booking?.status}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AdminBookings