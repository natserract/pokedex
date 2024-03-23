import z from "zod";

const schema = z.object({
  API_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  APPLICATION_PORT: z.number(),
});

export const env = schema.parse({
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  APPLICATION_PORT: parseInt(process.env.APPLICATION_PORT as string, 10),
});
