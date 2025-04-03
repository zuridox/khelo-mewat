import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useStudent = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: checkStudent, isLoading: checkStudentLoading } = useQuery({
      queryKey: ["checkStudent", user?.email],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/student/${user?.email}`);
        return res.data.student;
      },
    });
    return [checkStudent, checkStudentLoading];
};

export default useStudent;