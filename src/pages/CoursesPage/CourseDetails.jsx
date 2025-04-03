import React, { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";
import usePayment from "../../hooks/usePayment";
import { Helmet } from "react-helmet-async";

const CourseDetails = () => {
  const { user, role } = useContext(AuthContext);
  const course = useLoaderData();
  const [payments] = usePayment();
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, refetch] = useCart();

  /* check if the course is already in the cart or not */
  const isCourseInCart = cart.some(
    (item) => item.courseName === course.course_name
  );
  const isCourseEnrolled = payments.some((payment) =>
    payment.items.some((item) => item.itemsName === course.course_name)
  );

  /* add to cart  */
  const handleAddToCart = (course) => {
    if (user && user?.email) {
      const cardtData = {
        courseId: course._id,
        courseName: course.course_name,
        image: course.image,
        price: course.price,
        email: user?.email,
        instructorName: course?.instructor_name,
        instructorEmail: course?.email,
      };
      fetch(`${import.meta.env.VITE_API_URL}/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cardtData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            toast.success("Course Added To Cart Successfully!!!");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Please Sign In First!!!");
      navigate("/signin", { state: { from: location } });
    }
  };
  return (
    <div className="dark:bg-gray-800 pb-10 lg:pb-20 md:pt-20" id="instructors">
      <Helmet>
        <title>{course?.course_name}</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader heading={"Course Details"}></SectionHeader>
        <FadeInAnimation>
          <div className="flex flex-col md:flex-row justify-evenly items-center md:mt-2 gap-5">
            <img
              className="w-72 h-auto md:w-96 md:h-auto lg:w-[26rem] lg:h-[25rem] object-cover rounded"
              src={course?.image}
              alt=""
            />
            <div className="text-gray-700 dark:text-white max-w-xl flex flex-col gap-1">
              <p className="md:text-3xl text-xl font-semibold">
                {course.course_name}{" "}
                {isCourseEnrolled && (
                  <span className="text-sm font-bold text-amber-500">
                    (Enrolled)
                  </span>
                )}
              </p>
              <p className="p_des">
                <span className="span_label">Instructor: </span>
                {course?.instructor_name}
              </p>
              <p className="p_des">
                <span className="span_label">Email: </span>
                {course?.email}
              </p>
              <p className="p_des">
                <span className="span_label">Available Seats: </span>
                {course?.seats - course?.enrolled}
              </p>
              <p className="p_des">
                <span className="span_label">Enrolled: </span>
                {course?.enrolled}
              </p>
              <p className="p_des">
                <span className="span_label">Price:</span> {course?.price}$
              </p>
              <p className="p_des">
                <span className="span_label">Description:</span>{" "}
                {course?.description}
              </p>
              {!isCourseEnrolled && (
                <button
                  className={`btn custom-btn transition-all hover:scale-95 text-white mt-5 bg-amber-500`}
                  disabled={
                    course?.seats - course?.enrolled <= 0 ||
                    role === "Admin" ||
                    role === "Instructor" ||
                    isCourseInCart ||
                    isCourseEnrolled
                  }
                  onClick={() => handleAddToCart(course)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default CourseDetails;
