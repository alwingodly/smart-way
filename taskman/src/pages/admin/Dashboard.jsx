import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../service/adminService";
import { MdKeyboardArrowDown, MdDelete } from "react-icons/md";
import PieChart from "./charts/PieChart";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      setIsloading(true);
      const result = await adminService.GetEmployeeService();
      if (result) {
        setIsloading(false);
        setEmployees(result.employees);
      }
    } catch (error) {
      setIsloading(false);
      console.error("Failed to fetch employees", error);
    }
  };

  const handleRowClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const handleDelete = async (id) => {
    try {
      const paramsBody = {
        id: id,
      };
      await adminService.DeleteEmployeeService(paramsBody);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const value = searchQuery.toLowerCase();
    switch (searchCategory) {
      case "name":
        return employee.name.toLowerCase().includes(value);
      case "employeeId":
        return employee.employeeId.toString().includes(value);
      case "email":
        return employee.email.toLowerCase().includes(value);
      case "department":
        return employee.department.toLowerCase().includes(value);
      default:
        return true;
    }
  });

  return (
    <div className="p-2 md:p-4">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-emerald-600">
          Employee Details
        </h1>
        {/* Search & Filter */}
        <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
          <div className="relative">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full md:w-36 bg-white px-4 appearance-none py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500"
            >
              <option value="name">Name</option>
              <option value="employeeId">Employee ID</option>
              <option value="email">Email</option>
              <option value="department">Department</option>
            </select>
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="w-4 h-4 text-black" />
            </span>
          </div>
          <input
            type="text"
            placeholder={`Search by ${searchCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-10 pr-4 w-full md:w-auto rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="mb-6">
        {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">
              Total Employees
            </h3>
            <p className="text-2xl font-semibold text-emerald-600">
              {employees.length}
            </p>
          </div> */}
        </div>
      </div>
      {/* <div className="p-4 bg-white items-center justify-center rounded-lg max-w-lg">
        <h3 className="text-lg font-medium text-gray-600">
          Enquiries per Department
        </h3>
        <PieChart /> 
      </div> */}
      {/* Table */}

      {filteredEmployees.length > 0 ? (
        <div className="overflow-x-auto overflow-y-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white border border-gray-300 text-left text-sm">
              <thead className="bg-emerald-600 rounded-t-lg">
                <tr>
                  {[
                    "Name",
                    "Employee ID",
                    "Email",
                    "Department",
                    "Pending",
                    "Started",
                    "Completed",
                    "Hold",
                    "Rejected",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2 px-3 md:px-4 text-white uppercase tracking-wider text-xs md:text-sm whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-emerald-50 cursor-pointer transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td
                      className="py-2 px-3 md:px-4 border-b whitespace-nowrap"
                      onClick={() => handleRowClick(employee.employeeId)}
                    >
                      {employee.name}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.employeeId}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.email}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.department}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.statusCounts.Pending}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.statusCounts.Started}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.statusCounts.Completed}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.statusCounts.Hold}
                    </td>
                    <td className="py-2 px-3 md:px-4 border-b whitespace-nowrap">
                      {employee.statusCounts.Rejected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No employees found.</p>
      )}
      <Loader showLoader={isLoading} />
    </div>
  );
};

export default Dashboard;
