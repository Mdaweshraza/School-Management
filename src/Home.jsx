import React, { useEffect, useState } from 'react'
import "./Home.scss"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import MessageModal from './model/MessageModel';
const Home = () => {

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const initVal={
    name:" ",
    email:"",
    mobile:"",
    message:""
  };

  const [values,setValues]=useState(initVal);
  const [message,setMessage]=useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/home/contect", values)
    .then(res=>{
      if(res.data.status === "Success"){
        setValues(initVal)
        setMessage(res.data.message)
      }
      if(res.data.status === "Failed"){
        setValues(initVal)
        setMessage(res.data.message)
      }
    })
    .then(err=>{ console.log(err)})

    console.log(values)
    setValues(initVal)
  };
  return (
    <>


      <div className="row" id='artical' >

        <div className="col-12 pr3-bg">
          <div id="artr">
            <span>Welcome To E-School </span>
          </div>
        </div>
      </div>
      <div className="container-fluid pr1-bg">
        <div className="container" id="about">
          <div className="row">
            <div className="col-6 aboutImg" >
              <img src={process.env.PUBLIC_URL + '/images/aboutImage.png'} style={{ width: "500px" }} alt="about Icon" />
            </div>
            <div className="col-6 about-content">
              <h2>About Us</h2>
              <p>Welcome to E-School, your online platform for quality education. We believe in making learning accessible and enjoyable for everyone, with a focus on simplicity and user-friendly design.</p>
              <p>Our mission is to empower students with knowledge through intuitive interfaces and comprehensive educational resources. Whether you're a student, parent, or educator, E-School is here to support your learning journey.</p>
              <p>Explore our site to discover engaging content, interactive features, and a seamless learning experience. Join us in shaping the future of education, one click at a time.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pr2-bg">
        <div className="container" id="gallery">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={process.env.PUBLIC_URL + '/images/1.jpg'} className="d-block " style={{ height: "95vh", width: "100vw", paddingTop: "25px" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src={process.env.PUBLIC_URL + '/images/2.jpg'} className="d-block " style={{ height: "95vh", width: "100vw", paddingTop: "25px" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src={process.env.PUBLIC_URL + '/images/3.jpg'} className="d-block" style={{ height: "95vh", width: "100vw", paddingTop: "25px" }} alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>



      <div id='content' className="container-fluid pr1-bg">
        <div className="container content">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title text-center">Contact Us</h3>
                    <p className="text-center">We will get back to you asap!</p>
                    <form  onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input required 
                        type="text" 
                        name='name' 
                        id="name" 
                        value={values.name}
                        onChange={handleChange} 
                        className='form-control' />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input required 
                        type='email' 
                        name='email' 
                        id='email' 
                        value={values.email}
                        onChange={handleChange} 
                        className='form-control' />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='mobile' className='form-label'>mobile Number</label>
                        <input required 
                        type='tel' 
                        name='mobile' 
                        id='mobile' 
                        value={values.mobile}  
                        onChange={handleChange} 
                        className='form-control' />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='message' className='form-label'>Message</label>
                        <input required 
                        type='text' 
                        name='message' 
                        id='message' 
                        value={values.message} 
                        onChange={handleChange} 
                        className='form-control' />
                      </div>
                      <input className='btn btn-primary' type="submit" value="Send" />

                    </form>
                    {message && <div className="message">{message}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlForfor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div> */}
        </div>
      </div>


    </>
  )
}

export default Home