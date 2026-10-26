import { describe, it, expect } from 'vitest';
import {
  freqToMidi,
  midiToFreq,
  midiToName,
  freqToNote,
  classifyVoiceType,
  computeRMS,
  detectPitch,
} from './pitch';

describe('Music Theory & Pitch Math', () => {
  it('converts A4 (440Hz) to MIDI 69', () => {
    expect(freqToMidi(440)).toBe(69);
  });

  it('converts MIDI 69 to 440Hz', () => {
    expect(midiToFreq(69)).toBeCloseTo(440, 1);
  });

  it('converts Middle C (MIDI 60) to C4', () => {
    expect(midiToName(60)).toBe('C4');
  });

  it('accurately identifies note name, octave, and cents for A4', () => {
    const note = freqToNote(440);
    expect(note).not.toBeNull();
    expect(note?.note).toBe('A');
    expect(note?.octave).toBe(4);
    expect(note?.cents).toBe(0);
    expect(note?.midiNote).toBe(69);
  });

  it('correctly calculates sharp cents deviation for 450Hz', () => {
    const note = freqToNote(450);
    expect(note).not.toBeNull();
    expect(note?.note).toBe('A');
    expect(note?.cents).toBeGreaterThan(0);
  });

  it('classifies voice types correctly', () => {
    expect(classifyVoiceType(48, 72)).toBe('Tenor'); // C3 to C5
    expect(classifyVoiceType(60, 84)).toBe('Sopran'); // C4 to C6
    expect(classifyVoiceType(40, 64)).toBe('Bass'); // E2 to E4
  });

  it('computes RMS silence gate on zero buffer', () => {
    const zeroBuf = new Float32Array(1024);
    expect(computeRMS(zeroBuf)).toBe(-Infinity);
  });

  it('detects pitch on synthetic 440Hz sine wave buffer using NSDF', () => {
    const sampleRate = 44100;
    const freq = 440;
    const buffer = new Float32Array(2048);
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.sin((2 * Math.PI * freq * i) / sampleRate) * 0.7;
    }

    const detected = detectPitch(buffer, sampleRate);
    expect(detected).toBeGreaterThan(435);
    expect(detected).toBeLessThan(445);
  });
});
