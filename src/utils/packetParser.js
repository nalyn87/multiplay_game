import { getProtoMessages } from "../init/loadProtos.js"

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();
    const Packet = protoMessages.common.CommonPacket;
    let packet;
    try {
        packet = Packet.decode(data)
    } catch (err) {
        console.error(err)
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const version = packet.version;
    const payload = packet.payload;

    console.log('version: ', version);

    return {handlerId, userId, payload}
}