import { axiosInstance } from "~/apis/client";

export async function getAll(
  limit: number = 3000,
  controller: AbortController,
) {
  const { data: response } = await axiosInstance.get(
    `/pokemon?limit=${limit}`,
    {
      signal: controller.signal,
    },
  );

  return response;
}

export async function get(name: string, controller: AbortController) {
  const { data: response } = await axiosInstance.get(`/pokemon/${name}`, {
    signal: controller.signal,
  });

  return response;
}
