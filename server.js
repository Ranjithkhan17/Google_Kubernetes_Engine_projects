const http = require('http');
const os = require('os');

const handleRequest = function(request, response) {
  // 1. Health check endpoint (Essential for K8s probes)
  if (request.url === '/healthz') {
    response.writeHead(200);
    response.end("OK");
    return;
  }

  // 2. Operational Info payload
  const info = {
    message: "Node.js System Diagnostic Active",
    podName: os.hostname(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 + " MB",
    appVersion: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development"
  };

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(info, null, 2));
};

const www = http.createServer(handleRequest);
www.listen(8080, () => {
  console.log("Diagnostic server listening on port 8080");
});
