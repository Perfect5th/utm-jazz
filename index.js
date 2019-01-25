import UTM from './utm';
import {directions} from './utm';

document.addEventListener('DOMContentLoaded', () => {
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
      [0, 0, 0, 0]],
    10
  );

  utm.begin();

  const tapeElement = utm.getTape().reduce((acc, row) => {
    const rowElement = document.createElement('div');

    rowElement.textContent = row.toString();
    acc.insertAdjacentElement('beforeend', rowElement);

    return acc;
  }, document.createElement('div'));

  document.getElementById('turing-tape')
    .insertAdjacentElement('beforeend', tapeElement);
});
