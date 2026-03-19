export type PoetOption = 'A' | 'B' | 'C' | 'D';

export interface Poet {
  value: PoetOption;
  label: string;
  description: string;
}

export interface PoemGenerationState {
  poem: string;
  loading: boolean;
  error: string | null;
}

export interface CameraState {
  active: boolean;
  stream: MediaStream | null;
}
