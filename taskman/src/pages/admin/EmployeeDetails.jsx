import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../service/adminService";
import Loader from "../../components/Loader";
import { IoArrowBackSharp } from "react-icons/io5";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employeeEnquires, setEmployeeEnquires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    handleEmployeeDetails();
  }, []);

  const handleEmployeeDetails = async () => {
    try {
      setIsloading(true);
      const paramsBody = { id: employeeId };
      const response = await adminService.GetEmployeeDetailsService(paramsBody);
      if (response) {
        setIsloading(false);
        setEmployeeEnquires(response.employeeEnquires.enquires);
      }
    } catch (error) {
      setIsloading(false);
      setError("Failed to fetch employee details.");
      console.error("Error fetching employee details", error);
    } finally {
      setIsloading(false);
      setLoading(false);
    }
  };

  const handleViewMore = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }
  const goBackToHome = ()=>{
    navigate('/dashboard' , {replace:true})
  }
  return (
    <div className="p-4">
      <div className="px-6 py-2 md:flex hidden cursor-pointer gap-4" ><p onClick={goBackToHome} className=" bg-gradient-to-r from-emerald-600 to-emerald-700 flex text-white rounded-lg items-center justify-center text-sm gap-2 px-6 p-2"><IoArrowBackSharp size={20}/> Go to dashboard </p></div>

      <h1 className="text-2xl md:text-4xl items-center  font-bold text-center mb-8 text-gray-800 flex md:justify-center gap-6">
      <IoArrowBackSharp size={24} className="md:hidden flex"/>  Employee Enquiries
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-4 md:px-8">
        {employeeEnquires.length > 0 ? (
          employeeEnquires.map((task) => (
            <div
              key={task.workno}
              className="relative p-6 bg-gradient-to-br from-emerald-50 to-sky-50 border hover:border-green-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg duration-200"
            >
              <p className="text-xl font-semibold text-gray-900 mb-2 truncate flex justify-between">
                {task.EnqiryName} <span className=" flex items-center justify-center text-xs border px-4 rounded-full border-emerald-600 text-emerald-600">{task.status}</span>
              </p>
              <div className="text-gray-700 text-sm space-y-2">
                <span className="flex">
                  <span className="font-medium text-gray-900 w-1/3">Date:</span>
                  <span className="text-gray-600 truncate">
                    {new Date(task.createdDate).toLocaleDateString()}
                  </span>
                </span>
                {task.throghAgent ? (
                  <>
                    <span className="flex">
                      <span className="font-medium text-gray-900 w-1/3">
                        Agent Name:
                      </span>
                      <span className="text-gray-600 truncate">
                        {task.AgentName}
                      </span>
                    </span>
                    <span className="flex">
                      <span className="font-medium text-gray-900 w-1/3">
                        Agent No:
                      </span>
                      <span className="text-gray-600 truncate">
                        {task.AgentNo}
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex">
                      <span className="font-medium text-gray-900 w-1/3">
                        Customer Name:
                      </span>
                      <span className="text-gray-600 truncate">
                        {task.CustomerName || "N/A"}
                      </span>
                    </span>
                    <span className="flex">
                      <span className="font-medium text-gray-900 w-1/3">
                        Customer No:
                      </span>
                      <span className="text-gray-600 truncate">
                        {task.CustomerNumber || "N/A"}
                      </span>
                    </span>
                  </>
                )}
              </div>
              <button
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 mt-6 rounded-md text-sm font-medium hover:bg-gradient-to-l hover:from-teal-500 hover:to-emerald-500 shadow-md transition-all duration-200"
                onClick={() => handleViewMore(task)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          <div className="">
            <p className="text-gray-500 text-center">No enquiries found</p>
          </div>
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

export default EmployeeDetails;
