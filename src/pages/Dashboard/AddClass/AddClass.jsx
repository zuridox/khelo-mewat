import { useContext, useState } from "react";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { imageUp } from "../../../api/image";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    /* upload image to imgbb */
    setLoading(true);
    const image = data.image[0];
    imageUp(image)
      .then((imgData) => {
        const imageUrl = imgData.data.display_url;
        const courseData = {
          course_name: data.course_name,
          image: imageUrl,
          instructor_name: data.instructor_name,
          email: data.email,
          seats: data.seats,
          price: parseFloat(data.price),
          description: data.description,
          enrolled: 0,
          status: "Pending",
          feedback: "",
        };
        axiosSecure.post("/course", courseData).then((data) => {
          if (data.data.insertedId) {
            setLoading(false);
            toast.success("Course Added Successfully !!!");
            navigate("/dashboard/myclasses");
            reset();
          } else {
            setLoading(false);
            toast.error("Something went wrong !!!");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <Helmet>
        <title>Add Course</title>
      </Helmet>
      <DashboardHeader title={"Add Course"} />
      <FadeInAnimation>
        <div className="my-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="class_name" className="add-class-label">
                  Course name
                </label>
                <input
                  type="text"
                  id="class_name"
                  className="add-class-input-field"
                  placeholder="Course Name"
                  {...register("course_name", { required: true })}
                />
                {errors.course_name && (
                  <span className="text-sm text-amber-500">
                    Name is required *
                  </span>
                )}
              </div>
              <div>
                <label className="add-class-label" htmlFor="file_input">
                  Upload Image
                </label>
                <input
                  className="add-class-input-field p-[7px]"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <span className="text-sm text-amber-500">
                    Please upload an image *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="user_name" className="add-class-label">
                  Instructor Name
                </label>
                <input
                  type="text"
                  id="instructor_name"
                  className="add-class-input-field"
                  value={user.displayName}
                  {...register("instructor_name", { required: true })}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="email" className="add-class-label">
                  Instructor Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="add-class-input-field"
                  readOnly
                  value={user.email}
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="seats" className="add-class-label">
                  Available Seats
                </label>
                <input
                  type="number"
                  id="seats"
                  className="add-class-input-field"
                  placeholder="Available Seats"
                  {...register("seats", { required: true })}
                />
                {errors.seats && (
                  <span className="text-sm text-amber-500">
                    Please write available seats *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="price" className="add-class-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="add-class-input-field"
                  placeholder="Price $"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-sm text-amber-500">
                    Please write course price *
                  </span>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="add-class-label">
                Description
              </label>
              <textarea
                id="description"
                className="add-class-input-field"
                placeholder="Write Class Description..."
                rows="2"
                {...register("description", { required: false })}
              />
            </div>
            <button
              type="submit"
              className="btn custom-btn text-white bg-amber-500 hover:bg-amber-600 w-full"
            >
              {loading ? (
                <ImSpinner9 className="m-auto animate-spin" size={24} />
              ) : (
                "Add Course"
              )}
            </button>
          </form>
        </div>
      </FadeInAnimation>
    </div>
  );
};

export default AddClass;
