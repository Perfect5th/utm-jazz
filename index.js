import UTM from './utm';
import {directions} from './utm';

const utm = new UTM({
  0: {
    0: {
      write: 1,
      move: directions.RIGHT,
      state: 0
    },
    1: {
      write: 0,
      move: directions.RIGHT,
      state: 0
    }
  }
}, [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], 10);

utm.begin();
