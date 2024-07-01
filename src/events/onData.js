import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { packetParser } from '../utils/packetParser.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length < length) {
      // 패킷이 모두 도착하지 않았을 때
      break;
    } else {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.Ping: {
            break;
          }
          case PACKET_TYPE.Normal: {
            const { handlerId, userId, payload } = packetParser(packet);

            const handler = getHandlerById(handlerId).handler;
            await handler({ socket, userId, payload });
          }
          case PACKET_TYPE.Location: {
            break;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};
