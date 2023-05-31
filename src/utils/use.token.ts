import { AuthToken, IUseToken } from '../auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

//We validate the token if is expired
export const useToken = (token: string): IUseToken | string => {
  const decoded = jwt.decode(token) as AuthToken; //We decode the token

  const currentDate = new Date();
  const expiresDate = new Date(decoded.exp); //We transform the expiration date of the token to a Date object to do the operation

  try {
    //We return the data of the token and if it is expired
    return {
      sub: decoded.sub,
      role: decoded.role,
      isExpired: +expiresDate <= +currentDate / 1000, //We divide by 1000 to convert the date to seconds
    };
  } catch (error) {
    return 'Token is not valid';
  }
};
