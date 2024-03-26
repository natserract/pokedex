import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    API_URL: 3000,
  },
  e2e: {
    baseUrl: `http://localhost:${3000}`,
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
