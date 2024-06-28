import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';

export const onData = (socket) => (data) => {
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

      console.log(`length: ${length}`)
      console.log(`packetType: ${packetType}`)
      console.log(packet)

    //   try {
    //     switch (packetType) {
    //         case PACKET_TYPE.PING: {

    //         }
    //     }
    //   } catch (err) {
    //     console.error(err)
    //   }
    }
  }
};
