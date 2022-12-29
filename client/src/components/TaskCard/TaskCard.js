import React from 'react';
import './TaskCard.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';
import { MdDeleteForever, MdAddComment } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiCircle } from 'react-icons/bi';

const TaskCard = ({ task, refetch, handleShow }) => {
  const { _id, taskName, image, status } = task;

  const handleCompleteTask = (id) => {
    console.log(id);

    fetch(`https://task-manager-server-sigma.vercel.app/updateStatus/${_id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          toast.success('Task Status Updated');
          // Re-fetch all task
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleComment = (id) => {
    // Open Modal
    handleShow();

    console.log(id);
  };

  const handleDeleteTask = (id) => {
    // console.log(id);

    const agree = window.confirm('Are you sure you want to delete the task?');

    if (agree) {
      fetch(`https://task-manager-server-sigma.vercel.app/deleteTask/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success('Task Delete Successfully');
            refetch();
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  // <FaCheckCircle/>

  return (
    <div>
      <Card
        data-aos="fade-up"
        data-aos-duration="1000"
        className="border-0 shadow h-100"
      >
        <Card.Body>
          <div className="d-flex gap-1">
            {status === 'incomplete' ? (
              <>
                <BiCircle
                  onClick={() => handleCompleteTask(_id)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              </>
            ) : (
              <>
                <FaCheckCircle size={24} style={{ color: '#10b981' }} />
              </>
            )}

            <Card.Title>{taskName}</Card.Title>
          </div>

          <Button
            size="sm"
            className={`rounded-pill border-0 mt-2 task-status ${
              status === 'incomplete' ? 'in-progress' : 'complete'
            }`}
          >
            {status === 'incomplete' ? 'In Progress' : 'Complete'}
          </Button>

          <div className="icons-and-image-container">
            <div className="d-flex align-items-center gap-3">
              <Link to={`/editTask/${_id}`}>
                <FaEdit
                  size={26}
                  style={{ cursor: 'pointer', color: '#439a97' }}
                />
              </Link>

              {status === 'complete' && (
                <MdAddComment
                  onClick={() => handleComment(_id)}
                  className="comment-icon"
                  size={28}
                  style={{ cursor: 'pointer', color: '#10b981' }}
                />
              )}

              <MdDeleteForever
                onClick={() => handleDeleteTask(_id)}
                size={28}
                style={{ cursor: 'pointer', color: '#ec4899' }}
              />
            </div>
            <div>
              <Image src={image} className="user-image"></Image>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
