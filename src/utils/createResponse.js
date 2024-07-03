import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getProtoMessages } from '../init/loadProtos.js';

export const createResponse = (handlerId, responseCode, data = null) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = Response.encode(responsePayload).finish();
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(buffer.length + config.packet.typeLength + config.packet.totalLength);

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(PACKET_TYPE.Normal);

  return Buffer.concat([packetLength, packetType, buffer]);
};
