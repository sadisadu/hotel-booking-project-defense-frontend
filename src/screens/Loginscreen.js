import React ,{useState,useEffect} from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';


function Loginscreen() {

  const[email ,setemail] = useState('')
  const[password ,setpassword] = useState('')
  
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();


  async function Login(){
    
      const user={
        email,
        password,
     
      }
      try {
        setloading(true);
        const result = (await axios.post('http://localhost:7700/api/users/login',user)).data
        console.log(result)
        if(result){
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setloading(false);

        localStorage.setItem('currentUser',JSON.stringify(result));
        window.location.href='/home'

        setemail("")
        setpassword("")
       

      } catch (error) {
        console.log(error)
        setloading(false);
        seterror(true)
        setemail("")
        setpassword("")
        
      }
      
    
   
  }


  return (
    <div>
      {/* {loading && (<Loader/>)} */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && (<Error message ='Invalid Credentionals'/>)}
          <div className='bs'>
            <h2>Login</h2>
            
            <input type="text" className="form-control mb-1" placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}} />

            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            
           
          <button className="btn btn-primary mt-3" onClick={Login}>Login</button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Loginscreen