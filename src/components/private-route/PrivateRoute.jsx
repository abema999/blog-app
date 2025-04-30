import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/sign-in"></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default PrivateRoute;
