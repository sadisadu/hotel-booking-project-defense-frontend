import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StripeCheckout from 'react-stripe-checkout';

import moment from "moment";

function Bookingscrren() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { roomid ,fromdate,todate} = useParams();

  // const roomid =match.params.roomid
  const Fromdate =moment(fromdate,'DD-MM-YYYY')
  const Todate =moment(todate,'DD-MM-YYYY')

  const totaldays =moment.duration(Todate.diff(Fromdate)).asDays()+1
  const totalamount=totaldays*room?.rentperday 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.post("http://localhost:7700/api/rooms/getroombyid", { roomid: roomid });
        

        console.log(response.data);
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

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

    async function bookRoom(){

      const bookingDetails={
        room,
        userid:JSON.parse(localStorage.getItem('currentUser'))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        
      }

      try {
            //  app.use('/api/booking' , bookingsRoute)
        const result =await axios.post("http://localhost:7700/api/booking/bookroom",bookingDetails);

      }catch (error){
console.log("error from booking screen",error)
      }
    }

   async function onToken(token){
      console.log(token);
      const bookingDetails={
        room,
        userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
      }

      try {
        // aita backend ar codeaikhane hoibo na 
            //  app.use('/api/booking' , bookingsRoute)
        const result =await axios.post("http://localhost:7700/api/booking/bookroom",{bookingDetails});
      }catch (error){

      }
    }


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
                  <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From Date :  {fromdate}</p>
                  <p>To Date : {todate} </p>
                  <p>Max Count : {room?.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room?.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                {/* <button className='btn btn-primary'onClick={bookRoom}> Pay Now</button> */}

                <StripeCheckout
                amount={totalamount * 100}
        token={onToken}
        currency='Taka'
        stripeKey="pk_test_51PFdpZRoGuoCEYvahMEyOCb02v4Jy0MjSroZeNzDO2G9rLFsxIMytGh7Gyaq7MI064tJZax6MMoZ5aI48FEqXez600nfLe0dYw"
      />
      <button className="btn btn-primary"onClick={bookRoom}> Pay Now{" "}</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscrren;
