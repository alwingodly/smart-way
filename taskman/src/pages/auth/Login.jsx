import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { AuthenticationConstants } from "../../constants/stringConstants";
import { showCustomToast } from "../../components/toast/customToast";
import authService from "../../service/authService";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../redux/authSlice";
import { store } from "../../redux/store";
import Loader from "../../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const AuthenticationConstants = {
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    EMAIL_PATTERN_MESSAGE: "Please enter a valid email",
    EMAIL: "Email Address",
    PASSWORD: "Password",
    LOGIN: "Log In",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const requestBody = {
        email: data.email,
        password: data.password,
      };

      const jsonBody = JSON.stringify(requestBody);

      const response = isAdmin
        ? await authService.adminLogin(jsonBody)
        : await authService.login(jsonBody);
      console.log(response);
      if (!response.error && response.success && response.data.admin) {
        setIsloading(false);
        store.dispatch(setLogin(response.data.admin));
        navigate("/dashboard", { replace: true });
      } else {
        setIsloading(false);
        store.dispatch(setLogin(response.data.admin));
        navigate("/home", { replace: true });
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
      showCustomToast(error.message, "error");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-100 via-indigo-200 to-purple-300">
      <div className="w-full max-w-md p-8 lg:p-10 mx-auto bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex justify-center items-center mb-6">
          {/* Logo Placeholder */}
          <h1 className="text-4xl font-bold text-gray-700 tracking-wide">
            Login
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Email Field */}
          <div className="mt-4 relative flex items-center border border-gray-300 rounded-lg shadow-sm bg-gray-100">
            <div className="absolute ml-4">
              <MdEmail className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: AuthenticationConstants.EMAIL_REQUIRED,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: AuthenticationConstants.EMAIL_PATTERN_MESSAGE,
                },
              })}
              className="block w-full p-4 py-3 pl-12 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-md text-gray-700"
              placeholder={AuthenticationConstants.EMAIL}
              autoComplete="off"
              name="email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <div className="relative mt-6 flex items-center border border-gray-300 rounded-lg shadow-sm bg-gray-100">
            <div className="absolute ml-4">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: AuthenticationConstants.PASSWORD_REQUIRED,
              })}
              className="block w-full p-4 py-3 pl-12 pr-12 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-md text-gray-700"
              placeholder={AuthenticationConstants.PASSWORD}
              autoComplete="new-password"
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}

          {/* Admin Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="adminCheck"
              className="mr-2"
              value={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label htmlFor="adminCheck" className="text-gray-600">
              Login as Administrator
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-r hover:from-teal-500 hover:via-emerald-500 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {AuthenticationConstants.LOGIN}
          </button>

          {/* Signup Option */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-teal-500 hover:underline">
              Contact Administrator
            </a>
          </p>
        </form>
      </div>
      <Loader showLoader={isLoading} />
    </div>
  );
};

export default Login;
