import React, { useEffect, useState } from 'react'
import '../../scssAndcss/dashboard.scss'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const TeacherDash = () => {

  // const [additionalData, setAdditionalData] = useState('');
  const [data, setData] = useState(null);
  const location = useLocation()
  const { id } = location.state || {};


  React.useEffect(() => {
    console.log("Received id in DynamicComponent:", id);
  }, [id]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/dashinfo', {
          params: { id: id }
        });
        if (res.data.status === "Success") {
          setData(res.data); // Assuming res.data contains the necessary data object
        } else {
          console.error("Error:", res.data.Error);
          // Handle error more gracefully, set an error state or display a message
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error more gracefully, set an error state or display a message
      }
    };

    fetchData(); // Call fetchData directly within useEffect to fetch data on component mount

  }, [id]); // useEffect will re-run whenever `id` changes



  console.log("Data id dataaaaa:",data) 
   return (
    <>
      <div className="dashboard ">
        <TeacherSidebar id={id} />
        <section className='bside pr2-bg'>
{data && (

<>

          <div className="WelcomeCard">
            <div><h1>Welcome Back {data.response.teacherinfo.name} </h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>

          <div className="cardslist">

            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/text-books.png'} alt="Logo" />
              <h5>Total</h5>
              <span>{data.response.subject_count}</span>
              {/* <input type="button" value="Get Start" /> */}
            </div>


            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
              <h5>Total Student</h5>
              <span>{data.response.student_count}</span>
              {/* <input type="button" value="Get Start" /> */}
            </div>
          </div>
          </>
      )}
        </section>
      </div>
    </>
  )
}

export default TeacherDash
