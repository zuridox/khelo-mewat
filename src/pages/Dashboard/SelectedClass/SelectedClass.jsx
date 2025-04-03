import React, { useState } from 'react';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import useCart from '../../../hooks/useCart';
import EmptyData from '../../../components/EmptyData/EmptyData';
import { Link } from 'react-router-dom';
import DeleteModal from '../../../components/Modal/DeleteModal';
import toast from 'react-hot-toast';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import { Helmet } from 'react-helmet-async';

const SelectedClass = () => {
  const [cart,refetch] = useCart();
  const totalPrice = parseFloat(cart.reduce((sum,item)=>item.price + sum,0)).toFixed(2); 
  
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleRemoveCart = (id)=>{
    fetch(`${import.meta.env.VITE_API_URL}/carts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Course Removed From Cart!!!");
        }
      }).catch(error=>{
        toast.error(error.message);
      })
  }
 
    return (
      <>
        <div className="container mx-auto px-4 sm:px-8 py-8">
          <Helmet>
            <title>Selected Courses</title>
          </Helmet>
          <DashboardHeader title={"My Selected Courses"} />
          <>
            {cart && Array.isArray(cart) && cart.length > 0 ? (
              <>
                <FadeInAnimation>
                  <div className="flex flex-col gap-1 md:flex-row  justify-between py-3 md:p-5 text-gray-700 dark:text-white ">
                    <div className="font-semibold md:font-bold text-xl">
                      In Cart:{" "}
                      <span className="text-amber-500">{cart.length}</span>{" "}
                      {cart.length > 1 ? "Courses" : "Course"}
                    </div>
                    <div>
                      <div className="font-semibold md:font-bold text-xl mb-2">
                        Total Price:{" "}
                        <span className="text-amber-500">{totalPrice}$</span>
                      </div>
                      <Link
                        to="/dashboard/payment"
                        className="btn btn-sm w-full custom-btn bg-amber-500 text-white"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </FadeInAnimation>
                <FadeInAnimation>
                  {" "}
                  <div className="overflow-x-auto mt-3">
                    <table className="table">
                      <thead className="text-base text-gray-700 dark:text-white">
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>Instructor</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-white">
                        {cart.map((item, index) => (
                          <tr key={item._id} className="border-gray-300">
                            <th>{index + 1}</th>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={item.image}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-semibold">
                                    {item.courseName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {item?.instructorName}
                            </td>
                            <td className="px-6 py-4">{item?.price}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={openModal}
                                className="btn btn-sm btn-error transition-all duration-300 hover:bg-red-500 hover:scale-95 text-white"
                              >
                                Delete
                              </button>
                              <DeleteModal
                                isOpen={isOpen}
                                closeModal={closeModal}
                                modalHandler={handleRemoveCart}
                                id={item._id}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </FadeInAnimation>
              </>
            ) : (
              <>
                <FadeInAnimation>
                  <EmptyData message={"Cart Is Empty"} />
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
          </>
        </div>
      </>
    );
};

export default SelectedClass;