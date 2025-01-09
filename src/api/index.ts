import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosClient from "../lib/axios-client";

/**
 * Generic API Requests
 * Makes an api request without handling errors
 *
 * @param method request method
 * @param url request url
 * @param data request data
 * @param config request config
 * @returns
 */
// export const makeRequest = async <T extends object & { data: object }>(
export const makeRequest = async <
  T extends object & { data: { [key: string]: any } }
>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  // : Promise<{ data?: T; error?: any }>
  // >>
  const response: AxiosResponse<T> = await axiosClient.request<T>({
    method,
    url,
    data,
    ...config,
  });
  // console.log("RESPONSE: ", response);
  // >>
  // if (response.statusText != "OK") {
  //   //  throw new Error("Network response was not ok");
  //   throw new Error("Network network error");
  // }
  return { ...response.data };
  // return { data: response.data };
};

/**
 * Generic API Requests
 * Makes an api request including handling errors
 *
 * @param method request method
 * @param url request url
 * @param data request data
 * @param config request config
 * @returns
 */
export const apiRequest_Error = async <
  T extends object & { data: { [key: string]: any } }
>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<{ data?: T; error?: any }> => {
  try {
    const response: AxiosResponse<T> = await axiosClient.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return { data: response.data };
  } catch (err) {
    return handleRequestError(err as AxiosError);
  }
};

// Error handling
const handleRequestError = (err: AxiosError): { error: any } => {
  if (err.code === "ERR_NETWORK") {
    // logger.error('Network error:', err.message);
    return { error: { message: err.message } };
  } else if (err.response) {
    const { data, status } = err.response;
    // logger.error('API error:', { data, status });
    return { error: { ...(data as object), status } };
  } else {
    // logger.error('Unexpected error:', err);
    return { error: { message: "An unexpected error occurred" } };
  }
};
