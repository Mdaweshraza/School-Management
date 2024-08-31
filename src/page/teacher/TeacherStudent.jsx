import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherStudent = () => {
  const location = useLocation();
  const id = location.state;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/teacher/studentdata',{
      params: { id }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <>
      <div className="dashboard ">
        <TeacherSidebar id={id} />
        <section className='bside pr2-bg'

        >
          <div className="WelcomeCard">
            <div><h1>Students Details</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          {/* <div className="cardslist">

            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/teacherimg.png'} alt="Logo" />
              <h5>Total Teacher</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div>


            <div className="card">
            <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
              <h5>Total Student</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div>
          </div> */}

          <table>
            <caption>Students List</caption>
            <thead>

              <tr>
                <th>S No.</th>
                <th>Class </th>
                <th>Name</th>
                <th>Roll Num</th>
                <th>Date Of Birth</th>
                <th>Gender</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                {/* <th>
                    <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" />
                    <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" /><img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" />

                    </th> */}

              </tr>
            </thead>
            <tbody>
                  {data.map((student, index) => (
                    student && (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.class || 'N/A'}</td>
                        <td>{student.name || 'N/A'}</td>
                        <td>{student.rollnumber || 'N/A'}</td>
                        <td>{student.DoB || 'N/A'}</td>
                        <td>{student.gender || 'N/A'}</td>
                        <td>{student.fname || 'N/A'}</td>
                        <td>{student.mname || 'N/A'}</td>
                        <td>{student.email || 'N/A'}</td>
                        <td>{student.mobile || 'N/A'}</td>
                        <td>{student.address || 'N/A'}</td>
                        
                      </tr>
                    )
                  ))}
                </tbody>
          </table>

        </section>
      </div>
    </>
  )
}

export default TeacherStudent
