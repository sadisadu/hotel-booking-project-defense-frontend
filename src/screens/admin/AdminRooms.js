import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function AdminRooms() {
  const [loading, setLoading] = useState(true)
  const [allRooms, setAllRooms] = useState([])

  useEffect(() => {

    const fetchAdminAllRooms = async () => {
      try {
        const response = await axios.get("http://localhost:7700/api/rooms/getallrooms")
        setAllRooms(response.data)
        console.log("i am all rooms", response.data)
        setLoading(false)
      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error from adminallrooms ${error}`,
          icon: "error",
        });
        setLoading(false)
      }
    }
    fetchAdminAllRooms()
  }, [])



  return (
    <div className='row'>
      <div className="col-md-12">
        <h1>All Rooms</h1>
        {loading ? (<Loader />)
          :
          (
            <div className='table-responsive'>
              <table className='table table-striped table-border '>
                <thead className=''>
                  <tr>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Rent Per Day</th>
                    <th>Max Count</th>
                    <th>Phone Number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allRooms.length > 0 &&
                    allRooms.map((room, index) => (
                      <tr key={index}>
                        <td>{room?._id}</td>
                        <td>{room?.name}</td>
                        <td>{room?.type}</td>
                        <td>{room?.rentperday}</td>
                        <td>{room?.maxcount}</td>
                        <td>{room?.phonenumber}</td>
                        <td >
                          <button className='btn-outline-primary  mx-2'>
                            <GrEdit size={20} />
                          </button>
                          <button className='btn-outline-danger'>
                            <MdOutlineDeleteOutline size={22} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AdminRooms