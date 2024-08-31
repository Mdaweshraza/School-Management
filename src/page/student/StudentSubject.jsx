import React, { useEffect, useState } from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentSubject = () => {

  const location = useLocation(); 
  const id = location.state;
const [data,setData]= useState([]);
  
  const fetchData = async () => {
    try {
      console.log("Fetching data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/student/subjectinfo', {
        params: { id: id }
      });
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Data received:", res.data.data);
        // setInfoData(res.data.data);
        const dataa = res.data.data
        setData(dataa);
      } else {
        console.error("Error:", res.data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(data)
  return (
    <>
    <div className="dashboard ">
        <StudentSidebar id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Profile</h1></div>
          <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          <div className="cardslist">

            
          <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/text-books.png'} alt="Logo" />
              <h5>Subjects</h5>
              <span>9</span>
              <input type="button" value="Total Subject" />
            </div>
          </div>

          <div className="contactbox">

        <div className='table'>
              <table>
              <caption> Subject List</caption>
                <thead>
          
                  <tr>
                    <th>S No.</th>
                    <th>Subject Name</th>
                    <th>Subject Code</th>
        
                  </tr>
                </thead>
                <tbody>
                     
                {data.map((subject, index) => (
                      subject && (
                        <tr key={subject.subject_id}>
                          <td>{index + 1}</td>
                          <td>{subject.subject_name || 'N/A'}</td>
                          <td>{subject.subject_code || 'N/A'}</td>
                        </tr>
                      )
                    ))}              
               
                  
                </tbody>
              </table>

            </div>
            
          </div>
         
        </section>
      </div>
    </>
  )
}

export default StudentSubject
