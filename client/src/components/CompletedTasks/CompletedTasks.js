import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import TaskCard from '../TaskCard/TaskCard';
import './CompletedTasks.css';

const CompletedTasks = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/completedTasks/${user?.email}`;

  const {
    isLoading,
    isError,
    data: completedTasks = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['completedTasks', user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(completedTasks);

  return (
    <div className="task-page-container">
      <div className="container min-vh-100">
        <div className="task-card-container py-5">
          {completedTasks.length === 0 && (
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="d-flex justify-content-center align-items-center text-white pt-5"
            >
              <h1>Oops! you haven't complete any Task.</h1>
            </div>
          )}

          {completedTasks.map((task, index) => (
            <TaskCard key={index} task={task} refetch={refetch}></TaskCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedTasks;
