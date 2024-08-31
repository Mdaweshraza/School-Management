import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


const AdminAddCourse = () => {

  const location = useLocation();
  const id = location.state;
  console.log(id)

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: 'rgba(154, 135, 222, 0.493)',
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',

  };
  const asignButtonStyle = {
    padding: '5px 20px',
    backgroundColor: 'rgba(154, 135, 222, 0.493)',
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: "20px"
  };

  // ========================================================= Add Class Here ===================================================================================== //

  const initClassData = {
    class: '',
    session: '',
  };
  const [showForm, setShowForm] = useState(false);
  const [classData, setClassData] = useState(initClassData);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  }

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admins/addclass', classData)
        .then(response => {
          console.log("Class Data that  response:", response);
          if (response.data.status === "Success") {
            console.log("Class Inserted In data Base!!! ")
            setClassData(initClassData)
          }
        })
        .catch(error => {
          console.error("There was an error add the class!", error);
        });


    } catch (error) {

    }
  }
  // ========================================================= Add Subject Here ===================================================================================== //

  const initSubjectData = {
    subjectName: '',
    subjectcode: '',
  };
  const [subjectData, setSubjectData] = useState(initSubjectData);
  const [showForm2, setShowForm2] = useState(false);
  const toggleForm2 = () => {
    setShowForm2(!showForm2);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: value,
    });
  }

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admins/addsubject', subjectData)
        .then(response => {
          console.log("Subject Data that  response:", response);
          if (response.data.status === "Success") {
            console.log("Subject Inserted In data Base!!! ")
            setSubjectData(initSubjectData)
          }
        })
        .catch(error => {
          console.error("There was an error adding the Subject!", error);
        });


    } catch (error) {

    }
  }
  console.log(classData, subjectData)


  // ========================================================= asign subject to class From Here ===================================================================================== //
