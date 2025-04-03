import React, { useContext } from 'react';
import { FaUsersCog } from 'react-icons/fa';
import { HiViewGridAdd } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const AdminMenu = () => {
  const {user} = useContext(AuthContext);
    return (
      <div>
        <NavLink
          to="manageusers"
          className={({ isActive }) =>
            `sidebar ${
              isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
            }`
          }
        >
          <FaUsersCog className="w-5 h-5" />

          <span className="mx-4 font-medium">Manage Users</span>
        </NavLink>
        <NavLink
          to="manageclasses"
          className={({ isActive }) =>
            `sidebar ${
              isActive ? "sidebar-active" : "text-gray-600 dark:text-white"
            }`
          }
        >
          <HiViewGridAdd className="w-5 h-5" />

          <span className="mx-4 font-medium">Manage Courses</span>
        </NavLink>
      </div>
    );
};

export default AdminMenu;