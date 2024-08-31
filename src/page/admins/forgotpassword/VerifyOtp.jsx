import React, { useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Heading from '../../../components/Heading'

// import { useLocation } from 'react-router-dom';
const VerifyOtp = ( ) => {

    const location = useLocation();
    // const email = location.state.email;
    
    const [values, setValues] = useState({
        
        otp: '',
        email: location.state.email
    })
    // console.log( values)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/api/forgot/admin/verifyOtp', values )
          .then(res => {
            if (res.data.status === "Success") {


                const email = res.data.email;
              navigate('/api/admin/newpassword', { state: { email : email} })
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
        <form action="" onSubmit={handleSubmit} >
            <div id='dash'>
                <section>
                    <div className="login">
                        <div className="content">
                            <h2> Enter OTP </h2>
                            <div className="form" >
                                <div className="inputBox">
                                    <label htmlFor="otp"></label>
                                    <input type="number" required name='otp' onChange={e => setValues({ ...values, otp: e.target.value })} /> <i>OTP</i>
                                </div>

                                <div className="links">  <Link to="/api/admin/login">Back to Login</Link>
                                </div>
                                <div className="inputBox">
                                    <input type="submit" value="Verify OTP" />
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

export default VerifyOtp






