import { useContext, useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import { AuthContext } from "../../providers/AuthProvider";
import useCart from "../../hooks/useCart";
import usePayment from "../../hooks/usePayment";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const InstructorDetails = () => {
  const { user, role } = useContext(AuthContext);
  //console.log(role);
  const instructorData = useLoaderData();
  const [courses, setCourses] = useState([]);
  const [cart, refetch] = useCart();
  const [payments] = usePayment();
  const navigate = useNavigate();
  const location = useLocation();

  /* get the instructor course data from db */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/course/${instructorData.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, [instructorData.email]);

  const isCourseInCart =
    cart.some((item) => item.courseName) ===
    courses.some((course) => course.course_name);

  const isCourseEnrolled = payments.some((payment) =>
    payment.items.some((item) =>
      courses.some((course) => course.course_name === item.itemsName)
    )
  );

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
        <title>Instructors Details</title>
      </Helmet>
      <ScrollPageTop />
      <SectionHeader heading={"Instructor Details"}></SectionHeader>
      <Container>
        <FadeInAnimation>
          <div className="flex flex-col md:flex-row justify-evenly items-center md:mt-2 gap-10">
            <img
              className="w-44 h-44 md:w-72 md:h-72 object-cover rounded"
              src={instructorData.image}
              alt=""
            />
            <div className="text-gray-700 dark:text-white max-w-lg flex flex-col gap-2">
              <p className="md:text-3xl text-xl font-semibold">
                {instructorData.name}
              </p>
              <p>
                <span className=" text-base font-semibold">Email: </span>
                {instructorData.email}
              </p>
              <p>
                <span className="text-base font-semibold">Address: </span>
                {instructorData.address}
              </p>
              <p>
                <span className="text-base font-semibold">Taken Courses: </span>
                {courses.length}
              </p>
              <p>
                <span className="text-base font-semibold">About: </span>
                Welcome to Khelo Mewat, where excellence meets expertise! Meet{" "}
                {instructorData.name}, a seasoned professional dedicated to
                shaping the next generation of athletes. Embark on a
                transformative sports journey with {instructorData.name} at the
                helm. Whether you're a beginner eager to learn the basics or a
                seasoned athlete aiming for the next level,{" "}
                {instructorData.name} is here to guide you every step of the
                way.
              </p>
            </div>
          </div>
        </FadeInAnimation>
        <div>
          <FadeInAnimation>
            <p className="text-center md:mt-24 mt-10 py-8 text-gray-600 dark:text-white text-xl font-semibold">
              Courses taken by this Instructor
            </p>
          </FadeInAnimation>
          <FadeInAnimation>
            {courses && Array.isArray(courses) && courses.length > 0 ? (
              <div className="overflow-x-auto mt-3">
                <table className="table">
                  <thead className="text-base text-gray-700 dark:text-white">
                    <tr>
                      <th>SL</th>
                      <th>Course</th>
                      <th> Instructor Name</th>
                      <th>Available Seats</th>
                      <th>Total Enrolled</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-white">
                    {courses.map((course, index) => (
                      <tr key={course._id} className="border-gray-300">
                        <th>{index + 1}</th>
                        <td
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
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
                              <div className="font-semibold hover:text-amber-500">
                                <Link to={`/course/details/${course?._id}`}>
                                  {course.course_name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{course?.instructor_name}</td>
                        <td className="px-6 py-4">
                          {course?.seats - course?.enrolled}
                        </td>
                        <td className="px-6 py-4">{course?.enrolled}</td>
                        <td className="px-6 py-4">{course?.price}</td>
                        <td className="px-6 py-4">
                          <button
                            className={`btn btn-sm hover:bg-green-600 hover:border-green-600 transition-all hover:scale-95 border-green-500 bg-green-500 text-white font-semibold me-2`}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-xl">
                No course found for this Instructor
              </p>
            )}
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default InstructorDetails;
