const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class Jazz {
  // REQUIRES: ocsillatorTypes array of String oscillator types
  constructor(oscillatorTypes) {
    this.oscillatorTypes = oscillatorTypes;

    this.oscillators = [];
    this.playing = false;

    this.secondsPerNote = 0.25;
    this.noteLength = 0.9;
    this.attack = 0.1;
  }

  // REQUIRES: a 2D musical staff: a collection of Notes
  // MODIFIES: this
  // EFFECTS: plays the musical staff to the default destination (speakers)
  play(staff) {
    this.context = new AudioContext();
    this.createOscillators(staff);

    this.playing = true;
  }

  // REQUIRES: a 2D musical staff: a collection of Hz values
  // MODIFIES: this
  // EFFECTS: creates oscillators for each stem and attaches them context
  createOscillators(staff) {
    for (let i = 0; i < staff.length; i++) {
      const stem = staff[i];
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();

      oscillator.type = this.oscillatorTypes[i];
      oscillator.gainNode = gainNode;
      oscillator.connect(gainNode).connect(this.context.destination);
      oscillator.start();

      this.setNotes(oscillator, stem);
      this.oscillators.push(oscillator);
    }
  }

  // REQUIRES: unstarted oscillator, stem: array of Hz values
  // MODIFIES: this
  // EFFECTS: applies notes from stem to oscillator with proper timing
  setNotes(oscillator, stem) {
    for (let i = 0; i < stem.length; i++) {
      let creationMethod = this.createTone.bind(this);

      if (stem[i].tied) {
        creationMethod = this.createTiedTone.bind(this);
      }

      creationMethod(oscillator, stem[i].frequency, i);
    }

    this.createRest(oscillator, stem.length);
  }

  // REQUIRES: oscillator, frequency: float, i: position
  // MODIFIES: oscillator
  // EFFECTS: adds an un-tied note tone to the oscillator
  createTone(oscillator, frequency, i) {
    const {gain} = oscillator.gainNode;

    gain.linearRampToValueAtTime(0.01, i * this.secondsPerNote);
    gain.linearRampToValueAtTime(1, (i + this.attack) * this.secondsPerNote);
    gain.setValueAtTime(1, (i + this.noteLength) * this.secondsPerNote);
    oscillator.frequency.setValueAtTime(frequency, i * this.secondsPerNote);
    oscillator.stop((i + 1) * this.secondsPerNote);
  }

  createTiedTone(oscillator, frequency, i) {
    const {gain} = oscillator.gainNode;

    oscillator.frequency.setValueAtTime(frequency, i * this.secondsPerNote);
    gain.setValueAtTime(1, (i + this.noteLength) * this.secondsPerNote);
    oscillator.stop((i + 1) * this.secondsPerNote);
  }

  // REQUIRES: oscillator, i: position
  // MODIFIES: oscillator
  // EFFECTS: adds silence/rest to the oscillator
  createRest(oscillator, i) {
    const {gain} = oscillator.gainNode;

    gain.linearRampToValueAtTime(0.01, i * this.secondsPerNote);
    oscillator.stop((i + 1) * this.secondsPerNote);
  }

  // MODIFIES: this
  // EFFECTS: stops the current playback
  stop() {
    for (const o of this.oscillators) {
      o.stop(this.context.currentTime);
    }

    this.oscillators = [];
    this.context.suspend();
    this.playing = false;
  }
}
