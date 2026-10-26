export interface NoteInfo {
  note: string;
  octave: number;
  cents: number;
  midiNote: number;
  closestFreq: number;
  freq: number;
}

export type VoiceTypeName =
  | 'Bass'
  | 'Bariton'
  | 'Tenor'
  | 'Alto'
  | 'Mezzo-Sopran'
  | 'Sopran'
  | 'Tidak Diketahui';

export interface VoiceTypeDefinition {
  name: VoiceTypeName;
  low: number; // MIDI number
  high: number; // MIDI number
  lowName: string;
  highName: string;
  description: string;
}

export interface ResonanceData {
  chest: number;
  mask: number;
  head: number;
}

export interface VibratoInfo {
  rate: number;
  depth: number;
  hasVibrato: boolean;
}

export interface DeviationStatus {
  label: string;
  cls: string;
  statusText: string;
  color: string;
}

export interface GuideNote {
  midi: number;
  note: string;
  octave: number;
  solfege: string;
  chord?: string;
  startT: number;
  endT: number;
}

export interface MidiNoteBlock {
  id?: string;
  midi: number;
  note: string;
  octave: number;
  centsList: number[];
  startT: number;
  endT: number;
}

export interface PitchHistoryItem {
  t: number;
  freq: number;
  note?: string;
  octave?: number;
  cents?: number;
  midi?: number;
}

export interface EvaluationReport {
  score: number;
  pitchAccuracy: number;
  voicedPct: number;
  breathScore: number;
  vibrato: VibratoInfo;
  avgRes: ResonanceData;
  medianF0: number;
  robustLow: number;
  robustHigh: number;
  inTuneCount: number;
  flatCount: number;
  sharpCount: number;
  totalFrames: number;
  duration: number;
  samples: PitchHistoryItem[];
}

export type TierType = 'free' | 'pro' | 'premium';

export interface User {
  name: string;
  email: string;
  tier: TierType;
}
