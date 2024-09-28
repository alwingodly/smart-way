import ApiClient from "../apiManager/DefaultClient"
import { GetUserEnquiriesURL, AddEnquiryURL, EditEnquiryURL, GetEnquiryURL } from "../apiManager/EndPoints";
  
  
  const addEnquiry = async (data) => {
    try {
      const response = await new ApiClient().executeJsonPost(
        AddEnquiryURL,
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

  const EditEnquiry = async (data) => {
    try {
      const response = await new ApiClient().executeJsonPost(
        EditEnquiryURL,
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

  const GetUserEnquiries = async () => {
    try {
      const response = await new ApiClient().executeGet(
        GetUserEnquiriesURL,
      );
      console.log(response.data, "response");
      if (response.success) {
        return response.data;
      } else {
        throw response;
      }
    } catch (error) {
      throw error.response.data;
    }
  };

  const GetEnquiry = async (data) => {
    try {
      const response = await new ApiClient().executeGet(
        GetEnquiryURL,
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
  export default {
    addEnquiry,
    GetUserEnquiries,
    GetEnquiry,
    EditEnquiry
  };
  