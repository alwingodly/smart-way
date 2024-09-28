import React, { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdCalendarToday,
} from "react-icons/md";
import { FiEdit3, FiEye } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import userService from "../../service/userService";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();
  const statusCounts = tasks?.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    getEnquiries();
  }, []);

  const getEnquiries = async () => {
    try {
      setIsloading(true);
      const result = await userService.GetUserEnquiries();
      if (result) {
        setIsloading(false);
        setTasks(result.enquiries);
      }
    } catch (error) {
      setIsloading(false);
      console.error("Failed to fetch enquiries", error);
    }
  };

  const filterOptions = [
    { status: "Pending", label: "Pending" },
    { status: "Started", label: "Started" },
    { status: "Completed", label: "Completed" },
    { status: "Hold", label: "Hold" },
    { status: "Rejected", label: "Rejected" },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "All" || task.status === filter;
    const matchesAgentFilter =
      agentFilter === "All" ||
      (agentFilter === "Through Agent" && task.throghAgent) ||
      (agentFilter === "Non-Agent" && !task.throghAgent);
    const matchesSearch = task.EnqiryName.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    return matchesFilter && matchesAgentFilter && matchesSearch;
  });

  const handleEdit = (id) => {
    navigate(`/edit-enquiry/${id}`);
  };

  const handleDelete = (workno) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.workno !== workno));
  };

  const handleViewMore = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null); // Close modal by resetting selected task
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center mb-6 w-full">
        <h1 className="text-2xl md:text-4xl font-extrabold text-navy-900 mb-4 md:mb-0">
          Task Overview
        </h1>
        <div className="relative w-full max-w-md md:max-w-sm lg:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-10 pr-4 w-full rounded-md border border-gray-300 bg-white  text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto border-b border-gray-300">
        <div className="flex space-x-2">
          {filterOptions.map((option) => (
            <button
              key={option.status}
              onClick={() => setFilter(option.status)}
              className={`py-3 px-4 text-gray-600 text-sm border-b-2 ${
                filter === option.status
                  ? "border-navy-700 text-black"
                  : "border-transparent hover:text-navy-500"
              } transition-colors whitespace-nowrap`}
            >
              {option.label}{" "}
              <span className="text-emerald-600 text-xs font-bold">
                ({statusCounts?.[option.status] || 0})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex justify-end gap-2">
        <button
          onClick={() => setAgentFilter("All")}
          className={`px-4 text-gray-600 text-sm border-b-2 ${
            agentFilter === "All"
              ? "bg-emerald-500 text-white rounded-br-lg rounded-bl-lg"
              : "border-transparent hover:text-navy-500"
          } transition-colors`}
        >
          All
        </button>
        <button
          onClick={() => setAgentFilter("Through Agent")}
          className={`px-4 text-gray-600 text-sm border-b-2 ${
            agentFilter === "Through Agent"
              ? "bg-emerald-500 text-white rounded-br-lg rounded-bl-lg"
              : "border-transparent hover:text-navy-500"
          } transition-colors`}
        >
          Through Agent
        </button>
        <button
          onClick={() => setAgentFilter("Non-Agent")}
          className={`px-4 py-1 text-gray-600 text-sm border-b-2 ${
            agentFilter === "Non-Agent"
              ? "bg-emerald-500 text-white rounded-br-lg rounded-bl-lg"
              : "border-transparent hover:text-navy-500"
          } transition-colors`}
        >
          Non-Agent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.workno}
              className="relative p-4 bg-white rounded-lg border border-gray-200 transition-transform duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-40 rounded-lg"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {task.EnqiryName}
                  </h3>
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="flex items-center justify-center p-2 rounded-full bg-white hover:bg-gray-200 transition-colors text-sm"
                  >
                    <FiEdit3 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <MdCalendarToday
                    size={12}
                    className="mr-1 mb-1 text-gray-500"
                  />
                  <span className="text-gray-600 text-sm">
                    {new Date(task.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col mb-4">
                  {task.throghAgent ? (
                    <>
                      <div className="flex">
                        <span className="font-sx text-gray-700">Name:</span>
                        <span className="text-gray-600 text-sm">
                          {task.AgentName || "N/A"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-700">Phone:</span>
                        <span className="text-gray-600 text-sm ">
                          {task.AgentNo || "N/A"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex">
                        <span className="text-sm text-gray-700">Name:</span>
                        <span className="text-gray-600 text-sm">
                          {task.CustomerName || "N/A"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-sm text-gray-700">Phone:</span>
                        <span className="text-gray-600 text-sm">
                          {task.CustomerNumber || "N/A"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleViewMore(task)}
                  className="flex items-center justify-center p-2 rounded-md bg-white hover:bg-gray-200 transition-colors"
                >
                  View More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No tasks found</p>
        )}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-transform transform duration-300 scale-100 hover:scale-101">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedTask.EnqiryName}
            </h2>
            <p className="mb-2 text-gray-600">
              <strong className="text-gray-800">Created Date:</strong>{" "}
              {new Date(selectedTask.createdDate).toLocaleDateString()}
            </p>
            {selectedTask.throghAgent ? (
              <>
                <p className="mb-1">
                  <strong className="text-gray-800">Agent:</strong>{" "}
                  {selectedTask.AgentName}
                </p>
                <p className="mb-1">
                  <strong className="text-gray-800">Agent No:</strong>{" "}
                  {selectedTask.AgentNo}
                </p>
                <p className="mb-4">
                  <strong className="text-gray-800">Agent Email:</strong>{" "}
                  {selectedTask.AgentEmail}
                </p>
              </>
            ) : (
              <>
                <p className="mb-1">
                  <strong className="text-gray-800">Customer:</strong>{" "}
                  {selectedTask.CustomerName || "N/A"}
                </p>
                <p className="mb-1">
                  <strong className="text-gray-800">Customer No:</strong>{" "}
                  {selectedTask.CustomerNumber || "N/A"}
                </p>
                <p className="mb-1">
                  <strong className="text-gray-800">Customer Email:</strong>{" "}
                  {selectedTask.CustomerEmail || "N/A"}
                </p>
                <p className="mb-4">
                  <strong className="text-gray-800">Address:</strong>{" "}
                  {selectedTask.CustomerAddress || "N/A"}
                </p>
              </>
            )}
            <p className="mt-4 mb-1">
              <strong className="text-gray-800">Enquiry Details:</strong>{" "}
              {selectedTask.EnqiryDetails || "N/A"}
            </p>
            <p className="mb-4">
              <strong className="text-gray-800">Remark:</strong>{" "}
              {selectedTask.remark || "N/A"}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Loader showLoader={isLoading} />
    </div>
  );
};

export default Home;
