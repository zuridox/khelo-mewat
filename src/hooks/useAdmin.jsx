import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
 
const useAdmin = () => {
    const {user,loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data:checkAdmin,isLoading:checkAdminLoading}=useQuery({
        queryKey: ['checkAdmin',user?.email],
        enabled:!loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin;
        }
    })
    return [checkAdmin,checkAdminLoading];
};

export default useAdmin;