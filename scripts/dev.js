import { spawn } from "node:child_process";
import { createServer as createNetServer } from "node:net";

const ensureAvailablePort = (startPort) =>
  new Promise((resolve, reject) => {
    const attempt = (port) => {
      const tester = createNetServer();
      tester.unref();

      tester.once("error", (error) => {
        try {
          tester.close();
        } catch {
          // ignore close errors when server failed to start
        }
        if (error.code === "EADDRINUSE") {
          attempt(port + 1);
        } else {
          reject(error);
        }
      });

      tester.once("listening", () => {
        tester.close(() => resolve(port));
      });

      tester.listen(port, "0.0.0.0");
    };

    attempt(startPort);
  });

const desiredPort = Number(process.env.API_PORT || process.env.PORT || 8787) || 8787;
const apiPort = await ensureAvailablePort(desiredPort).catch((error) => {
  console.error("Unable to find available port for API server", error);
  process.exit(1);
});

process.env.API_PORT = String(apiPort);
if (!process.env.PORT) {
  process.env.PORT = String(apiPort);
}

if (apiPort !== desiredPort) {
  console.log(`
⚠️  Desired API port ${desiredPort} in use, switched to ${apiPort}.`);
}

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

