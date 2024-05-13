import React , {useState , useEffect } from 'react'
import axios from "axios";
import Room from '../components/Room';
import { DatePicker, Radio } from 'antd';

import 'antd/dist/reset.css'; 
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

function Homescreen () 
{
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] =useState();
  const [todate, settodate] =useState();
  const [duplicaterooms, setduplicaterooms] =useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await axios.get("http://localhost:7700/api/rooms/getallrooms")
        console.log("i am response",response.data)
        setrooms(response.data)
        // setduplicaterooms(data)
        setloading(false)

      } catch (error) {
        seterror(true)
        console.log(error)
        setloading(false);
      }
    };

    fetchData();
  }, []);


  function filterByDate(dates){
   
    setfromdate((dates[0]).format('DD-MM-YYYY'))
    settodate((dates[1]).format('DD-MM-YYYY'))

    var temprooms =[]
    var availability =false
    for(const room of duplicaterooms)
    {
      if(room.currentbookings.length>0){

        for (const booking of room.currentbookings){
            if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)
          ){
            if(
              moment(dates[0]).format('DD-MM-YYYY') !==booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !==booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !==booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !==booking.todate 
            )
            {
              availability =true;
            }
          }
        }
      
      }
      if(availability == true || room.currentbookings.length==0)
      {
        temprooms.push(room)
      }
      setrooms(temprooms)
    }

  }
 

  return (
    
    <div className='container'>

      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate}/>

        </div>

      </div>

      <div className="row justify-content-center mt-5">
         {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
         


   
    rooms.map((room) => {
            return <div className="col-md-9">
              <Room room = {room} fromdate={fromdate} todate={todate}/>
            </div>;
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;