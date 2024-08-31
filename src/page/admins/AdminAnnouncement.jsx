import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import "../../scssAndcss/annuncement.scss";
import { useLocation } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

const AdminAnnouncement = () => {
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admins/announcementdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const initAnnouncementData = {
    advtNo: '',
    title: '',
    date: '',
    discription: '',
  };

  const [announcementData, setAnnouncementData] = useState(initAnnouncementData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData({
      ...announcementData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admins/addannouncement', announcementData);
      console.log('Response:', response);
    } catch (err) {
      console.error("There was an error adding the announcement!", err);
      alert(err);
    }
  
    setAnnouncementData(initAnnouncementData);
    setModal(false);
  };


  const handleDelete = (id) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (isConfirmed) {
      // Proceed with delete operation
      setData(data.filter(announcement => announcement.id !== id));
      console.log("Deleted announcement with ID:", id);
      // Perform delete operation in the backend
      axios.delete('http://localhost:5000/api/admins/deleteannouncement', {
        data: { id }
      })
        .then(response => {
          console.log("Delete  announcement response:", response);
        })
        .catch(error => {
          console.error("There was an error deleting the announcement!", error);
        });
    } else {
      // Deletion was cancelled
      console.log("Deletion cancelled by the user.");
    }
  };




  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: 'rgba(154, 135, 222, 0.493)',
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };
  //========================================================= UPDATE STUDENT DATA START ==========================================================================//

  const [updateModal, setUpdateModal] = useState(false);
  const toggle2 = () => setUpdateModal(!updateModal);
  // Initialize state with the structure of the data fetched from the backend
  const [updateData, setUpdateData] = useState({
    advtNo: '',
    title: '',
    date: '',
    discription: '',
  });
  const [currentData, setCurresntData] = useState(null);
  const [currentAnnId, setCurrentAnnId] = useState();
  const handleEditAnn = async (id) => {
    setCurrentAnnId(id);
    console.log("HandleEdit wala ID: ", id);
    const fetchDataOfStudent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/currentannouncement', {
          params: { id }
        });
        console.log("Fetched Data", response.data);

        if (response.data && response.data.length > 0) {
          const announcementData = response.data[0];
          setUpdateData(announcementData);
          setCurresntData(announcementData);
        }
      } catch (error) {
        console.error("There was an error fetching the student data!", error);
      }
    };
    await fetchDataOfStudent();
    setUpdateModal(true);
  };

  useEffect(() => {
    if (updateData) {
      console.log("Updated Ann data:", updateData);
    }
    if (currentData) {
      console.log("Current Ann data:", currentData);
    }
  }, [updateData, currentData]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
 
    // Submit the updated data to your API
    const payload = {
      currentAnnId,
      updateData
    };
    try {
      await axios.put("http://localhost:5000/api/admins/updateannouncement", payload)
        .then(res => {
          console.log(res)
        }).then(err => {
          console.log(" error in update", err)
        })

    } catch (error) {
      console.log(error)
    }
    console.log("Submitting updated data:", updateData);
    setUpdateModal(false);
    // You can add your submission logic here
  };

  //========================================================= UPDATE STUDENT DATA ENDED ==========================================================================//
  return (
    <>
      <div className="dashboard">
        <AdminSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>Announcement</h1></div>
            <div><img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggle} className='popup'>
              <ModalHeader className='modalHead' toggle={toggle}>
                Add Announcement
              </ModalHeader>
              <ModalBody className='modalBody'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='advtNo'>Advertisement No. :</label>
                    <input
                      type="text"
                      name="advtNo"
                      value={announcementData.advtNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='title'>Title :</label>
                    <input
                      type="text"
                      name="title"
                      value={announcementData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='date'>Date :</label>
                    <input
                      type="date"
                      name="date"
                      value={announcementData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='discription'>Description :</label>
                    <input
                      type="text"
                      name="discription"
                      value={announcementData.discription}
                      onChange={handleChange}
                    />
                  </div>
                  <input type="submit" value="Add" />
                </form>
              </ModalBody>
            </Modal>
            <input type="button" onClick={() => setModal(true)} style={buttonStyle} value="Add Announcement" />
          </div>
          <div>
            <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
              <ModalHeader className="modalHead" toggle={toggle2}>
                Update Student Data
              </ModalHeader>
              <ModalBody className='modalBody' >
                <h3>Edit Ann</h3>
                <form onSubmit={handleOnSubmit}>
                  <div>
                    <label htmlFor='advtNo'>Advertisement No. :</label>
                    <input
                      type="text"
                      name="advtNo"
                      value={updateData.advtNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='title'>Title :</label>
                    <input
                      type="text"
                      name="title"
                      value={updateData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='date'>Date :</label>
                    <input
                      type="date"
                      name="date"
                      value={updateData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='discription'>Description :</label>
                    <input
                      type="text"
                      name="discription"
                      value={updateData.discription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input type="submit" value="Update" />
                </form>
              </ModalBody>
            </Modal>
          </div>
          <div className='table'>
            <div id="contentDiv">
              <table>
                <caption>Announcement List</caption>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Advt No.</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((announcement, index) => (
                    announcement && (
                      <tr key={announcement.id}>
                        <td>{index + 1}</td>
                        <td>{announcement.advtNo || 'N/A'}</td>
                        <td>{announcement.title || 'N/A'}</td>
                        <td>{announcement.date || 'N/A'}</td>
                        <td>{announcement.discription || 'N/A'}</td>
                        <td>
                          <img src={`${process.env.PUBLIC_URL}/icons/trash.png`} alt="Delete Icon" onClick={() => handleDelete(announcement.id)} />
                          <img src={`${process.env.PUBLIC_URL}/icons/editing.png`} alt="Edit Icon" onClick={() => handleEditAnn(announcement.id)} />
                        </td>
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
  );
}

export default AdminAnnouncement;
