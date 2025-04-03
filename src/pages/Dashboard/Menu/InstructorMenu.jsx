import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiMiniFolderPlus, HiFolder } from "react-icons/hi2";


const InstructorMenu = () => {
    return (
      <div>
        <NavLink
          to="addclass"
          className={({ isActive }) =>
            `sidebar ${
              isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
            }`
          }
        >
          <HiMiniFolderPlus className="w-5 h-5" />

          <span className="mx-4 font-medium">Add Courses</span>
        </NavLink>
        <NavLink
          to="myclasses"
          className={({ isActive }) =>
            `sidebar ${
              isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
            }`
          }
        >
          <HiFolder className="w-5 h-5" />

          <span className="mx-4 font-medium">My Courses</span>
        </NavLink>
      </div>
    );
};

export default InstructorMenu;