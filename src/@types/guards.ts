import { AxiosError } from 'axios';

interface HasMessage {
  message: string;
  [key: string]: unknown;
}
export const hasMessageProp = (e: unknown): e is HasMessage =>
  typeof e === 'object' && e != null && 'message' in e;
export const isAxiosError = <D, T = unknown>(
  e: unknown,
): e is AxiosError<D, T> =>
  typeof e === 'object' &&
  e != null &&
  'response' in e &&
  ['response', 'code', 'request', 'status'].some((t) => t in e);
