import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:4321",
  },
});
