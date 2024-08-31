import React, { useEffect, useState } from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentAttendance = () => {
  const location = useLocation();
  const id = location.state;

  const [data, setData]= useState([]);
  const fetchAttendanceData = async () => {
    try {
      console.log("Fetching contact data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/student/attendance',{ params: { id } });
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Contact data received:", res.data);
        setData(res.data);
      } else {
        console.error("Error:", res.data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 

  useEffect(() => {
    fetchAttendanceData();

  }, [id]);

const number = data.Data
// console.log("data for att", data)
// const formattedNumber = number.toFixed(2); 
// console.log("data for formattedNumber", formattedNumber)
  return (
    <>
      <div className="dashboard ">
        <StudentSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>Attendance PreView</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          <h5>Note: 75% Attendance is complasary</h5>
          <div className="cardslist">
            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/teacherimg.png'} alt="Logo" />
              <h5>Attendance In %</h5>
              <span>{number}</span>
              <input type="button" value="Get Start" />
            </div>


            {/* <div className="card">
            <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
              <h5>Total Student</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div> */}
          </div>
        </section>
      </div>
    </>
  )
}

export default StudentAttendance
