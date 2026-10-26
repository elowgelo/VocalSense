import {
  NoteInfo,
  VoiceTypeName,
  VoiceTypeDefinition,
  ResonanceData,
  VibratoInfo,
  DeviationStatus,
} from '../types';

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export const SHARP_MAP = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]; // 0=white, 1=black

export const VOICE_TYPES: VoiceTypeDefinition[] = [
  { name: 'Bass', low: 40, high: 64, lowName: 'E2', highName: 'E4', description: '2 oktaf rentang nada rendah pria' },
  { name: 'Bariton', low: 43, high: 67, lowName: 'G2', highName: 'G4', description: '2 oktaf rentang nada sedang pria' },
  { name: 'Tenor', low: 48, high: 72, lowName: 'C3', highName: 'C5', description: '2 oktaf rentang nada tinggi pria' },
  { name: 'Alto', low: 53, high: 77, lowName: 'F3', highName: 'F5', description: '2 oktaf rentang nada rendah wanita' },
  { name: 'Mezzo-Sopran', low: 55, high: 79, lowName: 'G3', highName: 'G5', description: '2 oktaf rentang nada sedang wanita' },
  { name: 'Sopran', low: 60, high: 84, lowName: 'C4', highName: 'C6', description: '2 oktaf rentang nada tinggi wanita' },
];

/**
 * Detect pitch from Float32Array using Normalized Square Difference Function (NSDF / McLeod Pitch Method).
 * Robust against octave hopping and accurate in noisy environments.
 */
export function detectPitch(buffer: Float32Array<ArrayBufferLike>, sampleRate: number): number {
  const SIZE = buffer.length;
  // Human vocal range: ~60 Hz (C2) to ~1200 Hz (D6)
  const minPeriod = Math.floor(sampleRate / 1200);
  const maxPeriod = Math.floor(sampleRate / 60);

  // RMS silence gate (-45 dB approx)
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.006) return -1;

  // Pre-emphasis filter
  const workBuf = new Float32Array(SIZE);
  workBuf[0] = buffer[0];
  for (let i = 1; i < SIZE; i++) {
    workBuf[i] = buffer[i] - 0.97 * buffer[i - 1];
  }

  // NSDF
  const nsdf = new Float32Array(maxPeriod + 2);
  for (let tau = minPeriod; tau <= maxPeriod; tau++) {
    let acf = 0;
    let m = 0;
    const len = SIZE - tau;
    for (let i = 0; i < len; i++) {
      const a = workBuf[i];
      const b = workBuf[i + tau];
      acf += a * b;
      m += a * a + b * b;
    }
    nsdf[tau] = m > 0 ? (2 * acf) / m : 0;
  }

  // Peak picking
  const peaks: { tau: number; score: number }[] = [];
  for (let tau = minPeriod + 1; tau < maxPeriod; tau++) {
    if (nsdf[tau] > nsdf[tau - 1] && nsdf[tau] >= nsdf[tau + 1]) {
      if (nsdf[tau] > 0.45) {
        peaks.push({ tau, score: nsdf[tau] });
      }
    }
  }

  if (peaks.length === 0) return -1;

  let maxScore = 0;
  for (const p of peaks) {
    if (p.score > maxScore) maxScore = p.score;
  }

  const cutoff = maxScore * 0.82;
  let chosenPeak: { tau: number; score: number } | null = null;
  for (const p of peaks) {
    if (p.score >= cutoff) {
      chosenPeak = p;
      break;
    }
  }

  if (!chosenPeak || chosenPeak.score < 0.5) return -1;

  // Parabolic interpolation
  const t = chosenPeak.tau;
  const alpha = nsdf[t - 1];
  const beta = nsdf[t];
  const gamma = nsdf[t + 1];
  const delta = (gamma - alpha) / (2 * (2 * beta - alpha - gamma) || 1);
  const refinedPeriod = t + delta;

  const freq = sampleRate / refinedPeriod;
  if (freq < 60 || freq > 1200) return -1;
  return freq;
}

