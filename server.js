const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  const relativePath = urlPath === "/" ? "/index.html" : urlPath;
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.code === "ENOENT" ? "404 Not Found" : "500 Internal Server Error");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Joining Generations running at http://localhost:${PORT}`);
  console.log("Available pages:");
  console.log(`  - Home:          http://localhost:${PORT}/index.html`);
  console.log(`  - About Us:      http://localhost:${PORT}/about.html`);
  console.log(`  - What We Do:    http://localhost:${PORT}/programs.html`);
  console.log(`  - Events:        http://localhost:${PORT}/events.html`);
  console.log(`  - Work With Us:  http://localhost:${PORT}/work-with-us.html`);
  console.log(`  - Resources:     http://localhost:${PORT}/resources.html`);
});
