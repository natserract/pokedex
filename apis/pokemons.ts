import { axiosInstance } from "~/apis/client";

export async function getAll(limit: number = 3000) {
  const { data: response } = await axiosInstance.get(`/pokemon?limit=${limit}`);

  return response;
}

export async function get(name: string) {
  const { data: response } = await axiosInstance.get(`/pokemon/${name}`);

  return response;
}
