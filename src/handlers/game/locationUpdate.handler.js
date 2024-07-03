import { getGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    // console.log(payload)
    const { x, y } = payload;
    const gameSession = getGameSession();
    const user = getUserById(userId);
    if (!user) {
      console.error(`유저가 존재하지 않습니다: ID ${userId}`);
    }

    user.updatePosition(x, y);
    const packet = gameSession.getAllLocation();

    socket.write(packet);
  } catch (err) {
    console.error(err);
  }
};

export default locationUpdateHandler;
