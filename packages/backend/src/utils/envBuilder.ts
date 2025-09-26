import { spawn } from "node:child_process";
import { Resource } from "sst";

//github.com/supabase/cli/issues/2588
const DOCKER_HOST = "unix:///var/run/docker.sock";
const CLERK_FE_DOMAIN = Resource.ClerkFeDomain.value;

export enum cmd {
  start = "start",
  stop = "stop",
  status = "status",
}

export default function (cmd: cmd) {
  const supabase = spawn("bunx", ["supabase", cmd], {
    cwd: "./supabase",
    env: {
      ...process.env,
      DOCKER_HOST,
      CLERK_FE_DOMAIN,
    },
    stdio: "inherit",
  });
  supabase.on("exit", (code) => {
    console.log(`supabase exited with code ${code}`);
    process.exit(code ?? 0);
  });
}
