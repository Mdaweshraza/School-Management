import React, { useEffect, useState } from 'react';
import StudentSidebar from './StudentSidebar';
import '../../scssAndcss/dashboard.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentDash = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (!id) return; // Ensure id exists before fetching data
    try {
      console.log("Fetching data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/student/announcements');
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Data received:", res.data.data);
        setData(res.data.data);
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="dashboard">
      <StudentSidebar id={id} />
      <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Welcome Back Student</h1></div>
          <div><img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
        </div>
        <div className="cardslistofann">
          {data.length === 0 ? (
            <div>No announcements available.</div>
          ) : (
            data.map((ann, index) => (
              <div key={index} className="card">
                <img src={process.env.PUBLIC_URL + '/images/loudspeaker.png'} style={{ height: "40px" }} alt="Logo" />
                <span><b>Advt No:</b> {ann.advtNo || 'N/A'}</span>
                <span><b>Title :</b> {ann.title || 'N/A'}</span>
                <span><b>Date:</b> {ann.date || 'N/A'}</span>
                <span><b>Description:</b> {ann.description || 'N/A'}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentDash;
