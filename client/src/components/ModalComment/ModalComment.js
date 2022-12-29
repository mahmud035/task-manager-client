import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';
import './ModalComment.css';

const ModalComment = ({ show, handleClose, commentId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const url = `http://localhost:5000/commentTask/${commentId}`;

  const {
    isLoading,
    isError,
    data: commentedTask = {},
    error,
    refetch,
  } = useQuery({
    queryKey: ['commentTask', commentId],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(commentedTask);

  const handleModalComment = (data) => {
    // Close Modal
    handleClose();
    // console.log(data, commentId);

    const comment = { comment: data.comment };

    fetch(`http://localhost:5000/addComment/${commentId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success('Comment Added Successfully');
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your thoughts about this task.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(handleModalComment)}
            className=" d-flex flex-column p-4 "
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                {...register('comment', {
                  required: 'Comment description is required',
                })}
                as="textarea"
                placeholder="Enter description..."
              />

              {errors.comment && (
                <p className="text-danger mb-0">{errors.comment?.message}</p>
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
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Notes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default ModalComment;
