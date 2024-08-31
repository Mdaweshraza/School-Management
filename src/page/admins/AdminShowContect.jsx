import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminShowContect = () => {
  const location = useLocation();
  const id = location.state;
  console.log('Location State ID:', id);

  const [contactData, setContactData] = useState([]);
  const [complainData, setComplainData] = useState([]);

  const fetchContactData = async () => {
    try {
      console.log("Fetching contact data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/admins/contactdata');
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Contact data received:", res.data.data);
        setContactData(res.data.data);
      } else {
        console.error("Error:", res.data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchComplainData = async () => {
    try {
      console.log("Fetching complain data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/admins/complaindata');
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Complain data received:", res.data.data);
        setComplainData(res.data.data);
      } else {
        console.error("Error:", res.data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
    fetchComplainData();
  }, [id]);

  const [updateModal, setUpdateModal] = useState(false);
  const toggle2 = () => setUpdateModal(!updateModal);
  const handleClick = async (id) => {
    setUpdateModal(true);
  };
  return (
    <>
      <div className="dashboard">
        <AdminSidebar id={id} />

        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>Contact Information</h1></div>
            <div><img src={`${process.env.PUBLIC_URL}/images/Designergirl.png`} alt="Home Icon" /></div>
          </div>

          <div className="contactbox">

          

            <div className='table'>
              <div id="contentDiv">
                <table>
                  <caption>Contact Lists</caption>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Message</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {contactData.map((contact, index) => (
                      contact && (
                        <tr key={contact.id}>
                          <td>{index + 1}</td>
                          <td>{contact.name || 'N/A'}</td>
                          <td>{contact.email || 'N/A'}</td>
                          <td>{contact.mobile || 'N/A'}</td>
                          <td>{contact.message || 'N/A'}</td>

                          <td>
                            <img src={`${process.env.PUBLIC_URL}/icons/feedback.png`} alt="Feedback Icon" onClick={() => handleClick()}/>
                         
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='table'>
              <div id="contentDiv">
                <table>
                  <caption>Complain Lists</caption>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Role</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Description</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {complainData.map((complain, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </section>
      </div>


      <div>
        <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
          <ModalHeader className="modalHead" toggle={toggle2}>
            Update Student Data
          </ModalHeader>
          <ModalBody className='modalBody' >
            <h1>Model hai bhai</h1>
            {/* <form onSubmit={handleOnSubmit}>

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
            </form> */}
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default AdminShowContect