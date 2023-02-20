export interface Career {
  name: string;
  _id: string;
}

export interface CareerState {
  careers: Career[];
  errors: null | string;
}
