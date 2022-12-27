import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './AddTask.css';

const AddTask = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddTask = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="">
        <div className="task-page-container">
          <div className="container form-page">
            <div className="pt-5 form-container">
              <div className="text-center ">
                <h2>Add A New Task</h2>
              </div>
              <Form
                onSubmit={handleSubmit(handleAddTask)}
                className=" d-flex flex-column p-4 "
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-semibold">
                    Task Description
                  </Form.Label>
                  <Form.Control
                    {...register('task', {
                      required: 'Task description is required',
                    })}
                    as="textarea"
                    placeholder="Enter task description..."
                  />

                  {errors.task && (
                    <p className="text-danger mb-0">{errors.task?.message}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-semibold">Photo</Form.Label>
                  <Form.Control
                    {...register('image', { required: 'Photo is required' })}
                    type="file"
                    accept="image/*"
                  />

                  {errors.image && (
                    <p className="text-danger mb-0">{errors.image?.message}</p>
                  )}
                </Form.Group>

                <Button
                  className="d-block w-100 fw-semibold btn-sign-in"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
