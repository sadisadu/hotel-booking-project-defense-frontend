import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';


function Room({ room, fromdate, todate }) {
  console.log("room", room)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-6">
        <img src={room.imageurls[0]} className='smallimg' alt="Room" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count : {room?.maxcount}</p>
          <p>Phone Number : {room?.phonenumber}</p>
          <p>Type : {room?.type}</p>
          <p>Rent Per Day : {room?.rentperday}</p>
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
