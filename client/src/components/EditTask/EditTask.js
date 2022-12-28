import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditTask.css';

const EditTask = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const task = useLoaderData();
  const { _id, taskName } = task;
  const navigate = useNavigate();

  const handleUpdateTask = (data) => {
    const updateTask = {
      taskName: data.task,
    };

    // console.log(updateTask);

    fetch(`http://localhost:5000/updateReview/${_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          toast.success('Task Updated Successfully');

          navigate('/mytask');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="">
        <div className="task-page-container">
          <div className="container form-page">
            <div className="pt-5 form-container">
              <div className="text-center ">
                <h2>Update Your Task</h2>
              </div>
              <Form
                onSubmit={handleSubmit(handleUpdateTask)}
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
                    defaultValue={taskName}
                    placeholder="Enter task description..."
                  />

                  {errors.task && (
                    <p className="text-danger mb-0">{errors.task?.message}</p>
                  )}
                </Form.Group>

                <Button
                  className="d-block w-100 fw-semibold btn-sign-in"
                  variant="primary"
                  type="submit"
                >
                  Save Changes
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
