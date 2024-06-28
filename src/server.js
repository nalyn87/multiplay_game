import net from 'net';
import { config } from './config/config.js';

const server = net.createServer((socket) => {
  console.log(`클라이언트가 접속하였습니다`);

  socket.buffer = Buffer.alloc(0);

  socket.on('data', (data) => {
    console.log(data);
  });

  socket.on('end', () => {
    console.log('클라이언트와의 접속이 끊어졌습니다');
  });

  socket.on('error', (err) => {
    console.log(`소켓 에러: ${err}`);
  });
});

server.listen(config.server.port, config.server.host, () => {
  console.log(`서버가 ${config.server.port}포트에서 실행 중입니다`);
  console.log(server.address());
});
