import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

const Loading = () => {
  return (
    <CirclesWithBar
      height="60"
      width="60"
      color="#38D4C6"
      wrapperStyle={{}}
      wrapperClass="d-flex justify-content-center align-items-center  min-vh-100"
      visible={true}
      ariaLabel="circles-with-bar-loading"
    />
  );
};

export default Loading;
