import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { AiOutlineMenu } from "react-icons/ai";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar isMobile={isMobile} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      <div className={`flex-1 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"} h-screen overflow-y-auto`}>
        {isMobile && (
          <div className="absolute top-4 left-4">
            <button
              aria-label="Open Menu"
              onClick={() => setDrawerOpen(true)}
              className="text-navy-600 hover:text-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </div>
        )}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
