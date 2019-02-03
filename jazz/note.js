export default class Note {
  // REQUIRES: frequency, positive float
  //           tied, boolean: if the note is tied to the next note
  constructor(frequency, tied = false) {
    this.frequency = frequency;
    this.tied = tied;
  }
}
