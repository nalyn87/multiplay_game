class User {
  constructor(id, socket, playerId, latency) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.latency = latency;
    this.x = 0;
    this.y = 0;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  calculatePosition(latency) {
    const timeDiff = latency / 1000;
    const speed = 1;
    const distance = speed * timeDiff;

    return {
      x: this.x,
      y: this.y,
    };
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

export default User;
