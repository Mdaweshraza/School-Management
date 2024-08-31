import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Heading from '../../components/Heading'
import axios from 'axios'

const StudentLogin = () => {
  const [values, setValues] = useState({
    username: '',
    rollnum:'',
    password: ''
  })

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/api/auth/studentLogin', values)
      .then(res => {
        if (res.data.status === "Success") {
          const id = res.data.id;
          navigate(`/api/student/dash/${id}`,{state: { id : id} })
        } else {
          alert(res.data.Error)
        }
      })
      .then(err => console.log(err));
  }

  return (
    <>
      <Heading />
      <form action="" onSubmit={handleSubmit}>
        <div id='dash'>
          <section>
            <div className="login">
              <div className="content">
                <div className="multiUserLog">
                <span className="links"> <Link to="/api/admin/login">Admin</Link></span>
              <span><Link to="/api/teacher/login">Teacher</Link></span>
              <span><Link to="/api/student/login">Student</Link></span>
                </div>
                <h2> Student LogIn </h2>
                <div className="form" >
                <div className="inputBox">
                    <label htmlFor="username"></label>
                    <input type="text" name='username' required onChange={e => setValues({ ...values, username: e.target.value })} /> <i>Username</i>
                  </div>

                  <div className="inputBox">
                    <label htmlFor="rollnum"></label>
                    <input type="number" name='rollnum' required onChange={e => setValues({ ...values, rollnum: e.target.value })} /> <i>Roll No.</i>
                  </div>

                  <div className="inputBox">
                    <label htmlFor="password"></label>
                    <input type="password" required name='password' onChange={e => setValues({ ...values, password: e.target.value })} /> <i>Password</i>
                  </div>

                  <div className="links"> <a href="/api/student/forgotpwd">Forgot Password</a>
                   
                  </div>
                  <div className="inputBox">
                    <input type="submit" value="Login" />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </form>
    </>
    )
}

export default StudentLogin
