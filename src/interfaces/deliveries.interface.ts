export interface CreateDeliverable {
  name: string;
  description: string;
  deadline: Date;
  status: string;
  note: number;
  percent: number;
  course: string;
}

export interface Deliverable {
  _id?: string;
  createdAt?: Date;
  name: string;
  description: string;
  deadline: Date;
  status: string;
  note: number;
  percent: number;
  course?: string;
}

export interface DeliverableState {
  deliverables: Deliverable[];
  loading: boolean;
  error: string | null;
  selected: Deliverable | null;
  count: number;
}

export enum DELIVERABLE_STATUS {
  SEND = "Enviado",
  PENDING = "Pendiente",
  REVIEWED = "Calificado",
}