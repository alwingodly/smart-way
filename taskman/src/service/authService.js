import ApiClient from "../apiManager/DefaultClient"
import {AdminLoginURL, LoginURL} from "../apiManager/EndPoints"
  
  
  const login = async (data) => {
    try {
      const response = await new ApiClient().executeHttpPost(
        LoginURL,
        data
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw response;
      }
    } catch (error) {
      throw error.response.data;
    }
  };

  const adminLogin = async (data) => {
    try {
      const response = await new ApiClient().executeHttpPost(
        AdminLoginURL,
        data
      );
      console.log(response.data, "g-form");
      if (response.data.success) {
        return response.data;
      } else {
        throw response;
      }
    } catch (error) {
      let message = "Something went wrong"
      throw error.response.data ?error.response.data:message;
    }
  };
  

  
  export default {
    login,adminLogin
  };
  