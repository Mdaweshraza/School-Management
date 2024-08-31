import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
const TeacherClass = () => {

  const location = useLocation();
  const id = location.state;
  // const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teacher/studentdata', {
      params: { id }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);


  const handleSubmit = async (studentId, studentClass) => {
    // e.preventDefault();
    const attendance = { 
      student_id: studentId, 
      class: studentClass,
      date: date, 
      status: status 
    };
    console.log(attendance)
    try {
      await axios.post('http://localhost:5000/api/teacher/attendance', attendance)
      .then(res=>{
        if(res.data.status ==="Success"){

          alert('Attendance recorded successfully');
        }
      })
          
    } catch (error) {
      console.log('There was an error!', error);
    }
  };
  return (
    <>
      <div className="dashboard ">
        <TeacherSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>TeacherSide Class Info</h1></div>
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


          {/* <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
            <button type="submit">Submit</button>
          </form> */}

          <div className="contactbox">




            <div className='table'>
              <div id="contentDiv">
                <table>
                  <caption>Attendance</caption>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Student Name</th>
                      <th>Roll No.</th>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {data.map((student, index) => (
                      student && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.name || 'N/A'}</td>
                          <td>{student.rollnumber || 'N/A'}</td>
                          <td>{student.class || 'N/A'}</td>
                          <td>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                          </td>
                          <td>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                              <option value="">Select Status</option>
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Late">Late</option>
                              <option value="Excused">Excused</option>
                            </select>
                          </td>

                          <td>  <img src={`${process.env.PUBLIC_URL}/icons/upload.png`} alt="Delete Icon"  onClick={() => handleSubmit(student.id,student.class)}/></td>
                        </tr>
                      )
                    ))}
                    {/* {complainData.map((complain, index) => (
          complain && (
            <tr key={complain.id}>
              <td>{index + 1}</td>
              <td>{complain.role|| 'N/A'}</td>
              <td>{complain.title || 'N/A'}</td>
              <td>{complain.date || 'N/A'}</td>
              <td>{complain.subject || 'N/A'}</td>
              <td>{complain.description || 'N/A'}</td>

              <td>
                <img src={`${process.env.PUBLIC_URL}/icons/feedback.png`} alt="Feedback Icon" onClick={() => handleClick()} />
             
              </td>
            </tr>
          )
        ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default TeacherClass
