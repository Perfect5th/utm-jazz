import UTM from './utm';
import {directions} from './utm';

const OUTPUT_CLASS = 'tape-snapshot';

const tape = [[0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]];

document.addEventListener('DOMContentLoaded', () => {
  const utm = new UTM({
    0: {
      0: {
        write: 1,
        move: directions.RIGHT,
        state: 0
      },
      1: {
        write: 2,
        move: directions.DOWN,
        state: 0
      },
      2: {
        write: 0,
        move: directions.LEFT,
        state: 0
      }
    }
  }, tape, 10);

  const tapeElement = () => {
    const element = utm.getTape().reduce((acc, row) => {
      const rowElement = document.createElement('div');

      rowElement.textContent = row.toString();
      acc.appendChild(rowElement);

      return acc;
    }, document.createElement('div'));

    element.className = OUTPUT_CLASS;

    return element;
  };

  document.getElementById('begin-button').addEventListener('click', () => {
    utm.begin();

    document.getElementById('turing-tape').appendChild(tapeElement());
  });

  document.getElementById('turing-tape').appendChild(tapeElement());
});
