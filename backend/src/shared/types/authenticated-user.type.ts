import { UserRole } from '../enums/user-role.enum';

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: UserRole;
};
