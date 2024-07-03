import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';

export const onEnd = (socket) => () => {
  console.log('클라이언트의 접속이 종료되었습니다');

  const gameSession = getGameSession();
  gameSession.removeUser(socket);
  removeUser(socket);
};
