const http = require('http');
const app = require('./app');
const config = require('./config/env');

const server = http.createServer(app);
const PORT = process.env.PORT || config.port || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});