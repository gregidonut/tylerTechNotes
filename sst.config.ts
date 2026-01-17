/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "tyler-tech-notes",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: { "aws-native": "1.48.0" },
    };
  },
  async run() {
    await import("./infra/web");
  },
});
