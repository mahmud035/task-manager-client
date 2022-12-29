import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModalComment.css';

const ModalComment = ({ show, handleClose }) => {
  return (
    <div>
      <h1>Modal Component</h1>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Notes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalComment;
