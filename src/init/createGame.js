import { addGameSession } from '../session/game.session.js';

const createGame = () => {
  try {
    addGameSession();
    console.log(`게임이 정상적으로 생성되었습니다`);
  } catch (err) {
    console.error(`게임 생성 중 오류가 발생했습니다: ${err}`);
  }
};

export default createGame;
