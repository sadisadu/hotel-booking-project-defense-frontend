import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <div className='w-full h-[70px] bg-blue-900 flex justify-between items-center px-5 lg:px-5'>
            <div>
                <a href='/home' className='text-3xl text-white' >
               <img src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Tulip_Logo_Design_29_1024x1024.png?v=1680795836" alt="Tulip" className='h-6 mr-2'/>Tulip
                </a>
                
            </div>
            {/* resst of the part */}
            <div className=' h-full '>
                {user ? (
                    <div className='pr- h-full flex items-center'>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user"></i>  {user.name}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="/home">Home</a>
                                {user && user?.isAdmin && <a className="dropdown-item" href="/admin">Admin Panel</a>}
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <a className="dropdown-item" href="/login" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <ul className='h-full w-full flex gap-3 items-center justify-center '>
                            <button className="nav-item  active  duration-300 hover:ring-white hover:bg-blue-500 hover:text-white ring-[1px] ring-blue-400 rounded-md "> <a className="nav-link" href="/register">Register</a> </button>
                            <li className="nav-item   duration-300 hover:ring-white hover:bg-gray-500 hover:text-white ring-[1px] ring-blue-400 rounded-md "> <a className="nav-link" href="/login">Login</a> </li>
                        </ul>

                    </>)}
            </div>
        </div>
    )
}

export default Navbar
























// import React from 'react'

// function Navbar() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg">
//                 <a className="navbar-brand" href="#">New hotels</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item active">
//                             <a className="nav-link" href="register">Register</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="/login">Login</a>
//                         </li>
//                         {/* <li className="nav-item">
//                             <a className="nav-link" href="#">Pricing</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link disabled" href="#">Disabled</a>
//                         </li> */}
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Navbar