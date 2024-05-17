import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import AdminEditUser from './AdminEditUser';

function AdminUsers() {
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState([])
  const [editPopup, setEditPopup] = useState(false)
  const [number, setNumber] = useState(null)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7700/api/users/getallusers")
        setAllUsers(response.data)
        console.log("i am all users", response.data)
        setLoading(false)
      } catch (error) {
        Swal.fire({
          title: "ERROR!",
          text: `Error from adminallusers ${error}`,
          icon: "error",
        });
        setLoading(false)
      }
    }
    fetchAllUsers()
  }, [])


  const handleEdit = (id) => {
    setEditPopup(true);
  };

  const handleDelete = (id) => {
    const userId = id;
    console.log("I am userid", userId)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.delete(
              `http://localhost:7700/api/users/delete/${userId}`
            );
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            window.location.reload()
          } catch (err) {
            Swal.fire({
              title: "ERROR!",
              text: `Error from admin all user handleDelete ${err}`,
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
        <h1>All Users</h1>
        {loading ? (<Loader />)
          :
          (
            <div className='table-responsive'>
              <table className='table table-striped table-border '>
                <thead className=''>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 &&
                    allUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{user?._id}</td>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.isAdmin ? "YES" : "NO"}</td>
                        <td className='flex gap-2'>
                          <button onClick={() => {
                            handleEdit(user?._id)
                            setNumber(index)
                          }} className="w-[35px] h-[35px] rounded-full border flex justify-center items-center bg-blue-600 hover:bg-white hover:ring-2 hover:ring-blue-600 hover:text-blue-600 duration-300">
                            <GrEdit size={20} />
                          </button>
                          <button onClick={() => { handleDelete(user?._id) }} className="w-[35px] h-[35px] rounded-full border flex justify-center items-center bg-red-600 hover:bg-white hover:ring-2 hover:ring-red-600 hover:text-red-600 duration-300">
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
              <AdminEditUser
                userData={allUsers[number]}
                setEditPopup={setEditPopup}
              />
            )}
          </div>
        )
      }
    </div>
  )
}

export default AdminUsers