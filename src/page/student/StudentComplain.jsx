import React, { useState } from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentComplain = () => {
  const location = useLocation(); 
  const id = location.state;
  

  
  const [message, setMessage] = useState('');
  const initdata = {
    title: "",
    date: "",
    subject: "",
    description: "",
  }
  const [data, setData] = useState(initdata);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/student/complain", data);
      if (res.data.status === "Success") {
        setMessage(res.data.message);
        setData(initdata);
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(data)
  return (
    <>
    <div className="dashboard ">
        <StudentSidebar id= {id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Complain Box</h1></div>
          <div><img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
        </div>

        <div className="complainbox">
          <h3>Complain Here</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title"> Title:</label> <br />
              <input type="text"
                name='title'
                value={data.title}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="date"> Date:</label><br />
              <input type="date"
                name="date"
                value={data.date}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="subject"> Subject:</label> <br />
              <input type="text"
                name='subject'
                value={data.subject}
                onChange={handleChange} />
            </div>
            <div>
              <label id='dis' htmlFor="description"> Description:</label> <br />
              <textarea
                name='description'
                value={data.description}
                onChange={handleChange}
                id="description"
                className="description-input"
                placeholder="Enter the description here..."></textarea>
            </div>
            <div>
              <input className='button' type="submit" />
            </div>

            {message && (<span>{message}</span>)}
          </form>
        </div>
      </section>
      </div>
    </>
  )
}

export default StudentComplain
