import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import '../../scssAndcss/popup.scss';
import { useLocation } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';
// import EditFromAdmin from '../../model/EditFromAdmin';

const AdminAddStudent = () => {
  const location = useLocation();
  const id = location.state;
  console.log('Location State ID:', id);


  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const initialStudentData = {
    username: '',
    name: '',
    class: '',
    rollnumber: '',
    DoB: '',
    gender: '',
    fname: '',
    mname: '',
    mobile: '',
    address: '',
    email: '',
    password: '',
  };

  const [studentData, setStudentData] = useState(initialStudentData);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admins/studentdata')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");

    if (isConfirmed) {
      // Proceed with delete operation
      setData(data.filter(student => student.id !== id));
      console.log("Deleted student with ID:", id);

      // Perform delete operation in the backend
      axios.delete('http://localhost:5000/api/admins/deletestudent', {
        data: { id }
      })
        .then(response => {
          console.log("Delete response:", response);
        })
        .catch(error => {
          console.error("There was an error deleting the student!", error);
        });
    } else {
      // Deletion was cancelled
      console.log("Deletion cancelled by the user.");
    }
  };






  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admins/addstudent', studentData);
      console.log('Response:', response);
  
      if (response.data && response.data.status === "Success") {
        console.log(response.data.status);
        // Update the data state with the new student data
        setData([...data, studentData]);
      } else if (response.data && response.data.Error) {
        alert(response.data.Error);
      } else {
        alert('An unexpected response was received from the server.');
      }
    } catch (err) {
      console.error("There was an error adding the student!", err);
      alert(err);
    }
  
    // Clear the studentData state and close the modal
    setStudentData(initialStudentData);
    setModal(false);
  };
  


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log('Student 000000 data:', studentData);
  //     const response = await axios.post('http://localhost:5000/api/admins/addstudent', studentData);
  //     console.log('Response:', response);

  //     if (response.data && response.data.status === "Success") {
  //       console.log(response.data.status);
  //       setData([...data, response.data.student]);
  //     } else if (response.data && response.data.Error) {
  //       alert(response.data.Error);
  //     } else {
  //       alert('An unexpected response was received from the server.');
  //     }
  //   } catch (err) {
  //     console.error("There was an error adding the student!", err);
  //     alert(err);
  //   }

  //   console.log('Student data:', studentData);
  //   setStudentData(initialStudentData);
  //   setModal(false);
  // };



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
    username: '',
    name: '',
    class: '',
    rollnumber: '',
    DoB: '',
    gender: '',
    fname: '',
    mname: '',
    mobile: '',
    address: '',
    email: '',
  });
  const [currentData, setCurresntData] = useState(null);
  const [currentStudentId, setCurrentStudentId] = useState();
  const handleEditStudent = async (id) => {
    setCurrentStudentId(id);
    console.log("HandleEdit wala ID: ", id);

    const fetchDataOfStudent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/currentstudent', {
          params: { id }
        });
        console.log("Fetched Data", response.data);

        if (response.data && response.data.length > 0) {
          const studentData = response.data[0];
          setUpdateData(studentData);
          setCurresntData(studentData);
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
      console.log("Updated data:", updateData);
    }
    if (currentData) {
      console.log("Current data:", currentData);
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
    console.log(" This is Current Student Id that will be update on submit event: ", currentStudentId)
    // Submit the updated data to your API
    const payload = {
      currentStudentId,
      updateData
    };
    try {
      await axios.put("http://localhost:5000/api/admins/updatestudent", payload)
        .then(response => {
          if (response.data && response.data.status === "Success") {
            console.log(response.data.status);
            setData(data.map(student => student.id === currentStudentId ? updateData : student)); // Update the state with the updated student data
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
            <div><h1>Student</h1></div>
            <div><img src={`${process.env.PUBLIC_URL}/images/Designergirl.png`} alt="Home Icon" /></div>
          </div>
          <div className="cardslist">
            <div className="card">
              <img src={`${process.env.PUBLIC_URL}/images/studentimg.png`} alt="Logo" />
              <h5>Total Student</h5>
              <span>{data.length}</span>
              <input type="button" value="All Students" />
            </div>
          </div>

          <div>
            <Modal isOpen={modal} toggle={toggle} className='popup'>
              <ModalHeader className='modalHead' toggle={toggle}>
                Add New Student
              </ModalHeader>
              <ModalBody className='modalBody'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Username :</label>
                    <input
                      type="text"
                      name="username"
                      value={studentData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Name :</label>
                    <input
                      type="text"
                      name="name"
                      value={studentData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Class :</label>
                    <input
                      type="text"
                      name="classs"
                      value={studentData.classs}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Roll Number :</label>
                    <input
                      type="text"
                      name="rollnumber"
                      value={studentData.rollnumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Date Of Birth :</label>
                    <input
                      type="date"
                      name="DoB"
                      value={studentData.DoB}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Gender :</label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={studentData.gender === "male"}
                      onChange={handleChange}
                    /> Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={studentData.gender === "female"}
                      onChange={handleChange}
                    /> Female
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={studentData.gender === "others"}
                      onChange={handleChange}
                    /> Others
                  </div>
                  <div>
                    <label>Father's Name :</label>
                    <input
                      type="text"
                      name="fname"
                      value={studentData.fname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Mother's Name :</label>
                    <input
                      type="text"
                      name="mname"
                      value={studentData.mname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Mobile Number :</label>
                    <input
                      type="text"
                      name="mobile"
                      value={studentData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Address :</label>
                    <input
                      type="text"
                      name="address"
                      value={studentData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={studentData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Password :</label>
                    <input
                      type="password"
                      name="password"
                      value={studentData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <input type="submit" value="Add Student" />
                </form>
              </ModalBody>
            </Modal>
            <input type="button" onClick={() => setModal(true)} style={buttonStyle} value="Add Students" />
          </div>
          <div>
            <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
              <ModalHeader className="modalHead" toggle={toggle2}>
                Update Student Data
              </ModalHeader>
              <ModalBody className='modalBody' >
                <form onSubmit={handleOnSubmit}>
                  <div>
                    <label htmlFor='username'>Username :</label>
                    <input
                      type="text"
                      name="username"
                      value={updateData.username}
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
                    <label htmlFor='class'>Class :</label>
                    <input
                      type="text"
                      name="class"
                      value={updateData.class || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='rollnumber'>Roll Number :</label>
                    <input
                      type="text"
                      name="rollnumber"
                      value={updateData.rollnumber || ''}
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
                    <label htmlFor='mmame'>Mother's Name :</label>
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

                  <input type="submit" value="Update Student" />
                </form>
              </ModalBody>
            </Modal>
          </div>


         

        
          <div className='table'>
            <div id="contentDiv">
              <table>
                <caption>Students Lists</caption>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Roll Num</th>
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
                  {data.map((student, index) => (
                    student && (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.username || 'N/A'}</td>
                        <td>{student.name || 'N/A'}</td>
                        <td>{student.class || 'N/A'}</td>
                        <td>{student.rollnumber || 'N/A'}</td>
                        <td>{student.DoB || 'N/A'}</td>
                        <td>{student.gender || 'N/A'}</td>
                        <td>{student.fname || 'N/A'}</td>
                        <td>{student.mname || 'N/A'}</td>
                        <td>{student.email || 'N/A'}</td>
                        <td>{student.mobile || 'N/A'}</td>
                        <td>{student.address || 'N/A'}</td>
                        <td>
                          <img src={`${process.env.PUBLIC_URL}/icons/trash.png`} alt="Delete Icon" onClick={() => handleDelete(student.id)} />
                          <img src={`${process.env.PUBLIC_URL}/icons/editing.png`} alt="Edit Icon" onClick={() => handleEditStudent(student.id)} />
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
export default AdminAddStudent;
