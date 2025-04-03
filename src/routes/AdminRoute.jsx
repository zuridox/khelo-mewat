import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [checkAdmin, checkAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || checkAdminLoading) {
    return <Loader height={'h-screen'} />;
  }
  if (user && checkAdmin) {
    return children;
  }
  return <Navigate to='/' state={{from:location}} replace></Navigate>;
};

export default AdminRoute;