import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ENV_PATH = resolve(process.cwd(), ".env");

if (existsSync(ENV_PATH)) {
  const lines = readFileSync(ENV_PATH, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"));

  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (!key) continue;
    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}
