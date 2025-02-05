import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addUser} from '../../session/user.session.js';
import { createResponse } from '../../utils/createResponse.js';

const initialHandler = ({ socket, userId, payload }) => {
  const { deviceId, playerId, latency } = payload;

  addUser(socket, deviceId, playerId, latency);

  const initialResponse = createResponse(
    HANDLER_IDS.Init,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId },
  );

  socket.write(initialResponse);
};

export default initialHandler;
