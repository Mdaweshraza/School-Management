import React, { useState, useEffect } from 'react';
import '../../scssAndcss/dashboard.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AdminDash = () => {
  const [additionalData, setAdditionalData] = useState('');
  const location = useLocation();
  const { id, user } = location.state || {};


  React.useEffect(() => {
    console.log("Received id in DynamicComponent:", id);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admins/getsum');
        if (res.data.status === "Success") {
          setAdditionalData(res.data.additionalData);
        } else {
          console.error("Error:", res.data.Error);
          // Handle error more gracefully, maybe set an error state
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error more gracefully, maybe set an error state
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard">
      

          <AdminSidebar id={id} />
      
      
          <section className='bside pr2-bg'>
            <div className="WelcomeCard">
              <div><h1>Welcome Back {user?.username}</h1></div>
              <div><img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
            </div>
            <div className="cardslist">
              <div className="card">
                <img src={process.env.PUBLIC_URL + '/images/teacherimg.png'} alt="Logo" />
                <h5>Total Teacher</h5>
                <span>{additionalData.sum1}</span>
                {/* <input type="button" value="Get Start" /> */}
              </div>
              <div className="card">
                <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
                <h5>Total Student</h5>
                <span>{additionalData.sum2}</span>
                {/* <input type="button" value="Get Start" /> */}
              </div>
              <div className="card">
                <img src={process.env.PUBLIC_URL + '/images/text-books.png'} alt="Logo" />
                <h5>Total Class</h5>
                <span>{additionalData.sum3}</span>
                {/* <input type="button" value="Get Start" /> */}
              </div>
            </div>
          </section>
        </div>

    </>
  );
};

export default AdminDash;
