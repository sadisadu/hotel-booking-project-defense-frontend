import React from 'react'

function AllRoomsTablePrint({ allRooms }) {
  return (
    <table className='table table-striped table-border '>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Rent Per Day</th>
          <th>Max Count</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {allRooms.length > 0 &&
          allRooms.map((room, index) => (
            <tr key={index}>
              <td>{room?._id}</td>
              <td>{room?.name}</td>
              <td>{room?.type}</td>
              <td>{room?.rentperday}</td>
              <td>{room?.maxcount}</td>
              <td>{room?.phonenumber}</td>

            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default AllRoomsTablePrint