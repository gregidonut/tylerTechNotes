import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";
import { getTickets } from "./src/tickets/queries.queries";
import DatabaseClient from "./src/db/client";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async queryDatabase() {
          const db = DatabaseClient.getInstance();
          await db.connect();
          const tickets = await getTickets.run(null, db.getClient());
          await db.disconnect();
          return tickets;
        },
      });
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:4321",
  },
});
