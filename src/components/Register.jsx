import React, { useState } from 'react'
import Heading from '../components/Heading'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import "../style.scss"


const Register = () => {

   const [values ,setValues]= useState({
    username:'',
    email:'',
    password:''
   })

   const navigate= useNavigate()
   const  handleSubmit = async (event) =>{
    event.preventDefault();
    await axios.post('http://localhost:5000/api/auth/adminRegister', values)
    .then(res =>{
      if(res.data.status === "Success"){
        navigate("/api/admin/login")
      }else{
        alert("Already Registered!!!")
      }
    })
    .then(err => console.log(err));
   }

  return (
    <>
      <div>
        <Heading />
        <form action="" onSubmit={handleSubmit}>
        <div id='dash'>
          <section>
            <div className="register">
             
              <div className="content">

                <h2>Admin Register</h2>

                <div className="form">

                  <div className="inputBox">
                    <label htmlFor="username"></label>
                    <input type="text" name='username' required onChange={e => setValues({...values, username: e.target.value})} /> <i>Username</i>
                  </div>

                  <div className="inputBox">
                    <label htmlFor="email"></label>
                    <input type="email" name='email' required onChange={e => setValues({...values, email: e.target.value})}/> <i>Email</i>
                  </div>

                  <div className="inputBox">
                    <label htmlFor="password"></label>
                    <input type="password" required name='password' onChange={e => setValues({...values, password: e.target.value})}/> <i>Password</i>
                  </div>

                  <div className="links"> <a href="/">Forgot Password</a> <Link to="/api/admin/login">Login</Link>
                  </div>
                  <div className="inputBox">
                    <input type="submit" value="Register" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        </form>
      </div>
    </>
  )
}

export default Register