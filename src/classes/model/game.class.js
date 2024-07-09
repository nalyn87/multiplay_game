import { createLocationPacket } from '../../utils/game.notification.js';

class Game {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });
    return maxLatency;
  }

  getAllLocation(userId) {
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.getPosition();
        return { id: user.id, playerId: user.playerId, x, y };
      });
    return createLocationPacket(locationData);
  }
}

export default Game;
