import { useContext, useState} from "react";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import UpdateProfileModal from "./UpdateProfileModal";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const { user,loading} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const[isEditModalOpen, setIsEditModalOpen] = useState(false);
 
  /* get user data */
  const {data: userData=[],refetch} = useQuery({
    queryKey:['userData',user?.email],
    enabled:!loading,
    queryFn:async()=>{
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    }
  })
console.log(user.email);
console.log(userData);
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 ">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <DashboardHeader title={"User Profile"} />
      <div className="py-4 flex flex-col md:flex-row gap-5 xl:gap-10 justify-evenly items-center">
        <FadeInAnimation>
          <div>
            <img
              className="xs:max-w-[300px] md:max-w-md lg:max-w-sm lg:h-[55vh] xl:max-w-lg xl:h-[60vh] "
              src={userData?.image}
              alt=""
            />
          </div>
        </FadeInAnimation>
        <FadeInAnimation>
          <div>
            <div className="text-center text-xl font-bold text-amber-500 border-2 py-2.5">
              Personal Info
            </div>
            <table className="table text-base  text-gray-600 dark:text-white font-semibold">
              <tbody>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">Name:</span>
                  </td>
                  <td className="py-2.5">{userData?.name}</td>
                </tr>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">Gender:</span>
                  </td>
                  <td className="py-2.5">{userData?.gender}</td>
                </tr>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">Email:</span>
                  </td>
                  <td className="py-2.5">{userData?.email}</td>
                </tr>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">Phone:</span>
                  </td>
                  <td className="py-2.5">{userData?.phone}</td>
                </tr>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">Role:</span>
                  </td>
                  <td className="py-2.5">{userData?.role}</td>
                </tr>
                <tr className="border-b-0">
                  <td className="py-2.5">
                    <span className="border-b-2 border-amber-300">
                      Address:
                    </span>
                  </td>
                  <td className="py-2.5">{userData?.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center py-5">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn w-full custom-btn bg-amber-500  text-white custom-btn"
              >
                Update Info
              </button>
              <UpdateProfileModal
                isOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                user={userData}
                refetch={refetch}
                id={userData._id}
              />
            </div>
          </div>
        </FadeInAnimation>
      </div>
    </div>
  );
};

export default UserProfile;
