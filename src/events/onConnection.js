import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const onConnection = (socket) => {
  console.log(`클라이언트가 접속하였습니다`);

  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData(socket));

  socket.on('end', onEnd(socket));

  socket.on('error', onError(socket));
};
