import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import './Register.css';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // console.log(data);

    //* Create User
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Account Created Successfully');

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message.slice(22, -2));
      });
  };

  return (
    <div className="sign-up-page-container">
      <div className="container form-page pt-5 pb-5">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="pt-5 px-4 form-container"
        >
          <div className="text-center">
            <h2>Please Register</h2>
            <p className="text-white-50">Create a new account</p>
          </div>
          <Form
            onSubmit={handleSubmit(handleRegister)}
            className=" d-flex flex-column  py-3"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Full Name </Form.Label>
              <Form.Control
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Your name"
              />

              {errors.name && (
                <p className="text-danger mb-0">{errors.name?.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Email </Form.Label>
              <Form.Control
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Enter email"
              />

              {errors.email && (
                <p className="text-danger mb-0">{errors.email?.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                {...register('password', {
                  required: 'Password is required',
                })}
                type="password"
                placeholder="******"
              />

              {errors.password && (
                <p className="text-danger mb-0">{errors.password?.message}</p>
              )}
            </Form.Group>

            <Button
              className="d-block w-100 fw-semibold btn-register"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          </Form>

          <p className="text-center">
            <small className="text-white-50">
              Already have an account? &nbsp;
              <Link to="/signin" className="text-white fw-semibold ">
                Sign In
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
