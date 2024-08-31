import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Heading from "../../components/Heading";
import "../../scssAndcss/LoginRegister.scss";

const AdminLogin = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log('Submitting form with values:', values); // Log values to check payload
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/auth/adminLogin', values);
  //     if (res.data.status === "Success") {
  //       const id = res.data.id;
  //       const user = res.data.user;
  //       console.log(id, user);
  //       navigate(`/api/admin/dash/${id}`, { state: { id: id, user: user } });
  //     } else if (res.data.status === "failed") {
  //       alert(res.data.Error);
  //     }
  //   } catch (err) {
  //     console.error('Error during login:', err);
  //     alert('An error occurred during login. Please check your credentials and try again.');
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/api/auth/adminLogin', values)
      .then(res => {
        if (res.data.status === "Success") {
          const id = res.data.id;
          const user = res.data.user;
          console.log(id, user);
          navigate(`/api/admin/dash/${id}`, { state: { id: id, user: user } });
        } else {
          alert(res.data.Error)
        }
      })
      .then(err => console.log(err));
  }
  return (
    <>
      <Heading />
      <form onSubmit={handleSubmit}>
        <div id='dash'>
          <section>
            <div className="login">
              <div className="content">
                <div className="multiUserLog">
                  <span><Link to="/api/admin/login">Admin</Link></span>
                  <span><Link to="/api/teacher/login">Teacher</Link></span>
                  <span><Link to="/api/student/login">Student</Link></span>
                </div>
                <h2>Admin LogIn</h2>
                <div className="form">
                  <div className="inputBox">
                    <label htmlFor="username"></label>
                    <input
                      type="text"
                      name='username'
                      required
                      onChange={e => setValues({ ...values, username: e.target.value })}
                    />
                    <i>Username</i>
                  </div>
                  <div className="inputBox">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      required
                      name='password'
                      onChange={e => setValues({ ...values, password: e.target.value })}
                    />
                    <i>Password</i>
                  </div>
                  <div className="links pr2">
                    <Link className='pr2' to="/api/admin/forgotpwd">Forgot Password</Link>
                    <Link to="/register">Register Now</Link>
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
  );
};

export default AdminLogin;
