import React from 'react'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (

    <div className=' overlay '>
      <div className='row '>
        <div className="col-md-12 my-auto text-center">
          <h3 style={{ color: "white", fontSize: "120px" }}>Booking Hotel</h3>
          <h1 style={{ color: "white" }}>Book Your Room Now.</h1>
          <Link to="/home">
            <button className='landingBtn'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingScreen