import React from 'react';
import './TaskCard.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const TaskCard = ({ task }) => {
  const { _id, taskName, image, status, userEmail } = task;

  return (
    <div>
      <Card className="border-0 shadow">
        <Card.Body>
          <Card.Title>{taskName}</Card.Title>

          <Button
            variant={`${status === 'incomplete' ? 'primary' : 'success'}`}
            size="sm"
            className={`rounded-pill border-0 mt-2 task-status`}
          >
            {status === 'incomplete' ? 'In Progress' : 'Complete'}
          </Button>

          <div className="icons-and-image-container">
            <div className="d-flex gap-3">
              <FaEdit size={25} style={{ cursor: 'pointer' }} />
              <MdDeleteForever size={25} style={{ cursor: 'pointer' }} />
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
