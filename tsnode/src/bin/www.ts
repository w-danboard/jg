import app from '../app';
import http from 'http';

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);

server.on('error', error => {
  console.error(error);
})

server.on('listening', () => {
  console.log('Listening on ' + port);
})