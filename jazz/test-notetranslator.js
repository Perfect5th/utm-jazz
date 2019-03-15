import NoteTranslator from './noteTranslator';
import Jazz from "./jazz";

document.addEventListener('DOMContentLoaded', () => {
    const jazz = new Jazz(["organ", "bass", "chiptune"]);
    const noteTranslator = new NoteTranslator([
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15, 16],
        [6, 0, 15, 4, 0, 12, 5, 8]
    ],
    2);

    noteTranslator.translate();
    const freqs = noteTranslator.getFreq();

    console.log(freqs);
    jazz.play(freqs);
});