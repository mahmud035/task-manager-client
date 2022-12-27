import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import AddTask from '../../AddTask/AddTask';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="container">
        {!user?.email && (
          <div className="d-flex flex-column justify-content-center align-items-center gap-3 vh-100 text-center">
            <h2>Please SignIn or Register for Managing Your Task</h2>
            <div className="d-flex gap-3">
              <Link to="/signin">
                <Button variant="success" className="btn-sign-in">
                  SignIn
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-register">Register</Button>
              </Link>
            </div>
          </div>
        )}
        {/* <AddTask></AddTask> */}
      </div>
    </div>
  );
};

export default Home;
