import React from 'react'

function AllBookingsTablePrint({ bookings }) {
  return (
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
  )
}

export default AllBookingsTablePrint