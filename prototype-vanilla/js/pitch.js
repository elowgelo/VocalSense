/**
 * pitch.js — In-browser pitch detection & music theory utilities
 * Algorithm: Autocorrelation (fast, works in real-time with Web Audio API)
 */

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

/**
 * Detect pitch from a Float32Array audio buffer using Normalized Square Difference Function (NSDF / McLeod Pitch Method).
 * Significantly more robust against octave hopping (prevents double octave error / halving) and accurate in real-world mic noise.
 * Returns frequency in Hz, or -1 if no clear pitch found.
 */
function detectPitch(buffer, sampleRate) {
  const SIZE = buffer.length;
  // Rentang frekuensi vokal manusia: ~60 Hz (C2) sampai ~1200 Hz (D6)
  const minPeriod = Math.floor(sampleRate / 1200);
  const maxPeriod = Math.floor(sampleRate / 60);

  // RMS silence gate (-45 dB approx)
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.006) return -1; // Hening / background noise

  // Pre-emphasis filter (boost harmonics, suppress rumble)
  const preemph = new Float32Array(SIZE);
  preemph[0] = buffer[0];
  for (let i = 1; i < SIZE; i++) {
    preemph[i] = buffer[i] - 0.97 * buffer[i - 1];
  }
  const workBuf = preemph;

  // Normalized Square Difference Function (NSDF)
  // nsdf(tau) = 2 * sum(x_t * x_{t+tau}) / (sum(x_t^2) + sum(x_{t+tau}^2))
  const nsdf = new Float32Array(maxPeriod + 2);
  for (let tau = minPeriod; tau <= maxPeriod; tau++) {
    let acf = 0;
    let m = 0;
    const len = SIZE - tau;
    for (let i = 0; i < len; i++) {
      const a = workBuf[i];
      const b = workBuf[i + tau];
      acf += a * b;
      m += (a * a) + (b * b);
    }
    nsdf[tau] = m > 0 ? (2 * acf) / m : 0;
  }

  // Cari puncak lokal pertama yang melampaui ambang batas kepercayaan (clarity threshold)
  // MPM (McLeod Pitch Method) memilih puncak pertama yang mencapai setidaknya 80% dari puncak global
  // Hal ini mencegah "octave hopping" atau nada berlipat ganda (double octave)!
  const peaks = [];
  let isGoingUp = false;

  for (let tau = minPeriod + 1; tau < maxPeriod; tau++) {
    if (nsdf[tau] > nsdf[tau - 1] && nsdf[tau] >= nsdf[tau + 1]) {
      if (nsdf[tau] > 0.45) { // Hanya pertimbangkan korelasi yang bernilai positif kuat
        peaks.push({ tau, score: nsdf[tau] });
      }
    }
  }

  if (peaks.length === 0) return -1;

  // Temukan nilai puncak tertinggi
  let maxScore = 0;
  for (const p of peaks) {
    if (p.score > maxScore) maxScore = p.score;
  }

  // Pilih puncak pertama yang memenuhi kriteria 80% dari maxScore (menghindari double period/octave)
  const cutoff = maxScore * 0.82;
  let chosenPeak = null;
  for (const p of peaks) {
    if (p.score >= cutoff) {
      chosenPeak = p;
      break;
    }
  }

  if (!chosenPeak || chosenPeak.score < 0.50) return -1;

  // Parabolic interpolation di sekitar chosenPeak.tau
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

/**
 * Convert Hz to MIDI note number (A4 = 440 Hz = MIDI 69).
 */
