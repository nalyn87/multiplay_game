import Game from '../classes/model/game.class.js';
import { gameSession } from './session.js';

export const addGameSession = () => {
  const session = new Game();
  gameSession.push(session);
  return session;
};

export const getGameSession = () => {
  return gameSession[0];
};
