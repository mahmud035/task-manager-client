import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import './MyTasks.css';

const MyTasks = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/mytasks?email=${user?.email}`;

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

  console.log(myTasks);

  return (
    <div>
      <div className="container">
        <h1>My Tasks Component</h1>
      </div>
    </div>
  );
};

export default MyTasks;
