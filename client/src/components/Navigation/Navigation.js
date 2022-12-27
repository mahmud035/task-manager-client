import React from 'react';
import './Navigation.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
