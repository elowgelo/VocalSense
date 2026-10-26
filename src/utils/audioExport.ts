import { GuideNote } from '../types';
import { NOTE_NAMES, computeRMS, detectPitch, freqToNote } from './pitch';

/**
 * Convert AudioBuffer to WAV Blob for audio playback or export
 */
export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  const sampleRate = buffer.sampleRate;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(pos, data, true);
    pos += 2;
  }
  function setUint32(data: number) {
    out.setUint32(pos, data, true);
    pos += 4;
  }

  // RIFF identifier
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8);
  setUint32(0x45564157); // "WAVE"

  // fmt sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16);
  setUint16(1); // PCM
  setUint16(numOfChan);
  setUint32(sampleRate);
  setUint32(sampleRate * 2 * numOfChan);
  setUint16(numOfChan * 2);
  setUint16(16);

  // data sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length - pos - 4);

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  let offset = 0;
  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      out.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([out.buffer], { type: 'audio/wav' });
}

/**
 * Extract notes and chords from an audio buffer using in-browser Web Audio processing
 */
export async function extractNotesFromAudioBuffer(
  audioBuffer: AudioBuffer,
  onProgress?: (pct: number) => void
): Promise<{ extractedNotes: GuideNote[]; chords: { chord: string; startT: number; endT: number }[] }> {
  const extractedNotes: GuideNote[] = [];
  const chords: { chord: string; startT: number; endT: number }[] = [];

  const sampleRate = audioBuffer.sampleRate;
  const maxDur = Math.min(audioBuffer.duration, 90);
  const totalLen = Math.floor(sampleRate * maxDur);

  // Filter vocal range
  const offlineCtx = new OfflineAudioContext(1, totalLen, sampleRate);
  const sourceNode = offlineCtx.createBufferSource();
  sourceNode.buffer = audioBuffer;

  const hp = offlineCtx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 80;

  const lp = offlineCtx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 5000;

  const boost = offlineCtx.createBiquadFilter();
  boost.type = 'peaking';
  boost.frequency.value = 1000;
  boost.gain.value = 3.0;

  sourceNode.connect(hp);
  hp.connect(lp);
  lp.connect(boost);
  boost.connect(offlineCtx.destination);
  sourceNode.start(0);

  const rendered = await offlineCtx.startRendering();
  const vocalData = rendered.getChannelData(0);

  const stepSecs = 0.08;
  const stepSamples = Math.floor(sampleRate * stepSecs);
  const frameSize = 2048;
  let accum: { t: number; midi: number; note: string; oct: number }[] = [];

  const totalSteps = Math.floor((totalLen - frameSize) / stepSamples);
  let stepCount = 0;

  for (let offset = 0; offset + frameSize < totalLen; offset += stepSamples) {
    stepCount++;
    if (stepCount % 50 === 0 && onProgress) {
      onProgress(Math.min(99, Math.round((stepCount / totalSteps) * 100)));
    }

    const frame = vocalData.subarray(offset, offset + frameSize);
    const rms = computeRMS(frame);
    const timeSec = offset / sampleRate;

    if (rms > -48) {
      const freq = detectPitch(frame, sampleRate);
      if (freq >= 85 && freq <= 1050) {
        const info = freqToNote(freq);
        if (info) {
          if (accum.length === 0) {
            accum.push({ t: timeSec, midi: info.midiNote, note: info.note, oct: info.octave });
          } else if (Math.abs(info.midiNote - accum[0].midi) <= 1) {
            accum.push({ t: timeSec, midi: info.midiNote, note: info.note, oct: info.octave });
          } else {
            if (accum.length >= 2) {
              const m = accum[Math.floor(accum.length / 2)].midi;
              const nn = NOTE_NAMES[((m % 12) + 12) % 12];
              const o = Math.floor(m / 12) - 1;
              extractedNotes.push({
                midi: m,
                note: nn,
                octave: o,
                solfege: `${nn}${o}`,
                startT: +accum[0].t.toFixed(2),
                endT: +(accum[accum.length - 1].t + stepSecs).toFixed(2),
              });
            }
            accum = [{ t: timeSec, midi: info.midiNote, note: info.note, oct: info.octave }];
          }
        }
      }
    }
  }

  if (accum.length >= 2) {
    const m = accum[Math.floor(accum.length / 2)].midi;
    const nn = NOTE_NAMES[((m % 12) + 12) % 12];
    const o = Math.floor(m / 12) - 1;
    extractedNotes.push({
      midi: m,
      note: nn,
      octave: o,
      solfege: `${nn}${o}`,
      startT: +accum[0].t.toFixed(2),
      endT: +(accum[accum.length - 1].t + stepSecs).toFixed(2),
    });
  }

  // Detect simple harmony chords every 2.5s
  const CHORD_BAR = 2.5;
  for (let t = 0; t < maxDur; t += CHORD_BAR) {
    const notesInBar = extractedNotes.filter((n) => n.startT >= t && n.startT < t + CHORD_BAR);
    if (notesInBar.length > 0) {
      const counts: Record<number, number> = {};
      notesInBar.forEach((n) => {
        const root = n.midi % 12;
        counts[root] = (counts[root] || 0) + 1;
      });
      const dominantRoot = Number(Object.keys(counts).sort((a, b) => counts[Number(b)] - counts[Number(a)])[0]);
      const rootName = NOTE_NAMES[dominantRoot];
      chords.push({
        chord: `${rootName}`,
        startT: t,
        endT: t + CHORD_BAR,
      });
    }
  }

  if (onProgress) onProgress(100);
  return { extractedNotes, chords };
}
