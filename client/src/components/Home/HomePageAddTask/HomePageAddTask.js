import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import './HomePageAddTask.css';

const HomePageAddTask = ({ showForm, setShowForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // IMP: Re-Use TanStack Query for Fetching User's All Task
  const { user } = useContext(AuthContext);

  const url = `https://task-manager-server-sigma.vercel.app/mytasks?email=${user?.email}`;

  const { refetch } = useQuery({
    queryKey: ['mytasks', user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const handleAddTask = (data) => {
    console.log(data);

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

          //* Save task to Database
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

    fetch('https://task-manager-server-sigma.vercel.app/alltask', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(taskObject),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('SavedTask:', data);
        toast.success('Task added successfully');

        // close form
        setShowForm(!showForm);

        // Re-fetching all task after adding new task
        refetch();
      });
  };

  // Submit form by pressing Enter Key
  const checkKeyDown = (e) => {
    console.log('User Pressed:', e.key);

    if (e.key === 'Enter') {
      handleAddTask(e);
    }
  };

  return (
    <div className="">
      <Form
        onSubmit={handleSubmit(handleAddTask)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="homepage-form"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3 mb-lg-0" controlId="formBasicEmail">
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
            <Form.Group className="mb-3 mb-lg-0" controlId="formBasicEmail">
              <Form.Control
                {...register('image', {
                  required: 'Photo is required',
                })}
                type="file"
                accept="image/*"
              />

              {errors.image && (
                <p className="text-danger mb-0">{errors.image?.message}</p>
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
  );
};

export default HomePageAddTask;
