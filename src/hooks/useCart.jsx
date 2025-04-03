import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useCart = () => {
    const {user,loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    
    const { refetch,data: cart = [] } = useQuery({
      queryKey: ["carts", user?.email],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure(`/carts?email=${user?.email}`);
        return res.data;
      },
    });
    return [cart,refetch];
};

export default useCart;