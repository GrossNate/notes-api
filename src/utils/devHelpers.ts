import { ENV } from './config';

export const logOnlyInDev = (message: any): void => {  // Should be safe to console.log `any` value
  if (ENV === "dev") console.log(message);
};