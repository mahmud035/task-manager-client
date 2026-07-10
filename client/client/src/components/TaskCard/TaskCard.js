import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { BiCircle } from 'react-icons/bi';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { MdAddComment, MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TaskCard.css';

const TaskCard = ({ task, refetch, handleComment }) => {
  const { _id, taskName, image, status } = task;

  const handleCompleteTask = (id) => {
    fetch(`https://task-manager-server-sigma.vercel.app/updateStatus/${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
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

  const handleDeleteTask = (id) => {
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

  return (
    <div>
      <Card
        data-aos="fade-up"
        data-aos-duration="1000"
        className="border-0 shadow h-100 task-card"
      >
        <Card.Body>
          <div className="d-flex gap-1">
            {status === 'incomplete' ? (
              <BiCircle
                onClick={() => handleCompleteTask(_id)}
                size={24}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaCheckCircle size={24} style={{ color: '#10b981' }} />
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
