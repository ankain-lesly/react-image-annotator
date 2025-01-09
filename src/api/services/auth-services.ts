import { useQuery } from "@tanstack/react-query";
import { apiRequest_Error, makeRequest } from "..";

// CODE(APPInit):
export const useInitializeStore = (token: boolean) => {
  return useQuery({
    queryKey: ["user", "store"],
    queryFn: async () => {
      return await makeRequest("GET", "/api/init");
    },
    retry: 0,
    enabled: token,
  });
};

// Handle Auth Requests
export const register = async (payload = {}) => {
  return await apiRequest_Error("POST", "/api/auth/register", payload);
};

// Login
export const login = async (payload = {}) => {
  return await apiRequest_Error("POST", "/api/auth/login", payload);
};

// Logout
export const logout = async (payload = {}) => {
  return await apiRequest_Error("POST", "/api/auth/logout", payload);
};
