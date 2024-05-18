import React, { useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Swal from 'sweetalert2'
function Registerscreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [loading, setloading] = useState(false);

  async function register() {
    if (password === confirmpassword) {
      const user = {
        name: name,
        email: email,
        password: password,
        confirmpassword: password
      }
      console.log("i am user ", user)
      try {
        setloading(true);
        const result = (await axios.post('http://localhost:7700/api/users/register', user)).data
        console.log(result)
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Register Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.href = "/login"
          setloading(false);

          setname("")
          setemail("")
          setpassword("")
          setconfirmpassword("")
        }




      } catch (error) {
        Swal.fire({
          title: "ERROR! Try Again !",
          text: `Error from registerScreen ${error}`,
          icon: "error",
        });
        setloading(false);

        setname("")
        setemail("")
        setpassword("")
        setconfirmpassword("")



      }
    }
    else {
      alert('password not matched')
    }
  }


  return (
    <div>
      {loading ? (<Loader />) :
        (<div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
            <div className='bs'>
              <h2>Register</h2>
              <input type="text" className="form-control mb-2" placeholder="name" value={name} onChange={(e) => { setname(e.target.value) }}></input>
              <input type="text" className="form-control mb-2" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }}></input>
              <input type="text" className="form-control mb-2" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
              <input type="text" className="form-control mb-2" placeholder="confirm password" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }}></input>

              <button className="btn btn-primary mt-3" onClick={register}>Register</button>

            </div>

          </div>
        </div>)}
    </div>
  )
}

export default Registerscreen