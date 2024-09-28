// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai"; 
import { FiUserPlus } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { setLogout } from "../redux/authSlice";
import { persistor, store } from "../redux/store";
import { useSelector } from "react-redux";

const Sidebar = ({ isMobile, drawerOpen, setDrawerOpen }) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.protocol);
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", path: "/home", icon: <AiOutlineHome className="w-5 h-5 mr-3" />, admin: false },
    { name: "Dashboard", path: "/dashboard", icon: <AiOutlineHome className="w-5 h-5 mr-3" />, admin: true },
    { name: "Add Enquiry", path: "/add-enquiry", icon: <AiOutlinePlus className="w-5 h-5 mr-3" />, admin: false },
    { name: "Add Employee", path: "/add-employee", icon: <FiUserPlus className="w-5 h-5 mr-3" />, admin: true },
  ];

  const handleMenuClick = (path) => {
    setSelectedItem(path);
  };

  const logoutHandler = () => {
    store.dispatch(setLogout());
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  return (
    <>
      {/* Sidebar for Mobile */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white bg-opacity-100 backdrop-filter backdrop-blur-lg text-gray-900 shadow-lg transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } z-50`}
        >
          <div className="p-4">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Menu</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <ul>
              {menuItems
                .filter((item) => item.admin === admin) // Filter based on admin status
                .map(({ name, path, icon }) => (
                  <li key={name} className="mb-1">
                    <Link to={path}>
                      <button
                        onClick={() => handleMenuClick(path)}
                        className={`w-full py-2 px-6 flex items-center justify-between rounded-lg ${
                          selectedItem === path
                            ? "bg-emerald-600 text-white border-black"
                            : "bg-white text-gray-900 border-gray-300"
                        } hover:bg-gray-200 transition duration-200 ease-in-out`}
                      >
                        <span className="flex items-center">{icon}{name}</span>
                      </button>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <div className="w-64 h-full fixed top-0 left-0 bg-transparent text-gray-900 border-r border-gray-200">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-2xl font-medium">Menu</h2>
            <MdLogout className="w-6 h-6 cursor-pointer" onClick={logoutHandler} />
          </div>

          <ul>
            {menuItems
              .filter((item) => item.admin === admin) // Filter based on admin status
              .map(({ name, path, icon }) => (
                <li key={name} className="m-2">
                  <Link to={path}>
                    <button
                      onClick={() => handleMenuClick(path)}
                      className={`w-full py-2 px-5 flex items-center text-sm justify-between rounded-lg ${
                        selectedItem === path
                          ? "bg-emerald-600 text-white"
                          : "hover:bg-gray-100 text-gray-500"
                      } transition duration-200 ease-in-out`}
                    >
                      <span className="flex items-center">{icon}{name}</span>
                    </button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
