import { removeUser } from '../session/user.session.js';

export const onError = (socket) => (err) => {
  console.log(`소켓 에러: ${err}`);

  removeUser(socket);
};
