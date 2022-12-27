import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="py-4 navbar-container">
      <Container>
        <Link to="/" className="navbar-logo">
          <Navbar.Brand className="fs-4 text-white">Task Manager</Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="text-dark bg-white"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto pt-4 pt-lg-0 nav-items">
            <NavLink to="/addtask">Add Task</NavLink>
            <NavLink to="/mytask">My Tasks</NavLink>
            <NavLink to="/completedtask">Completed Tasks</NavLink>
            <NavLink to="/notcompletedtask">Not Completed Tasks</NavLink>
          </Nav>

          <Nav className="d-flex gap-3 ms-auto pt-4 pt-lg-0 ">
            <Link to="/signin">
              <Button variant="success">SignIn</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
