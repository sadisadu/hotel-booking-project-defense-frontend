import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useReactToPrint } from 'react-to-print';
import AllBookingsTablePrint from '../../utils/AllBookingsTablePrint';

function AdminBookings() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  const adminBookingsRef = useRef();
  const print = useReactToPrint({
    content: () => adminBookingsRef.current,
    documentTitle: "AdminAllBookings",
  });

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
        <h1>All Bookings Details</h1>
        {loading ? (<Loader />)
          :
          (
            <>
              {/* print button  */}
              <div div className="w-full flex justify-end">
                <button
                  onClick={print}
                  className="text-white text-xl bg-green-600 hover:bg-green-700  px-4 py-2 rounded-[10px] outline-none mb-3">
                  Print
                </button>
              </div>
              {/* hidden table for printing */}
              <div className='hidden'>
                <div ref={adminBookingsRef} className='table-responsive p-10'>
                  <div className='mt-10 mb-5'>
                    <h1 className='text-center py-10'>Hotel Booking Report</h1>
                    <p>Title: All Bookings</p>
                    <p>Date: {new Date().toLocaleString()}</p>
                  </div>
                  <AllBookingsTablePrint bookings={bookings} />
                </div>
              </div>

              {/* table to show */}
              <div className=' table-responsive'>
                <table className=' table table-striped table-border '>
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
            </>
          )
        }
      </div>
    </div >
  )
}

export default AdminBookings