import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loader height={'h-screen'}/>
    }

    if(user){
        return children;
    }

    return <Navigate to="/signin" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;