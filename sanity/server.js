const express = require("express");
const path = require("path");

const app = express();

const buildPath = path.resolve(__dirname, "./dist");
const basePath = "/arbeid/cms";
app.set("views", buildPath);

// Parse application/json
app.use(express.json());

// Static files
app.use(basePath, express.static(buildPath, { index: false }));

// Nais functions
app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(buildPath + "/index.html"));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.info(`🚀 App listening on port: ${port}`));

process.on("SIGINT", () => {
  console.log("✊ Caught SIGINT. Shutting down! ☠️");
  server.close(() => {
    process.exit(0);
  });
});
