import { ROLES } from '../../constants/roles';

export interface PayLoadToken {
  sub: string;
  role: ROLES;
}
