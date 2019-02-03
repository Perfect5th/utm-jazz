const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class Jazz {
  // REQUIRES: ocsillatorTypes array of String oscillator types
  constructor(oscillatorTypes) {
    this.oscillatorTypes = oscillatorTypes;

    this.oscillators = [];
    this.playing = false;

    this.secondsPerNote = 0.25;
    this.noteStop = 0.99;
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
  }

  // REQUIRES: oscillator, frequency: float, i: position
  // MODIFIES: oscillator
  // EFFECTS: adds an un-tied note tone to the oscillator
  createTone(oscillator, frequency, i) {
    oscillator.gainNode.gain.linearRampToValueAtTime(1, i * this.secondsPerNote);
    oscillator.frequency.setValueAtTime(frequency, i * this.secondsPerNote);
    oscillator.gainNode.gain.linearRampToValueAtTime(0.001, (i + this.noteStop) * this.secondsPerNote);
    oscillator.stop((i + this.noteStop) * this.secondsPerNote);
  }

  createTiedTone(oscillator, frequency, i) {
    oscillator.gainNode.gain.linearRampToValueAtTime(1, i * this.secondsPerNote);
    oscillator.frequency.setValueAtTime(frequency, i * this.secondsPerNote);
    oscillator.stop((i + this.noteStop) * this.secondsPerNote);
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
