import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {ImSpinner9} from "react-icons/im";
import { useForm } from "react-hook-form";
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { addUser } from '../../api/users';

const SignIn = () => {
    const { userLogIn, loading, setLoading, resetPassword, googleSignIn } =
      useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState("password");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const {register,handleSubmit,watch,reset,formState: { errors },getValues } = useForm();

    /* to toggle password input type */
    const togglePassword = () => {
      setShowPassword(!showPassword);
      setInputType(showPassword ? "password" : "text");
    };

    const onSubmit = (data) => {
      userLogIn(data.email,data.password)
        .then(result=> {
          console.log(result.user);
          toast.success("Login Successfully !");
          navigate(from,{replace:true});
        })
        .catch(err=>{
          setLoading(false);
          console.log(err.message);
          toast.error(err.message);
          reset();
        })
    };

    const handleRestPassword = () =>{
      const email = getValues('email');
      console.log(email);
      resetPassword(email)
        .then(()=>{
          setLoading(false);
          toast.success("Please check your email !!!");
          reset();
        })
        .catch(err=>{
          setLoading(false);
          console.log(err.message);
          toast.error(err.message);
          reset();
        })
    }

    const handleGoogleSignIn = () => {
      googleSignIn()
        .then((result) => {
          const { user } = result;
          console.log(result);
          const userData = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            role: "Student",
          };

          /* save data to db */
          addUser(userData)
            .then((data) => {
              console.log(data);
              toast.success("Login Successfully !!!");
              navigate(from, { replace: true });
            })
            .catch((err) => {
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

    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-800 bg-slate-200">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <div className="flex flex-col max-w-md md:w-9/12  p-6 rounded-md sm:p-10 dark:bg-gray-300 bg-slate-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign In</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  /* ref={emailRef} */
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  id="email"
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-amber-500 focus:outline-none bg-gray-50 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email && (
                  <span className="text-sm text-amber-500">
                    Please enter your email *
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
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-amber-500 focus:outline-none bg-gray-50 text-gray-900"
                />
                <div
                  className={`absolute right-3 transform translate-y-1 cursor-pointer ${
                    errors.password ? "top-9" : "top-1/2"
                  }`}
                  onClick={togglePassword}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
                {errors.password && (
                  <span className="text-sm text-amber-500">
                    Please enter your password *
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
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button
              onClick={handleRestPassword}
              className="text-sm hover:underline hover:text-amber-500 text-gray-400"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
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
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
        
      </div>
    );
};

export default SignIn;