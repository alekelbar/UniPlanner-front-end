export interface Career {
  name: string;
  _id: string;
}

export interface CareerState {
  careers: Career[];
  error: string | null;
  loading: boolean;
  selected: Career | null;
}
