import React from 'react'

function NotificationScreen({ data }) {
  return (
    <div>
      <h1 className='text-center'>NOTIFICATION</h1>
      <div className="col-md-6  mt-20">
        {data.map((notification, index) => (
          <div key={index} className='flex gap-5'>
            <p>{index + 1}</p>
            <h1>{notification?.message}</h1>

          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationScreen