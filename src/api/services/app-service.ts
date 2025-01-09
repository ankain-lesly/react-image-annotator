import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "..";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return await makeRequest("GET", "/api/projects/");
    },
  });
};

export const useGetProject = (projectId: string) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      return await makeRequest("GET", "/api/projects/" + projectId);
    },
  });
};

export const useMutationCreateProject = () => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return useMutation({
    mutationFn: async (payload: unknown) =>
      await makeRequest("POST", `/api/projects`, payload, config),
  });
};

export const useMutationUpdateProject = (projectId: string) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return useMutation({
    mutationFn: async (payload: unknown) =>
      await makeRequest("POST", `/api/projects/${projectId}`, payload, config),
  });
};
