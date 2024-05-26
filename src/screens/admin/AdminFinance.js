import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';

function AdminFinance() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const adminFinanceRef = useRef();

  useEffect(() => {
    const fetchAdminBookings = async () => {
      try {
        const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
        setBookings(response.data);
        calculateTotalAmount(response.data);
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

  const calculateTotalAmount = (bookingsData) => {
    let total = 0;
    bookingsData.forEach(booking => {
      total += booking.totalamount;
    });
    setTotalAmount(total);
  };

  const handleGenerateReport = useReactToPrint({
    content: () => adminFinanceRef.current,
    documentTitle: "Finance",
  });

 

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Finance Details</h1>
        <button onClick={handleGenerateReport} className="btn btn-primary mb-3">Generate Report</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="total-amount">
              <h2>Total Amount: BDT {totalAmount}</h2>
            </div>
            {/* Render bookings table */}
            <div ref={adminFinanceRef}>
              <table className="table table-striped table-border">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking._id}</td>
                      <td>{booking.fromdate}</td>
                      <td>{booking.todate}</td>
                      <td>{booking.totalamount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminFinance;
