import { spawn } from "node:child_process";

const processes = [
  { name: "server", command: "npm", args: ["run", "dev:server"], color: "\x1b[95m" },
  { name: "web", command: "npm", args: ["run", "dev:client", "--", "--host"], color: "\x1b[96m" },
];

const children = [];

const log = (name, color, message) => {
  const reset = "\x1b[0m";
  process.stdout.write(`${color}[${name}]${reset} ${message}`);
};

for (const proc of processes) {
  const child = spawn(proc.command, proc.args, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    env: process.env,
  });

  child.stdout.on("data", (data) => log(proc.name, proc.color, data.toString()));
  child.stderr.on("data", (data) => log(proc.name, "\x1b[91m", data.toString()));
  child.on("close", (code) => {
    log(proc.name, proc.color, `exited with code ${code}\n`);
    shutdown(code ?? 0);
  });

  children.push(child);
}

const shutdown = (code = 0) => {
  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  }
  if (!shutdown.called) {
    shutdown.called = true;
    setTimeout(() => process.exit(code), 100);
  }
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

shutdown.called = false;

