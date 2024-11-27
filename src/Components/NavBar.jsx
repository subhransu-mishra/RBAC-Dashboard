import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/users"
            className="hover:text-blue-400"
            activeClassName="text-blue-400"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/roles"
            className="hover:text-blue-400"
            activeClassName="text-blue-400"
          >
            Roles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/permissions"
            className="hover:text-blue-400"
            activeClassName="text-blue-400"
          >
            Permissions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
