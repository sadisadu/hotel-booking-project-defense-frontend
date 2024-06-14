import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

function AdminFinance() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const adminFinanceRef = useRef();

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
      setBookings(response.data);
      calculateTotalAmount(response.data);
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

  const calculateTotalAmount = (bookingsData) => {
    let total = 0;
    bookingsData.filter((booking)=> booking.status === "checkout").forEach(booking => {
      total += booking.totalamount;
    });
    setTotalAmount(total);
  };

  const handleGenerateReport = useReactToPrint({
    content: () => adminFinanceRef.current,
    documentTitle: "Finance",
  });

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      Swal.fire({
        title: "ERROR!",
        text: "Please select both start and end dates",
        icon: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7700/api/bookings/getBookingsByDateRange", {
        params: { startDate, endDate },
      });
      setBookings(response.data);
      calculateTotalAmount(response.data);
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

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Finance Details</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleFilter(); }}>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="from-date">From date:</label>
              <input
                id="from-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                name="from_date"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="to-date">To date:</label>
              <input
                id="to-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                name="to_date"
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-success mt-4">Search</button>
              <button onClick={fetchAllBookings} className="btn btn-secondary mt-4 ml-2">Show All</button>
            </div>
          </div>
        </form>
        <button onClick={handleGenerateReport} className="btn btn-primary mb-3 mt-3">Generate Report</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="total-amount">
              <h2>Total Amount: BDT {totalAmount}</h2>
            </div>
            <div ref={adminFinanceRef}>
              <table className="table table-striped table-border">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Room</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                
                  {bookings.filter((booking)=> booking?.status === "checkout").map((booking, index) => (
                    <tr key={index}>
                      <td>{booking._id}</td>
                      <td>{booking.userid}</td>
                      <td>{booking.room}</td>
                      <td>{moment(booking.fromdate, "DD-MM-YYYY").format("DD/MM/YYYY")}</td>
                      <td>{moment(booking.todate, "DD-MM-YYYY").format("DD/MM/YYYY")}</td>
                      <td>{booking.status}</td>
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





































