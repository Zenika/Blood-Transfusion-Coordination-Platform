export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'PATIENT' | 'DONOR';
};
