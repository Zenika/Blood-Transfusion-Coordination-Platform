import { DonationMatchStatus } from '@prisma/client';

export class DonationMatchEntity {
  id!: string;
  donorId!: string;
  bloodRequestId!: string;
  status!: DonationMatchStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
