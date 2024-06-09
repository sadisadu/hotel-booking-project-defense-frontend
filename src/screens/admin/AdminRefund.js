import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { calculateRefund } from '../utils/refundCalculator';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
function AdminRefund() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error fetching bookings: ${error}`,
          icon: "error",
        });
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleRefund = async (bookingId) => {
    const booking = bookings.find(b => b._id === bookingId);
    // const refundAmount = calculateRefund(booking);

    // if (refundAmount === 0) {
    //   Swal.fire({
    //     title: "No Refund",
    //     text: "No refund available for this booking.",
    //     icon: "info",
    //   });
    //   return;
    // }

    try {
      await axios.post("http://localhost:7700/api/bookings/refundBooking", { bookingId });
      Swal.fire({
        title: "Success",
        // text: `Refund of BDT ${refundAmount} processed successfully.`,
        text: `Refund of BDT processed successfully.`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `Error processing refund: ${error}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Refund Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (

          
          
          <table className="table table-striped table-border">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Room</th>
                <th>From date</th>
                <th>To date</th>
                <th>Status info</th>
                <th>Amount</th>
                <th>Refund</th>
                {/* <th>Refund</th> */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                  <td>{booking.totalamount}</td>
                  <td>
                          {(booking?.status != "booked") && (
                            <div className='DcancelBtn'>
                              {booking?.totalamount - (booking?.totalamount * 30) / 100}
                            </div>
                          )}
                        </td>
                  {/* <td>
                    <button
                      onClick={() => {
                        handleRefund(booking._id)
                        toast.success("Refund success", {
                          position: "top-right",
                          autoClose: false,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          transition: Bounce,
                        })

                      }}
                      className="btn btn-danger"
                    >
                      Process Refund
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div >
  );
}

export default AdminRefund;

