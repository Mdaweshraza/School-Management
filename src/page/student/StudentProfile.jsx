import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import StudentSidebar from './StudentSidebar'
import axios from 'axios';


const StudentProfile = () => {

  const location = useLocation();
  const id = location.state;



  const [infoData, setInfoData] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
   
    name: '',
    rollnumber: '',
    class: '',
    DoB: '',
    gender: '',
    fname: '',
    mname: '',
    mobile: '',
    email: '',
    address: '',
  });



  const fetchData = async () => {
    try {
      console.log("Fetching data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/student/studentinfo', {
        params: { id: id }
      });
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Data received:", res.data.data);
        setInfoData(res.data.data);
        const dataa = res.data.data[0]
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

  console.log("Student data ", data, infoData)
  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  }

  const [file, setFile] = useState();

  const handelFile = (e) => {
    setFile(e.target.files[0])
  }
  const handelFileUpload = async () => {
    const formdata = new FormData();
    formdata.append('image', file);
    try {
      const res = await axios.post("http://localhost:5000/api/student/upload", formdata, {
        params: { id }
      })
      if (res.data.status === "Success") {
        console.log("Success");
        fetchData(); // Re-fetch the profile data to update the image
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const [updateModal, setUpdateModal] = useState(false);
  const toggle2 = () => setUpdateModal(!updateModal);
  const handleEditStudent = async (id) => {
    setUpdateModal(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(" This is Current Student Id that will be update on submit event: ", id, data)
    // Submit the updated data to your API
    const payload = {
      id,
      data
    };
    try {
      await axios.put("http://localhost:5000/api/student/updatestudentprofile", payload)
        .then(response => {
          if (response.data && response.data.status === "Success") {
            console.log(response.data.status);
            setData(data.map(student => student.id === id ? data : student)); // Update the state with the updated student data
            setMessage(response.data.message)
          } else if (response.data && response.data.Error) {
            alert(response.data.Error);
          } else {
            alert('An unexpected response was received from the server.');
          }
        }).then(err => {
          console.log(" error in update", err)
        })

    } catch (error) {
      console.log(error)
    }
    console.log("Submitting updated data:", data);
    setUpdateModal(false);
    // You can add your submission logic here
  };
  return (
    <>
      <div className="dashboard ">
        <StudentSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>Profile</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>

  

          {infoData && (

            <div className="profile">
              <div className="pic-side">
                <div onClick={handleImageClick}>
                  {infoData[0].profilepic ? (
                    <img src={`http://localhost:5000/images/${infoData[0].profilepic}`} style={{ height: '150px', width: '150px' }} alt="Profile pic" />
                  ) : (
                    <img src={process.env.PUBLIC_URL + '/icons/profileimg.png'} style={{ height: '150px', width: '150px' }} alt="Home Icon" />
                  )}
                  <input type="file" ref={inputRef} onChange={handelFile} style={{ display: 'none' }} />
                </div>
                {file && (
                  <div >{file.name}</div>
                )}

                <input type="button" value="Upload" onClick={handelFileUpload} />
                {/* <img src={process.env.PUBLIC_URL + '/icons/profileimg.png'} alt="Profile Icon" /> */}
                <h2>{infoData[0].username}</h2>
              </div>
              <div className="userinfo">
                {message && (
                  <div> {message} </div>
                )}
                <span id='editicon'><img src={process.env.PUBLIC_URL + '/icons/editing.png'} style={{ width: "25px" }} alt="edit img!!" onClick={() => handleEditStudent(id)} /></span>
                
                <span> <b>Name:</b> {infoData[0].name}</span>
                <span> <b>Roll Number :</b> {infoData[0].rollnumber}</span>
                <span> <b>Class:</b> {infoData[0].class}</span>
                <span>  <b>DoB:</b> {infoData[0].DoB}</span>
                <span>  <b>Gender: </b>{infoData[0].gender}</span>
                <span>  <b>Father Name:</b> {infoData[0].fname}</span>
                <span>  <b>Mother Name:</b> {infoData[0].mname}</span>
                <span>  <b>Mobile:</b> {infoData[0].mobile}</span>
                <span>  <b>Email: </b>{infoData[0].email}</span>
                <span>  <b>Address:</b> {infoData[0].address}</span>
              </div>
            </div>
          )}
        </section>
      </div>

      <div>
        <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
          <ModalHeader className="modalHead" toggle={toggle2}>
            Update Student Data
          </ModalHeader>
          <ModalBody className='modalBody' >
            <form onSubmit={handleOnSubmit}>
     
              
              <div>
                <label htmlFor='name'>Name :</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='rollnumber'>Roll Number :</label>
                <input
                  type="text"
                  name="rollnumber"
                  value={data.rollnumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='class'>Class :</label>
                <input
                  type="text"
                  name="class"
                  value={data.class}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='DoB'>Date Of Birth :</label>
                <input
                  type="date"
                  name="DoB"
                  value={data.DoB}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor='gender'>Gender :</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={handleInputChange}
                /> Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={handleInputChange}
                /> Female
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={data.gender === "others"}
                  onChange={handleInputChange}
                /> Others
              </div>
              <div>
                <label htmlFor='fname'>Father's Name :</label>
                <input
                  type="text"
                  name="fname"
                  value={data.fname}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='mmame'>Mother's Name :</label>
                <input
                  type="text"
                  name="mname"
                  value={data.mname}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor='mobile'>Mobile Number :</label>
                <input
                  type="text"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='email'>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor='address'>Address :</label>
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={handleInputChange}
                />
              </div>


              <input type="submit" value="Update Teacher" />
            </form>
          </ModalBody>
        </Modal>
      </div>

    </>
  )
}

export default StudentProfile
