import React from 'react';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import usePayment from '../../../hooks/usePayment';
import EmptyData from '../../../components/EmptyData/EmptyData';
import { Link } from 'react-router-dom';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import { Helmet } from 'react-helmet-async';

const EnrolledClasses = () => {
  const [payments, isLoading] = usePayment();
  console.log(payments);
    return (
      <>
        <div className="container mx-auto px-4 sm:px-8 py-8">
          <Helmet>
            <title>Enrolled Courses</title>
          </Helmet>
          <DashboardHeader title={"My Enrolled Courses"} />
          {payments && Array.isArray(payments) && payments.length > 0 ? (
            <FadeInAnimation>
              <div className="overflow-x-auto mt-3">
                <table className="table">
                  <thead className="text-base text-gray-700 dark:text-white">
                    <tr>
                      <th> SL </th>
                      <th> Course </th>
                      <th> Instructor Name </th>
                      <th> Instructor Email </th>
                      <th> Enrolled Date </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-white">
                    {payments.map((payment) =>
                      payment.items.map((item, index) => (
                        <tr key={item._id} className="border-gray-300">
                          <th>{index + 1}</th>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={item.itemsImage}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {item.itemsName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{item?.Instructor}</td>
                          <td className="px-6 py-4">{item?.InstructorEmail}</td>
                          <td className="px-6 py-4">
                            {payment.date.slice(0, 10)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </FadeInAnimation>
          ) : (
            <>
              <FadeInAnimation>
                <EmptyData message={"You haven't enrolled to any class"} />
                <div className="text-center -mt-52 md:-mt-40">
                  <Link
                    className="btn bg-amber-500 text-white custom-btn"
                    to="/courses"
                  >
                    Add Course To Cart
                  </Link>
                </div>
              </FadeInAnimation>
            </>
          )}
        </div>
      </>
    );
};

export default EnrolledClasses;