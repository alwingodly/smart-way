import ApiClient from "../apiManager/DefaultClient";
import {
  AddEmployeeURL,
  DeleteEmployeesURL,
  GetEmployeeDetailsURL,
  GetEmployeesURL,
} from "../apiManager/EndPoints";

const addEmployee = async (data) => {
  try {
    const response = await new ApiClient().executeJsonPost(
      AddEmployeeURL,
      data
    );
    if (response.success) {
      return response;
    } else {
      throw response;
    }
  } catch (error) {
    throw error.response.data;
  }
};

const GetEmployeeService = async () => {
  try {
    const response = await new ApiClient().executeGet(GetEmployeesURL);
    if (response.success) {
      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const GetEmployeeDetailsService = async (data) => {
  try {
    const response = await new ApiClient().executeGet(
      GetEmployeeDetailsURL,
      data
    );
    if (response.success) {
      console.log(response.data);
      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const DeleteEmployeeService = async (data) => {
  try {
    console.log(data);
    const response = await new ApiClient().executeDelete(
      DeleteEmployeesURL,
      data
    );
    console.log(response);

    console.log(response.data, "response");
    if (response.success) {
      return response.data;
    } else {
      throw response;
    }
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export default {
  addEmployee,
  GetEmployeeService,
  DeleteEmployeeService,
  GetEmployeeDetailsService,
};
