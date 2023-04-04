import { ImportantThings, UrgentThings } from "../helpers/priorityCalc";

export interface CreateDeliverable {
  name: string;
  description: string;
  deadline: Date | string;
  status: string;
  note: number;
  percent: number;
  course: string;
  urgency: string;
  importance: string;
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
  urgency: UrgentThings;
  importance: ImportantThings ;
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
}

export enum DELIVERABLE_TAGS {
  IMPORTANT = "IMPORTANTE",
  URGENT = "URGENTE",
  NOT_IMPORTANT = "NO IMPORTANTE",
  NOT_URGENT = "NO URGENTE",
}