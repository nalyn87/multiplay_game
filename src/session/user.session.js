import { userSession } from './session.js';

export const addUser = (socket, uuid) => {
  const user = { socket, id: uuid };
  userSession.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSession.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSession.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSession.find((user) => user.id === id);
};
