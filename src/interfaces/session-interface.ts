export interface CreateSession {
  name: string; // nombre de la sesión
  duration: number; // duración en minutos
  type: string; // tipo de sesión; por ejemplo "trabajo" o "descanso"
  user?: string; // Usuario dueño de esta sesión
}

export type Session = { _id: string } & CreateSession;

export interface SessionState {
  sessions: Session[];
  loading: boolean;
  selected: Session | null;
  count: number;
}

export enum SESSION_TYPES {
  WORKING = "Trabajo",
  RESTING = "Descanso",
}
