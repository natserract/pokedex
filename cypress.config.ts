import { defineConfig } from "cypress";
import { env } from "~/configs/env";

export default defineConfig({
  env,
  e2e: {
    baseUrl: `http://localhost:${env.APPLICATION_PORT}`,
    specPattern: "cypress/e2e/*.ts",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  experimentalInteractiveRunEvents: true,
});
