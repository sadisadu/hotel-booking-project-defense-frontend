import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';

function AdminFinance() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotelName, setHotelName] = useState('');

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
    bookingsData.forEach(booking => {
      total += booking.totalamount;
    });
    setTotalAmount(total);
  };

  const handleGenerateReport = useReactToPrint({
    content: () => adminFinanceRef.current,
    documentTitle: "Finance",
  });

  const handleFilter = async () => {
    if (!startDate || !endDate || !hotelName) {
      Swal.fire({
        title: "ERROR!",
        text: "Please select both start and end dates, and enter a hotel name",
        icon: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7700/api/bookings/getBookingsByDateRangeAndHotel", {
        params: { startDate, endDate, hotelName },
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
        <div className="date-filter mb-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control mt-2"
            placeholder="End Date"
          />
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="form-control mt-2"
            placeholder="Enter Hotel Name"
          />
          <button onClick={handleFilter} className="btn btn-primary mt-2">Filter</button>
          <button onClick={fetchAllBookings} className="btn btn-secondary mt-2 ml-2">Show All</button>
        </div>
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
                    <th>User ID</th>
                    <th>Room</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Status</th>
                    <th>Amount</th>
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





// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useReactToPrint } from 'react-to-print';

// function AdminFinance() {
//   const [loading, setLoading] = useState(true);
//   const [bookings, setBookings] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [selectedDate, setSelectedDate] = useState('');

//   const adminFinanceRef = useRef();

//   useEffect(() => {
//     fetchAdminBookings();
//   }, []);

//   const fetchAdminBookings = async () => {
//     try {
//       const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
//       setBookings(response.data);
//       calculateTotalAmount(response.data);
//       setLoading(false);
//     } catch (error) {
//       Swal.fire({
//         title: "ERROR!",
//         text: `Error from adminbookings ${error}`,
//         icon: "error",
//       });
//       setLoading(false);
//     }
//   };

//   const calculateTotalAmount = (bookingsData) => {
//     let total = 0;
//     bookingsData.forEach(booking => {
//       total += booking.totalamount;
//     });
//     setTotalAmount(total);
//   };

//   const handleGenerateReport = useReactToPrint({
//     content: () => adminFinanceRef.current,
//     documentTitle: "Finance",
//   });

//   const handleFilter = async () => {
//     if (!selectedDate) {
//       Swal.fire({
//         title: "ERROR!",
//         text: "Please select a date",
//         icon: "error",
//       });
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:7700/api/bookings/getBookingsBySpecificDate", {
//         params: { date: selectedDate },
//       });
//       setBookings(response.data);
//       calculateTotalAmount(response.data);
//       setLoading(false);
//     } catch (error) {
//       Swal.fire({
//         title: "ERROR!",
//         text: `Error fetching bookings: ${error}`,
//         icon: "error",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <h1>Finance Details</h1>
//         <div className="date-filter">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="form-control mb-2"
//           />
//           <button onClick={handleFilter} className="btn btn-primary mb-3">Filter</button>
//         </div>
//         <button onClick={handleGenerateReport} className="btn btn-primary mb-3">Generate Report</button>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="total-amount">
//               <h2>Total Amount: BDT {totalAmount}</h2>
//             </div>
//             {/* Render bookings table */}
//             <div ref={adminFinanceRef}>
//               <table className="table table-striped table-border">
//                 <thead>
//                   <tr>
//                     <th>Booking ID</th>
//                     <th>User ID</th>
//                     <th>Room</th>
//                     <th>From Date</th>
//                     <th>To Date</th>
//                     <th>Status</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((booking, index) => (
//                     <tr key={index}>
//                       <td>{booking._id}</td>
//                       <td>{booking.userid}</td>
//                       <td>{booking.room}</td>
//                       <td>{booking.fromdate}</td>
//                       <td>{booking.todate}</td>
//                       <td>{booking.status}</td>
//                       <td>{booking.totalamount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminFinance;











// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useReactToPrint } from 'react-to-print';

// function AdminFinance() {
//   const [loading, setLoading] = useState(true);
//   const [bookings, setBookings] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [filter, setFilter] = useState('all'); // new state for filter

//   const adminFinanceRef = useRef();

//   useEffect(() => {
//     fetchAdminBookings();
//   }, [filter]);

//   const fetchAdminBookings = async () => {
//     try {
//       const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
//       const filteredBookings = filterBookings(response.data);
//       setBookings(filteredBookings);
//       calculateTotalAmount(filteredBookings);
//       setLoading(false);
//     } catch (error) {
//       Swal.fire({
//         title: "ERROR!",
//         text: `Error from adminbookings ${error}`,
//         icon: "error",
//       });
//       setLoading(false);
//     }
//   };

//   const filterBookings = (bookingsData) => {
//     const now = new Date();
//     return bookingsData.filter(booking => {
//       const bookingDate = new Date(booking.fromdate);
//       if (filter === 'monthly') {
//         return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
//       } else if (filter === 'yearly') {
//         return bookingDate.getFullYear() === now.getFullYear();
//       } else {
//         return true;
//       }
//     });
//   };

//   const calculateTotalAmount = (bookingsData) => {
//     let total = 0;
//     bookingsData.forEach(booking => {
//       total += booking.totalamount;
//     });
//     setTotalAmount(total);
//   };

//   const handleGenerateReport = useReactToPrint({
//     content: () => adminFinanceRef.current,
//     documentTitle: "Finance",
//   });

//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <h1>Finance Details</h1>
//         <div className="mb-3">
//           <button onClick={() => setFilter('all')} className="btn btn-secondary mr-2">All</button>
//           <button onClick={() => setFilter('monthly')} className="btn btn-secondary mr-2">Monthly</button>
//           <button onClick={() => setFilter('yearly')} className="btn btn-secondary">Yearly</button>
//         </div>
//         <button onClick={handleGenerateReport} className="btn btn-primary mb-3">Generate Report</button>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="total-amount">
//               <h2>Total Amount: BDT {totalAmount}</h2>
//             </div>
//             <div ref={adminFinanceRef}>
//               <table className="table table-striped table-border">
//                 <thead>
//                   <tr>
//                     <th>Booking ID</th>
//                     <th>User ID</th>
//                     <th>Room</th>
//                     <th>From date</th>
//                     <th>To date</th>
//                     <th>Status info</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((booking, index) => (
//                     <tr key={index}>
//                       <td>{booking._id}</td>
//                       <td>{booking.userid}</td>
//                       <td>{booking.room}</td>
//                       <td>{booking.fromdate}</td>
//                       <td>{booking.todate}</td>
//                       <td>{booking.status}</td>
//                       <td>{booking.totalamount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminFinance;

























































// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useReactToPrint } from 'react-to-print';

// function AdminFinance() {
//   const [loading, setLoading] = useState(true);
//   const [bookings, setBookings] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const adminFinanceRef = useRef();

//   useEffect(() => {
//     const fetchAdminBookings = async () => {
//       try {
//         const response = await axios.get("http://localhost:7700/api/bookings/getAllBookings");
//         setBookings(response.data);
//         calculateTotalAmount(response.data);
//         setLoading(false);
//       } catch (error) {
//         Swal.fire({
//           title: "ERROR!",
//           text: `Error from adminbookings ${error}`,
//           icon: "error",
//         });
//         setLoading(false);
//       }
//     };
//     fetchAdminBookings();
//   }, []);

//   const calculateTotalAmount = (bookingsData) => {
//     let total = 0;
//     bookingsData.forEach(booking => {
//       total += booking.totalamount;
//     });
//     setTotalAmount(total);
//   };

//   const handleGenerateReport = useReactToPrint({
//     content: () => adminFinanceRef.current,
//     documentTitle: "Finance",
//   });

 

//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <h1>Finance Details</h1>
//         <button onClick={handleGenerateReport} className="btn btn-primary mb-3">Generate Report</button>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <div className="total-amount">
//               <h2>Total Amount: BDT {totalAmount}</h2>
//             </div>
//             {/* Render bookings table */}
//             <div ref={adminFinanceRef}>
//               <table className="table table-striped table-border">
//                 <thead>
//                   <tr>
//                     <th>Booking ID</th>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((booking, index) => (
//                     <tr key={index}>
//                       <td>{booking._id}</td>
//                       <td>{booking.fromdate}</td>
//                       <td>{booking.todate}</td>
//                       <td>{booking.totalamount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminFinance;
