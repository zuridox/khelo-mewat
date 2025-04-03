import React, { useContext } from "react";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "react-query";
import EmptyData from "../../../components/EmptyData/EmptyData";
import toast from "react-hot-toast";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";
 
const ManageUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  /* get all user data */
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log("user email:",user?.email);
      console.log(res.data);

      return res.data;
    },
  });

  /* Update user role */
  const updateUserRole = useMutation(
    async (data) => {
      const res = await axiosSecure.patch(`/users/admin/${data.id}`, {
        role: data.role,
      });
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Update User Role Successfully !!!");
        refetch();
      },
      onError: (error) => {
        console.error(error.message);
        toast.error("Action Failed !!!");
      },
    }
  );

  const handleUserRole = (id, role) => {
    updateUserRole.mutate({ id, role });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <Helmet>
          <title>Manage Users</title>
        </Helmet>
        <DashboardHeader title={"Users List"} />
        {users && Array.isArray(users) && users.length > 0 ? (
          <FadeInAnimation>
            <div className="overflow-x-auto mt-3">
              <table className="table">
                <thead className="text-base text-gray-700 dark:text-white">
                  <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th className="w-1/4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-white">
                  {users.map((user, index) => (
                    <tr key={user._id} className="border-gray-300">
                      <th
                        scope="row"
                        className=" px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={user.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span>Email:</span> {user.email}
                        <br></br>
                        <span>Phone:</span> {user.phone}
                      </td>
                      <td className="px-6 py-4">{user?.address}</td>
                      <td className="px-6 py-4">{user?.role}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUserRole(user._id, "Admin")}
                          className={`btn btn-xs custom-btn bg-amber-500 text-white font-semibold me-2 ${
                            user.role === "Admin" ? "btn-disabled" : ""
                          }`}
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleUserRole(user._id, "Instructor")}
                          className={`btn btn-xs custom-btn bg-amber-500 text-white font-semibold ${
                            user?.role == "Instructor" ? "btn-disabled" : ""
                          }`}
                        >
                          Instructor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInAnimation>
        ) : (
          <FadeInAnimation>
            <EmptyData message={"No User Data Found"} />
          </FadeInAnimation>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
