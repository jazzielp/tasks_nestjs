import { ROLES } from '../../constants/roles';

export interface PayLoadToken {
  sub: string;
  role: ROLES;
}

export interface AuthToken {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
