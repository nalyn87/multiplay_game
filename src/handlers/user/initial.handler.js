import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addUser } from '../../session/user.session.js';
import { createResponse } from '../../utils/createResponse.js';

const initialHandler = ({ socket, userId, payload }) => {
  const { deviceId } = payload;

  addUser(socket, deviceId);

  const initialResponse = createResponse(
    HANDLER_IDS.Init,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId },
    deviceId,
  );

  socket.write(initialResponse);
};

export default initialHandler;
