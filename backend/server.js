const http = require('http');
const app = require('./app');
const config = require('./config/env');

const server = http.createServer(app);
const PORT = config.port || process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});