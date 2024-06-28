import net from 'net';
import { config } from './config/config.js';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(config.server.port, config.server.host, () => {
      console.log(`서버가 ${config.server.port}포트에서 실행 중입니다`);
      console.log(server.address());
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
