import  { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { addUser } from "../../api/users";
import { imageUp } from "../../api/image";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading, googleSignIn } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /* to toggle password input type */
  const togglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //user register
  const onSubmit = (data) => {
    /* upload image to imgbb */
    const image = data.image[0];
    console.log(image);
      imageUp(image)
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        console.log(imageUrl);
        /* create user method */
        const userData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          image: imageUrl,
          gender: data.gender,
          address: data.address,
          role: "Student",
        };
        createUser(data.email, data.password)
          .then((result) => {
            console.log(result.user);
            /* update user name and iamge */
            updateUserProfile(data.name, imageUrl)
              .then(() => {
                addUser(userData).then((data) => {
                  console.log(data);
                  toast.success("Signup Successfully !!!");
                  navigate("/");
                });
              }) 
              .catch((err) => {
                setLoading(false);
                console.log(err.message);
                toast.error(err.message);
              });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const {user} = result;

        const userData = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          role: "Student",
        };

        /* save data to db */
        addUser(userData)
          .then(data=>{
            console.log(data);
            toast.success("Login Successfully !!!");
            navigate(from, { replace: true });
          })
          .catch(err=>{
            console.log(err.message);
            toast.error(err.message);
          })
        
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 dark:bg-gray-800 py-8">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="flex flex-col max-w-md md:w-9/12 p-6 rounded-md sm:p-10 bg-slate-100 dark:bg-slate-300 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="input_field"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm text-amber-500">
                  Name is required *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                id="email"
                placeholder="Enter Your Email"
                className="input_field"
              />
              {errors.email && (
                <span className="text-sm text-amber-500">
                  Email is required *
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                {...register("phone", {
                  required: "Phone number is required *",
                  pattern: {
                    value: /^(\+)?(88)?01[0-9]{9}$/,
                    message: "Invalid Bangladeshi phone number",
                  },
                })}
                id="phone"
                placeholder="Enter Your Phone Number"
                className="input_field"
                maxLength={11}
              />
              {errors.phone && (
                <span className="text-sm text-amber-500">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type={inputType}
                name="password"
                {...register("password", {
                  required: "Please specify a password *",
                  minLength: {
                    value: 6,
                    message: "Password Please be at least 6 digits *",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9! @#$%^&*]+$/,
                    message:
                      "Password must contain at least one capital letter and special character *",
                  },
                })}
                id="password"
                placeholder="*******"
                className="input_field"
              />
              {errors.password && (
                <span className="text-sm text-amber-500">
                  {errors.password.message}
                </span>
              )}
              <div
                className={`absolute right-3 transform translate-y-1 cursor-pointer ${
                  errors.password ? "top-9" : "top-1/2"
                }`}
                onClick={togglePassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Confirm Password
                </label>
              </div>
              <input
                type={inputType}
                name="confirmpassword"
                {...register("confirmpassword", {
                  required: "Please confirm the password *",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                id="confirmpassword"
                placeholder="*******"
                className="input_field"
              />
              {errors.confirmpassword && (
                <span className="text-sm text-amber-500">
                  {errors.confirmpassword.message}
                </span>
              )}
              <div
                className={`absolute right-3 transform translate-y-1 cursor-pointer ${
                  errors.password ? "top-9" : "top-1/2"
                }`}
                onClick={togglePassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                {...register("gender", { required: true })}
                className="input_field"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-sm text-amber-500">
                  Please select a gender *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Address
              </label>
              <input
                type="text"
                name="address"
                {...register("address", { required: true })}
                id="address"
                placeholder="Enter Your Address"
                className="input_field"
              />
              {errors.address && (
                <span className="text-sm text-amber-500">
                  Please enter your address *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                {...register("image", { required: true })}
              />
              <br />
              {errors.image && (
                <span className="text-sm text-amber-500">
                  Please upload an image *
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="custom-btn bg-amber-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner9 className="m-auto animate-spin" size={24} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
