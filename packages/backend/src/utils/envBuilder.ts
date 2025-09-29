import { ChildProcess, SpawnOptions, spawn } from "node:child_process";
import { Resource } from "sst";

//github.com/supabase/cli/issues/2588
const DOCKER_HOST = "unix:///var/run/docker.sock";
const CLERK_FE_DOMAIN = Resource.ClerkFeDomain.value;

export enum cmd {
  start = "start",
  stop = "stop",
  status = "status",
  genTypes = "genTypes",
}

export default function (c: cmd) {
  let supabase: ChildProcess;
  const opts: SpawnOptions = {
    cwd: "./supabase",
    env: {
      ...process.env,
      DOCKER_HOST,
      CLERK_FE_DOMAIN,
    },
    stdio: "inherit",
  };

  switch (c) {
    case cmd.genTypes:
      supabase = spawn(
        "bunx",
        [
          "supabase",
          "gen",
          "types",
          "typescript",
          "--schema",
          "public",
          "--local",
        ],
        opts,
      );
      break;
    default:
      supabase = spawn(
        "bunx",
        ["supabase", c],

        opts,
      );
  }
  supabase.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
