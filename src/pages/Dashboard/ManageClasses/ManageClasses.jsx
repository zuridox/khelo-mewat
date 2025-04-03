import React, { useContext, useState } from 'react';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import EmptyData from '../../../components/EmptyData/EmptyData';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import { Helmet } from 'react-helmet-async';

const ManageClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* get all course data */
  const { data: courses = [], refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/admin`);
      console.log(res.data);

      return res.data;
    },
  });

  /* Update course status */
  const updateCourseStatus = useMutation(
    async ({id,status}) => {
      const res = await axiosSecure.patch(`/course/admin/${id}`, {
        status,
        feedback
      });
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Course Status Update Successfully !!!");
        document.getElementById("my_modal_7").checked = false;
        refetch();
      },
      onError: (error) => {
        console.error(error.message);
        toast.error("Action Failed !!!");
      },
    }
  );

  const handleCourseStatus = (id, status) => {
    setSelectedCourse(id);
    setFeedback('');   
    if (status === "Approved") {
       /* If status is 'Approved',update the status */
      updateCourseStatus.mutate({ id, status, feedback: "" });
    } else {
     /*  If status is 'Denied', toggle the modal */
      document.getElementById("my_modal_7").checked = true;
    }
  };

    const handleDenySubmit = () => {
       updateCourseStatus.mutate({
         id: selectedCourse,
         status: "Denied",
         feedback,
       });
    };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <Helmet>
          <title>Manage Courses</title>
        </Helmet>
        <DashboardHeader title={"Courses List"} />
        {courses && Array.isArray(courses) && courses.length > 0 ? (
          <FadeInAnimation>
            <div className="overflow-x-auto mt-3">
              <table className="table">
                <thead className="text-base text-gray-700 dark:text-white">
                  <tr>
                    <th> SL </th>
                    <th> Course </th>
                    <th> Instructor Name </th>
                    <th> Email </th>
                    <th> Seats </th>
                    <th> Enrolled </th>
                    <th> Price </th>
                    <th className="w-1/4"> Actions/Status </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-white">
                  {courses.map((course, index) => (
                    <tr key={user._id} className="border-gray-300">
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={course.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">
                              {course.course_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{course?.instructor_name}</td>
                      <td className="px-6 py-4">{course?.email}</td>
                      <td className="px-6 py-4">{course?.seats}</td>
                      <td className="px-6 py-4">{course?.enrolled}</td>
                      <td className="px-6 py-4">{course?.price} $</td>
                      <td className="px-6 py-4">
                        {course.status == "Approved" ? (
                          <>
                            <p className="text-green-500 font-semibold">
                              Approved
                            </p>
                            <Link
                              to={`/dashboard/manageclasses/students/${course._id}`}
                              className="btn btn-outline btn-warning btn-xs mt-1 custom-btn"
                            >
                              Enrolled Students
                            </Link>
                          </>
                        ) : course.status == "Denied" ? (
                          <p className="text-red-500 font-semibold">Denied</p>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleCourseStatus(course._id, "Approved")
                              }
                              className={`btn btn-xs hover:bg-green-600 hover:border-green-600 transition-all hover:scale-95 border-green-500 bg-green-500 text-white font-semibold me-2`}
                            >
                              Approve
                            </button>
                            <label
                              onClick={() =>
                                handleCourseStatus(course._id, "Denied")
                              }
                              className={`btn btn-xs hover:bg-red-600 hover:border-red-600 transition-all hover:scale-95 border-red-500 bg-red-500 text-white font-semibold`}
                            >
                              Deny
                            </label>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/*Feed back and deny modal*/}
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal " role="dialog">
                <div className="modal-box bg-gray-200 text-gray-700">
                  <h3 className="text-lg font-bold">
                    Do you want to deny this course?
                  </h3>
                  <p className="py-4 text-sm">Give a feedback...</p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Send a feedback (optional - 30 letters)"
                    className="textarea textarea-bordered bg-gray-100 textarea-xs w-full focus:outline-none"
                    rows={3}
                    maxLength={50}
                  ></textarea>
                  <button
                    onClick={handleDenySubmit}
                    className="btn btn-sm custom-btn bg-amber-500 text-white mt-2 w-full"
                  >
                    Submit
                  </button>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </div>
          </FadeInAnimation>
        ) : (
          <FadeInAnimation>
            <EmptyData message={"No Course Data Found"} />
          </FadeInAnimation>
        )}
      </div>
    </>
  );
};

export default ManageClasses;