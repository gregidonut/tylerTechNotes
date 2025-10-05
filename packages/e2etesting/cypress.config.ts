import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";
import { globSync } from "glob";
import * as path from "path";
import DatabaseClient from "./src/db/client";

const queries = (function () {
  const queryFiles = globSync("src/**/*.queries.ts");
  const queries: Record<string, any> = {};

  for (const file of queryFiles) {
    const modulePath = path.resolve(file);
    const mod = require(modulePath);
    for (const [name, value] of Object.entries(mod)) {
      queries[name] = value;
    }
  }

  return queries;
})();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async queryDatabase({
          queryName,
          args,
        }: {
          queryName: string;
          args: any;
        }) {
          const db = DatabaseClient.getInstance();
          const query = queries[queryName];
          if (!query) throw new Error(`Query "${queryName}" not found`);
          return await db.executeQuery(query, args);
        },
      });
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:4321",
  },
});
