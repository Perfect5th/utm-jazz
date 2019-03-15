import Jazz, {NoteTranslator} from './jazz';
import UTM, {directions} from './utm';

const OUTPUT_CLASS = 'tape-snapshot';

const tape = [];

// Initialize the tape as 4 by 8, full of zeroes.
for (let i = 0; i < 4; i++) {
  tape[i] = [];

  for (let j = 0; j < 8; j++) {
    tape[i][j] = 0;
  }
}

// Once the DOM has loaded:
// - create a utm object
// - display the initial tape
// - run the utm each time the button is pushed, then display tape
document.addEventListener('DOMContentLoaded', () => {
  // Create a utm object with a machine table
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
  const jazz = new Jazz(['organ', 'bass', 'chiptune', 'bass']);

  // Function that displays the current state of the tap in an HTML div
  const tapeElement = () => {
    const element = utm.getTape().reduce((acc, row) => {
      const rowElement = document.createElement('div');

      rowElement.textContent = row.toString();
      acc.append(rowElement);

      return acc;
    }, document.createElement('div'));

    element.className = OUTPUT_CLASS;

    return element;
  };

  // Run the utm every time the button is clicked, then display the new tape
  // state
  document.querySelector('#begin-button').addEventListener('click', () => {
    utm.begin();

    const noteTranslator = new NoteTranslator(utm.getTape());
    noteTranslator.translate();
    const freqs = noteTranslator.getFreq();

    jazz.play(freqs);

    document.querySelector('#turing-tape').append(tapeElement());
  });

  // Display the initial tape state
  document.querySelector('#turing-tape').append(tapeElement());
});
