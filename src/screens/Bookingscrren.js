import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StripeCheckout from 'react-stripe-checkout';

import moment from "moment";
import { message } from 'antd';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

function Bookingscrren() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { roomid, fromdate, todate } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [ratingNum, setRatingNum] = useState(0)

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const Fromdate = moment(fromdate, 'DD-MM-YYYY');
  const Todate = moment(todate, 'DD-MM-YYYY');
  const totaldays = moment.duration(Todate.diff(Fromdate)).asDays() + 1;
  const totalamount = totaldays * room?.rentperday;


  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("I am user", user);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:7700/api/rooms/getroombyid", { roomid: roomid });
        console.log("room data", response.data);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  // onToken Function
  async function onToken(token) {
    // console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))?._id,
      Fromdate,
      Todate,
      totalamount,
      totaldays,
      token,
      childNumber: childCount,
      adultNumber: adultCount
    }

    try {
      setLoading(true)
      const result = await axios.post("http://localhost:7700/api/bookings/bookroom", bookingDetails);
      console.log("bookingscreen", result)
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: "Congratulations !!",
        text: "Your room Booked Successfully !!",
      }).then(result => window.location.href = "/profile")

    } catch (error) {
      setLoading(false)
      Swal.fire({
        title: "Something went wrong!! Try Again !",
        text: `Error from bookingScrrens ${error}`,
        icon: "error",
      });
    }
  }

  // review ---: 
  const submitReview = async () => {
    const review = {
      comment: reviewDescription,
      customerName: reviewName || user?.name,
      rating: ratingNum
    };

    console.log("review ---:", review, roomid);

    try {
      setLoading(true);
      console.log("i am in try block")
      const response = await axios.post("http://localhost:7700/api/rooms/addreview", { roomid, review });
      console.log("I am review response ", response.data)
      setRoom(response.data);
      setLoading(false);
      setShowReviewModal(false);
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
      });
    } catch (error) {
      console.log("i am in catch block")
      setLoading(false);
      Swal.fire({
        title: "Something went wrong!! Try Again!",
        text: `Error: ${error}`,
        icon: "error",
      });
    }
  };

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room?.name}</h1>
              <img src={room?.imageurls[0]} className='bigimg' alt={room?.name} />
            </div>

            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : {JSON.parse(localStorage.getItem('currentUser'))?.name}</p>
                  <p>From Date : {fromdate}</p>
                  <p>To Date : {todate}</p>
                  <p>Checkin time: 10 am</p>
                  <p>CheckOut time: 9 am</p>
                  <p>Room Number : {room?.totalrooms}</p>

                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  {/* adding adult childpart */}
                  {room?.type.toLowerCase() === "double" || room?.type.toLowerCase() === "delux" && (<div>
                    {/* enter adult number */}
                    <div className='w-full flex flex-col items-end border-b py-3'>
                      <p>Enter number of Adults: </p>
                      <p>{adultCount}</p>
                      <div className='flex gap-1'>
                        <button onClick={() => {
                          if (adultCount < 2) {
                            setAdultCount((prev) => prev + 1)
                          }
                        }} className='w-[30px] h-[30px] flex justify-center items-center border border-gray-200 rounded-[6px]'>+</button>
                        <button onClick={() => {
                          if (adultCount > 0) {
                            setAdultCount((prev) => prev - 1)
                          }
                        }} className='w-[30px] h-[30px] flex justify-center items-center border border-gray-200 rounded-[6px]'>-</button>
                      </div>
                    </div>
                    {/* enter child number */}
                    <div className='w-full flex flex-col items-end border-b py-3'>
                      <p>Enter number of Child: </p>
                      <p>{childCount}</p>
                      <div className='flex gap-1'>
                        <button onClick={() => {
                          if (childCount < 2) {
                            setChildCount((prev) => prev + 1)
                          }
                        }} className='w-[30px] h-[30px] flex justify-center items-center border border-gray-200 rounded-[6px]'>+</button>
                        <button onClick={() => {
                          if (childCount > 0) {
                            setChildCount((prev) => prev - 1)
                          }
                        }} className='w-[30px] h-[30px] flex justify-center items-center border border-gray-200 rounded-[6px]'>-</button>
                      </div>
                    </div>
                  </div>)}
                  {/*  */}
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room?.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>

              <div className='flex flex-col gap-3' style={{ float: 'right' }}>
                <StripeCheckout
                  name={`Name: ${user?.name}`}
                  shippingAddress={false}
                  billingAddress={true}
                  zipCode={false}
                  amount={totalamount * 100}
                  token={onToken}
                  image={room?.imageurls[0]}
                  currency='BDT'
                  stripeKey="pk_test_51PFdpZRoGuoCEYvahMEyOCb02v4Jy0MjSroZeNzDO2G9rLFsxIMytGh7Gyaq7MI064tJZax6MMoZ5aI48FEqXez600nfLe0dYw"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>

                <button className='px-3 py-2.5 bg-black text-white rounded-lg' onClick={() => setShowReviewModal(true)}>
                  Review
                </button>

              </div>
            </div>

          </div>
          <div className='py-[20px]'>
            <h3>Reviews</h3>
            <div className="flex flex-col ">
              {room?.reviews?.map((review, index) => (
                <div key={index} className='py-3' >
                  <div className='flex flex-col'>
                    <div className='flex gap-2'> 
                      <span>{review?.customerName}:</span>
                      <span>{review?.comment}</span>
                      </div>
                    <div className=' flex items-center'>
                      Rating : <Rating
                        style={{ maxWidth: 100 }}
                        value={review?.rating}
                        readOnly
                      />
                    </div>
                  </div>

                </div>
              ))}

            </div>

          </div>
        </div>
      )}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* description */}
            <div className='pb-3'>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  rows={3}
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                />
              </Form.Group>
            </div>
            {/* name */}
            <div className='pb-3'>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your name"
                />
              </Form.Group>
            </div>
            {/* rating */}
            <div>
              <Rating
                isRequired
                style={{ maxWidth: 180 }}
                value={ratingNum}
                onChange={setRatingNum}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={submitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Bookingscrren;
