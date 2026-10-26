import { GuideNote } from '../types';
import { NOTE_NAMES } from './pitch';

export const EXERCISE_PRESETS: Record<string, GuideNote[]> = {
  scale: [
    { midi: 60, note: 'C', octave: 4, solfege: 'Do', chord: 'C', startT: 1.0, endT: 2.2 },
    { midi: 62, note: 'D', octave: 4, solfege: 'Re', chord: 'Dm', startT: 2.5, endT: 3.7 },
    { midi: 64, note: 'E', octave: 4, solfege: 'Mi', chord: 'Em', startT: 4.0, endT: 5.2 },
    { midi: 65, note: 'F', octave: 4, solfege: 'Fa', chord: 'F', startT: 5.5, endT: 6.7 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Sol', chord: 'G', startT: 7.0, endT: 8.2 },
    { midi: 69, note: 'A', octave: 4, solfege: 'La', chord: 'Am', startT: 8.5, endT: 9.7 },
    { midi: 71, note: 'B', octave: 4, solfege: 'Ti', chord: 'Bdim', startT: 10.0, endT: 11.2 },
    { midi: 72, note: 'C', octave: 5, solfege: "Do'", chord: 'C', startT: 11.5, endT: 13.0 },
  ],
  arpeggio: [
    { midi: 60, note: 'C', octave: 4, solfege: 'Do', chord: 'C', startT: 1.0, endT: 2.1 },
    { midi: 64, note: 'E', octave: 4, solfege: 'Mi', chord: 'C', startT: 2.4, endT: 3.5 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Sol', chord: 'C', startT: 3.8, endT: 4.9 },
    { midi: 72, note: 'C', octave: 5, solfege: "Do'", chord: 'C', startT: 5.2, endT: 6.6 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Sol', chord: 'G', startT: 6.9, endT: 8.0 },
    { midi: 64, note: 'E', octave: 4, solfege: 'Mi', chord: 'G', startT: 8.3, endT: 9.4 },
    { midi: 60, note: 'C', octave: 4, solfege: 'Do', chord: 'C', startT: 9.7, endT: 11.2 },
  ],
  twinkle: [
    { midi: 60, note: 'C', octave: 4, solfege: 'Twin-', chord: 'C', startT: 1.0, endT: 1.8 },
    { midi: 60, note: 'C', octave: 4, solfege: 'kle', chord: 'C', startT: 2.0, endT: 2.8 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Twin-', chord: 'G', startT: 3.0, endT: 3.8 },
    { midi: 67, note: 'G', octave: 4, solfege: 'kle', chord: 'G', startT: 4.0, endT: 4.8 },
    { midi: 69, note: 'A', octave: 4, solfege: 'Lit-', chord: 'Am', startT: 5.0, endT: 5.8 },
    { midi: 69, note: 'A', octave: 4, solfege: 'tle', chord: 'Am', startT: 6.0, endT: 6.8 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Star', chord: 'C', startT: 7.0, endT: 8.6 },
  ],
  custom: [
    { midi: 60, note: 'C', octave: 4, solfege: 'Intro', chord: 'C', startT: 1.0, endT: 3.0 },
    { midi: 64, note: 'E', octave: 4, solfege: 'Bait', chord: 'Em', startT: 3.5, endT: 5.5 },
    { midi: 67, note: 'G', octave: 4, solfege: 'Reff', chord: 'G', startT: 6.0, endT: 8.5 },
  ],
  free: [],
};

export function transposeGuideNotes(notes: GuideNote[], semitones: number): GuideNote[] {
  if (semitones === 0) return [...notes];
  return notes.map((n) => {
    const newMidi = n.midi + semitones;
    const noteName = NOTE_NAMES[((newMidi % 12) + 12) % 12];
    const octave = Math.floor(newMidi / 12) - 1;
    return {
      ...n,
      midi: newMidi,
      note: noteName,
      octave,
    };
  });
}
