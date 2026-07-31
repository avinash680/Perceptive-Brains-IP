const http = require('http');
const app = require('./app');
const config = require('./config/env');

const server = http.createServer(app);
const host = '0.0.0.0';
const preferredPort = Number(process.env.PORT || config.port || 3000);

function startServer(port) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} is busy. Trying a free port...`);
      startServer(0);
      return;
    }

    console.error('Server failed to start:', err);
    process.exit(1);
  });

  server.listen(port, host, () => {
    const actualPort = server.address().port;
    console.log(`Server is running on port ${actualPort}`);
  });
}

startServer(preferredPort);