
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = (props) => {
  const navigate = useNavigate();
  const { id } = props;

  React.useEffect(() => {
    console.log("Received id prop:", id);
  }, [id]);

  const handleClick = (event) => {
    event.preventDefault();
    if (id) {
      const dynamicUrl = `/api/admin/dash/${id}`;
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
            <Link
              to="/api/admin/profile"
              // state={{ id: id }}
              state={id}
              className="link">
              <img src={process.env.PUBLIC_URL + '/icons/profile.png'} alt="Profile Icon" /> Profile
            </Link>
          </li>

          <li>
            <Link to="/api/admin/addstudent" state={id} className="link">
              <img src={process.env.PUBLIC_URL + '/icons/student.png'} alt="Student Icon" /> Student
            </Link>
          </li>

          <li>
            <Link
              to="/api/admin/addteacher"
              // state={{ id: id }} 
              state={id}
              className="link">

              <img src={process.env.PUBLIC_URL + '/icons/teacher.png'} alt="Teacher Icon" /> Teacher
            </Link>
          </li>
          <li>
            <Link
              to="/api/admin/addcourse"
              // state={{ id: id }} 
              state={id}
              className="link">

              <img src={process.env.PUBLIC_URL + '/icons/course.png'} alt="Course Icon" /> Course
            </Link>
          </li>

          <li>
            <Link
              to="/api/admin/addAnnouncement"
              // state={{ id: id }} 
              state={id}
              className="link">
              <img src={process.env.PUBLIC_URL + '/icons/announcement.png'} alt="Announcement Icon" /> Announcement
            </Link>
          </li>
          <li>
            <Link
              to="/api/admin/showcontact"
              // state={{ id: id }} 
              state={id}
              className="link">
              <img src={process.env.PUBLIC_URL + '/icons/contact-form.png'} alt="Announcement Icon" /> Contact
            </Link>
          </li>
          <li>
            <Link
              to="/api/admin/changepassword"
              // state={{ id: id }} 
              state={id}
              className="link">
              <img src={process.env.PUBLIC_URL + '/icons/reset_password.png'} alt="reset_password  Icon" /> Change Password
            </Link>
          </li>

          <li>
            <Link to="/api/admin/login" className="link">
              <img src={process.env.PUBLIC_URL + '/icons/logout.png'} alt="Logout Icon" /> Logout
            </Link>
          </li>

        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
