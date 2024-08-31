import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useLocation } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

const AdminAddTeacher = () => {
  const location = useLocation();
  const id = location.state;

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const initialTeacherData = {
    inchargeof: '',
    username: '',
    name: '',
    DoB: '',
    gender: '',
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    address: '',
    email: '',
    password: '',
  };
  const [teacherData, setTeacherData] = useState(initialTeacherData);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = () => {
    axios.get('http://localhost:5000/api/admins/teacherdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admins/addteacher', teacherData);
      if (response.data && response.data.status === "Success") {
        setData([...data, response.data]); // Update state with new teacher
        setModal(false);
      } else if (response.data && response.data.Error) {
        alert(response.data.Error);
      } else {
        alert('An unexpected response was received from the server.');
      }
    } catch (err) {
      console.error("There was an error adding the teacher!", err);
      alert(err);
    }
    setTeacherData(initialTeacherData);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (isConfirmed) {
      axios.delete('http://localhost:5000/api/admins/deleteteacher', { data: { id } })
        .then(response => {
          setData(data.filter(teacher => teacher.id !== id));
        })
        .catch(error => {
          console.error("There was an error deleting the teacher!", error);
        });
    }
  };

  const toggle2 = () => setUpdateModal(!updateModal);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(initialTeacherData);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  const handleEditTeacher = async (id) => {
    setCurrentTeacherId(id);
    try {
      const response = await axios.get('http://localhost:5000/api/admins/currentteacher', { params: { id } });
      if (response.data && response.data.length > 0) {
        const teacherData = response.data[0];
        setUpdateData(teacherData);
      }
    } catch (error) {
      console.error("There was an error fetching the teacher data!", error);
    }
    setUpdateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      currentTeacherId,
      updateData
    };
    try {
      await axios.put("http://localhost:5000/api/admins/updateteacher", payload)
        .then(res => {
          fetchTeacherData();
          setUpdateModal(false);
        }).catch(err => {
          console.error("Error in update", err);
        });
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <div className="dashboard ">
        <AdminSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>Teacher</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          <div className="cardslist">
            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/teacherimg.png'} alt="Logo" />
              <h5>Total Teacher</h5>
              <span>{data.length}</span>
              <input type="button" value="Total Teachers" />
            </div>
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggle} className='popup'>
              <ModalHeader className='modalHead' toggle={toggle}>
                Add New Teacher
              </ModalHeader>
              <ModalBody className='modalBody'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Incharge Of :</label>
                    <input
                      type="text"
                      name="inchargeof"
                      value={teacherData.inchargeof}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Username :</label>
                    <input
                      type="text"
                      name="username"
                      value={teacherData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Name :</label>
                    <input
                      type="text"
                      name="name"
                      value={teacherData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Date Of Birth :</label>
                    <input
                      type="date"
                      name="DoB"
                      value={teacherData.DoB}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Gender :</label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={teacherData.gender === "male"}
                      onChange={handleChange}
                    /> Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={teacherData.gender === "female"}
                      onChange={handleChange}
                    /> Female
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={teacherData.gender === "others"}
                      onChange={handleChange}
                    /> Others
                  </div>
                  <div>
                    <label>Father's Name :</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={teacherData.fatherName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Mother's Name :</label>
                    <input
                      type="text"
                      name="motherName"
                      value={teacherData.motherName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Mobile Number :</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={teacherData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Address :</label>
                    <input
                      type="text"
                      name="address"
                      value={teacherData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={teacherData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Password :</label>
                    <input
                      type="password"
                      name="password"
                      value={teacherData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <input type="submit" value="Add Teacher" />
                </form>
              </ModalBody>
            </Modal>
            <input type="button" onClick={() => setModal(true)} style={buttonStyle} value="Add Teachers" />
          </div>
          <div>
            <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
              <ModalHeader className="modalHead" toggle={toggle2}>
                UpdateTeacher Data
              </ModalHeader>
              <ModalBody className='modalBody'>
                <form onSubmit={handleOnSubmit}>
                  <div>
                    <label htmlFor='inchargeof'>Incharge Of :</label>
                    <input
                      type="text"
                      name="inchargeof"
                      value={updateData.inchargeof || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='username'>Username :</label>
                    <input
                      type="text"
                      name="username"
                      value={updateData.username || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='name'>Name :</label>
                    <input
                      type="text"
                      name="name"
                      value={updateData.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='DoB'>Date Of Birth :</label>
                    <input
                      type="date"
                      name="DoB"
                      value={updateData.DoB || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='gender'>Gender :</label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={updateData.gender === "male"}
                      onChange={handleInputChange}
                    /> Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={updateData.gender === "female"}
                      onChange={handleInputChange}
                    /> Female
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={updateData.gender === "others"}
                      onChange={handleInputChange}
                    /> Others
                  </div>
                  <div>
                    <label htmlFor='fname'>Father's Name :</label>
                    <input
                      type="text"
                      name="fname"
                      value={updateData.fname || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='mname'>Mother's Name :</label>
                    <input
                      type="text"
                      name="mname"
                      value={updateData.mname || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='mobile'>Mobile Number :</label>
                    <input
                      type="text"
                      name="mobile"
                      value={updateData.mobile || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='address'>Address :</label>
                    <input
                      type="text"
                      name="address"
                      value={updateData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='email'>Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={updateData.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input type="submit" value="Update Teacher" />
                </form>
              </ModalBody>
            </Modal>
          </div>
          <div className='table'>
            <div id="contentDiv">
              <table>
                <caption>Teachers List</caption>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Incharge</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>DoB</th>
                    <th>Gender</th>
                    <th>Father Name</th>
                    <th>Mother Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((teacher, index) => (
                    teacher && (
                      <tr key={teacher.id}>
                        <td>{index + 1}</td>
                        <td>{teacher.inchargeof || 'N/A'}</td>
                        <td>{teacher.username || 'N/A'}</td>
                        <td>{teacher.name || 'N/A'}</td>
                        <td>{teacher.DoB || 'N/A'}</td>
                        <td>{teacher.gender || 'N/A'}</td>
                        <td>{teacher.fname || 'N/A'}</td>
                        <td>{teacher.mname || 'N/A'}</td>
                        <td>{teacher.email || 'N/A'}</td>
                        <td>{teacher.mobile || 'N/A'}</td>
                        <td>{teacher.address || 'N/A'}</td>
                        <td>
                          <img src={`${process.env.PUBLIC_URL}/icons/trash.png`} alt="Delete Icon" onClick={() => handleDelete(teacher.id)} />
                          <img src={`${process.env.PUBLIC_URL}/icons/editing.png`} alt="Edit Icon" onClick={() => handleEditTeacher(teacher.id)} />
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
};

export default AdminAddTeacher;
