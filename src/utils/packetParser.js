import { config } from '../config/config.js';
import { getProtoTypeNameByHandlerId } from '../handlers/index.js';
import { getProtoMessages } from '../init/loadProtos.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();
  const Packet = protoMessages.common.CommonPacket;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (err) {
    console.error(err);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const version = packet.version;

  if (version !== config.client.version) {
    console.error('클라이언트 버전이 일치하지 않습니다');
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    console.error(`핸들러 ID를 찾을 수 없습니다: ID ${handlerId}`);
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = PayloadType.decode(packet.payload);
  } catch (err) {
    console.error(`패킷 디코딩 중 오류가 발생했습니다`, err);
  }

  const verifyError = PayloadType.verify(payload);
  if (verifyError) {
    console.error(`패킷 구조가 일치하지 않습니다: ${verifyError}`);
  }

  const expectedFields = Object.keys(PayloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));
  if (missingFields.length > 0) {
    console.error(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
  }

  return { handlerId, userId, payload };
};
