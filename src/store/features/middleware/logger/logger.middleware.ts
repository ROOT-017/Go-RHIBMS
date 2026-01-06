import type { Middleware } from '@reduxjs/toolkit';
// import type { PayloadAction, Middleware } from '@reduxjs/toolkit';

const logger: Middleware = (_store) => (next) => (action) => {
  const returnValue = next(action);
  // console.group((action as PayloadAction<unknown>).type);
  // console.log('The action: ', action);
  // console.log('The new state: ', store.getState());
  // console.groupEnd();
  return returnValue;
};
export default logger;
