import axiosInstance from "./HttpCommon";
import * as HttpMethod from "./HttpMethods";
import ApiClientResult from "./ApiClientResult";
import { persistor, store } from "../redux/store";
import { LoginURL } from "./EndPoints";
import { setLogout } from "../redux/authSlice";

class DefaultClient {
  constructor() {
    if (!DefaultClient.instance) {
      DefaultClient.instance = this;
    }
    return DefaultClient.instance;
  }

  async executeHttpPost(url, requestBody) {
    return await axiosInstance.post(`${url}`, requestBody, {
      withCredentials: true,
    });
  }

  async executeGet(url, params) {
    let reponse = await this.executeApi(url, HttpMethod.GET, params, null);
    return reponse.apiResponse;
  }

  async executeDelete(url, params) {
    const newUrl = `${url}/${params.id}`;
    let reponse = await this.executeApi(
      newUrl,
      HttpMethod.DELETE,
      params,
      null
    );
    return reponse.apiResponse;
  }

  async executePost(url, params) {
    let reponse = await this.executeApi(url, HttpMethod.POST, params, null);
    return reponse.apiResponse;
  }

  async executeJsonPost(url, requestBody) {
    let response = await this.executeApi(
      url,
      HttpMethod.POST,
      null,
      requestBody
    );
    return response.apiResponse;
  }

  async executeApi(url, method, params, requestBody) {
    const apiResult = new ApiClientResult();
    let response = null;
    if (HttpMethod.GET === method) {
      try {
        if (params) {
          const newUrl = `${url}/${params.id}`;
          console.log("params", newUrl);

          response = await this.executeHttpParamsGet(newUrl);
          apiResult.setApiResponse(response.data);
        } else {
          console.log("noo params");

          response = await this.executeHttpGet(url, params, null);
          apiResult.setApiResponse(response.data);
        }
      } catch (error) {
        if (error?.message === "canceled") {
          throw { message: "Api Cancelled" };
        }
        if (error.status === 401) {
          store.dispatch(setLogout());
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
        }
        console.log(
          "catch block error.response.data.error",
          error?.response?.data?.error
        );
        console.log(
          "catch block error.response.data.errorReason",
          error?.response?.data?.errorReason
        );
        console.log(
          "catch block error.response.data.errorMessage",
          error?.response?.data?.errorMessage
        );

        apiResult.setError(error?.response?.data?.error);
        apiResult.setErrorReason(error?.response?.data?.errorReason);
        apiResult.setErrorMessage(error?.response?.data?.errorMessage);
      }
    } else if (HttpMethod.POST === method) {
      if (!requestBody) {
        try {
          //only for reset password as of now
          response = await this.executeHttpNormalPost(url, params, null);
          apiResult.setApiResponse(response.data);
        } catch (error) {
          if (error?.message === "canceled") {
            throw { message: "Api Cancelled" };
          }
          if (error.status === 401) {
            store.dispatch(setLogout());
            persistor.pause();
            persistor.flush().then(() => {
              return persistor.purge();
            });
          }
          console.log(
            "catch block error.response.data.error",
            error.response.data.error
          );
          console.log(
            "catch block error.response.data.errorReason",
            error.response.data.errorReason
          );
          console.log(
            "catch block error.response.data.errorMessage",
            error.response.data.errorMessage
          );
          apiResult.setError(error.response.data.error);
          apiResult.setErrorReason(error.response.data.errorReason);
          apiResult.setErrorMessage(error.response.data.errorMessage);
          //throw error;
        }
      } else {
        // json post with request body need to handle here
        try {
          response = await this.executeHttpJsonPost(url, requestBody, null);
          apiResult.setApiResponse(response.data);
        } catch (error) {
          if (error.status === 401) {
            store.dispatch(setLogout());
            persistor.pause();
            persistor.flush().then(() => {
              return persistor.purge();
            });
          }
          console.error(error, "hh");
          throw error;
        }
      }
    } else if (HttpMethod.DELETE === method) {
      try {
        response = await this.executeHttpDelete(url);
        apiResult.setApiResponse(response.data);
      } catch (error) {
        if (error.status === 401) {
          store.dispatch(setLogout());
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
        }
        apiResult.setError(error);
      }
    }
    return apiResult;
  }

  async executeHttpNormalGet(url, params, headers) {
    return await axiosInstance.get(`${url}`, {
      params: { ...params },
      headers: this.getHeaders(),
    });
  }

  async executeHttpGet(url, params, headers) {
    return await axiosInstance.get(url, {
      params: { ...params },
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }
  async executeHttpParamsGet(url) {
    return await axiosInstance.get(url, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }
  async executeHttpDelete(url) {
    return await axiosInstance.delete(url, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  async executeHttpNormalPost(url, params, headers) {
    return await axiosInstance.post(`${url}`, null, {
      params: { ...params },
      headers: this.getHeaders(),
    });
  }

  async executeHttpJsonPost(url, requestBody, headers) {
    return await axiosInstance.post(`${url}`, requestBody, {
      withCredentials: true,
    });
  }

  async downloadFile(url) {
    return await axiosInstance.get(url, {
      responseType: "arraybuffer",
      headers: this.getHeaders(),
    });
  }

  async executePostUpload(url, uploadFile) {
    try {
      return await axiosInstance.post(`${url}`, uploadFile, {
        headers: this.getMultiPartHeaders(),
        transformRequest: [
          (uploadFile, headers) => {
            delete headers.common["Expect"];
            return uploadFile;
          },
        ],
      });
    } catch (error) {
      console.log("Error in uploading files .", JSON.stringify(error));
      throw error;
    }
  }
  getTokenHeader(bearerToken) {
    return "Bearer " + bearerToken;
  }
  getBearerToken() {
    const state = store.getState();
    return state.auth.bearerToken;
    // return this.authentication.getAuthReponse().getToken();
  }

  getHeaders() {
    return {
      Authorization: this.getTokenHeader(this.getBearerToken()),
    };
  }

  getMultiPartHeaders() {
    return {
      //   Authorization: this.getTokenHeader(this.getBearerToken()),
      "Content-Type": "multipart/form-data",
    };
  }
  getJsonHeaders(url) {
    if (url == LoginURL) {
      return {
        "content-type": "application/json",
      };
    } else {
      return {
        "content-type": "application/json",
        Authorization: this.getTokenHeader(this.getBearerToken()),
      };
    }
  }
}

export default DefaultClient;
