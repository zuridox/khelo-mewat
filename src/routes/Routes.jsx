import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn&Up/SignIn";
import SignUp from "../pages/SignIn&Up/SignUp";
import DashBoard from "../layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import SelectedClass from "../pages/Dashboard/SelectedClass/SelectedClass";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import InstructorRoute from "./InstructorRoute";
import StudentRoue from "./StudentRoue";
import AdminRoute from "./AdminRoute";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import InstructorDetails from "../pages/InstructorsPage/InstructorDetails";
import { getUser } from "../api/users";
import CoursesPage from "../pages/Allgames/Games";
import CourseDetails from "../pages/CoursesPage/CourseDetails";
import { getCourse } from "../api/courses";
import ErrorPage from "../components/Error/ErrorPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import MyClassDetails from "../pages/Dashboard/MyClasses/MyClassDetails";
import Payment from "../pages/Dashboard/Payment/Payment";
import ClassEnrolled from "../pages/Dashboard/ManageClasses/ClassEnrolled";
import MyCourseStudents from "../pages/Dashboard/MyClasses/MyCourseStudents";
import AdminContact from "../components/AdminContact";
import AppliedTeams from "../components/AppliedTeams";
import AdminEventsNotices from "../components/AdminEventsNotices";
import AdminLogin from "../components/AdminLogin";
import Cricketform from "../pages/AllForms/Cricket";
import Wrestling from "../pages/AllForms/Wrestling";
import Volleyball from "../pages/AllForms/Volleyball";
import Race from "../pages/AllForms/Race";
import Tugofwars from "../pages/AllForms/Tugofwars";
// import PrivacyPolicy from "../pages/PrivacyPolicy/Privacypolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "games",
        element: <CoursesPage />,
      },
      {
        path: "admincontact",
        element: <AdminContact />,
      },

      {
        path: "admineventsnotices",
        element: <AdminEventsNotices />,
      },

      {
        path: "teams",
        element: <AppliedTeams />,
      },

      {
        path: "adminlogin",
        element: <AdminLogin />,
      },

      {
        path: "course/details/:id",
        element: <CourseDetails />,
        loader: ({ params }) => getCourse(params.id),
      },
      {
        path: "instructors",
        element: <InstructorsPage />,
      },
      {
        path: "user/:email",
        element: <InstructorDetails />,
        loader: ({ params }) => getUser(params.email),
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "games/cricket",
        element: <Cricketform />,
      },
      {
        path: "games/wrestling",
        element: <Wrestling />,
      },
      {
        path: "games/volleyball",
        element: <Volleyball />,
      },
      {
        path: "games/race",
        element: <Race />,
      },
      {
        path: "games/tugofwars",
        element: <Tugofwars />,
      },

      // {
      //   path: "privacypolicy",
      //   element: <PrivacyPolicy />,
      // },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageclasses/students/:id",
        element: (
          <AdminRoute>
            <ClassEnrolled />
          </AdminRoute>
        ),
        loader: ({ params }) => getCourse(params.id),
      },
      {
        path: "/dashboard/userprofile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/selectedclasses",
        element: (
          <StudentRoue>
            <SelectedClass />
          </StudentRoue>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <StudentRoue>
            <Payment />
          </StudentRoue>
        ),
      },
      {
        path: "/dashboard/enrolledclasses",
        element: (
          <StudentRoue>
            <EnrolledClasses />
          </StudentRoue>
        ),
      },
      {
        path: "/dashboard/addclass",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myclasses",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myclasses/students/:id",
        element: (
          <InstructorRoute>
            <MyCourseStudents />
          </InstructorRoute>
        ),
        loader: ({ params }) => getCourse(params.id),
      },
      {
        path: "/dashboard/myclasses/:id",
        element: <MyClassDetails />,
      },
    ],
  },
]);

export default router;
