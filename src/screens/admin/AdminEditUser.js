import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function AdminEditUser({ userData, setEditPopup }) {
  console.log("popup data", userData)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const convertIsAdmin = data.isAdmin === "true" ? true : false
    const dataToSent = {
      userId: userData?._id,
      name: data.name === "" ? userData?.name : data.name,
      email: data.email === "" ? userData?.email : data.email,
      isAdmin: data.isAdmin === "" ? userData?.isAdmin : convertIsAdmin
    }
    console.log(dataToSent)

    try {
      setLoading(true)
      const response = await axios.put("http://localhost:7700/api/users/update", dataToSent)
      console.log("i am update user details", response.data)
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "User Details Updated Successfully"
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
        text: `Error from update user details ${error}`,
        icon: "error",
      });
      setLoading(false)
    }

  }


  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-center text-6xl text-white'>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row w-full flex justify-center">
          <div className="">
            <input type="text" className=' w-[500px] pl-3' {...register("name")} placeholder='Name' />
            <input type="text" className=' w-[500px] pl-3'{...register("email")} placeholder='Email' />

            {/* isadmin */}
            <div className='mt-3 '>
              <label htmlFor="selectOption" className=" block text-xl  text-white">
                Is Admin
              </label>
              <select
                id="selectOption"
                {...register("isAdmin")}
                placeholder="Is Admin"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

          </div>
        </div>
        <div className='flex justify-center'>
          <button className='btn mt-3' type='submit'>Update</button>
        </div>
      </form>
    </div>
  )
}





export default AdminEditUser