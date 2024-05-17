import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function AdminAddRooms() {
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    const imageurls = []
    imageurls.push(data.imgurl1)
    imageurls.push(data.imgurl2)
    imageurls.push(data.imgurl3)

    const dataToSent = {
      name: data.name,
      rentperday: data.rentperday,
      maxcount: data.maxcount,
      description: data.description,
      phonenumber: data.phonenumber,
      type: data.type,
      imageurls
    }
    console.log(dataToSent)

    try {
      setLoading(true)
      const response = await axios.post("http://localhost:7700/api/rooms/addRoom", dataToSent)
      console.log("i am add room", response.data)
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Room Added Successfully"
        }).then(result => {
          window.location.href = "home"
          reset()
          setLoading(false)
        })
      }
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `Error from adminaddroom ${error}`,
        icon: "error",
      });
      setLoading(false)
    }

  }


  return (
    <div>
      <h1>Add Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-5">
            <input className='form-control' {...register("name")} required placeholder='Room name' />
            <input type="text" className='form-control' {...register("rentperday")} required placeholder='Rent Per Day' />
            <input type="text" className='form-control'{...register("maxcount")} required placeholder='Max count' />
            <input type="text" className='form-control'{...register("description")} required placeholder='Description' />
            <input type="text" className='form-control'{...register("phonenumber")} required placeholder='Phone Number' />
          </div>
          <div className="col-md-5">
            <input type="text" className='form-control'{...register("type")} required placeholder='Type' />
            <input type="text" className='form-control'{...register("imgurl1")} required placeholder='Image url 1' />
            <input type="text" className='form-control'{...register("imgurl2")} required placeholder='Image url 2' />
            <input type="text" className='form-control'{...register("imgurl3")} required placeholder='Image url 3' />
            <div className='text-right'>
              <button className='btn mt-3' type='submit'>ADD Room</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}





export default AdminAddRooms