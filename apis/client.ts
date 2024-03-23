import axios from "axios";

import { env } from "~/configs/env";

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Cache-Control": "max-age=600", // upto 10 mins of cached response
  },
});
