import z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    API_URL: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    APPLICATION_PORT: z.number(),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV || "development",
    APPLICATION_PORT: parseInt(process.env.APPLICATION_PORT, 10),
  },
});
