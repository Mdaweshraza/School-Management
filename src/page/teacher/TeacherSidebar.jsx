import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../scssAndcss/sideBar.scss"

const TeacherSidebar = (props) => {
  
  const navigate = useNavigate();
  const { id } = props;

  React.useEffect(() => {
    console.log("Received id prop:", id);
  }, [id]);

  const handleClick = (event) => {
 
    event.preventDefault();
    if (id) {
      const dynamicUrl = `/api/teacher/dash/${id}`;
      console.log("Navigating to:", dynamicUrl); // Log the dynamic URL
      navigate(dynamicUrl, { state: { id } }); // Pass state with navigate
    } else {
      console.error("ID is null or undefined in handleClick");
    }
  };
  return (
    <>
      <div className="sidebar">
      <h1>DashBoard</h1>
        <ul>
          <li>
            <Link to="" onClick={handleClick} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" /> Home
            </Link>
          </li>

          <li>
            <Link to="/api/teacher/profile" state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/profile.png'} alt="Profile Icon" /> Profile
            </Link>
          </li>
          
         <li>
            <Link to="/api/teacher/student"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/student.png'} alt="Student Icon" /> Student
            </Link>
          </li> 
          <li>
            <Link to="/api/teacher/class"  state={id}  className="link">
              <img src={process.env.PUBLIC_URL + '/icons/attendance.png'} alt="Teacher Icon" /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/api/teacher/complain"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/course.png'} alt="Course Icon" /> Complain
            </Link>
          </li>
          <li>
            <Link to="/api/teacher/resetpassword"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/reset_password.png'} alt="Chnage password Icon" /> Change Password
            </Link>
          </li>
      
          
          <li>
            <Link to="/api/teacher/login" className="link">
              <img src={process.env.PUBLIC_URL + '/icons/logout.png'} alt="Logout Icon" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default TeacherSidebar