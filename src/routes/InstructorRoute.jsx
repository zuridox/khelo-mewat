import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useInstructor from '../hooks/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const InstructorRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const [checkInstructor,checkAdminLoading]= useInstructor();
    const location = useLocation();

    if(loading || checkAdminLoading){
        return <Loader height={'h-screen'}/>
    }
    if(user && checkInstructor){
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>;
};

export default InstructorRoute;