const [asignMessage,setAsignMessage] = useState('');
  const initAsignData = {
    class_id: '',
    subject_code: '',
  };

  const [asignclass, setAsignclass] = useState(initAsignData);

  const handleChangeAsignclass = (event) => {
    const { name, value } = event.target;
    setAsignclass({
      ...asignclass,
      [name]: value
    });
  };

  const handleAddAsignclass = async (e) => {
    e.preventDefault();
    setAsignMessage('')
    try {
      await axios.post('http://localhost:5000/api/admins/asignclasssubject', asignclass)
        .then(response => {
          console.log("Subject Data that  response:", response);
          if (response.data.status === "Success") {
            console.log("Subject & Class asign In dataBase Successfullly!!! ")
            setAsignclass(initAsignData)
          }else{
           
            setAsignMessage(response.data.message)

          }
        })
        .catch(error => {
          console.error("There was an error adding the Subject!", error);
        });


    } catch (error) {

    }
  }
  console.log(asignclass)



  // ================================================================= Other From Here ============================================================================================== //
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [currentClassId, setCurrentClassId] = useState([]);
  const [currentSubjectCode, setCurrentSubjectCode] = useState([]);

  useEffect(() => {
    // Fetch class data
    axios.get('http://localhost:5000/api/admins/getclassdata')
      .then(response => {
        setClassList(response.data);
      })
      .catch(error => {
        console.error('Error fetching class data:', error);
      });

    // Fetch subject data
    axios.get('http://localhost:5000/api/admins/getsubjectdata')
      .then(response => {
        setSubjectList(response.data);
      })
      .catch(error => {
        console.error('Error fetching subject data:', error);
      });
  }, [id]); // Empty dependency array ensures this effect runs only once on component mount

  const handleDeleteClass = (id) => {

    console.log("class id delete", id)
    setCurrentClassId(id)
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this class?");

    if (isConfirmed) {
      // Proceed with delete operation
      console.log("Deleted class before with ID:", id);
      setClassData(classList.filter(classs => classs.class_id !== id));
      console.log("Deleted class after with ID:", id);

      // Perform delete operation in the backend
      axios.delete('http://localhost:5000/api/admins/deleteclass', {
        data: { id }
      })
        .then(response => {
          console.log("Delete response:", response);
        })
        .catch(error => {
          console.error("There was an error deleting the class!", error);
        });
    } else {
      // Deletion was cancelled
      console.log("Deletion cancelled by the user.");
    }
  };

  const handleDeleteSubject = (id) => {
    console.log("subject id delete", id)
    setCurrentSubjectCode(id)
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this subject?");

    if (isConfirmed) {
      // Proceed with delete operation
      console.log("Deleted subject before with ID:", id);
      setSubjectList(subjectList.filter(subject => subject.subject_code !== id));
      console.log("Deleted subjet after with ID:", id);

      // Perform delete operation in the backend
      axios.delete('http://localhost:5000/api/admins/deletesubject', {
        data: { id }
      })
        .then(response => {
          console.log("Delete response:", response.data);
        })
        .catch(error => {
          console.error("There was an error deleting the subject!", error);
        });
    } else {
      // Deletion was cancelled
      console.log("Deletion cancelled by the user.");
    }
  };
  // ================================================================= Update Using Models From Here ============================================================================================== //
  const [updateClassData, setUpdateClassData] = useState({

    class_name: '',
    session_year: '',
  });
  const handleChangeInputClass = (e) => {
    const { name, value } = e.target;
    setUpdateClassData({
      ...updateClassData,
      [name]: value,
    });
  };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleUpdateClass = async (id) => {
    console.log("class id updte", id)
    setModal(true)
    const fatchClass = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/currentclass', {
          params: { id }
        });
        console.log("Fetched Data", response.data);

        if (response.data && response.data.length > 0) {
          const classData = response.data[0];
          // setUpdateData(studentData);
          setUpdateClassData(classData);
        }
      } catch (error) {
        console.error("There was an error fetching the student data!", error);
      }
    };
    await fatchClass();
  };

  useEffect(() => {
    if (updateClassData) {
      console.log("Updated data:", updateClassData);
    }

  }, [updateClassData]);

  const updateClass = async (e) => {
    e.preventDefault();
    console.log(" This is Current Student Id that will be update on submit event: ", currentClassId)
    // Submit the updated data to your API
    const payload = {
      currentClassId,
      updateClassData
    };
    try {
      await axios.put("http://localhost:5000/api/admins/updateclass", payload)
        .then(res => {
          console.log(res)
        }).then(err => {
          console.log(" error in update", err)
        })

    } catch (error) {
      console.log(error)
    }
    setModal(false);

  };


  // =============================================================== MODEL 2 =======================================================================//
  const [updateSubjectData, setUpdateSubjectData] = useState({
    subject_name: '',
    subject_code: '',

  });
  const handleChangeInputSubject = (e) => {
    const { name, value } = e.target;
    setUpdateSubjectData({
      ...updateSubjectData,
      [name]: value,
    });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const toggle2 = () => setUpdateModal(!updateModal);
  const handleUpdateSubject = async (id) => {
    console.log("subject id updte", id)
    setUpdateModal(true)
    const fatchSubject = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins/currentsubject', {
          params: { id }
        });
        console.log("Fetched Data", response.data);

        if (response.data && response.data.length > 0) {
          const subjectData = response.data[0];
          // setUpdateData(studentData);
          setUpdateSubjectData(subjectData);
        }
      } catch (error) {
        console.error("There was an error fetching the student data!", error);
      }
    };
    await fatchSubject();
  };
  useEffect(() => {
    if (updateSubjectData) {
      console.log("Updated data:", updateSubjectData);
    }
  }, [updateSubjectData]);

  const updateSubject = async (e) => {
    e.preventDefault();
    console.log(" This is Current Student Id that will be update on submit event: ", currentSubjectCode)

    // Submit the updated data to your API
    const payload = {
      currentClassId,
      updateSubjectData
    };
    try {
      await axios.put("http://localhost:5000/api/admins/updatesubject", payload)
        .then(res => {
          console.log(res)
        }).then(err => {
          console.log(" error in update", err)
        })

    } catch (error) {
      console.log(error)
    }
    setUpdateModal(false);
  };
  console.log(updateClassData)
  console.log(updateSubjectData)
  console.log(asignMessage)

  // ====================================================  RETURN STARTED  ====================================================================================//
  return (
    <>
      <div className="dashboard ">
        <AdminSidebar id={id} />
        <section className='bside pr2-bg'>
          <div className="WelcomeCard">
            <div><h1>All Courses</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          <div id='addsubclass'>

            <input type="button" style={buttonStyle} onClick={toggleForm} value="Add Class" />
            <input type="button" style={buttonStyle} onClick={toggleForm2} value="Add Subject" />
          </div>

          <div className="formArea">
            {showForm && (
              <form onSubmit={handleAddClass}>
                <div>
                  <label htmlFor='class'>Class :</label>
                  {/* <input
                    type="text"
                    name="class"
                    value={classData.class}
                    onChange={handleInputChange} 
                  /> */}
                  <select id="class" 
                  name="class" 
                  value={classData.class}
                  onChange={handleInputChange} 
                  style={{width:"250px",marginLeft:"20px", height:"30px" }}>
                    <option disabled value="">Choose Class</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                    <option value="XI">XI</option>
                    <option value="XII">XII</option>
                  </select>
                </div><br />
                <div>
                  <label htmlFor='session'>Session :</label>
                  <input
                    type="text"
                    name="session"
                    value={classData.session || ''}
                    onChange={handleInputChange}

                  />
                </div>
                <br />
                <input type="submit" value="Submit" />
              </form>
            )}


            {showForm2 && (
              <form onSubmit={handleAddSubject}>
                <div>
                  <label htmlFor='subjectName'>subjectName :</label>
                  <input
                    type="text"
                    name="subjectName"
                    value={subjectData.subjectName}
                    onChange={handleOnChange}
                  />
                </div>
                <br />
                <div>
                  <label htmlFor='subjectcode'>SubjectCode :</label>
                  <input
                    type="text"
                    name="subjectcode"
                    value={subjectData.subjectcode || ''}
                    onChange={handleOnChange}
                  />
                </div><br />

                <input type="submit" value="Submit" />
              </form>
            )}
          </div>

          {/* ================================================================== MODELS ========================================================================================== */}
          <div>
            <Modal isOpen={modal} toggle={toggle} className='popup'>
              <ModalHeader className='modalHead' toggle={toggle}>
                Update Class
              </ModalHeader>
              <ModalBody className='modalBody'>
                <form action="" onSubmit={updateClass}>
                  <div>
                    <label htmlFor='class_name'>Class :</label>
                    <input
                      type="text"
                      name="class_name"
                      value={updateClassData.class_name}
                      onChange={handleChangeInputClass}
                    />
                  </div><br />
                  <div>
                    <label htmlFor='session_year'>Session :</label>
                    <input
                      type="text"
                      name="session_year"
                      value={updateClassData.session_year || ''}
                      onChange={handleChangeInputClass}

                    />
                  </div>
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </ModalBody>
            </Modal>
          </div>

          <div>
            <Modal isOpen={updateModal} toggle={toggle2} className='popup'>
              <ModalHeader className="modalHead" toggle={toggle2}>
                Update Subject
              </ModalHeader>
              <ModalBody className='modalBody' >
                <form onSubmit={updateSubject} >
                  <div>
                    <label htmlFor='subject_name'>subjectName :</label>
                    <input
                      type="text"
                      name="subject_name"
                      value={updateSubjectData.subject_name || ''}
                      onChange={handleChangeInputSubject}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor='subject_code'>SubjectCode :</label>
                    <input
                      type="text"
                      name="subject_code"
                      value={updateSubjectData.subject_code || ''}
                      onChange={handleChangeInputSubject}
                    />
                  </div><br />

                  <input type="submit" value="Submit" />
                </form>

              </ModalBody>
            </Modal>
          </div>
          {/* ================================================================== TABLE ========================================================================================== */}

          <div className="asignClassSubject">
            <form onSubmit={handleAddAsignclass}>
              <div>
                <h4 style={{ padding: '10px 0px' }}>Assign Class & Subject</h4>
                <label htmlFor="class_id">Choose a class:</label>
                <select
                  style={{ marginLeft: '10px' }}
                  id="class_id"
                  name="class_id"
                  value={asignclass.class_id}
                  onChange={handleChangeAsignclass}
                >
                  <option value="" disabled>Select a class</option>
                  {classList.map(item => (
                    <option key={item.class_id} value={item.class_id}>{item.class_name}</option>
                  ))}

                </select>
                <label htmlFor="subject_code" style={{ marginLeft: '20px' }}>Choose a subject:</label>
                <select
                  style={{ marginLeft: '10px' }}
                  id="subject_code"
                  name="subject_code"
                  value={asignclass.subject_code}
                  onChange={handleChangeAsignclass}
                >
                  <option value="" disabled>Select a subject</option>
                  {subjectList.map(item => (
                    <option key={item.subject_id} value={item.subject_code}>{item.subject_code}</option>
                  ))}

                </select>
                <input style={asignButtonStyle} type="submit" value="Submit" />

              </div>
                {asignMessage &&  (
                  <span>{asignMessage}</span>
                )}
            </form>
          </div>
          <div>

            <div className='table'>
              <div id="contentDiv">
                <table>
                  <caption>Class List</caption>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Classes</th>
                      <th>Session</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classList.map((classs, index) => (
                      classs && (
                        <tr key={classs.class_id}>
                          <td>{index + 1}</td>
                          <td>{classs.class_name || 'N/A'}</td>
                          <td>{classs.session_year || 'N/A'}</td>

                          <td>
                            <img src={`${process.env.PUBLIC_URL}/icons/trash.png`} alt="Delete Icon" onClick={() => handleDeleteClass(classs.class_id)} />
                            <img src={`${process.env.PUBLIC_URL}/icons/editing.png`} alt="Edit Icon" onClick={() => handleUpdateClass(classs.class_id)} />
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
                  <caption>Subject List</caption>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Subject</th>
                      <th>Subject Code</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectList.map((subject, index) => (
                      subject && (
                        <tr key={subject.subject_id}>
                          <td>{index + 1}</td>
                          <td>{subject.subject_name || 'N/A'}</td>
                          <td>{subject.subject_code || 'N/A'}</td>

                          <td>
                            <img src={`${process.env.PUBLIC_URL}/icons/trash.png`} alt="Delete Icon" onClick={() => handleDeleteSubject(subject.subject_code)} />
                            <img src={`${process.env.PUBLIC_URL}/icons/editing.png`} alt="Edit Icon" onClick={() => handleUpdateSubject(subject.subject_code)} />
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
    </>
  )
}

export default AdminAddCourse