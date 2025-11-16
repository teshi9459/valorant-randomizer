const path = require("path");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
app.set("trust proxy", true);

// Security headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Compression middleware
app.use(compression());

// Serve static files from public directory with caching
const oneHour = 60 * 60 * 1000;
app.use(express.static(path.join(__dirname, "public"), {
  etag: true,
  lastModified: true,
  maxAge: oneHour
}));

// Fallback to index.html for all other routes
app.get("*", function(_, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("Server listening on port " + PORT);
});
