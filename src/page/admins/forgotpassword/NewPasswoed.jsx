
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Heading from '../../../components/Heading'
import axios from 'axios'

const NewPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        password: '',
        repassword: '',
        email: location.state.email
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/api/forgot/admin/newPwd', values)
            .then(res => {
                if (res.data.status === "Success") {
                    const email = res.data.email;
                    navigate('/api/admin/login', { state: { email: email } })
                } else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Heading />
            <form onSubmit={handleSubmit}>
                <div id='dash'>
                    <section>
                        <div className="login">
                            <div className="content">
                                <h2>New Password</h2>
                                <div className="form">
                                    <div className="inputBox">
                                        <label htmlFor="password"></label>
                                        <input type="password" required name='password' onChange={e => setValues({ ...values, password: e.target.value })} /> <i>New Password</i>
                                    </div>

                                    <div className="inputBox">
                                        <label htmlFor="repassword"></label>
                                        <input type="password" required name='repassword' onChange={e => setValues({ ...values, repassword: e.target.value })} /> <i>Re-Enter Password</i>
                                    </div>

                                    <div className="links">
                                        <Link to="/login">Back to Login</Link>
                                    </div>

                                    <div className="inputBox">
                                        <input type="submit" value="Submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    )
}

export default NewPassword
