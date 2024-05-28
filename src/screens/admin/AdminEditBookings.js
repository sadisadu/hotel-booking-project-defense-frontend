import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function AdminEditBookings({ bookingsData, setEditPopup }) {
  // console.log("popup data", bookingsData)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = async (data) => {

    const imageurls = []
    imageurls.push(data.imgurl1 === "" ? bookingsData?.imageurls[0] : data.imgurl1)
    imageurls.push(data.imgurl2 === "" ? bookingsData?.imageurls[1] : data.imgurl2)
    imageurls.push(data.imgurl3 === "" ? bookingsData?.imageurls[2] : data.imgurl3)

    const dataToSent = {
      roomId: bookingsData?._id,
      name: data.name === "" ? bookingsData?.name : data.name,
      rentperday: data.rentperday === "" ? bookingsData?.rentperday : data.rentperday,
      totalrooms: data.totalrooms === "" ? bookingsData?.totalrooms : data.totalrooms,
      description: data.description === "" ? bookingsData?.description : data.description,
      phonenumber: data.phonenumber === "" ? bookingsData?.phonenumber : data.phonenumber,
      type: data.type === "" ? bookingsData?.type : data.type,
      imageurls
    }
    // console.log(dataToSent)

    try {
      setLoading(true)
      const response = await axios.put("http://localhost:7700/api/rooms/update", dataToSent)
      console.log("i am update room details", response.data)
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Room Details Updated Successfully"
        }).then(result => {
          window.location.reload(0)
          reset()
          setLoading(false)
          setEditPopup(false)
        })
      }
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `Error from update room details ${error}`,
        icon: "error",
      });
      setLoading(false)
    }

  }


  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-center text-6xl text-white'>Edit Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row w-full flex justify-center">
          <div className="col-md-5">
            <input className=' w-[300px]  p-3'   {...register("name")} placeholder='Room name' />
            <input type="text" className=' w-[300px] pl-3' {...register("rentperday")} placeholder='Rent Per Day' />
            <input type="text" className=' w-[300px] pl-3'{...register("totalrooms")} placeholder='Total Rooms' />
            <input type="text" className=' w-[300px] pl-3'{...register("phonenumber")} placeholder='Phone Number' />
            <textarea id="" className='w-[300px] mt-2.5 ring-[1px] ring-black pl-3'{...register("description")} placeholder='Description' rows={5} ></textarea>
          </div>
          <div className="col-md-5">
            <input type="text" className=' w-[300px] pl-3'{...register("type")} placeholder='Type' />
            <input type="text" className=' w-[300px] pl-3'{...register("imgurl1")} placeholder='Image url 1' />
            <input type="text" className=' w-[300px] pl-3'{...register("imgurl2")} placeholder='Image url 2' />
            <input type="text" className=' w-[300px] pl-3'{...register("imgurl3")} placeholder='Image url 3' />
          </div>
        </div>
        <div className='flex justify-center'>
          <button className='btn mt-3' type='submit'>Update</button>
        </div>
      </form>
    </div>
  )
}





export default AdminEditBookings