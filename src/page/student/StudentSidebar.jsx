import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StudentSidebar = (props) => {

  const navigate = useNavigate();
  const { id } = props;

  React.useEffect(() => {
    console.log("Received id prop:", id);
  }, [id]);

  const handleClick = (event) => {
 
    event.preventDefault();
    if (id) {
      const dynamicUrl = `/api/student/dash/${id}`;
      console.log("Navigating to:", dynamicUrl); // Log the dynamic URL
      navigate(dynamicUrl, { state: { id } }); // Pass state with navigate
    } else {
      console.error("ID is null or undefined in handleClick");
    }
  };

  return (
    <>
      <aside className='sidebar'>
        <h1>DashBoard</h1>
        <ul>
          <li>
            <Link to="" onClick={handleClick} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" /> Home
            </Link>
          </li>
          <li>
            {/* <Link to="/api/student/profile" className="link">
             */}
             <Link 
            to="/api/student/profile" 
            // state={{ id: id }}
            state={id} 
            className="link">
              <img src={process.env.PUBLIC_URL + '/icons/profile.png'} alt="Profile Icon" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/api/student/subject"  state={id}  className="link">
              <img src={process.env.PUBLIC_URL + '/icons/subject.png'} alt="Student Icon" /> Subject
            </Link>
          </li>
          <li>
            <Link to="/api/student/attendance"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/attendance.png'} alt="Teacher Icon" /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/api/student/complain"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/course.png'} alt="Course Icon" /> Complain
            </Link>
          </li>
          {/* <li>
            <Link to="/api/student/result"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/result.png'} alt="Announcement Icon" /> Result
            </Link>
          </li> */}
          <li>
            <Link to="/api/student/resetpassword"  state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/announcement.png'} alt="Announcement Icon" /> Change Password
            </Link>
          </li>
        
          <li>
            <Link to="/api/student/login" className="link">
              <img src={process.env.PUBLIC_URL + '/icons/logout.png'} alt="Logout Icon" /> Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default StudentSidebar