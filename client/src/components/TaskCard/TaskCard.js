import React from 'react';
import './TaskCard.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiCircle } from 'react-icons/bi';

const TaskCard = ({ task, refetch }) => {
  const { _id, taskName, image, status } = task;

  const handleCompleteTask = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/updateStatus/${_id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          toast.success('Task Status Updated');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDeleteTask = (id) => {
    // console.log(id);

    const agree = window.confirm('Are you sure you want to delete the task?');

    if (agree) {
      fetch(`http://localhost:5000/deleteTask/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success('Task Delete Successfully');
            refetch();
          }
        });
    }
  };
  // <FaCheckCircle/>

  return (
    <div>
      <Card className="border-0 shadow h-100">
        <Card.Body>
          <div className="d-flex gap-1">
            <BiCircle onClick={() => handleCompleteTask(_id)} size={24} />

            <Card.Title>{taskName}</Card.Title>
          </div>

          <Button
            variant={`${status === 'incomplete' ? 'primary' : 'success'}`}
            size="sm"
            className={`rounded-pill border-0 mt-2 task-status`}
          >
            {status === 'incomplete' ? 'In Progress' : 'Complete'}
          </Button>

          <div className="icons-and-image-container">
            <div className="d-flex gap-3">
              <Link to={`/editTask/${_id}`}>
                <FaEdit size={25} style={{ cursor: 'pointer' }} />
              </Link>
              <MdDeleteForever
                onClick={() => handleDeleteTask(_id)}
                size={25}
                style={{ cursor: 'pointer' }}
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
