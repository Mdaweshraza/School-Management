import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar className='pr2-bg' expand="lg">
      <div className='container '>
        <Navbar.Brand as={Link} to="/"> 
        <img src={process.env.PUBLIC_URL + '/images/schoollogo.png'} className="d-block " style={{ height: "50px" }} alt="..." />
 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="#about">About</Nav.Link>
            <Nav.Link as={Link} to="#gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="#content">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
           
            <Button variant="outline-primary" as={Link} to="/api/admin/login">Login</Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
