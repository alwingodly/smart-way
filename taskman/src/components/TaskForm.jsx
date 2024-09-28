import React from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import { showCustomToast } from "./toast/customToast";
import userService from "../service/userService";

const TaskForm = ({ setIsloading }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const throghAgent = watch("throghAgent", false);

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const jsonBody = JSON.stringify(data);

      const response = await userService.addEnquiry(jsonBody);
      if (!response.error && response.success) {
        setIsloading(false);
        showCustomToast(response.message);
        reset();
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
      showCustomToast(error.message, "error");
    }
  };

  return (
    <div className="p-6 shadow-sm w-[100%] rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Enquiry</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="EnqiryName"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Task Name
          </label>
          <input
            type="text"
            {...register("EnqiryName", { required: "Task name is required" })}
            className={`w-full px-4 py-2 mb-1 bg-transparent text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter Task Name"
          />
          {errors.EnqiryName && (
            <span className="text-red-600">{errors.EnqiryName.message}</span>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="status"
              className="block text-gray-700 font-medium mb-1 text-sm"
            >
              Status
            </label>
            <div className="relative">
              <select
                {...register("status", { required: "Status is required" })}
                className={`w-full  px-4 appearance-none bg-transparent py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
              >
                <option value="Pending">Pending</option>
                <option value="Started">Started</option>
                <option value="Completed">Completed</option>
                <option value="Hold">Hold</option>
                <option value="Rejected">Rejected</option>
              </select>
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown className="w-4 h-4 text-black" />
              </span>
            </div>
            {errors.status && (
              <span className="text-red-600">{errors.status.message}</span>
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="paymentStatus"
              className="block text-gray-700 font-medium mb-1 text-sm"
            >
              Payment Status
            </label>
            <div className="relative">
              <select
                {...register("paymentStatus", {
                  required: "Payment status is required",
                })}
                className={`w-full px-4 bg-transparent appearance-none py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown className="w-4 h-4 text-black" />
              </span>
            </div>
            {errors.paymentStatus && (
              <span className="text-red-600">
                {errors.paymentStatus.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="throghAgent"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Through Agent?
          </label>
          <input
            type="checkbox"
            {...register("throghAgent")}
            className="ml-2 bg-transparent text-emerald-500"
          />
        </div>

        {throghAgent ? (
          <>
            <div>
              <label
                htmlFor="AgentName"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Agent/Agency Name
              </label>
              <input
                type="text"
                {...register("AgentName", {
                  required: "Agent name is required",
                })}
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Agent Name"
              />
              {errors.AgentName && (
                <span className="text-red-600">{errors.AgentName.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="AgentNo"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Agent Number
              </label>
              <input
                type="text"
                {...register("AgentNo", {
                  required: "Agent number is required",
                })}
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Agent Number"
                maxLength={15}
              />
              {errors.AgentNo && (
                <span className="text-red-600">{errors.AgentNo.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="AgentEmail"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Agent Email
              </label>
              <input
                id="AgentEmail"
                {...register("AgentEmail", {})}
                type="email"
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Agent Email"
              />
              {errors.AgentEmail && (
                <span className="text-red-600">
                  {errors.AgentEmail.message}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label
                htmlFor="CustomerName"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Customer Name
              </label>
              <input
                type="text"
                {...register("CustomerName", {
                  required: "Customer name is required",
                })}
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Customer Name"
              />
              {errors.CustomerName && (
                <span className="text-red-600">
                  {errors.CustomerName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="CustomerNumber"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Customer Number
              </label>
              <input
                type="text"
                {...register("CustomerNumber", {
                  required: "Customer number is required",
                })}
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Customer Number"
                maxLength={15}
              />
              {errors.CustomerNumber && (
                <span className="text-red-600">
                  {errors.CustomerNumber.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="CustomerEmail"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Customer Email
              </label>
              <input
                id="CustomerEmail"
                {...register("CustomerEmail", {})}
                type="email"
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Customer Email"
              />
              {errors.CustomerEmail && (
                <span className="text-red-600">
                  {errors.CustomerEmail.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="CustomerAddress"
                className="block text-gray-700 font-medium mb-1 text-sm"
              >
                Customer Address
              </label>
              <input
                id="CustomerAddress"
                {...register("CustomerAddress", {})}
                type="text"
                className={`w-full bg-transparent px-4 py-2 mb-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
                placeholder="Enter Customer Address"
              />
              {errors.CustomerAddress && (
                <span className="text-red-600">
                  {errors.CustomerAddress.message}
                </span>
              )}
            </div>
          </>
        )}
        <div>
          <label
            htmlFor="EnqiryDetails"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Enqiry details
          </label>
          <textarea
            {...register("EnqiryDetails", {
              required: "Enqiry Details is required",
            })}
            className={`w-full px-4 bg-transparent py-2 mb-1 text-sm  border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter EnqiryDetails"
            rows={4}
          />
          {errors.EnqiryDetails && (
            <span className="text-red-600">{errors.EnqiryDetails.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="remark"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Remark
          </label>
          <textarea
            {...register("remark", { required: "Remark is required" })}
            className={`w-full px-4 bg-transparent py-2 mb-1 text-sm  border border-gray-200 rounded-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-emerald-500`}
            placeholder="Enter Remark"
            rows={4}
          />
          {errors.remark && (
            <span className="text-red-600">{errors.remark.message}</span>
          )}
        </div>
        <div className="flex justify-start mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 mb-1 text-sm text-white rounded-md hover:from-emerald-700 hover:to-emerald-700 focus:outline-none focus:border-transparent"
          >
            Add Enquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
