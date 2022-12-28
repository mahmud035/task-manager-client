import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import TaskCard from '../TaskCard/TaskCard';
import './NotCompletedTasks.css';

const NotCompletedTasks = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/incompleteTasks/${user?.email}`;

  const {
    isLoading,
    isError,
    data: incompleteTasks = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ['incompleteTasks', user?.email],
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

  // console.log(incompleteTasks);

  return (
    <div className="task-page-container">
      <div className="container min-vh-100">
        <div className="task-card-container py-5">
          {incompleteTasks.length === 0 && (
            <div className="d-flex justify-content-center align-items-center text-white pt-5">
              <h1>Oops! no task found.</h1>
            </div>
          )}

          {incompleteTasks.map((task, index) => (
            <TaskCard key={index} task={task} refetch={refetch}></TaskCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotCompletedTasks;
