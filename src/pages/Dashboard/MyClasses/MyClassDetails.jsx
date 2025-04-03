import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import UpdateClassModal from "./UpdateClassModal";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { deleteCourse } from "../../../api/courses";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { Helmet } from "react-helmet-async";

const MyClassDetails = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const course_id = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }

  const { data: course = [], refetch } = useQuery({
    queryKey: ["course", course_id],
    enabled: !loading,
    queryFn: async () => {
      try {
        const response = await fetch(
          `${ 
            import.meta.env.VITE_API_URL
          }/course/instructor/details/${course_id.id}`
        )
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching course details:", error);
        throw error;
      }
    },
  });

  const handleDelete =(id)=>{
    deleteCourse(id)
        .then((data) => {
          console.log(data);
          refetch();
          toast.success("Course deleted!!!");
          navigate('/dashboard/myclasses');
        })
        .catch(error=>toast.error(error.message))
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <Helmet>
        <title>{course.course_name}</title>
      </Helmet>
      <DashboardHeader title={"Course Details"}></DashboardHeader>
      <FadeInAnimation>
        <div className="flex flex-col md:flex-row justify-evenly items-center md:mt-5 gap-5">
          <img
            className="w-72 h-auto md:w-96 md:h-auto lg:w-[26rem] lg:h-[25rem] object-cover rounded"
            src={course?.image}
            alt=""
          />
          <div className="text-gray-700 dark:text-white max-w-xl flex flex-col gap-2">
            <p className="md:text-3xl text-xl font-semibold">
              {course.course_name}
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
              <span className="span_label">Total Seats: </span>
              {course?.seats}
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
              <span className="span_label">Price:</span> {course?.price}
            </p>
            <p className="p_des">
              <span className="span_label">Description:</span>{" "}
              {course?.description}
            </p>
            {course?.feedback && (
              <>
                <p className="p_des">
                  <span className="span_label">Feedback:</span>{" "}
                  {course?.feedback}
                </p>
              </>
            )}
            {course?.status !== "Approved" && (
              <div className="flex justify-cente items-center gap-5">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-10 btn bg-amber-500 text-white custom-btn"
                >
                  Update
                </button>
                <UpdateClassModal
                  isOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                  course={course}
                  id={course._id}
                  loading={loading}
                  setLoading={setLoading}
                  refetch={refetch}
                />
                <button
                  onClick={openModal}
                  className="px-10 btn btn-error transition-all duration-300 hover:bg-red-500 hover:scale-95 text-white"
                >
                  Delete
                </button>
                <DeleteModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  modalHandler={handleDelete}
                  id={course._id}
                />
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/dashboard/myclasses"
            className="btn custom-btn bg-amber-500 text-white"
          >
            Go Back
          </Link>
        </div>
      </FadeInAnimation>
    </div>
  );
};

export default MyClassDetails;
