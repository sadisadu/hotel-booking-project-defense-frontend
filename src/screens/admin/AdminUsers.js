import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';

function AdminUsers() {
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState([])

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

export default AdminUsers