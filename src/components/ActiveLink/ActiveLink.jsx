import React from "react";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "border-b-2 border-amber-500 pb-1 text-amber-500" : ""
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default ActiveLink;
