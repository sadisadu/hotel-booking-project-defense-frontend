import React from 'react'

function MyProfile({ data }) {
  return (
    <div>
      <h1>Name: {data?.name}</h1>
      <h1>Email: {data?.email}</h1>
      {/* <h1>isAdmin: {data?.isAdmin ? "Yes" : "No"}</h1> */}
      {/* <h1>Phone Number: {data?.number}</h1> */}
      {/* <h1>Address: {data?.Address}</h1> */}
    </div>
  )
}

export default MyProfile