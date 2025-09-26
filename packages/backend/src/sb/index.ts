import builder, { cmd } from "@/utils/envBuilder";

function assertArg(value: string): cmd {
  if (!Object.values(cmd).includes(value as cmd)) {
    throw new Error(`Invalid arg: ${value}`);
  }
  return value as cmd;
}
const c = assertArg(process.argv.slice(2)[0]);

builder(c);
