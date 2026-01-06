export interface AsyncState<T, E = unknown> {
  payload?: T;
  loading: boolean;
  errors?: E[];
}
