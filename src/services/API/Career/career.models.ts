export interface Career {
  name: string;
  _id: string;
}

export interface CareerState {
  careers: Career[];
  error: null | string;
  loading: boolean;
}
