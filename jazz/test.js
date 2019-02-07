import Note from './note';
import Jazz from './jazz';

document.addEventListener('DOMContentLoaded', () => {
  // Testing the player now
  const jazz = new Jazz(['triangle', 'triangle']);

  const hertzStaff = [
    [
      329.6276,
      [329.6276, true],
      329.6276,
      [329.6276, true],
      349.2282,
      [349.2282, true],
      391.9954,
      [391.9954, true],
      391.9954,
      [391.9954, true],
      349.2282,
      [349.2282, true],
      329.6276,
      [329.6276, true],
      293.6648,
      [293.6648, true],
      261.6256,
      [261.6256, true],
      261.6256,
      [261.6256, true],
      293.6648,
      [293.6648, true],
      329.6276,
      [329.6276, true],
      329.6276,
      [329.6276, true],
      [329.6276, true],
      293.6648,
      293.6648,
      [293.6648, true],
      [293.6648, true],
      [293.6648, true]
    ],
    [
      [110.0000, true],
      110.0000,
      [110.0000, true],
      110.0000,
      [123.4708, true],
      123.4708,
      [130.8128, true],
      130.8128,
      [130.8128, true],
      130.8128,
      [123.4708, true],
      123.4708,
      [110.0000, true],
      110.0000,
      [146.8324, true],
      146.8324,
      [130.8128, true],
      130.8128,
      [130.8128, true],
      130.8128,
      [146.8324, true],
      146.8324,
      164.8138,
      164.8138,
      [164.8138, true],
      [164.8138, true],
      [164.8138, true],
      [164.8138, true]
    ]
  ];

  const notesStaff = hertzStaff.map(stem => {
    return stem.map(note => {
      if (Array.isArray(note)) {
        return new Note(note[0], note[1]);
      }

      return new Note(note);
    });
  });

  document.querySelector('#start')
    .addEventListener('click', () => jazz.play(notesStaff));

  document.querySelector('#stop').addEventListener('click', () => jazz.stop());
});
