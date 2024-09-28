import React from "react";
import { useForm } from "react-hook-form";
import adminService from "../../service/adminService";
import { showCustomToast } from "../../components/toast/customToast";
import { MdKeyboardArrowDown } from "react-icons/md";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const jsonBody = JSON.stringify(data);

      const response = await adminService.addEmployee(jsonBody);
      if (!response.error && response.success) {
        showCustomToast(response.message);
        reset();
      }
    } catch (error) {
      console.log(error);
      showCustomToast(error.message, "error");
    }
  };

  return (
    <div className="max-w-2xl w-[100%] mx-auto flex items-center">
    <div className=" p-6 shadow-sm w-[100%] rounded-xl border border-gray-200 bg-white mt-16">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`w-full px-4 py-2 mb-1 text-sm bg-transparent border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter employee's name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
            className={`w-full px-4 py-2 mb-1 text-sm bg-transparent border rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter employee's email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-4 py-2 mb-1 text-sm bg-transparent border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter employee's password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Employee ID Input */}
        <div className="mb-4">
          <label
            htmlFor="employeeId"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Employee ID
          </label>
          <input
            id="employeeId"
            type="text"
            {...register("employeeId", { required: "Employee ID is required" })}
            className={`w-full px-4 py-2 mb-1 text-sm bg-transparent border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter employee ID"
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.employeeId.message}
            </p>
          )}
        </div>
        {/* Department Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Department
          </label>
          <select
            id="department"
            {...register("department", { required: "Department is required" })}
            className={`w-full  px-4 appearance-none bg-transparent py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
          >
            <option value="">Select department</option>
            <option value="departmentA">department A</option>
            <option value="departmentB">department B</option>
            <option value="departmentC">department C</option>
            <option value="departmentD">department D</option>
          </select>
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown className="w-4 h-4 text-black" />
              </span>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 mb-1 text-sm text-white rounded-md hover:from-emerald-700 hover:to-emerald-700 focus:outline-none focus:border-transparent"
            disabled={isSubmitting}
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddEmployee;
