import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './HomePageAddTask.css';

const HomePageAddTask = ({ showForm, setShowForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddTask = (data) => {
    console.log(data);
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <Form
              onSubmit={handleSubmit(handleAddTask)}
              className="homepage-form"
            >
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      {...register('task', {
                        required: 'Task description is required',
                      })}
                      type="text"
                      placeholder="Enter task description..."
                    />

                    {errors.task && (
                      <p className="text-danger mb-0">{errors.task?.message}</p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      {...register('image', {
                        required: 'Photo is required',
                      })}
                      type="file"
                      accept="image/*"
                    />

                    {errors.image && (
                      <p className="text-danger mb-0">
                        {errors.image?.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Button
                    className="w-100 fw-semibold btn-sign-in"
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageAddTask;