function freqToMidi(freq) {
  if (freq <= 0) return -1;
  return Math.round(12 * Math.log2(freq / 440) + 69);
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Convert Hz to note name + octave + cents deviation.
 * Returns { note, octave, cents, midiNote, closestFreq }
 */
function freqToNote(freq) {
  if (freq <= 0) return null;
  const midi = 12 * Math.log2(freq / 440) + 69;
  const midiRounded = Math.round(midi);
  const cents = Math.round((midi - midiRounded) * 100);
  const octave = Math.floor(midiRounded / 12) - 1;
  const noteName = NOTE_NAMES[((midiRounded % 12) + 12) % 12];
  const closestFreq = 440 * Math.pow(2, (midiRounded - 69) / 12);
  return { note: noteName, octave, cents, midiNote: midiRounded, closestFreq, freq };
}

/**
 * Classify voice type based on lowest and highest MIDI notes.
 */
function classifyVoiceType(lowMidi, highMidi) {
  // Standard voice type ranges
  const types = [
    { name: 'Bass',         low: 40, high: 64 },   // E2–E4
    { name: 'Bariton',      low: 43, high: 67 },   // G2–G4
    { name: 'Tenor',        low: 48, high: 72 },   // C3–C5
    { name: 'Mezzo-Sopran', low: 55, high: 79 },   // G3–G5
    { name: 'Sopran',       low: 60, high: 84 },   // C4–C6
    { name: 'Alto',         low: 53, high: 77 },   // F3–F5
  ];

  let bestMatch = null;
  let bestScore = Infinity;
  for (const t of types) {
    const score = Math.abs(lowMidi - t.low) + Math.abs(highMidi - t.high);
    if (score < bestScore) { bestScore = score; bestMatch = t; }
  }
  return bestMatch?.name ?? 'Tidak Diketahui';
}

/**
 * Compute resonance balance from FFT magnitude data.
 * Returns { chest, mask, head } as percentages 0–100.
 */
function computeResonance(fftData, sampleRate, fftSize) {
  const binHz = sampleRate / fftSize;
  let chest = 0, mask = 0, head = 0, total = 0;

  for (let i = 0; i < fftData.length; i++) {
    const freq = i * binHz;
    const mag = Math.pow(10, fftData[i] / 20); // dB to linear
    total += mag;
    if (freq >= 100 && freq < 400)  chest += mag;
    if (freq >= 400 && freq < 2000) mask  += mag;
    if (freq >= 2000 && freq < 5000) head += mag;
  }

  if (total === 0) return { chest: 33, mask: 33, head: 33 };
  const scale = 100 / (chest + mask + head || 1);
  return {
    chest: Math.round(chest * scale),
    mask:  Math.round(mask  * scale),
    head:  Math.round(head  * scale),
  };
}

/**
 * Compute RMS volume in dB from a buffer.
 */
function computeRMS(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  const rms = Math.sqrt(sum / buffer.length);
  return rms > 0 ? 20 * Math.log10(rms) : -Infinity;
}

/**
 * Classify pitch deviation as flat/sharp/in-tune.
 */
function classifyDeviation(cents) {
  if (cents < -20) return { label: 'Flat ▼', cls: 'text-red' };
  if (cents > 20)  return { label: 'Sharp ▲', cls: 'text-yellow' };
  return { label: 'In Tune ✓', cls: 'text-green' };
}

/**
 * Format MIDI note number to readable string like "C4", "A#3".
 */
function midiToName(midi) {
  const oct = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  return `${name}${oct}`;
}

/**
 * Estimate vibrato from an array of recent pitch readings (Hz).
 * Returns { rate (Hz), depth (cents), hasVibrato }.
 */
function estimateVibrato(pitchHistory) {
  if (pitchHistory.length < 20) return { rate: 0, depth: 0, hasVibrato: false };

  const validHz = pitchHistory.filter(h => h > 0);
  if (validHz.length < 16) return { rate: 0, depth: 0, hasVibrato: false };

  const mean = validHz.reduce((a, b) => a + b, 0) / validHz.length;
  const diffs = validHz.map(h => h - mean);

  // Zero crossings → estimate rate
  let crossings = 0;
  for (let i = 1; i < diffs.length; i++) {
    if (diffs[i - 1] * diffs[i] < 0) crossings++;
  }
  // Each crossing pair = one full cycle; assume ~10 readings/sec
  const rate = (crossings / 2) / (validHz.length / 10);

  // Depth in cents
  const maxHz = Math.max(...validHz);
  const minHz = Math.min(...validHz);
  const depth = Math.round(1200 * Math.log2(maxHz / minHz));

  const hasVibrato = rate >= 4 && rate <= 8 && depth >= 20 && depth <= 150;
  return { rate: +rate.toFixed(1), depth, hasVibrato };
}

// Export for use in other scripts
window.PitchUtils = {
  detectPitch, freqToNote, freqToMidi, midiToFreq, midiToName,
  classifyVoiceType, computeResonance, computeRMS,
  classifyDeviation, estimateVibrato, NOTE_NAMES
};
