import React from 'react'

function AllUsersTablePrint({ allUsers }) {
  return (
    <table className='table table-striped table-border '>
      <thead className=''>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Is Admin</th>

        </tr>
      </thead>
      <tbody>
        {allUsers.length > 0 &&
          allUsers.map((user, index) => (
            <tr key={index}>
              <td>{user?._id}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.isAdmin ? "YES" : "NO"}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default AllUsersTablePrint