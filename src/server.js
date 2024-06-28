import net from 'net';
import { config } from './config/config.js';
import { onConnection } from './events/onConnection.js';

const server = net.createServer(onConnection);

server.listen(config.server.port, config.server.host, () => {
  console.log(`서버가 ${config.server.port}포트에서 실행 중입니다`);
  console.log(server.address());
});
