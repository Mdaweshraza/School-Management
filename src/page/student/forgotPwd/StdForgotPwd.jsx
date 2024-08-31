import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Heading from '../../../components/Heading'

const StdForgotPwd = () => {

  const [values, setValues] = useState({
        
    email: ''
})
const navigate = useNavigate()
const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/api/forgot/studentPwd', values)
      .then(res => {
        if (res.data.status === "Success") {
             const email = res.data.email;
            
            
            navigate('/api/student/verifyOtp', { state: { email : email} });
            console.log(email)
          
        } else {
          alert(res.data.Error)
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
                    <div className="login">
                        <div className="content">
                            <h2> Forgot Password </h2>
                            <div className="form" >
                                <div className="inputBox">
                                    <label htmlFor="email"></label>
                                    <input type="email" required name='email' onChange={e => setValues({ ...values, email: e.target.value })} /> <i>Email</i>
                                </div>

                                <div className="links">  <Link to="/login">Back to Login</Link>
                                </div>
                                <div className="inputBox">
                                    <input type="submit" value="Send OTP"  />
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

export default StdForgotPwd