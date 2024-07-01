class User {
  constructor(id, socket, playerId, latency) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.x = 0;
    this.y = 0;
    this.latency = latency;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default User;