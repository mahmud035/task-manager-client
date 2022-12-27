import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import './AddTask.css';

const AddTask = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddTask = (data) => {
    // console.log(data);

    const image = data.image[0];
    // console.log(image);

    //* Image Upload to Imgbb Server
    const formData = new FormData();
    formData.append('image', image);

    const url =
      'https://api.imgbb.com/1/upload?key=eadbdfb69d7a4e7d6bd0860c71ae874b';

    fetch(url, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((imageData) => {
        // console.log(imageData);
        if (imageData?.success) {
          const imageURL = imageData?.data?.display_url;
          // console.log(imageURL);

          //* Save task to database
          saveTask(data.task, imageURL);
        }

        if (imageData?.status_code === 400) {
          return toast.error('Please upload a .jpg /.jpeg /.png type image.');
        }

        if (imageData?.error?.message) {
          return toast.error(imageData.error.message);
        }
      });
  };

  const saveTask = (taskName, imageURL) => {
    const taskObject = {
      taskName,
      image: imageURL,
      userEmail: user?.email,
      status: 'incomplete',
    };

    console.log(taskObject);

    fetch('http://localhost:5000/alltask', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(taskObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('SavedTask:', data);
        toast.success('Task added successfully');

        navigate('/mytask');
      });
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
