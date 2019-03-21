import Note from './note';

export default class NoteTranslator {
  constructor(tape, octave = 0) {
    this.tape = tape;
    this.freqChart = [0, 65.40639, 73.41619, 82.40689, 87.30706, 97.99886, 110.0000, 123.4708, 130.8128, 65.40639, 73.41619, 82.40689, 87.30706, 97.99886, 110.0000, 123.4708, 130.8128];
    this.notes = [];

    this.freqChart = this.freqChart.map(f => f * (2 ** octave));
  }

  translate() {
    for (let y = 0; y < this.tape.length; y++) {
      const row = [];

      for (let x = 0; x < this.tape[y].length; x++) {
        const currVal = this.tape[y][x];
        const freq = this.freqChart[currVal];
        const tied = currVal > 8;
        const note = new Note(freq, tied);
        row.push(note);
      }

      this.notes.push(row);
    }
  }

  getFreq() {
    return this.notes;
  }
}
