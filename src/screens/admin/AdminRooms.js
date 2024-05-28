import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import AdminEditRoom from './AdminEditRoom';
import { useReactToPrint } from 'react-to-print';
import AllRoomsTablePrint from '../../utils/AllRoomsTablePrint';

function AdminRooms() {
  const [loading, setLoading] = useState(true)
  const [allRooms, setAllRooms] = useState([])
  const [editPopup, setEditPopup] = useState(false)
  const [number, setNumber] = useState(null)

  const adminRoomRef = useRef();
  const print = useReactToPrint({
    content: () => adminRoomRef.current,
    documentTitle: "AdminAllRooms",
  });


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


  const handleEdit = (id) => {
    setEditPopup(true);
  };

  const handleDelete = (id) => {
    const roomId = id;
    console.log("I am roomid", roomId)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.delete(
              `http://localhost:7700/api/rooms/delete/${roomId}`
            );
            Swal.fire({
              title: "Deleted!",
              text: "Room has been deleted.",
              icon: "success",
            });
            window.location.reload()
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from admin all rooms handleDelete ${err}`,
              icon: "error",
            });
          }
        })();
      }
    });
  };



  return (
    <div className='row'>
      <div className="col-md-12">
        <h1>All Rooms</h1>
        {loading ? (<Loader />)
          :
          (
            <>

              {/* print button  */}
              <div div className="w-full flex justify-end">
                <button
                  onClick={print}
                  className="text-white text-xl bg-green-600 hover:bg-green-700  px-4 py-2 rounded-[10px] outline-none mb-3">
                  Print
                </button>
              </div>
              {/* hidden table for printing */}
              <div className='hidden'>
                <div ref={adminRoomRef} className='table-responsive p-10'>
                  <div className='mt-10 mb-5'>
                    <h1 className='text-center py-10'>Hotel Booking Report</h1>
                    <p>Title: All Room Details</p>
                    <p>Date: {new Date().toLocaleString()}</p>
                  </div>
                  <AllRoomsTablePrint allRooms={allRooms} />
                </div>
              </div>

              {/* table to show */}
              <div className='table-responsive'>
                <table className='table table-striped table-border '>
                  <thead className=''>
                    <tr>
                      <th>Booking ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Rent Per Day</th>
                      <th>Total Rooms</th>
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
                          <td>{room?.totalrooms}</td>
                          <td>{room?.phonenumber}</td>
                          <td className='flex gap-2'>
                            <button onClick={() => {
                              handleEdit(room?._id)
                              setNumber(index)
                            }} className="w-[35px] h-[35px] rounded-full border flex justify-center items-center bg-blue-600 hover:bg-white hover:ring-2 hover:ring-blue-600 hover:text-blue-600 duration-300">
                              <GrEdit size={20} />
                            </button>
                            <button onClick={() => { handleDelete(room?._id) }} className="w-[35px] h-[35px] rounded-full border flex justify-center items-center bg-red-600 hover:bg-white hover:ring-2 hover:ring-red-600 hover:text-red-600 duration-300">
                              <MdOutlineDeleteOutline size={22} />
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          )
        }
      </div>
      {/* edit pop up */}
      {
        editPopup && (
          <div className="fixed left-0 bg-gray-700/80 z-10 top-0 w-full h-full ">
            <button
              onClick={() => setEditPopup(false)}
              className="text-red-500 absolute z-[1000] top-[200px] right-[500px]">
              <AiFillCloseCircle size={40} />
            </button>
            {editPopup && (
              <AdminEditRoom
                roomData={allRooms[number]}
                setEditPopup={setEditPopup}
              />
            )}
          </div>
        )
      }
    </div>
  )

}


export default AdminRooms