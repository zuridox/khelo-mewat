import React, { useContext, useState } from 'react';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import EmptyData from '../../../components/EmptyData/EmptyData';
import { Helmet } from 'react-helmet-async';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';

const ClassEnrolled = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const course_id = useParams();
    const course = useLoaderData();

  /* get the course name */

  /* get enrolled user data */
  const { data: enrolledUsers = [], refetch } = useQuery({
    queryKey: ["course", course_id],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/course/enrolled/${course_id.id}`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <Helmet>
        <title>Enrolled Students</title>
      </Helmet>
      <DashboardHeader title={`Enrolled Student For ${course.course_name}`} />
      {enrolledUsers &&
      Array.isArray(enrolledUsers) &&
      enrolledUsers.length > 0 ? (
        <FadeInAnimation>
          <div className="overflow-x-auto mt-3">
            <table className="table">
              <thead className="text-base text-gray-700 dark:text-white">
                <tr>
                  <th>SL</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-white">
                {enrolledUsers.map((enrolledUsers, index) => (
                  <tr key={enrolledUsers._id} className="border-gray-300">
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
                              src={enrolledUsers.userImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{enrolledUsers.name}</td>
                    <td className="px-6 py-4">{enrolledUsers.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInAnimation>
      ) : (
        <FadeInAnimation>
          <EmptyData message={"No Student has enrolled yet."}></EmptyData>
        </FadeInAnimation>
      )}
      <FadeInAnimation>
        <div className="text-center py-4">
          <Link
            to="/dashboard/manageclasses"
            className="btn custom-btn bg-amber-500 text-white"
          >
            Go Back
          </Link>
        </div>
      </FadeInAnimation>
    </div>
  );
};

export default ClassEnrolled;