export function freqToMidi(freq: number): number {
  if (freq <= 0) return -1;
  return Math.round(12 * Math.log2(freq / 440) + 69);
}

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToNote(freq: number, refFreq = 440): NoteInfo | null {
  if (freq <= 0) return null;
  const midi = 12 * Math.log2(freq / refFreq) + 69;
  const midiRounded = Math.round(midi);
  const cents = Math.round((midi - midiRounded) * 100);
  const octave = Math.floor(midiRounded / 12) - 1;
  const noteName = NOTE_NAMES[((midiRounded % 12) + 12) % 12];
  const closestFreq = refFreq * Math.pow(2, (midiRounded - 69) / 12);
  return {
    note: noteName,
    octave,
    cents,
    midiNote: midiRounded,
    closestFreq,
    freq,
  };
}

export function midiToName(midi: number): string {
  const oct = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  return `${name}${oct}`;
}

export function classifyVoiceType(lowMidi: number, highMidi: number): VoiceTypeName {
  let bestMatch: VoiceTypeDefinition | null = null;
  let bestScore = Infinity;
  for (const t of VOICE_TYPES) {
    const score = Math.abs(lowMidi - t.low) + Math.abs(highMidi - t.high);
    if (score < bestScore) {
      bestScore = score;
      bestMatch = t;
    }
  }
  return bestMatch?.name ?? 'Tidak Diketahui';
}

export function computeResonance(
  fftData: Float32Array<ArrayBufferLike>,
  sampleRate: number,
  fftSize: number
): ResonanceData {
  const binHz = sampleRate / fftSize;
  let chest = 0;
  let mask = 0;
  let head = 0;
  let total = 0;

  for (let i = 0; i < fftData.length; i++) {
    const freq = i * binHz;
    const mag = Math.pow(10, fftData[i] / 20); // dB to linear
    total += mag;
    if (freq >= 100 && freq < 400) chest += mag;
    if (freq >= 400 && freq < 2000) mask += mag;
    if (freq >= 2000 && freq < 5000) head += mag;
  }

  if (total === 0) return { chest: 33, mask: 33, head: 33 };
  const sum = chest + mask + head || 1;
  const scale = 100 / sum;
  return {
    chest: Math.round(chest * scale),
    mask: Math.round(mask * scale),
    head: Math.round(head * scale),
  };
}

export function computeRMS(buffer: Float32Array<ArrayBufferLike>): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  const rms = Math.sqrt(sum / buffer.length);
  return rms > 0 ? 20 * Math.log10(rms) : -Infinity;
}

export function classifyDeviation(cents: number): DeviationStatus {
  if (cents < -20) {
    return {
      label: 'Flat ▼',
      cls: 'text-red',
      statusText: 'Terlalu rendah',
      color: 'var(--red)',
    };
  }
  if (cents > 20) {
    return {
      label: 'Sharp ▲',
      cls: 'text-yellow',
      statusText: 'Terlalu tinggi',
      color: 'var(--yellow)',
    };
  }
  return {
    label: 'In Tune ✓',
    cls: 'text-green',
    statusText: 'Intonasi tepat',
    color: 'var(--green)',
  };
}

export function estimateVibrato(pitchHistory: number[]): VibratoInfo {
  if (pitchHistory.length < 20) return { rate: 0, depth: 0, hasVibrato: false };

  const validHz = pitchHistory.filter((h) => h > 0);
  if (validHz.length < 16) return { rate: 0, depth: 0, hasVibrato: false };

  const mean = validHz.reduce((a, b) => a + b, 0) / validHz.length;
  const diffs = validHz.map((h) => h - mean);

  let crossings = 0;
  for (let i = 1; i < diffs.length; i++) {
    if (diffs[i - 1] * diffs[i] < 0) crossings++;
  }

  const rate = crossings / 2 / (validHz.length / 10);
  const maxHz = Math.max(...validHz);
  const minHz = Math.min(...validHz);
  const depth = Math.round(1200 * Math.log2(maxHz / minHz));

  const hasVibrato = rate >= 4 && rate <= 8 && depth >= 20 && depth <= 150;
  return { rate: +rate.toFixed(1), depth, hasVibrato };
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}
