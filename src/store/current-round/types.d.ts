export interface Hole {
  id: number;
  shots: Array<Shot>;
  par?: number;
}

export interface CurrentRoundState {
  course: string;
  date: string;
  holes: Array<Hole>;
  currentHole: number;
  inProgress: boolean;
  isAddingShot: boolean;
  isEditingHole: boolean;
}

export interface CurrentRoundRecord {
  course: string;
  date: string;
}

export interface Shot {
  shotId: number;
  mistake: boolean;
  addPenalty: boolean;
}

export interface CourseDetails {
  course: string;
  date: string;
}

export interface RoundDetails {
  shots: number;
  mistakes: number;
  penalties: number;
  score: number;
  holesPlayed: number;
  putts: number;
}
