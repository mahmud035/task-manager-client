import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import ModalComment from '../ModalComment/ModalComment';
import Loading from '../Shared/Loading/Loading';
import TaskCard from '../TaskCard/TaskCard';
import './MyTasks.css';

const MyTasks = () => {
  const [show, setShow] = useState(false);
  const [commentId, setCommentId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);

  const url = `https://task-manager-server-sigma.vercel.app/mytasks?email=${user?.email}`;

  const {
    isLoading,
    isError,
    data: myTasks = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['mytasks', user?.email],
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

  // console.log(myTasks);

  const handleComment = (id) => {
    // Open Modal
    handleShow();
    setCommentId(id);
  };

  return (
    <div className="task-page-container">
      <div className="container min-vh-100">
        <div className="task-card-container py-5">
          {myTasks.length === 0 && (
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="d-flex justify-content-center align-items-center text-white pt-5"
            >
              <h1>Oops! you haven't add any Task.</h1>
            </div>
          )}

          {myTasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              refetch={refetch}
              handleShow={handleShow}
              handleComment={handleComment}
            ></TaskCard>
          ))}
        </div>

        {show && (
          <ModalComment
            show={show}
            handleClose={handleClose}
            commentId={commentId}
          ></ModalComment>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
