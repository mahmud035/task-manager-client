import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignIn.css';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignIn = (data) => {};

  const handleGoogleSignIn = () => {};

  return (
    <div className="login-page-container">
      <div className="container form-page">
        <div className="pt-5 form-container">
          <div className="text-center ">
            <h2>Sign In</h2>
            <p className=" text-white-50">Sign in to access your account</p>
          </div>
          <Form
            onSubmit={handleSubmit(handleSignIn)}
            className=" d-flex flex-column p-4 "
          >
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
              className="d-block w-100 fw-semibold btn-sign-in"
              variant="primary"
              type="submit"
            >
              Sign In
            </Button>
          </Form>

          <div className="d-flex gap-3 align-items-center social-accounts-sign-up px-4">
            <p></p>
            <p className="text-center">
              <small className="fw-semibold">Or</small>
            </p>
            <p></p>
          </div>

          <div className="text-center py-3">
            <ButtonGroup vertical>
              <Button
                onClick={handleGoogleSignIn}
                className="mb-3 rounded text-white"
                variant="outline-info"
              >
                <FcGoogle size={20} className="me-3 mb-1 " />
                <span>Continue with Google</span>
              </Button>
            </ButtonGroup>
          </div>

          <p className="text-center py-2">
            <small className="text-white-50">
              Don't have an account? &nbsp;
              <Link to="/register" className="text-white fw-semibold">
                Create an account
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
