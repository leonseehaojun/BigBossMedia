import "./loadEnv.js";
import { createServer } from "node:http";
import { parse } from "node:url";
import { StringDecoder } from "node:string_decoder";
import contactHandler from "./contact.js";

const rawPort = process.env.API_PORT ?? process.env.PORT ?? "8787";
const port = Number.parseInt(rawPort, 10) || 8787;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const buildRes = (res) => ({
  status(code) {
    res.statusCode = code;
    return this;
  },
  json(payload) {
    const body = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Length", Buffer.byteLength(body));
    res.end(body);
  },
});

const resolveOrigin = (req) => {
  if (!allowedOrigins.length || allowedOrigins.includes("*")) {
    return "*";
  }

  const requestOrigin = req.headers?.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0];
};

const setCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", resolveOrigin(req));
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const server = createServer((req, res) => {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const url = parse(req.url || "", true);

  if (url.pathname === "/api/health" && req.method === "GET") {
    return buildRes(res).json({ status: "ok" });
  }

  if (url.pathname === "/api/contact" && req.method === "POST") {
    const decoder = new StringDecoder("utf8");
    let buffer = "";

    req.on("data", (chunk) => {
      buffer += decoder.write(chunk);
      if (buffer.length > 1_000_000) {
        req.destroy();
      }
    });

    req.on("end", () => {
      buffer += decoder.end();
      try {
        const body = buffer ? JSON.parse(buffer) : {};
        contactHandler({ method: req.method, body }, buildRes(res));
      } catch (error) {
        console.error("Invalid JSON received", error);
        buildRes(res).status(400).json({ error: "Invalid request payload" });
      }
    });

    return;
  }

  buildRes(res).status(404).json({ error: "Not found" });
});

server.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
