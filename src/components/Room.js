import React from 'react';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';



function Room({ room, fromdate, todate }) {
  // console.log("room", room)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className='smallimg' alt="Room" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
        <b>
          <p>Room Number : {room?.totalrooms}</p>
          <p>Phone Number : {room?.phonenumber}</p>
          <p>Type : {room?.type}</p>
          <p>Location : {room?.location}</p>
          <p>Rent Per Day : {room?.rentperday}</p>
          <div>
          <h4>Rating</h4>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
         </div>
        </b>
       
       
        <div style={{ float: "right" }}> {/* Adjust alignment of button */}

          {(fromdate && todate) && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <Button className="btn btn-primary m-2" >Book Now</Button>
            </Link>
          )}

          

          <button className="btn btn-primary" onClick={handleShow}>view details</button>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Carousel>

            {room.imageurls.map((url, index) => {
              return <Carousel.Item>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                />
              </Carousel.Item>
            })}
          </Carousel>
          <p style={{ whiteSpace: 'pre-wrap' }}>{room?.description}</p>

            
      

          {/* Rating */}
          <div style={{ padding: 10,   }}>
          <h4>Rating</h4>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
          <i class="fa-solid fa-star" ></i>
         </div>
         
         {/* Room Details */}
         <div style={{ padding: 10,   }}>
          <h4>Room Details</h4>
          <p>Floor Number: 3rd </p>
            <p>Room Number:3256</p>
         </div> 

          {/* Features */}
          <div style={{ padding: 10,  }}>
          <h4>Features</h4>
          <p>1 Bathroom  1 Balcony  2 sofa</p>
         </div>

            {/* Facility */}
          <div style={{ padding: 10,  }}>
          <h4>Facilities</h4>
          <p>Wifi   Television   Ac</p>
         </div>

         {/* Area */}
         <div style={{ padding: 10,  }}>
          <h4>Area</h4>
          <p>200 sq.ft.</p>
         </div>

          {/* review part  */}
          <div style={{ padding: 10, }}>
            <h3>Reviews</h3>
            <div>

              {room?.reviews?.map((review, index) => (
                <div key={index} className="review">
                  <p><b>{review.customerName}</b>: {review.description}</p>
                  <div style={{ marginBottom: 5 }}></div>
                </div>
              ))}

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Room;