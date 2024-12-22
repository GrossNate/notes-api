import { ENV } from './config';

export const logOnlyInDev = (message: string): void => {
  if (ENV === "dev") console.log(message);
};