import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateClassModal from './UpdateClassModal';

const MyClassesRow = ({course,refetch,index}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    return (
      <tr key={course._id} className="border-gray-300">
        <th
          scope="row"
          className=" px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white"
        >
          {index + 1}
        </th>
        <td>
          <div>
            <div className="">{course.course_name}</div>
          </div>
        </td>
        <td>{course.price} $</td>
        <td>{course?.seats}</td>
        <td>{course?.enrolled}</td>
        <td>
          <span
            className={`${
              course?.status === "Pending"
                ? "text-yellow-500 font-semibold rounded"
                : course?.status === "Approved"
                ? "text-green-500  font-semibold rounded"
                : course?.status === "Denied"
                ? "text-red-500 font-semibold rounded"
                : ""
            }`}
          >
            {course?.status}
          </span>
        </td>
        <td>
          {course?.status !== "Approved" && (
            <>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn btn-xs bg-amber-500 text-white custom-btn"
              >
                Update
              </button>
              <UpdateClassModal
                isOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                course={course}
                id={course._id}
                refetch={refetch}
              />
            </>
          )}
          <Link
            to={`/dashboard/myclasses/${course._id}`}
            className="btn btn-xs bg-amber-500 text-white custom-btn ms-3 mt-2 md:mt-0 me-2"
          >
            Details
          </Link>
          <Link
            to={`/dashboard/myclasses/students/${course._id}`}
            className="btn btn-outline btn-warning btn-xs mt-1 custom-btn"
          >
            Enrolled Students
          </Link>
        </td>
        <td>{course.feedback}</td>
      </tr>
    );
};

export default MyClassesRow;