export class UserEntity {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  hashedPassword!: string;
  phoneNumber!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
