import React from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';

const StudentResult = () => {

  const location = useLocation(); 
  const id = location.state;
  
  return (
    <>
    <div className="dashboard ">
        <StudentSidebar id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Result</h1></div>
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
        </section>
      </div>
    </>
  )
}

export default StudentResult
