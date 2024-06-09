import React from 'react'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (

    <div className=' overlay '>
      <div className='row '>
        <div className="col-md-12 my-auto text-center">
          <h3 style={{ color: "white", fontSize: "120px" }}> <img src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Tulip_Logo_Design_29_1024x1024.png?v=1680795836" alt="Tulip" className='h-10 mr-2'/>Tulip</h3>
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