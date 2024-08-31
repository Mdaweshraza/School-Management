import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <footer className="bg-light text-center py-3">
      <Container>
        <Row>
          <Col md={4}>
            <div className="address-box add-icon">
            <img src={process.env.PUBLIC_URL + '/images/schoollogo.png'} className="d-block " style={{ height: "50px" , margin:"auto"}} alt="..." />
            </div>
            <div className="add-content">
              <h5>E-School Management System "ESMS"</h5>
              <p>123 Main Street, City, State</p>
              <p>Phone:(+91) 45856-56862</p>
              <p>
                <Link to={"mailto:esmshelpline@gmail.com"}>esmshelpline@gmail.com </Link>
              </p>
            </div>
          </Col>
          <Col md={4}>
            {/* Additional content or links */}
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to='#home'>Home</Link>
            
              </li>
              <li>
                <Link to={"#about"}>About Us</Link>
                {/* <a href="/about">About Us</a> */}
              </li>
              <li>
               <Link to={"#content"}>Content</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </Col>
          <Col md={4}>
            {/* Social media icons */}
            <div className="social-icons">
            <h5>Follow Us</h5>
            {/* <img src={process.env.PUBLIC_URL + '/images/2.jpg'} className="d-block " style={{ height: "50px", width: "px", paddingTop: "25px" }} alt="..." /> */}
            {/* <img src={process.env.PUBLIC_URL + '/images/2.jpg'} className="d-block " style={{ height: "50px", width: "px", paddingTop: "25px" }} alt="..." /> */}
              <a href="https://twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com">
                <i className="fab fa-linkedin"></i>
              </a>
              {/* Add more social icons */}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
