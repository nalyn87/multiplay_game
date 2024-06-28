import net from 'net';
import { getProtoMessages, loadProtos } from './src/init/loadProtos.js';

const TOTAL_LENGTH = 4; // 전체 길이를 나타내는 4바이트
const PACKET_TYPE_LENGTH = 1; // 패킷타입을 나타내는 1바이트

const readHeader = (buffer) => {
  return {
    length: buffer.readUInt32BE(0),
    packetType: buffer.writeUInt8(TOTAL_LENGTH),
  };
};

const sendPacket = (socket, packet) => {
  const protoMessages = getProtoMessages();
  const Packet = protoMessages.common.CommonPacket;
  if (!Packet) {
    console.error('Packet 메세지를 찾을 수 없습니다');
    return;
  }

  const buffer = Packet.encode(packet).finish();
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(buffer.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH);
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(1);

  const packetWithLength = Buffer.concat([packetLength, packetType, buffer]);
  socket.write(packetWithLength);
};

const HOST = '0.0.0.0';
const PORT = '1234';

const client = new net.Socket();

client.connect(PORT, HOST, async () => {
  console.log('서버와 연결되었습니다');
  await loadProtos();

  const message = {
    handlerId: 2,
    userId: 'xyz',
    payload: {},
    version: '1.0.0',
  };

  sendPacket(client, message)
});

client.on('data', (data) => {
  const buffer = Buffer.from(data); // 버퍼 객체의 메서드를 사용하기 위해 변환

  const { handlerId, length } = readHeader(buffer);
  console.log(`handlerId: ${handlerId}`);
  console.log(`length: ${length}`);

  const headerSize = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
  // 메시지 추출
  const message = buffer.slice(headerSize); // 앞의 헤더 부분을 잘라낸다.

  console.log(`server 에게 받은 메세지: ${message}`);
});

client.on('close', () => {
  console.log('연결이 끊어졌습니다');
});

process.on('SIGINT', () => {
  client.end(() => process.exit(0));
});

client.on('error', (err) => {
  console.log('클라이언트 에러: ', err);
});
