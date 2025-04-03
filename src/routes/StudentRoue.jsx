import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useStudent from '../hooks/useStudent';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const StudentRoue = ({children}) => {
      const { user, loading } = useContext(AuthContext);
      const [checkStudent, checkStudentLoading] = useStudent();
      const location = useLocation();

      if (loading || checkStudentLoading) {
        return <Loader height={'h-screen'}/>;
      }
      if (user && checkStudent) {
        return children;
      }
      return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoue;