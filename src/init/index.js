import createGame from './createGame.js';
import { loadProtos } from './loadProtos.js';

const initServer = async () => {
  try {
    await loadProtos();
    await createGame();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
