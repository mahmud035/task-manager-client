import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import './Navigation.css';

const Navigation = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
    toast.warn('You just logged out!');
  };

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
          {user?.email && (
            <Nav className="mx-auto pt-4 pt-lg-0 nav-items">
              <NavLink to="/addtask">Add Task</NavLink>
              <NavLink to="/mytask">My Tasks</NavLink>
              <NavLink to="/completedtask">Completed Tasks</NavLink>
              <NavLink to="/notcompletedtask">Incomplete Tasks</NavLink>
            </Nav>
          )}

          {user?.email && (
            <Nav>
              <Link to="/signin" className="mx-auto mt-4 mt-lg-0">
                <Button
                  onClick={handleLogOut}
                  variant="info"
                  className="btn-log-out fw-semibold text-white"
                >
                  Log Out
                </Button>
              </Link>
            </Nav>
          )}

          {!user?.email && (
            <Nav className="d-flex ms-auto align-items-center gap-3  pt-4 pt-lg-0 ">
              <>
                <Link to="/signin">
                  <Button variant="success" className="btn-sign-in fw-semibold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-register fw-semibold">Register</Button>
                </Link>
              </>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
